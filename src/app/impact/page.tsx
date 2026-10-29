import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Shield,
  Eye,
  CheckCircle2,
  Calendar,
  Download,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Impact & Transparency",
  description:
    "Explore Born Foundation's commitment to accountability, verified metrics, governance disclosures, and published reports.",
};

export default function ImpactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Impact & Transparency"
          subtitle="Honest reporting, verified metrics, and uncompromised stewardship in all that we do."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Impact & Transparency" },
          ]}
        />

        {/* Commitment to Truth */}
        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-forest-green mb-3">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Ethical Standard
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-6">
              Our Zero-Fabrication Transparency Policy
            </h2>
            <div className="prose text-secondary-text space-y-4 leading-relaxed">
              <p>
                In an era where developmental metrics are often inflated or presented without
                third-party verification, Born Foundation operates on strict disclosure principles.
                We never estimate speculative impact or project unverified claims.
              </p>
              <p>
                Every metric, rupee allocated, and operational outcome reported on this platform
                undergoes programmatic auditing and supervisory approval before public disclosure.
              </p>
            </div>
          </div>
        </Section>

        {/* Impact Metrics Section */}
        <Section background="sage">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Verified Aggregate Metrics
              </h3>
              <p className="text-secondary-text mt-2">
                Operational data for ongoing verification cycles.
              </p>
            </div>

            {/* Transparent Status Notice */}
            <div className="bg-white rounded-xl border border-border p-8 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-14 h-14 bg-soft-sage text-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-semibold text-main-text mb-2">
                Audited Operational Cycle in Progress
              </h4>
              <p className="text-secondary-text text-sm leading-relaxed mb-6">
                Born Foundation is currently compiling and auditing its inaugural programmatic
                dataset across active educational and nutrition initiatives. Independent verification
                ensures that data published here is 100% accurate and verifiable.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft-sage text-forest-green text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                First comprehensive public audit report scheduled for release at cycle completion
              </div>
            </div>
          </div>
        </Section>

        {/* Public Reports Repository */}
        <Section background="white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <p className="text-muted-terracotta text-sm uppercase tracking-wider font-semibold">
                  Publications
                </p>
                <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-1">
                  Annual & Statutory Reports
                </h3>
              </div>
              <p className="text-sm text-secondary-text max-w-md">
                Formal filings, programmatic assessments, and financial statements made available for public scrutiny.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Annual Governance & Programmatic Charter (2025–2026)",
                  type: "Governance Document",
                  date: "Published: Oct 2025",
                  status: "Available for Download",
                  size: "Draft Release v1.0",
                },
                {
                  title: "Child Safeguarding Compliance & Practice Protocol",
                  type: "Policy Directive",
                  date: "Updated: Jan 2026",
                  status: "Available for Download",
                  size: "Active Compliance Document",
                },
                {
                  title: "First Operational Cycle Financial Audit Statement",
                  type: "Statutory Filing",
                  date: "Scheduled release",
                  status: "Pending Independent Audit Completion",
                  size: "Awaiting Auditor Sign-off",
                },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border hover:border-forest-green transition-colors rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-main-text">{doc.title}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-secondary-text mt-1">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span className="font-medium text-forest-green">{doc.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Badge variant={doc.status.includes("Pending") ? "warning" : "success"}>
                      {doc.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Governance & Anti-Fraud Standards */}
        <Section background="ivory">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-6 text-center">
              Our Governance Pillars
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <Card variant="bordered" padding="md">
                <CheckCircle2 className="w-6 h-6 text-forest-green mb-3" />
                <h4 className="font-semibold text-main-text mb-2">Dual-Key Approvals</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  No expenditure or major programme alteration is authorized by a single individual.
                </p>
              </Card>
              <Card variant="bordered" padding="md">
                <Shield className="w-6 h-6 text-forest-green mb-3" />
                <h4 className="font-semibold text-main-text mb-2">Safeguarding Audits</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Routine background evaluations and compliance audits across all field centers.
                </p>
              </Card>
              <Card variant="bordered" padding="md">
                <Eye className="w-6 h-6 text-forest-green mb-3" />
                <h4 className="font-semibold text-main-text mb-2">Public Inquiries</h4>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Dedicated channels for questions regarding fund allocation and programme operations.
                </p>
              </Card>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
