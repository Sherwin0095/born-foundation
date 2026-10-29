import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms and conditions for using the Born Foundation website.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Terms of Use"
          subtitle="Please read these terms carefully before using the Born Foundation website."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Terms of Use" },
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
                    These terms of use are a draft and have not yet been reviewed by
                    legal counsel. They are provided for informational purposes only
                    and should not be relied upon as a final legal document. A
                    professionally reviewed version will replace this draft.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-10">
              {/* Section 1 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    By accessing and using the Born Foundation website
                    (&quot;the Site&quot;), you agree to be bound by these Terms of Use. If
                    you do not agree to these terms, please do not use the Site.
                  </p>
                  <p>
                    Born Foundation reserves the right to modify these terms at any
                    time. Continued use of the Site after changes are posted
                    constitutes acceptance of the modified terms.
                  </p>
                </div>
              </article>

              {/* Section 2 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  2. Use of the Website
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    The Site is provided for informational purposes about Born
                    Foundation&apos;s activities, programmes, and how to get involved. You
                    agree to use the Site only for lawful purposes and in accordance
                    with these terms.
                  </p>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Use the Site in any way that violates applicable local, national,
                      or international law or regulation.
                    </li>
                    <li>
                      Attempt to gain unauthorised access to any part of the Site, its
                      servers, or any systems connected to the Site.
                    </li>
                    <li>
                      Use the Site to transmit any unsolicited or unauthorised
                      advertising, promotional materials, or spam.
                    </li>
                    <li>
                      Engage in any conduct that restricts or inhibits anyone&apos;s use or
                      enjoyment of the Site.
                    </li>
                    <li>
                      Misrepresent your identity or affiliation with Born Foundation.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 3 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  3. Intellectual Property
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    All content on the Site, including but not limited to text,
                    graphics, logos, images, and software, is the property of Born
                    Foundation or its content suppliers and is protected by applicable
                    intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative works
                    of, publicly display, or otherwise use any content from the Site
                    without prior written permission from Born Foundation, except for
                    personal, non-commercial use.
                  </p>
                </div>
              </article>

              {/* Section 4 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  4. User Submissions
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    When you submit information through the Site (such as contact
                    enquiries or volunteer applications), you agree that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      The information you provide is accurate, complete, and up to
                      date.
                    </li>
                    <li>
                      You will not submit any content that is unlawful, defamatory,
                      harmful, or otherwise objectionable.
                    </li>
                    <li>
                      Born Foundation may use the information you submit in accordance
                      with our{" "}
                      <a
                        href="/privacy"
                        className="text-forest-green font-medium underline hover:no-underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </article>

              {/* Section 5 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  5. Disclaimer of Warranties
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    The Site and its content are provided on an &quot;as is&quot; and &quot;as
                    available&quot; basis. Born Foundation makes no representations or
                    warranties of any kind, express or implied, regarding the
                    operation of the Site, the accuracy or completeness of its
                    content, or the reliability of any information provided.
                  </p>
                  <p>
                    To the fullest extent permitted by applicable law, Born Foundation
                    disclaims all warranties, express or implied, including but not
                    limited to implied warranties of merchantability, fitness for a
                    particular purpose, and non-infringement.
                  </p>
                </div>
              </article>

              {/* Section 6 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  6. Limitation of Liability
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    Born Foundation shall not be liable for any direct, indirect,
                    incidental, special, consequential, or punitive damages arising
                    out of or related to your use of, or inability to use, the Site
                    or its content.
                  </p>
                  <p>
                    This limitation applies regardless of whether the damages are
                    based on warranty, contract, tort, negligence, strict liability,
                    or any other legal theory, and whether or not Born Foundation has
                    been advised of the possibility of such damages.
                  </p>
                </div>
              </article>

              {/* Section 7 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  7. External Links
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    The Site may contain links to third-party websites. These links
                    are provided for convenience only and do not imply endorsement by
                    Born Foundation. We have no control over the content or practices
                    of third-party sites and are not responsible for their privacy
                    policies or terms of use.
                  </p>
                </div>
              </article>

              {/* Section 8 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  8. Governing Law
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    These terms shall be governed by and construed in accordance with
                    the laws of India. Any disputes arising from or in connection with
                    these terms shall be subject to the exclusive jurisdiction of the
                    courts in India.
                  </p>
                </div>
              </article>

              {/* Section 9 */}
              <article>
                <h2 className="text-xl font-bold text-main-text mb-4">
                  9. Contact Information
                </h2>
                <div className="space-y-3 text-secondary-text leading-relaxed">
                  <p>
                    If you have questions about these Terms of Use, please contact us:
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
