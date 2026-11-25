# BORN FOUNDATION — Implementation Status & Verification Register

Status legend:
- **VERIFIED** — Implemented, built, and verified against live application / test run.
- **IMPLEMENTED** — Implemented in codebase/migration, not fully exercised in live production environment.
- **BLOCKED** — Cannot be completed or enabled without external organisational credentials, documents, or legal authorisation.
- **NOT IMPLEMENTED** — Still incomplete / omitted.

| Area / Requirement | Classification | Notes & Evidence |
|---|---|---|
| Core public routes (`/`, `/about`, `/programmes`, `/programmes/[slug]`, `/gallery`, `/impact`, `/get-involved`, `/support`, `/stories`, `/contact`, `/faq`) | **VERIFIED** | Built statically/dynamically (`next build` 32/32 routes), HTTP 200 & zero overflow in headless Chromium across `320px–1920px`. |
| Legal & system routes (`/safeguarding`, `/privacy`, `/terms`, `/accessibility`, `/login`, `/access-denied`, `/not-found`, `/robots.txt`, `/sitemap.xml`) | **VERIFIED** | Serving HTTP 200; draft notices clearly preserve legal review boundaries. |
| ZIP extraction (`15` photos), EXIF/GPS removal & WebP optimisation pipeline (`scripts/process-media.mjs`) | **VERIFIED** | All 15 originals isolated in `.private/source-archive/` (gitignored); 3 non-identifying WebP/JPEG sets in `public/images/gallery/` verified zero EXIF via `sharp`. |
| Safeguarding isolation of identifiable minor imagery (`12` of `15` held in private moderation) | **VERIFIED** | 12 photographs withheld in `.private/media-previews/` & moderation queue; public routes never expose private paths; `GET /api/admin/media-inventory` returns `401` unauthenticated. |
| Women & child development + children's welfare brand narrative | **VERIFIED** | Woven across Homepage hero/sections, About Us, Programmes, Gallery, FAQ, and Footer. |
| Anti-fabrication checks (`info@`, `safeguarding@`, unverified stats, invented 2024 news stories removed) | **VERIFIED** | Verified across all rendered public HTML routes (`npm test` 97/97 passing). |
| Click-to-call `+91 99864 95292` & Bengaluru address across UI | **VERIFIED** | Active `tel:+919986495292` links in Header drawer, Homepage, Support, Contact, Get Involved, Legal pages, and Footer. |
| API hardening (`POST /api/contact`, `POST /api/volunteer`, Zod validation, honeypot, IP rate limit, same-origin check) | **VERIFIED** | Verified 400/201 status behaviour & PII email masking via `npm test`. |
| ESLint v9 flat config & React 19 strict hooks compliance (`npm run lint`, `npm run type-check`) | **VERIFIED** | `0` TypeScript errors, `0` ESLint errors, `0` warnings. |
| Responsive browser checks (`320px`, `360px`, `390px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`) & visual baselines | **VERIFIED** | `0` overflow failures, `0` broken images, `0` console errors across `28` viewport/route checks; screenshots saved in `tests/visual-baselines/`. |
| Permanent regression rules, architecture/security/content/media docs & GitHub Actions CI | **VERIFIED** | Created `AGENTS.md`, `.agents/rules/born-foundation.md`, `docs/*`, `README.md`, `.env.example`, `.github/workflows/ci.yml`. |
| Staff Admin Console (`/admin`, `/pages`, `/programmes`, `/stories`, `/media`, `/enquiries`, `/volunteers`, `/governance`, `/settings`) | **IMPLEMENTED** | Full interactive CRUD, workflow transitions, media approval lock & local audit logging functional in offline `localStorage` mode. |
| Supabase PostgreSQL schema, RLS & SSR helper wiring | **IMPLEMENTED** | Complete SQL schema & RLS (`supabase/migrations/20261028000000_initial_schema.sql`) and SSR client helpers (`src/lib/supabase/*`) ready. |
| Live Supabase production Auth, Postgres persistence & private Storage execution | **BLOCKED** | Requires live Supabase Project URL, Anon Key, and Service Role Key (`NEXT_PUBLIC_OFFLINE_MODE=false`). |
| Guardian publication consent for the `12` held source photographs depicting minors | **BLOCKED** | Requires documented parental/guardian consent & executive safeguarding sign-off before releasing held photos publicly. |
| Verified Registration (`BNG(U)-JNR 304/2004-2005`), `12A`, `80G`, `FCRA` badges, official email & confirmed opening hours | **BLOCKED** | Requires original compliance certificates and official contact confirmation from BORN FOUNDATION. |
| Live online donation payments, bank details, UPI IDs & Razorpay/Stripe gateway | **BLOCKED** | Intentionally disabled until bank verification, statutory tax/compliance confirmation, and payment gateway keys. |
| Legal Counsel & Board sign-off on Draft Safeguarding Policy, Privacy Policy, and Terms of Use | **BLOCKED** | Draft policies accurately reflect technical behaviour; require legal review before formal enactment. |
| Google/Leaflet interactive map embed with verified secretariat coordinates | **NOT IMPLEMENTED** | Omitted in favour of supplied address + verification notice until physical GPS pin is confirmed. |
| Lighthouse CLI score report | **NOT IMPLEMENTED** | Global `lighthouse` npm CLI not installed in offline environment; Chrome DevTools DOM telemetry captured in `browser-verification-report.json`. |
