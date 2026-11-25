import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use governing responsible access to the BORN FOUNDATION website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Terms of Use"
          subtitle="Guidelines for lawful, respectful use of the BORN FOUNDATION website and its published information."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Terms of Use" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card variant="bordered" padding="md" className="border-amber-400 bg-amber-50">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-bold text-amber-950 mb-1">
                    Draft Terms — Pending Legal Review
                  </h2>
                  <p className="text-amber-900 text-sm leading-relaxed">
                    These draft Terms of Use govern use of the informational website and await formal
                    review by BORN FOUNDATION&apos;s governing trustees and legal counsel.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-8 text-secondary-text leading-relaxed text-sm sm:text-base">
              <section>
                <h2 className="text-xl font-bold text-main-text mb-2">1. Informational Purpose</h2>
                <p>
                  This website presents public information about BORN FOUNDATION&apos;s focus areas in
                  children&apos;s welfare and women &amp; child development. Supplied registry and compliance
                  entries awaiting external verification are explicitly labelled as unverified.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-main-text mb-2">2. Acceptable Conduct</h2>
                <p>
                  Users must not attempt unauthorised access to private administration routes, scrape
                  data abusively, submit automated spam, misrepresent identity or affiliation with BORN
                  FOUNDATION, or reuse gallery imagery for commercial or misleading purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-main-text mb-2">3. Media &amp; Copyright</h2>
                <p>
                  Community photographs and textual materials presented here remain the property of{" "}
                  {SITE_CONFIG.name} or authorised contributors. Redistribution of photographs
                  depicting community participants without explicit permission is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-main-text mb-2">4. Jurisdiction &amp; Contact</h2>
                <p>
                  These terms are governed by the laws of India (Bengaluru, Karnataka jurisdiction).
                  Questions can be directed to{" "}
                  <a href={SITE_CONFIG.contact.phoneHref} className="text-forest-green font-semibold underline">
                    {SITE_CONFIG.contact.phone}
                  </a>{" "}
                  or our{" "}
                  <Link href="/contact" className="text-forest-green font-semibold underline">
                    Contact form
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
