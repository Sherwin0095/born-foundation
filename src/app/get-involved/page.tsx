import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Gift,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button, Badge } from "@/components/ui";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get Involved — Volunteering, Community & Partnerships",
  description:
    "Explore supervised volunteering (subject to safeguarding screening), women & community engagement, in-kind supplies, and responsible partnerships with BORN FOUNDATION.",
  alternates: { canonical: "/get-involved" },
};

export default function GetInvolvedPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Get Involved"
          subtitle="Responsible community participation, screened volunteering, in-kind educational supplies, and safeguarding-aligned partnerships."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Get Involved" },
          ]}
        />

        {/* 1. Mandatory Screening & Volunteering Principles */}
        <Section background="white">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="default">Safe Participation</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Volunteering With Mandatory Safeguarding Screening
              </h2>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                No volunteer is permitted direct or unsupervised interaction with children prior to
                screening, reference checks, safeguarding induction, and explicit staff authorisation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  step: "01",
                  title: "Expression of Interest",
                  desc: "Share your background, skills, and availability via the application form below.",
                },
                {
                  step: "02",
                  title: "Identity & Reference Checks",
                  desc: "Staff review applications and conduct verification checks appropriate to the proposed role.",
                },
                {
                  step: "03",
                  title: "Safeguarding Induction",
                  desc: "Mandatory briefing on BORN FOUNDATION's Child Safeguarding Code of Conduct and conduct boundaries.",
                },
                {
                  step: "04",
                  title: "Supervised Contribution",
                  desc: "Matched strictly with approved roles under regular coordinator oversight.",
                },
              ].map((s) => (
                <Card key={s.step} variant="bordered" padding="md" className="bg-surface-muted">
                  <span className="inline-flex w-9 h-9 rounded-lg bg-forest-green text-white items-center justify-center font-bold text-sm mb-3">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-base text-main-text mb-1.5">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">{s.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* 2. Volunteer Form & Participation Pathways */}
        <Section background="sage" id="volunteer-form">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-forest-green font-bold">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  <h3 className="text-lg">Protected Environment Standard</h3>
                </div>
                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                  In accordance with child protection responsibilities, BORN FOUNDATION reserves the
                  right to decline or limit access for any role involving minors.
                </p>
                <ul className="space-y-2 text-xs text-secondary-text">
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span>No private or one-on-one unsupervised contact with children.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Zero personal photography of children allowed on personal devices.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-forest-green font-bold">
                  <Users className="w-5 h-5" aria-hidden="true" />
                  <h3 className="text-lg">Women &amp; Community Participation</h3>
                </div>
                <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                  Local parents, mothers, educators, and neighbours play an active role in discussions
                  that strengthen women&apos;s wellbeing and protective community environments around
                  Bengaluru centres.
                </p>
                <Link href="/programmes/women-community-development" className="inline-flex items-center gap-1 text-xs font-bold text-forest-green hover:underline">
                  Explore Women &amp; Community Development
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <VolunteerForm />
            </div>
          </div>
        </Section>

        {/* 3. In-Kind Contributions & Responsible Partnerships */}
        <Section background="white" id="partnerships">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card variant="bordered" padding="lg">
              <div className="w-12 h-12 bg-soft-sage text-forest-green rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                In-Kind Educational &amp; Essential Supplies
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed mb-4">
                Thoughtful material contributions help equip learning sessions directly. Please contact
                our Bengaluru team beforehand to align supplies with current community needs:
              </p>
              <ul className="text-sm text-secondary-text space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Unused stationery sets, notebooks, pencils, and drawing materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>School bags and age-appropriate reading books</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Reusable water bottles and sealed essential provisions</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Coordinate In-Kind Contribution
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg">
              <div className="w-12 h-12 bg-muted-terracotta/15 text-muted-terracotta-dark rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                Organisational &amp; Community Partnerships
              </h2>
              <p className="text-sm text-secondary-text leading-relaxed mb-4">
                We welcome responsible collaborations with schools, community institutions, and
                organisations that uphold child safeguarding and ethical transparency.
              </p>
              <ul className="text-sm text-secondary-text space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Educational enrichment and museum/science experience support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Women&apos;s community workshops and family wellbeing dialogue</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                  <span>Official registry &amp; due-diligence discussions directly via secretariat</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button variant="secondary" size="sm">
                    Send Organisational Enquiry
                  </Button>
                </Link>
                <a href={SITE_CONFIG.contact.phoneHref}>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4 mr-1.5" aria-hidden="true" />
                    {SITE_CONFIG.contact.phone}
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
