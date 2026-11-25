# BORN FOUNDATION — Permanent Engineering & Safeguarding Rules

All future engineering changes in this repository **MUST** follow these mandatory rules.

## 1. Mandatory Pre-Edit Discipline
1. **Inspect existing code first:** Before modifying any file, inspect the relevant components, design tokens (`src/app/globals.css`), UI primitives (`src/components/ui/index.tsx`), and data config (`src/lib/site-config.ts`).
2. **Preserve working functionality:** Never delete or weaken working routes, API validation, tests, or user-authored copy without an explicit requirement.
3. **Reuse existing design tokens and shared UI components:** Use `.page-container`, `Section`, `SectionHeading`, `PageHero`, `Card`, `Button`, `Badge`, `Input`, `Textarea`, `Select`, `EmptyState`, `ErrorState`, `LoadingState`, and semantic Tailwind `@theme` tokens (`forest-green`, `warm-ivory`, `soft-sage`, `muted-terracotta`, `warm-gold`).
4. **Never introduce duplicate styling systems:** Do not add unlayered CSS resets, competing CSS frameworks, or utility overrides that break `@layer base` heading inheritance (`color: inherit`).

## 2. Anti-Fabrication & Truthfulness Rules
5. **Never invent organisational facts:** Do not fabricate founders, founding dates, staff rosters, beneficiary statistics, awards, testimonials, partners, financial statements, bank/UPI details, email addresses, or confirmed opening hours.
6. **Respect supplied-vs-verified boundaries:** Directory details (registration reference `BNG(U)-JNR 304/2004-2005`, `12A`, `80G`, `FCRA` references, `~09:30 AM` hours) must remain explicitly marked as unverified until confirmed via authoritative documents. Never claim active FCRA registration or tax-exemption eligibility without official verification.
7. **Do not misclassify the organisation:** Never describe BORN FOUNDATION as a residential orphanage, adoption centre, licensed residential childcare institution, or formal school. Focus identity accurately on underprivileged children's welfare alongside women & child development.

## 3. Child Safeguarding & Privacy Non-Negotiables
8. **Protect private photographs and child information:**
   - Never move files from `.private/` (`source-archive/` or `media-previews/`) into `public/`.
   - Never auto-publish photographs containing identifiable children merely because source files exist.
   - Strip all EXIF/GPS/XMP metadata from public media derivatives via `node scripts/process-media.mjs`.
   - Maintain zero public child directories, case records, or child personal data collection.
   - Keep volunteering gated behind mandatory screening, references, and safeguarding induction disclosures.

## 4. Layout, Accessibility & Responsive Integrity
9. **Maintain responsive layouts across all widths:** Verify desktop and mobile viewports (`320px`, `360px`, `390px`, `768px`, `1024px`, `1280px`, `1440px`, `1920px`) have zero unintended horizontal overflow, clean padding inside `.page-container`, working mobile navigation drawer, and accessible focus indicators.
10. **Preserve accessibility (WCAG 2.2 AA target):** Maintain semantic headings, landmark regions, descriptive alt text, keyboard-accessible dialogs (Escape + Arrow navigation), `>= 4.5:1` contrast for small text (including `#E5CD96` gold accents on dark green), and `prefers-reduced-motion` support.

## 5. Verification, Security & Documentation
11. **Run verification commands after significant changes:**
    - `npm run type-check`
    - `npm run lint`
    - `npm run build`
    - `npm test` and browser visual/responsive checks
12. **Inspect rendered browser output after visual changes:** Never rely solely on a passing build to assume pages render properly.
13. **Test authorisation after backend/API changes:** Ensure unauthenticated callers cannot access `/api/admin/*` routes, PII is never logged raw, and rate limiting + validation remain enforced.
14. **Never suppress errors or accept broken baselines:** Never weaken assertions or auto-overwrite visual regression screenshots when a genuine UI or safeguarding failure occurs.
15. **Document architectural and compliance updates:** Keep `docs/` (`design-system.md`, `content-register.md`, `media-register.md`, `architecture.md`, `security.md`, `implementation-status.md`) synchronised with actual implementation state.
