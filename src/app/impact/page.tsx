import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Shield,
  CheckCircle2,
  MapPin,
  Phone,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Badge, Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Impact & Transparency",
  description:
    "View BORN FOUNDATION's organisational details, supplied registry reference verification statuses, and zero-fabrication transparency policy.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Impact & Transparency"
          subtitle="Clear separation between confirmed facts, supplied registry references awaiting document verification, and future audited reports."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Impact & Transparency" },
          ]}
        />

        {/* 1. Zero Fabrication Commitment */}
        <Section background="white">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="flex items-center gap-2 text-forest-green">
              <Shield className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Truthful Reporting Standard
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Zero-Fabrication &amp; Verification Policy
            </h2>
            <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
              BORN FOUNDATION never presents unverified statistics, estimated beneficiary totals,
              placeholder financial statements, or unconfirmed regulatory statuses as proven achievements.
            </p>
            <p className="text-secondary-text text-base leading-relaxed">
              Every quantitative figure and compliance certificate published on this website undergoes
              verification against original official documents before tax-benefit or external accreditation
              badges are displayed.
            </p>
          </div>
        </Section>

        {/* 2. Organisational & Registry Verification Ledger */}
        <Section background="sage">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Organisational &amp; Registry Information Ledger
              </h2>
              <p className="text-sm sm:text-base text-secondary-text">
                Summary of details supplied in organisational briefings and directory records.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card variant="bordered" padding="lg" className="bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-main-text">Location &amp; Contact</h3>
                  <Badge variant="default">Supplied Info</Badge>
                </div>
                <div className="space-y-3 text-sm text-secondary-text">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-forest-green shrink-0 mt-1" aria-hidden="true" />
                    <span>{SITE_CONFIG.contact.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-forest-green shrink-0" aria-hidden="true" />
                    <a
                      href={SITE_CONFIG.contact.phoneHref}
                      className="font-semibold text-forest-green hover:underline"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                  <p className="text-xs italic">{SITE_CONFIG.contact.openingHoursStatus}</p>
                </div>
              </Card>

              <Card variant="bordered" padding="lg" className="bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-main-text">Registration &amp; Tax Records</h3>
                  <Badge variant="warning">Verification Pending</Badge>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-secondary-text">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Supplied Reference:</strong> {SITE_CONFIG.registry.registrationReference}{" "}
                      ({SITE_CONFIG.registry.registrationStatus})
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{SITE_CONFIG.registry.section12A}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{SITE_CONFIG.registry.section80G}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{SITE_CONFIG.registry.fcraNotice}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Section>

        {/* 3. Verified Metrics & Documents Status */}
        <Section background="white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-warm-ivory rounded-2xl border border-border p-8 text-center space-y-4">
              <div className="w-13 h-13 bg-soft-sage text-forest-green rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Aggregate Impact Statistics
              </h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                No verified beneficiary totals or audited impact ratios are published yet. Metrics
                will appear here once primary field logs and independent reviews are formally confirmed.
              </p>
              <Badge variant="warning">Awaiting Verified Field Data</Badge>
            </div>

            <div className="bg-surface-muted rounded-2xl border border-border p-8 space-y-5">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-forest-green" aria-hidden="true" />
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                  Statutory &amp; Governance Repository
                </h3>
              </div>
              <p className="text-sm text-secondary-text leading-relaxed">
                Signed registration certificates, 12A/80G documentation, and audited annual financial
                reports are not uploaded yet and therefore not listed as downloadable files.
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-white border border-border flex items-center justify-between gap-2">
                  <span className="font-medium text-main-text">Child Safeguarding Policy (Draft)</span>
                  <Link href="/safeguarding" className="text-forest-green font-semibold underline">
                    Read Draft Online
                  </Link>
                </div>
                <div className="p-3 rounded-lg bg-white border border-border flex items-center justify-between gap-2">
                  <span className="font-medium text-main-text">Audited Annual Financial Statements</span>
                  <Badge variant="warning">Pending Upload</Badge>
                </div>
                <div className="p-3 rounded-lg bg-white border border-border flex items-center justify-between gap-2">
                  <span className="font-medium text-main-text">Verified 12A / 80G / Registration Certificates</span>
                  <Badge variant="warning">Pending Verification</Badge>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Governance Commitments */}
        <Section background="ivory">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Governance Safeguards Built Into This Portal
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "Safeguarding Media Locks",
                  desc: "Identifiable photos of children stay unpublished in private review until documented consent is recorded.",
                },
                {
                  title: "Disabled Unverified Payments",
                  desc: "Live payment links and 80G tax-exemption promises remain disabled until official verification.",
                },
                {
                  title: "Enquiry & Audit Traceability",
                  desc: "Every administrative edit and status transition is logged for accountability oversight.",
                },
              ].map((g) => (
                <Card key={g.title} variant="bordered" padding="md">
                  <CheckCircle2 className="w-5 h-5 text-forest-green mb-2.5" aria-hidden="true" />
                  <h3 className="font-bold text-main-text text-base mb-1.5">{g.title}</h3>
                  <p className="text-xs text-secondary-text leading-relaxed">{g.desc}</p>
                </Card>
              ))}
            </div>
            <div>
              <Link href="/contact">
                <Button variant="outline" size="md">
                  Submit a Transparency or Verification Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
