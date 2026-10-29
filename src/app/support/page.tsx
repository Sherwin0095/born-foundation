import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  HandHeart,
  Building2,
  Gift,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Support Our Work",
  description:
    "Discover how you can support Born Foundation through donations, volunteering, corporate partnerships, or in-kind contributions.",
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Support Our Work"
          subtitle="Partner with us to create a compassionate, protective safety net for vulnerable children."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Support Us" },
          ]}
        />

        {/* Section 1: Financial Contributions (Payment boundary explanation) */}
        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-forest-green mb-3">
              <Heart className="w-5 h-5 text-muted-terracotta" />
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-terracotta">
                Monetary Support
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-6">
              Financial Giving & Direct Programme Grants
            </h2>
            <p className="text-secondary-text text-lg leading-relaxed mb-8">
              Every financial contribution supports nutritious meals, learning materials,
              protective community spaces, and medical interventions for children who need them most.
            </p>

            {/* Honest Payment Integration Boundary Status */}
            <div className="bg-warm-ivory border-2 border-warm-gold/40 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-gold/20 text-warm-gold flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-main-text" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                      Online Gateway Verification Status
                    </h3>
                    <Badge variant="warning">Setup in Progress</Badge>
                  </div>
                  <p className="text-secondary-text text-sm leading-relaxed mb-4">
                    In compliance with financial integrity policies and Indian NGO regulations, our automated
                    online payment gateway will go live following formal bank reconciliation clearance.
                    We never record simulated credit card payments or fake transactions.
                  </p>
                  <p className="text-secondary-text text-sm leading-relaxed mb-6 font-medium">
                    To make an official bank transfer (NEFT/RTGS/Cheque) or discuss designated programme grants:
                  </p>
                  <Link href="/contact">
                    <Button variant="secondary" size="md">
                      <Mail className="w-4 h-4 mr-2" />
                      Inquire for Official Bank Transfer Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Volunteering */}
        <Section background="sage" id="volunteer">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-forest-green text-sm uppercase tracking-wider font-semibold">
                Hands-On Engagement
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-1">
                Volunteer With Us
              </h2>
              <p className="text-secondary-text mt-3">
                Offer your mentorship, teaching, or administrative skills to directly impact a child’s life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <Card variant="elevated" padding="md">
                <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-main-text text-lg mb-2">Academic Mentors</h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  Support weekend tutoring classes in basic literacy, numeracy, and digital fluency for young learners.
                </p>
              </Card>

              <Card variant="elevated" padding="md">
                <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center mb-4">
                  <HandHeart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-main-text text-lg mb-2">Life-Skills & Arts</h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  Conduct workshops in arts, crafts, sports, and emotional resilience to build self-confidence.
                </p>
              </Card>

              <Card variant="elevated" padding="md">
                <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-main-text text-lg mb-2">Centre Operations</h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  Assist in resource management, meal distribution logistics, and community registration drives.
                </p>
              </Card>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 md:p-8 text-center max-w-xl mx-auto shadow-sm">
              <h4 className="text-lg font-semibold text-main-text mb-2">Ready to apply as a volunteer?</h4>
              <p className="text-secondary-text text-sm mb-6">
                All applicants undergo background checks and mandatory safeguarding briefing.
              </p>
              <Link href="/contact?type=volunteer">
                <Button variant="primary">
                  Submit Volunteer Expression of Interest
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Section>

        {/* Section 3: In-Kind & Corporate Partnerships */}
        <Section background="white" id="partnerships">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card variant="bordered" padding="lg">
              <div className="w-12 h-12 bg-soft-sage text-forest-green rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                In-Kind Donations
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed mb-4">
                We accept designated educational supplies, unopened learning games, refurbished laptops
                for learning centers, and non-perishable fortified food grains.
              </p>
              <ul className="text-sm text-secondary-text space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  <span>Children's storybooks & stationery sets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  <span>Digital learning devices (laptops/tablets)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  <span>Clean recreational & sports gear</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Inquire About In-Kind Delivery
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg">
              <div className="w-12 h-12 bg-muted-terracotta/10 text-muted-terracotta rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                CSR & Corporate Alliances
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed mb-4">
                We partner with responsible organizations seeking meaningful, verified CSR initiatives
                aligned with United Nations Sustainable Development Goals (SDG 1, 2, 4, and 10).
              </p>
              <ul className="text-sm text-secondary-text space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  <span>Tailored multi-year community center adoptions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  <span>Employee mentorship & payroll giving programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" />
                  <span>Rigorous audit reporting for statutory CSR compliance</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="secondary" size="sm">
                  Schedule a Corporate Partnership Call
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
