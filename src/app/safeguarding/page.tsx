import type { Metadata } from "next";
import { Shield, AlertTriangle, Users, BookOpen, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Child Safeguarding Policy",
  description:
    "Born Foundation's child safeguarding policy — our commitment to protecting every child from harm, abuse, and exploitation.",
};

export default function SafeguardingPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Child Safeguarding Policy"
          subtitle="The safety, protection, and wellbeing of every child is our highest priority. This policy outlines our commitment and approach to keeping children safe."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Child Safeguarding Policy" },
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
                    Draft Document — Professional Review Required
                  </h2>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    This safeguarding policy is a draft and is subject to review by
                    child protection professionals and legal counsel. It outlines our
                    intended approach to child safeguarding and will be updated as our
                    organisational practices are formalised.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-12">
              {/* Our Commitment */}
              <article>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    Our Commitment
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    Born Foundation is unequivocally committed to the safety and
                    protection of every child we work with. We recognise that children
                    are among the most vulnerable members of society, and that
                    organisations working with children have a profound responsibility
                    to ensure their safety.
                  </p>
                  <p>
                    We believe that every child has the right to be protected from
                    harm, abuse, neglect, and exploitation — regardless of their age,
                    gender, disability, ethnicity, religion, sexual orientation, or
                    social background. This right is fundamental to everything we do.
                  </p>
                  <p>
                    Our safeguarding commitment extends to all aspects of our work,
                    including our programmes, communications, fundraising activities,
                    and partnerships. We will not tolerate any form of abuse or
                    exploitation of children, and we will take all allegations and
                    concerns seriously.
                  </p>
                </div>
              </article>

              {/* Safeguarding Principles */}
              <article>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    Safeguarding Principles
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    Our safeguarding approach is guided by the following principles:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Best Interests of the Child
                      </h3>
                      <p className="text-sm text-secondary-text">
                        The welfare and best interests of the child are paramount in
                        all decisions and actions. When there is a conflict between the
                        interests of the organisation and the safety of a child, the
                        child&apos;s safety always comes first.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Zero Tolerance
                      </h3>
                      <p className="text-sm text-secondary-text">
                        We maintain a zero-tolerance approach to any form of child
                        abuse, exploitation, or neglect. This applies to all staff,
                        volunteers, partners, visitors, and anyone associated with Born
                        Foundation.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Do No Harm
                      </h3>
                      <p className="text-sm text-secondary-text">
                        All our activities, communications, and partnerships are
                        designed and delivered in ways that do not put children at risk.
                        We proactively assess and mitigate potential risks in all our
                        work.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Dignity and Respect
                      </h3>
                      <p className="text-sm text-secondary-text">
                        Every child is treated with dignity and respect. We listen to
                        children, value their views, and ensure they are treated as
                        individuals with their own rights and needs.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Accountability
                      </h3>
                      <p className="text-sm text-secondary-text">
                        We hold ourselves and everyone associated with our organisation
                        accountable for upholding safeguarding standards. Breaches are
                        taken seriously and addressed promptly.
                      </p>
                    </Card>
                    <Card variant="bordered" padding="md">
                      <h3 className="font-bold text-main-text mb-2">
                        Empowerment
                      </h3>
                      <p className="text-sm text-secondary-text">
                        We work to empower children and communities to recognise,
                        report, and respond to safeguarding concerns. Children are
                        supported to understand their rights and to speak up.
                      </p>
                    </Card>
                  </div>
                </div>
              </article>

              {/* Safeguarding Practices */}
              <article>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-main-text">
                    Our Safeguarding Practices
                  </h2>
                </div>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    To fulfil our safeguarding commitment, Born Foundation implements
                    the following practices:
                  </p>

                  <h3 className="text-lg font-bold text-main-text mt-6">
                    Recruitment and Vetting
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      All staff and volunteers who work with or have access to children
                      undergo thorough background checks and reference verification
                      before engagement.
                    </li>
                    <li>
                      Recruitment processes include specific assessment of candidates&apos;
                      suitability to work with children.
                    </li>
                    <li>
                      All staff and volunteers are required to sign and adhere to our
                      Code of Conduct.
                    </li>
                  </ul>

                  <h3 className="text-lg font-bold text-main-text mt-6">
                    Training and Awareness
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      All staff and volunteers receive mandatory safeguarding training
                      before beginning their roles.
                    </li>
                    <li>
                      Regular refresher training is provided to ensure awareness of
                      safeguarding responsibilities, emerging risks, and updated
                      procedures.
                    </li>
                    <li>
                      Training covers recognition of abuse indicators, appropriate
                      conduct with children, reporting procedures, and digital safety.
                    </li>
                  </ul>

                  <h3 className="text-lg font-bold text-main-text mt-6">
                    Safe Environments
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Programme activities are designed and delivered in environments
                      that minimise risk to children.
                    </li>
                    <li>
                      Adults are not permitted to be alone with a child in a closed or
                      unsupervised setting.
                    </li>
                    <li>
                      Regular risk assessments are conducted for all programme
                      locations and activities.
                    </li>
                  </ul>

                  <h3 className="text-lg font-bold text-main-text mt-6">
                    Digital and Communication Safety
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      All photographs, videos, and stories involving children are
                      subject to strict guidelines that protect children&apos;s identities
                      and dignity.
                    </li>
                    <li>
                      We do not publish identifying information about children without
                      proper authorisation.
                    </li>
                    <li>
                      Digital communications with or about children follow established
                      safeguarding protocols.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Reporting */}
              <article>
                <Card
                  variant="bordered"
                  padding="lg"
                  className="border-forest-green/30 bg-soft-sage/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-muted-terracotta flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-main-text">
                      Reporting Concerns
                    </h2>
                  </div>
                  <div className="space-y-4 text-secondary-text leading-relaxed">
                    <p>
                      Anyone who has a concern about the safety or wellbeing of a child
                      involved in Born Foundation&apos;s programmes — or who witnesses or
                      suspects any form of abuse, neglect, or exploitation — has a
                      duty to report it immediately.
                    </p>
                    <p>
                      <strong className="text-main-text">
                        How to report a safeguarding concern:
                      </strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>Immediately:</strong> If a child is in immediate danger,
                        contact local emergency services first.
                      </li>
                      <li>
                        <strong>Internal reporting:</strong> Report concerns to Born
                        Foundation&apos;s designated Safeguarding Lead via email at{" "}
                        <a
                          href="mailto:info@bornfoundation.org"
                          className="text-forest-green font-medium underline hover:no-underline"
                        >
                          info@bornfoundation.org
                        </a>
                        . A dedicated safeguarding email will be established as our
                        procedures are formalised.
                      </li>
                      <li>
                        <strong>Confidentiality:</strong> All reports are treated with
                        the utmost confidentiality. Information is shared only on a
                        need-to-know basis to ensure the child&apos;s safety.
                      </li>
                      <li>
                        <strong>No retaliation:</strong> Born Foundation will not
                        tolerate retaliation against anyone who reports a safeguarding
                        concern in good faith.
                      </li>
                    </ul>
                    <p>
                      All reported concerns are investigated promptly and thoroughly.
                      Where appropriate, concerns are referred to relevant authorities.
                    </p>
                  </div>
                </Card>
              </article>

              {/* Staff and Volunteer Responsibilities */}
              <article>
                <h2 className="text-2xl font-bold text-main-text mb-6">
                  Staff and Volunteer Responsibilities
                </h2>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    Every member of Born Foundation — whether staff, volunteer,
                    trustee, or partner — has a personal responsibility to safeguard
                    children. This means:
                  </p>
                  <ul className="list-disc list-inside space-y-3 ml-4">
                    <li>
                      <strong>Understanding the policy:</strong> All personnel must
                      read, understand, and commit to this safeguarding policy and the
                      associated Code of Conduct.
                    </li>
                    <li>
                      <strong>Recognising concerns:</strong> Being alert to signs that
                      a child may be at risk of harm, including physical, emotional, or
                      sexual abuse, neglect, bullying, or exploitation.
                    </li>
                    <li>
                      <strong>Reporting promptly:</strong> Reporting any concerns,
                      suspicions, or allegations without delay, following the reporting
                      procedures outlined in this policy.
                    </li>
                    <li>
                      <strong>Maintaining boundaries:</strong> Behaving appropriately
                      and maintaining professional boundaries in all interactions with
                      children. Physical contact should be minimal, appropriate, and in
                      the open.
                    </li>
                    <li>
                      <strong>Protecting privacy:</strong> Respecting children&apos;s
                      privacy and not sharing personal information, photographs, or
                      stories without proper authorisation.
                    </li>
                    <li>
                      <strong>Ongoing learning:</strong> Participating in all required
                      safeguarding training and staying informed about best practices
                      in child protection.
                    </li>
                    <li>
                      <strong>Leading by example:</strong> Modelling respectful,
                      caring, and responsible behaviour in all interactions with
                      children, colleagues, and communities.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Review and Updates */}
              <article>
                <h2 className="text-2xl font-bold text-main-text mb-4">
                  Policy Review
                </h2>
                <div className="space-y-4 text-secondary-text leading-relaxed">
                  <p>
                    This safeguarding policy is a living document. It will be reviewed
                    and updated regularly — at minimum annually — to ensure it remains
                    effective, current, and aligned with best practices in child
                    protection. Reviews will consider:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Changes in legislation and regulatory requirements.
                    </li>
                    <li>
                      Lessons learned from safeguarding incidents or near-misses.
                    </li>
                    <li>
                      Feedback from staff, volunteers, and the communities we serve.
                    </li>
                    <li>
                      Evolving best practices and guidance from child protection
                      organisations.
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-secondary-text">
                Last updated: This is a draft document and is subject to professional
                review. The effective date will be set upon completion of that review.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
