# BORN FOUNDATION — System Architecture

## 1. Technology Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"; @theme`) + custom semantic properties in `src/app/globals.css`
- **Validation:** Zod v4 (`zod` schemas on `/api/contact` & `/api/volunteer`) + client form validation
- **Media Processing:** Node.js + `sharp` pipeline (`scripts/process-media.mjs`)
- **Database & Auth Target:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`) with PostgreSQL + Row Level Security migration (`supabase/migrations/20261028000000_initial_schema.sql`), operating offline via `localStorage` data store when `NEXT_PUBLIC_OFFLINE_MODE=true`

## 2. Route Architecture

### Public Routes
- `/` — Homepage (Hero, Who We Are, Mission/Vision, 6 Focus Areas, Women & Community Spotlight, Safeguarding, Get Involved CTA)
- `/about` — Complete 10-section About Us, Core Values, Women & Child Development focus areas, Our Approach, Safeguarding, Transparency
- `/programmes` & `/programmes/[slug]` — Filterable Focus Areas & Observed Activities directory and detail views
- `/gallery` — Non-identifying safeguarding-cleared photo gallery with category tabs, empty states for consent-held tracks, & keyboard lightbox
- `/impact` — Organisational & Registry Verification Ledger (`BNG(U)-JNR 304/2004-2005`, `12A`/`80G`/`FCRA` marked pending verification)
- `/get-involved` — Mandatory volunteer screening steps, `VolunteerForm`, in-kind support, & partnership enquiries
- `/support` — Financial giving governance boundary (online payment portal disabled cleanly), volunteering & in-kind overview
- `/stories` & `/stories/[slug]` — Zero-fabrication Organisational Updates repository (empty until staff publish reviewed updates)
- `/contact` — Validated enquiry form, click-to-call phone link (`+91 99864 95292`), address, honest email/hours pending status
- `/faq` — Categorised FAQ accordion covering women & child development, safeguarding, compliance, and donations
- `/safeguarding`, `/privacy`, `/terms`, `/accessibility` — Governance & policy pages clearly disclosing draft/verification status
- `/access-denied`, `/not-found` (`not-found.tsx`), Error Boundary (`error.tsx`), `/sitemap.xml`, `/robots.txt`

### Protected Administration Portal
- `/login` — Staff portal entry (offline sandbox credentials in local dev; ready for Supabase Auth)
- `/admin` — Operational dashboard overview (metrics, recent enquiries, safeguarding checklist)
- `/admin/pages` — Page metadata & workflow status manager
- `/admin/programmes` — Focus Areas & Programmes CRUD (`draft -> submitted -> in_review -> changes_requested -> approved -> published -> archived`)
- `/admin/stories` — Editorial stories authoring with safeguarding guidelines
- `/admin/media` — Gallery & Safeguarding Media Approval queue isolating identifiable-minor photographs
- `/admin/enquiries` — Inbound contact correspondence inbox with internal staff notes
- `/admin/volunteers` — Screened volunteer applicant tracker
- `/admin/governance` — Registry/legal verification tracker & Staff Audit Log viewer
- `/admin/settings` — Secretariat contact configuration & RBAC tier overview

### Backend API Endpoints
- `POST /api/contact` — Same-origin check, IP rate limit (`10/min`), Zod schema validation, optional Supabase persistence, masked email logging
- `POST /api/volunteer` — Same-origin check, IP rate limit (`10/min`), mandatory safeguarding acknowledgement validation
- `GET /api/admin/media-inventory` — Authenticated guard returning `401` to anonymous callers

## 3. Transitioning from Offline Sandbox to Production Supabase
1. Provision a Supabase project and run `supabase/migrations/20261028000000_initial_schema.sql` in the SQL editor.
2. Create initial staff accounts via Supabase Auth and link rows in `public.profiles` with appropriate `user_role` values.
3. Update environment variables (`.env.local` or host secrets): set `NEXT_PUBLIC_OFFLINE_MODE=false`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), and `NEXT_PUBLIC_SITE_URL`.
4. Implement Supabase Storage private bucket (`private-media`) policies matching `media_assets.is_public`.
