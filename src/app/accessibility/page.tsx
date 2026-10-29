import type { Metadata } from "next";
import { Accessibility, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Born Foundation's commitment to making our website accessible to everyone, including people with disabilities.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Accessibility Statement"
          subtitle="We are committed to making our website accessible and usable for everyone, regardless of ability or technology."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Accessibility" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Our Commitment */}
              <article>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    Our Commitment
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    Born Foundation is committed to ensuring that our website is
                    accessible to the widest possible audience, including people with
                    disabilities. We believe that everyone should be able to access
                    information about our work, programmes, and how to get involved.
                  </p>
                  <p>
                    We aim to conform to the{" "}
                    <strong>
                      Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
                    </strong>{" "}
                    standards. These guidelines explain how to make web content more
                    accessible for people with disabilities, and more user-friendly for
                    everyone.
                  </p>
                </div>
              </article>

              {/* Accessibility Features */}
              <article>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    Accessibility Features
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    We have implemented the following features to improve
                    accessibility on our website:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Keyboard Navigation
                      </h3>
                      <p className="text-sm text-secondary-text">
                        All interactive elements on our website can be accessed and
                        operated using a keyboard alone. A &quot;Skip to main content&quot; link
                        is provided at the top of every page.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Semantic HTML
                      </h3>
                      <p className="text-sm text-secondary-text">
                        We use proper semantic HTML elements (headings, landmarks,
                        lists, navigation) to ensure our content is well-structured and
                        can be interpreted correctly by assistive technologies.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Text Alternatives
                      </h3>
                      <p className="text-sm text-secondary-text">
                        Images include descriptive alternative text. Decorative images
                        are marked so screen readers can skip them. Icons include
                        appropriate ARIA labels.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Colour and Contrast
                      </h3>
                      <p className="text-sm text-secondary-text">
                        We have designed our colour palette to meet WCAG contrast ratio
                        requirements. Information is never conveyed by colour alone —
                        text labels and icons provide additional context.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Responsive Design
                      </h3>
                      <p className="text-sm text-secondary-text">
                        Our website is fully responsive and works across different
                        devices and screen sizes. Content reflows properly when zoomed
                        up to 200% without horizontal scrolling.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Focus Indicators
                      </h3>
                      <p className="text-sm text-secondary-text">
                        Visible focus indicators are provided for all interactive
                        elements so keyboard users can easily identify which element is
                        currently focused.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Form Accessibility
                      </h3>
                      <p className="text-sm text-secondary-text">
                        All form fields have associated labels. Required fields are
                        clearly indicated. Error messages are descriptive and
                        associated with their respective fields using ARIA attributes.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Reduced Motion
                      </h3>
                      <p className="text-sm text-secondary-text">
                        We respect the &quot;prefers-reduced-motion&quot; media query. If you
                        have configured your system to reduce motion, animations and
                        transitions on our site will be minimised.
                      </p>
                    </Card>
                  </div>
                </div>
              </article>

              {/* Known Limitations */}
              <article>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-warm-gold flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    Known Limitations
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    While we strive for full accessibility, we acknowledge there may
                    be areas where our website does not yet meet all WCAG 2.2 AA
                    criteria. Known limitations include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Some older content may not yet have been updated to meet current
                      accessibility standards.
                    </li>
                    <li>
                      Third-party content or embedded services may not fully conform to
                      our accessibility standards.
                    </li>
                    <li>
                      Some complex interactive components may have limited support for
                      certain assistive technology configurations.
                    </li>
                  </ul>
                  <p>
                    We are actively working to identify and resolve these issues. As we
                    add new content and features, accessibility is considered from the
                    outset.
                  </p>
                </div>
              </article>

              {/* Feedback */}
              <article>
                <Card
                  variant="bordered"
                  padding="lg"
                  className="border-forest-green/30 bg-soft-sage/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-main-text">
                      Feedback and Contact
                    </h2>
                  </div>
                  <div className="space-y-4 text-secondary-text leading-relaxed">
                    <p>
                      We welcome your feedback on the accessibility of our website. If
                      you encounter any barriers or have suggestions for how we can
                      improve, please let us know:
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
                      When reporting an accessibility issue, please include as much
                      detail as possible — such as the page URL, the device and browser
                      you are using, and a description of the issue you encountered.
                      This helps us investigate and address the problem more
                      effectively.
                    </p>
                    <p>
                      We aim to respond to accessibility feedback within 5 working days
                      and will work to resolve reported issues as quickly as possible.
                    </p>
                  </div>
                </Card>
              </article>

              {/* Standards and Testing */}
              <article>
                <h2 className="text-2xl font-bold text-main-text mb-4">
                  Standards and Testing
                </h2>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    This website has been built with accessibility in mind, following
                    the principles of WCAG 2.2:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Perceivable:</strong> Information and user interface
                      components are presentable in ways that users can perceive.
                    </li>
                    <li>
                      <strong>Operable:</strong> User interface components and
                      navigation are operable by all users.
                    </li>
                    <li>
                      <strong>Understandable:</strong> Information and the operation of
                      the user interface are understandable.
                    </li>
                    <li>
                      <strong>Robust:</strong> Content is robust enough to be
                      interpreted reliably by a wide variety of user agents, including
                      assistive technologies.
                    </li>
                  </ul>
                  <p>
                    We regularly test our website using a combination of automated
                    tools and manual testing with assistive technologies to identify
                    and fix accessibility issues.
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-secondary-text">
                This accessibility statement was last reviewed and updated as part of
                our ongoing commitment to inclusive web design.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
