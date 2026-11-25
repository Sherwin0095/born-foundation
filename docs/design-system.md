# BORN FOUNDATION — Design System & Layout Architecture

## 1. Visual Palette & Accessibility Contrast

Defined centrally via Tailwind CSS v4 `@theme` in `src/app/globals.css`:

| Token | Hex | Intended Role |
|---|---|---|
| `--color-forest-green` | `#285746` | Primary brand header/hero surfaces, primary buttons, key accents |
| `--color-forest-green-deep` | `#1F493B` | Deep hover states and secondary dark containers |
| `--color-forest-green-dark` | `#16362b` | Top announcement banner and dark borders |
| `--color-warm-ivory` | `#FAF8F2` | Base page background and editorial warmth |
| `--color-soft-sage` | `#DCE8DD` | Calm surface highlights, icon containers, active nav pills |
| `--color-muted-terracotta` | `#BD785B` | Secondary actions, highlights, warm accent fills |
| `--color-muted-terracotta-dark` | `#9E583C` | Dark terracotta text contrast on light surfaces |
| `--color-warm-gold` | `#C6A565` | Gold button fills (paired with `#26342D` main-text) and large decorative accents |
| `--color-warm-gold-light` | `#E5CD96` | Accessible light-gold ink on dark `#285746` / `#16362b` surfaces (`>= 4.5:1` contrast) |
| `--color-main-text` | `#26342D` | Primary copy & headings on light backgrounds |
| `--color-secondary-text` | `#596760` | Secondary/muted body copy (`> 5.4:1` on ivory & white) |
| `--color-border` | `#E2E6E1` | Hairline dividers and card framing |

## 2. Typography Scale

- **Headings (`h1`–`h6`):** `"Georgia", "Cambria", "Times New Roman", Times, serif` (`font-weight: 700`, tight `-0.02em` tracking, fluid `clamp()` sizing).
- **Body:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` (offline-safe zero-network font stack avoiding build failures or FOIT).
- **Cascade Rule:** All base element heading styles live inside `@layer base` with `color: inherit;` so component utilities like `text-white` or `text-forest-green` always take precedence.

## 3. Spacing, Container & Breakpoints

- **Centralised Container:** `.page-container` (`max-width: 1280px`, centred via `margin-inline: auto`, progressive horizontal padding `1.25rem` mobile / `2rem` `sm` >=640px / `3rem` `lg` >=1024px).
- **Body Overflow:** `overflow-x: clip` prevents accidental 100vw scrollbar glitches without interfering with `position: sticky`.
- **Breakpoints:** Mobile `<640px`, Tablet `640px–1023px`, Laptop/Desktop `1024px–1920px+`.
- **Touch Targets & Focus:** Buttons and interactive pills meet `>= 40px` (`min-h-10` / `min-h-11`), with `2px` high-contrast `:focus-visible` rings.
- **Reduced Motion:** `@media (prefers-reduced-motion: reduce)` suppresses smooth scrolling and transition animations.

## 4. Shared Primitives (`src/components/`)

- Layout: `Header` (`SiteHeader`), `Footer` (`SiteFooter`), `PageContainer`, `Section` (`SectionContainer`), `SectionHeading`, `PageHero`, `ResponsiveGrid`
- Interactive & Forms: `Button`, `PrimaryButton`, `SecondaryButton`, `Input` (`FormField`), `Textarea`, `Select`, `Accordion`, `Card`, `Badge`
- Media & Feedback: `ImageComponent`, `EmptyState`, `ErrorState`, `LoadingState`
