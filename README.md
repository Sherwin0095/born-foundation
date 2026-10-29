# Born Foundation NGO Website

A complete, production-ready website and administration portal for **Born Foundation**, an organisation dedicated to the care, wellbeing, development, and support of children who need assistance.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript (Strict)**, and **Tailwind CSS v4**.

---

## Architecture Overview

- **Offline-First Mode**: Currently configured with mock data, in-memory models, and `localStorage` persistence. You can run, test, and demo the entire public site and admin console offline without requiring external API keys.
- **Online-Ready Database**: Complete PostgreSQL schema with Row Level Security (RLS) policies, RBAC, enums, indexes, and triggers located in `supabase/migrations/20261028000000_initial_schema.sql`.
- **Child Safeguarding by Design**: Zero public exposure of minors' identifying data, anonymized narratives, mandatory image metadata/EXIF stripping notices, and restricted safeguarding reporting channels.

---

## Public Website Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero, mission, programmes, core values, field stories, and trust indicators |
| `/about` | Organisational charter, mission, vision, values, and safeguarding commitment |
| `/programmes` | Filterable directory of developmental programmes across 5 focus areas |
| `/programmes/[slug]` | Deep-dive detail pages for each verified programme |
| `/impact` | Governance disclosures, audit schedules, and public statutory reports |
| `/support` | Monetary contribution guidelines (transparent banking boundary), volunteering, and CSR partnerships |
| `/stories` | Field updates and narratives with safeguarding redactions |
| `/stories/[slug]` | Individual story reader with category tags and disclosure notes |
| `/contact` | Validated contact form with anti-spam honeypot and category routing |
| `/faq` | Accessible accordion covering governance, programmes, donations, and volunteering |
| `/safeguarding` | Child safeguarding policy, vetting standards, and reporting protocols |
| `/privacy` | Data protection notice and privacy statement |
| `/terms` | Website terms of use |
| `/accessibility` | WCAG 2.2 AA compliance statement and keyboard navigation guides |

---

## Administration Portal Routes

| Route | Description |
|---|---|
| `/login` | Staff authentication with mock role picker for instant offline testing |
| `/admin` | Executive dashboard overview with live counts of drafts, reviews, and enquiries |
| `/admin/programmes` | Full CRUD lifecycle: `DRAFT → SUBMITTED → APPROVED → PUBLISHED → ARCHIVED` |
| `/admin/stories` | Story authoring with child safeguarding review checklist |
| `/admin/enquiries` | Inbound correspondence manager with status tracking and internal staff notes |
| `/admin/volunteers` | Volunteer candidate vetting, interview evaluation, and status management |
| `/admin/media` | Digital asset manager with mandatory alt-text and EXIF stripping checks |
| `/admin/settings` | Identity settings, database connection indicator, and RBAC role directory |

---

## Offline Testing Credentials

Visit `/login` and use any of the preset demo roles:

| Role | Email | Password |
|---|---|---|
| **Super Admin** | `admin@bornfoundation.org` | `admin123` |
| **Content Editor** | `editor@bornfoundation.org` | `admin123` |
| **Safeguarding Reviewer** | `reviewer@bornfoundation.org` | `admin123` |

---

## Local Development Instructions

### 1. Start Development Server
```bash
cd born-foundation
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run TypeScript Validation
```bash
npm run type-check
```

### 3. Production Build
```bash
npm run build
npm run start
```

---

## Transitioning from Offline to Online (Supabase & Live Services)

When you are ready to connect live cloud services, follow these simple steps:

### 1. Set Up Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of `supabase/migrations/20261028000000_initial_schema.sql`.
4. Copy your **Project URL** and **Anon Key** from Project Settings > API.

### 2. Update Environment Variables
In `born-foundation/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=https://bornfoundation.org
NEXT_PUBLIC_OFFLINE_MODE=false
```

### 3. Payment Gateway & Email (Production Launch)
- **Payment Gateway**: Connect Razorpay or Stripe by adding provider keys once bank verification (80G/12A/FCRA if applicable) is approved.
- **Transactional Email**: Add SMTP/Resend keys to forward `/api/contact` submissions directly to staff inboxes.
