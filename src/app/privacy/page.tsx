import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Born Foundation's privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your personal information."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            {/* Draft Notice */}
            <Card
              variant="bordered"
              padding="md"
              className="border-amber-400 bg-amber-50 mb-10"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="w-6 h-6 text-amber-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-bold text-amber-800 mb-1">
                    Draft Document — Legal Review Required
                  </h2>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    This privacy policy is a draft and has not yet been reviewed by
                    legal counsel. It is provided for informational purposes only and
                    should not be relied upon as a final legal document. A
                    professionally reviewed version will replace this draft.
                  </p>
                </div>
              </div>
            </Card>

            <p className="text-secondary-text mb-8 leading-relaxed">
              Born Foundation (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
              your privacy. This privacy policy explains how we collect, use, store,
              and protect your personal information when you interact with our
              website and services.
            </p>

            <div className="space-y-10">
              {/* Section 1 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  1. Information We Collect
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>We may collect the following types of information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Contact information:</strong> Name, email address, phone
                      number, and city when you submit a contact enquiry or volunteer
                      application.
                    </li>
                    <li>
                      <strong>Volunteer application details:</strong> Area of interest,
                      availability, experience, and motivation provided through our
                      volunteer application form.
                    </li>
                    <li>
                      <strong>Usage data:</strong> Information about how you use our
                      website, including pages visited, time spent, and referral
                      sources, collected through standard analytics.
                    </li>
                    <li>
                      <strong>Communication records:</strong> Records of correspondence
                      when you contact us via email or our contact form.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 2 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Respond to your enquiries and communicate with you about our
                      programmes and activities.
                    </li>
                    <li>
                      Process and manage volunteer applications.
                    </li>
                    <li>
                      Improve our website, programmes, and services.
                    </li>
                    <li>
                      Send you updates about our work, if you have opted in to receive
                      communications.
                    </li>
                    <li>
                      Comply with legal obligations and protect our legitimate
                      interests.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 3 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  3. Data Protection
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    We take appropriate technical and organisational measures to protect
                    your personal information against unauthorised access, alteration,
                    disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Secure storage of personal data with access limited to
                      authorised personnel.
                    </li>
                    <li>
                      Use of encryption for data transmission where appropriate.
                    </li>
                    <li>
                      Regular review of our data protection practices and procedures.
                    </li>
                    <li>
                      Staff training on data protection and confidentiality
                      obligations.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 4 — Children's Privacy */}
              <article>
                <Card
                  variant="bordered"
                  padding="lg"
                  className="border-forest-green/30 bg-soft-sage/20"
                >
                  <h2 className="text-xl font-bold text-main-text mb-4">
                    4. Children&apos;s Privacy
                  </h2>
                  <div className="space-y-3 text-secondary-text leading-relaxed">
                    <p>
                      As an organisation that works with children, we take children&apos;s
                      privacy extremely seriously. Our approach to children&apos;s data
                      includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        We do not knowingly collect personal information from children
                        through our website without appropriate parental or guardian
                        consent.
                      </li>
                      <li>
                        Any information about children involved in our programmes is
                        handled with the highest level of care and confidentiality.
                      </li>
                      <li>
                        We never publish identifying information about children without
                        proper authorisation and safeguarding review.
                      </li>
                      <li>
                        All photographs, stories, and case studies involving children
                        undergo a rigorous approval process that prioritises the
                        child&apos;s safety and dignity.
                      </li>
                      <li>
                        Access to children&apos;s data is strictly limited to authorised
                        personnel who require it for programme delivery.
                      </li>
                    </ul>
                    <p>
                      For more information about how we protect children, please see
                      our{" "}
                      <a
                        href="/safeguarding"
                        className="text-forest-green font-medium underline hover:no-underline"
                      >
                        Child Safeguarding Policy
                      </a>
                      .
                    </p>
                  </div>
                </Card>
              </article>

              {/* Section 5 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  5. Third Parties
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    We do not sell, trade, or rent your personal information to third
                    parties. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Service providers:</strong> Trusted third-party services
                      that help us operate our website and deliver our programmes (e.g.
                      hosting providers, email services). These providers are bound by
                      confidentiality obligations.
                    </li>
                    <li>
                      <strong>Legal requirements:</strong> When required to do so by
                      law, regulation, or legal process.
                    </li>
                    <li>
                      <strong>Partners:</strong> With your consent, we may share
                      relevant information with programme partners to coordinate
                      services.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 6 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  6. Your Rights
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    Depending on your jurisdiction, you may have the following rights
                    regarding your personal data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Access:</strong> The right to request a copy of the
                      personal information we hold about you.
                    </li>
                    <li>
                      <strong>Correction:</strong> The right to request correction of
                      inaccurate or incomplete data.
                    </li>
                    <li>
                      <strong>Deletion:</strong> The right to request deletion of your
                      personal data, subject to legal retention requirements.
                    </li>
                    <li>
                      <strong>Withdrawal of consent:</strong> The right to withdraw
                      consent for data processing where consent was the basis for
                      processing.
                    </li>
                    <li>
                      <strong>Complaint:</strong> The right to lodge a complaint with a
                      data protection authority.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 7 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  7. Contact Us
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    If you have any questions about this privacy policy, wish to
                    exercise your data rights, or have concerns about how your
                    information is handled, please contact us:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:info@bornfoundation.org"
                        className="text-forest-green font-medium underline hover:no-underline"
                      >
                        info@bornfoundation.org
                      </a>
                    </li>
                    <li>
                      <strong>Contact form:</strong>{" "}
                      <a
                        href="/contact"
                        className="text-forest-green font-medium underline hover:no-underline"
                      >
                        Visit our Contact page
                      </a>
                    </li>
                  </ul>
                  <p>
                    We aim to respond to all privacy-related enquiries within 30 days.
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-secondary-text">
                Last updated: This is a draft document and has not yet been finalised.
                The effective date will be set upon completion of legal review.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
