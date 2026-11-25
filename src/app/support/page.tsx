import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  HandHeart,
  Building2,
  Gift,
  ShieldCheck,
  Phone,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button, Badge } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Support Our Work",
  description:
    "Explore ethical ways to support BORN FOUNDATION through in-kind educational supplies, screened volunteering, and responsible partnerships.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Support Our Work"
          subtitle="Responsible ways to stand alongside children's learning, wellbeing, and women & community development."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Support Our Work" },
          ]}
        />

        {/* Section 1: Honest Financial Support & Disabled Payment Architecture */}
        <Section background="white">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-muted-terracotta-dark">
              <Heart className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Financial Governance Boundary
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Financial Contributions &amp; Verification Status
            </h2>
            <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
              In strict compliance with accountability and regulatory integrity, BORN FOUNDATION
              does not display placeholder bank account numbers, unverified UPI IDs, QR codes, or
              tax-exemption promises prior to official document verification.
            </p>

            {/* Disabled Gateway Interface Preview */}
            <div className="bg-warm-ivory border-2 border-warm-gold/40 rounded-2xl p-6 md:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-gold/25 text-main-text flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                    Online Donation Portal (Currently Disabled)
                  </h3>
                </div>
                <Badge variant="warning">Blocked Pending Credentials &amp; Verification</Badge>
              </div>

              <p className="text-sm text-secondary-text leading-relaxed">
                Payment integration hooks and database tracking schema (`donations`) are architected
                for future activation only after verified bank settlement credentials, 12A/80G/FCRA
                certificate verification (as applicable), and explicit executive authorisation are provided.
              </p>

              {/* Non-active preview boundary showing intentional disabled state */}
              <div className="p-4 rounded-xl bg-white border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80">
                <div className="text-xs text-secondary-text">
                  <strong className="text-main-text block text-sm">
                    Direct Bank / Gateway Transfers Unavailable Online
                  </strong>
                  Please contact our secretariat directly for legitimate giving enquiries rather than
                  using any third-party links.
                </div>
                <Button type="button" variant="outline" size="sm" disabled>
                  Online Payment Disabled
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/contact">
                  <Button variant="secondary" size="md">
                    Enquire via Contact Form
                  </Button>
                </Link>
                <a href={SITE_CONFIG.contact.phoneHref}>
                  <Button variant="outline" size="md">
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    Call {SITE_CONFIG.contact.phone}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Volunteering (Screened) */}
        <Section background="sage" id="volunteer">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <p className="text-forest-green text-xs uppercase tracking-wider font-bold">
                Safe Participation
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Volunteer With Safeguarding Oversight
              </h2>
              <p className="text-secondary-text text-sm sm:text-base">
                Every volunteer applicant completes identity screening, reference checks, and
                Child Safeguarding training prior to any supervised activity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle2,
                  title: "Learning & Creative Support",
                  desc: "Assist adult educators with supervised classroom supplies organisation, creative drawing tables, or literacy exercises.",
                },
                {
                  icon: HandHeart,
                  title: "Women & Community Engagement",
                  desc: "Contribute organisational, coordination, or workshop facilitation support alongside women's groups.",
                },
                {
                  icon: Building2,
                  title: "Logistics & Operations",
                  desc: "Help sort stationery packs, manage resource inventories, or coordinate community events cleanly.",
                },
              ].map((role) => (
                <Card key={role.title} variant="elevated" padding="md">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center mb-4">
                    <role.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-main-text text-lg mb-2">{role.title}</h3>
                  <p className="text-sm text-secondary-text leading-relaxed">{role.desc}</p>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/get-involved#volunteer-form">
                <Button variant="primary" size="md">
                  Open Screened Volunteer Application Form
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </Section>

        {/* Section 3: In-Kind & Partnerships */}
        <Section background="white" id="partnerships">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card variant="bordered" padding="lg">
              <div className="w-12 h-12 bg-soft-sage text-forest-green rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                In-Kind Learning &amp; Essential Supplies
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed mb-4">
                Material gifts directly help equip community sessions when coordinated beforehand
                with our team:
              </p>
              <ul className="text-sm text-secondary-text space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Stationery sets, notebooks, pencils, and drawing materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>School bags and reusable clean water bottles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Children&apos;s age-appropriate reading books</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Arrange In-Kind Delivery
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg">
              <div className="w-12 h-12 bg-muted-terracotta/15 text-muted-terracotta-dark rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                Institutional &amp; Community Partnerships
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed mb-4">
                Responsible institutions and community groups can collaborate with BORN FOUNDATION
                in areas aligned with child safeguarding and transparent governance.
              </p>
              <ul className="text-sm text-secondary-text space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Educational enrichment outings and stationery drives</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Women&apos;s community workshops and caregiver dialogue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Compliance verification discussions directly with office</span>
                </li>
              </ul>
              <Link href="/get-involved#partnerships">
                <Button variant="secondary" size="sm">
                  Explore Partnership Options
                </Button>
              </Link>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
