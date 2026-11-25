import type { Metadata } from "next";
import Link from "next/link";
import { Shield, AlertTriangle, Users, BookOpen, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Child Safeguarding Policy",
  description:
    "BORN FOUNDATION's Child Safeguarding Policy commitment protecting children's safety, dignity, privacy, and image rights.",
  alternates: { canonical: "/safeguarding" },
};

export default function SafeguardingPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Child Safeguarding Policy"
          subtitle="Every child deserves to feel safe, respected, heard, and protected. Children's welfare comes before publicity or convenience."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Child Safeguarding Policy" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            {/* Explicit Operational Verification Boundary Notice */}
            <Card
              variant="bordered"
              padding="md"
              className="border-amber-400 bg-amber-50 mb-10"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-bold text-amber-950 mb-1">
                    Policy Draft — Pending Formal Board Adoption &amp; Safeguarding Lead Appointment
                  </h2>
                  <p className="text-amber-900 text-sm leading-relaxed">
                    This document sets out BORN FOUNDATION&apos;s safeguarding commitments and the
                    technical controls built into this website. Formal field operational procedures,
                    named Safeguarding Officers, and dedicated safeguarding email contacts will be
                    confirmed following executive adoption by the foundation&apos;s leadership.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-12">
              <article>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    1. Core Commitment
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    BORN FOUNDATION is committed to placing children&apos;s safety, dignity, privacy,
                    and best interests at the heart of every decision. Anyone participating in
                    foundation initiatives shares a duty to uphold respectful boundaries and protect
                    children from harm, abuse, neglect, or exploitation.
                  </p>
                  <p>
                    Children must never be treated as objects of pity or used merely to generate
                    attention, sympathy, or donations.
                  </p>
                </div>
              </article>

              <article>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    2. Eight Safeguarding Principles
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      title: "Children's Safety Comes First",
                      desc: "Decisions involving minors prioritise wellbeing and safety over institutional convenience or publicity.",
                    },
                    {
                      title: "Protection from Harm",
                      desc: "Zero tolerance for abuse, exploitation, harassment, neglect, or discriminatory treatment.",
                    },
                    {
                      title: "Dignity & Privacy",
                      desc: "No public directory or case histories of children are maintained or exposed online.",
                    },
                    {
                      title: "Responsible Photography & Media",
                      desc: "Identifiable children are never automatically published. Source images undergo EXIF stripping and consent verification.",
                    },
                    {
                      title: "Screened Conduct & Supervision",
                      desc: "No volunteer is granted direct unsupervised access to children prior to screening, vetting, and induction.",
                    },
                    {
                      title: "Safe Reporting & Response",
                      desc: "Safety concerns must receive immediate attention prioritised toward protecting the child.",
                    },
                    {
                      title: "Confidentiality & Minimal Collection",
                      desc: "Child-related personal records are never collected via open public web forms or stored unnecessarily.",
                    },
                    {
                      title: "Continuous Review",
                      desc: "Safeguarding controls undergo ongoing improvement alongside organisational growth and staff training.",
                    },
                  ].map((p) => (
                    <Card key={p.title} variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-1.5">{p.title}</h3>
                      <p className="text-sm text-secondary-text leading-relaxed">{p.desc}</p>
                    </Card>
                  ))}
                </div>
              </article>

              <article>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    3. Digital Media &amp; Portal Protections Already Enforced
                  </h2>
                </div>
                <ul className="list-disc list-inside space-y-2.5 text-secondary-text ml-2">
                  <li>
                    <strong>EXIF &amp; GPS Removal:</strong> Publicly displayed photographs are stripped
                    of embedded camera and location metadata prior to website deployment.
                  </li>
                  <li>
                    <strong>Private Archive Separation:</strong> Original supplied photographs showing
                    identifiable minors stay outside public folders in protected review status until
                    documented parental/guardian authorisation is confirmed.
                  </li>
                  <li>
                    <strong>No Public Minor Profiling:</strong> This application contains no public
                    directory of children, personal biographies, medical records, or home details.
                  </li>
                </ul>
              </article>

              <article>
                <Card
                  variant="bordered"
                  padding="lg"
                  className="border-forest-green/30 bg-soft-sage/25"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted-terracotta flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-main-text">
                      4. Reporting a Safeguarding Concern
                    </h2>
                  </div>
                  <div className="space-y-3 text-secondary-text leading-relaxed text-sm sm:text-base">
                    <p>{SITE_CONFIG.contact.safeguardingContactNotice}</p>
                    <p>
                      <strong>Telephone:</strong>{" "}
                      <a
                        href={SITE_CONFIG.contact.phoneHref}
                        className="text-forest-green font-bold underline"
                      >
                        {SITE_CONFIG.contact.phone}
                      </a>
                    </p>
                    <p>
                      <strong>Web Enquiry Channel:</strong>{" "}
                      <Link href="/contact" className="text-forest-green font-semibold underline">
                        Confidential Enquiry Form
                      </Link>{" "}
                      (please avoid entering sensitive identifying details of minors in web forms).
                    </p>
                  </div>
                </Card>
              </article>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
