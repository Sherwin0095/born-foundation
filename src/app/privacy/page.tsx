import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BORN FOUNDATION handles website enquiries, volunteer applications, local storage, and children's privacy protection.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Privacy Policy"
          subtitle="How personal information submitted through this website is handled, protected, and minimised."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
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
                    Draft Policy Document — Pending Organisational &amp; Legal Sign-off
                  </h2>
                  <p className="text-amber-900 text-sm leading-relaxed">
                    This privacy statement reflects how this application behaves in its current
                    offline-first and database-ready configuration and should be reviewed by qualified
                    legal counsel before formal public governance adoption.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-8 text-secondary-text leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-main-text mb-3">1. Information You Provide</h2>
                <ul className="list-disc list-inside space-y-2 ml-2 text-sm sm:text-base">
                  <li>
                    <strong>Contact Form Submissions:</strong> Name, email address, optional phone
                    number, subject, and message content submitted for response purposes.
                  </li>
                  <li>
                    <strong>Volunteer Expression of Interest:</strong> Contact info, locality, skill
                    summary, availability, motivation, and mandatory safeguarding acknowledgement.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-main-text mb-3">
                  2. Current Offline vs Live Persistence Behaviour
                </h2>
                <p className="text-sm sm:text-base">
                  During offline local preview mode (`NEXT_PUBLIC_OFFLINE_MODE=true`), form
                  submissions are validated on the server route and saved locally in your browser&apos;s
                  `localStorage` exclusively for interface demonstration. When connected to an
                  authorised Supabase PostgreSQL instance in live deployment, records persist in
                  Row-Level-Security-protected tables accessible only to authorised staff roles.
                </p>
              </section>

              <section>
                <Card
                  variant="bordered"
                  padding="lg"
                  className="border-forest-green/30 bg-soft-sage/25"
                >
                  <h2 className="text-xl font-bold text-main-text mb-3">3. Children&apos;s Privacy</h2>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    <li>We never collect personal profiles of minors on public web forms.</li>
                    <li>
                      Photographs containing identifiable children remain isolated outside public web
                      directories until documented guardian permission is approved.
                    </li>
                    <li>
                      Published non-identifying photographs are stripped of all camera EXIF and GPS metadata.
                    </li>
                  </ul>
                </Card>
              </section>

              <section>
                <h2 className="text-xl font-bold text-main-text mb-3">4. Tracking &amp; Third Parties</h2>
                <p className="text-sm sm:text-base">
                  This website uses zero third-party advertising trackers, behavioural analytics SDKs,
                  or third-party payment embeds in its current configuration, and never sells personal data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-main-text mb-3">5. Privacy Enquiries</h2>
                <p className="text-sm sm:text-base">
                  To ask about information handled by {SITE_CONFIG.name}, call{" "}
                  <a href={SITE_CONFIG.contact.phoneHref} className="text-forest-green font-semibold underline">
                    {SITE_CONFIG.contact.phone}
                  </a>{" "}
                  or reach us via the{" "}
                  <Link href="/contact" className="text-forest-green font-semibold underline">
                    Contact Us page
                  </Link>
                  . Official privacy email will be published once confirmed.
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
