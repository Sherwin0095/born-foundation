# BORN FOUNDATION Website

An accessible, responsive, child-safeguarding-first website and staff administration console for **BORN FOUNDATION**, a non-profit organisation in Shanthinagar, Bengaluru supporting children's welfare alongside women and child development.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and an offline-first data store paired with Supabase PostgreSQL Row Level Security migrations.

---

## Key Safeguards & Architecture Highlights

- **Child Safeguarding Media Isolation:** Private source photographs and unapproved minor imagery live strictly outside `public/` in `.private/` (gitignored). Only EXIF-stripped, non-identifying WebP/JPEG derivatives processed via `scripts/process-media.mjs` appear on public routes.
- **Anti-Fabrication Discipline:** Clearly distinguishes confirmed facts, supplied-but-unverified directory references (`BNG(U)-JNR 304/2004-2005`, `12A`, `80G`, `FCRA`), and missing items (official email, confirmed hours, verified impact metrics, and live donation payments remain intentionally withheld/disabled).
- **Security & Validation:** Content Security Policy, `X-Frame-Options: DENY`, `nosniff`, Zod validation, honeypot spam protection, per-IP rate limiting, same-origin checks, PII log masking, and unauthenticated rejection (`401`) on private admin API endpoints.

---

## Local Commands

### Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000`.

### Process Source Photographs (when working with `.private/source-archive/`)
```bash
npm run media:process
```

### Verify Code Quality, Build & Tests
```bash
npm run type-check
npm run lint
npm run build
npm test
```

### Run Headless Browser Verification & Visual Capture
```bash
npm run verify:browser
```

---

## Offline Demo Portal Credentials

Open `/login` during offline development (`NEXT_PUBLIC_OFFLINE_MODE=true`):
- **Super Admin:** `admin@bornfoundation.org` / `admin123`
- **Content Editor:** `editor@bornfoundation.org` / `admin123`
- **Safeguarding Reviewer:** `reviewer@bornfoundation.org` / `admin123`

---

## Live Transition (Supabase & Branch Protection)
1. Apply `supabase/migrations/20261028000000_initial_schema.sql` in your Supabase project SQL editor.
2. Provision staff auth accounts linked to `public.profiles` and private storage bucket policies for unapproved media.
3. Update host environment variables using `.env.example` (`NEXT_PUBLIC_OFFLINE_MODE=false`).
4. Configure repository Git branch protection on `main`/`master` requiring passing CI checks (`Type-check, Lint, Media Privacy & Production Build`) before merge.
