import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "BORN FOUNDATION's commitment toward accessible web design aligned with WCAG 2.2 Level AA principles.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Accessibility Statement"
          subtitle="Designed for keyboard usability, clear contrast, readable typography, and inclusive access across devices."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Accessibility" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto space-y-10">
            <article>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                  <Accessibility className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold text-main-text">Commitment &amp; Target Standard</h2>
              </div>
              <p className="text-secondary-text leading-relaxed">
                BORN FOUNDATION aims toward conformance with{" "}
                <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong> across
                desktop and mobile viewports (320px to 1920px). We continually refine keyboard focus
                handling, form error messaging, contrast ratios, and screen-reader semantics.
              </p>
            </article>

            <article>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold text-main-text">Implemented Accessibility Measures</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Skip Link & Landmarks",
                    desc: "A 'Skip to main content' link precedes navigation, paired with semantic header, main, nav, and footer landmarks.",
                  },
                  {
                    title: "Keyboard Lightbox & Drawers",
                    desc: "Mobile menu drawers and the Photo Gallery lightbox support Escape closure and ArrowLeft/ArrowRight navigation.",
                  },
                  {
                    title: "Visible Focus Indicators",
                    desc: "High-visibility 2px focus outlines appear cleanly on interactive controls across light and dark backgrounds.",
                  },
                  {
                    title: "Reduced Motion Support",
                    desc: "Respects prefers-reduced-motion media queries to suppress smooth scroll and CSS transition durations.",
                  },
                ].map((f) => (
                  <Card key={f.title} variant="bordered" padding="md">
                    <h3 className="font-bold text-main-text mb-1.5">{f.title}</h3>
                    <p className="text-sm text-secondary-text leading-relaxed">{f.desc}</p>
                  </Card>
                ))}
              </div>
            </article>

            <article>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-warm-gold flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-main-text" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold text-main-text">Continuous Testing Limitation Note</h2>
              </div>
              <p className="text-secondary-text leading-relaxed text-sm sm:text-base">
                Automated audits check programmatic structure and contrast, yet cannot replace lived
                testing with assistive screen readers. If any page element presents a barrier, please
                let us know so we can remediate it promptly.
              </p>
            </article>

            <Card
              variant="bordered"
              padding="lg"
              className="border-forest-green/30 bg-soft-sage/25 space-y-3"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-forest-green" aria-hidden="true" />
                <h2 className="text-xl font-bold text-main-text">Accessibility Feedback</h2>
              </div>
              <p className="text-sm sm:text-base text-secondary-text">
                Call us at{" "}
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="text-forest-green font-semibold underline"
                >
                  {SITE_CONFIG.contact.phone}
                </a>{" "}
                or write via our{" "}
                <Link href="/contact" className="text-forest-green font-semibold underline">
                  Contact Us page
                </Link>{" "}
                and include the page URL and browser or assistive tool used.
              </p>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
