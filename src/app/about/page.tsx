import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Heart,
  Eye,
  Users,
  BookOpen,
  HandHeart,
  Target,
  Lightbulb,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Born Foundation — our mission, vision, values, and commitment to caring for every child's tomorrow.",
};

const coreValues = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We approach every child, family, and community with genuine care and empathy. Compassion drives everything we do — from programme design to daily interactions.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We hold ourselves to the highest ethical standards. We are honest about what we know, what we don't know, and where we are on our journey as an organisation.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe in open communication with our supporters, partners, and the communities we serve. We share our progress, challenges, and finances openly.",
  },
  {
    icon: Users,
    title: "Empowerment",
    description:
      "We work alongside communities, not above them. Our goal is to build capacity and self-reliance so that the positive changes we help create are lasting and sustainable.",
  },
  {
    icon: Shield,
    title: "Safeguarding",
    description:
      "The safety and protection of children is non-negotiable. Every decision we make, every programme we design, prioritises the wellbeing and dignity of the children we serve.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="About Born Foundation"
          subtitle="We are a non-profit organisation dedicated to the care, wellbeing, development, and support of children who need assistance. Every child deserves a chance to thrive."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
        />

        {/* Introduction */}
        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-forest-green" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-main-text">
                Who We Are
              </h2>
            </div>
            <div className="space-y-4 text-secondary-text leading-relaxed text-lg">
              <p>
                Born Foundation was established with a simple but powerful belief: that
                every child, regardless of their circumstances, deserves access to
                education, nutrition, care, and the opportunity to develop their full
                potential.
              </p>
              <p>
                We work in communities across India where children face significant
                challenges — limited access to quality education, inadequate nutrition,
                lack of safe spaces, and few opportunities to develop essential life
                skills. Through our programmes, we aim to address these challenges
                holistically, recognising that a child&apos;s wellbeing depends on many
                interconnected factors.
              </p>
              <p>
                We are a growing organisation, learning and adapting as we go. We are
                committed to being honest about our progress, transparent about our
                operations, and accountable to the communities we serve.
              </p>
            </div>
          </div>
        </Section>

        {/* Mission */}
        <Section background="sage">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-main-text">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-secondary-text leading-relaxed">
                To provide holistic support to children in need through community-based
                programmes that address education, nutrition, care, skills development,
                and family empowerment — creating lasting change that helps every child
                reach their full potential.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-main-text">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-secondary-text leading-relaxed">
                A world where every child is safe, nourished, educated, and empowered to
                build a future of their choosing — supported by strong, caring
                communities that uplift and protect them.
              </p>
            </div>
          </div>
        </Section>

        {/* Core Values */}
        <Section background="white">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-main-text mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-secondary-text max-w-2xl mx-auto">
              These values guide every decision we make, every programme we design,
              and every interaction we have with the children, families, and
              communities we serve.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} variant="elevated" padding="lg">
                  <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-forest-green" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-main-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-secondary-text leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* History and Background */}
        <Section background="ivory">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-forest-green" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-main-text">
                Our Story
              </h2>
            </div>
            <div className="space-y-4 text-secondary-text leading-relaxed text-lg">
              <p>
                Born Foundation grew from a deep conviction that the circumstances a
                child is born into should not determine the course of their life. Our
                founders witnessed firsthand the challenges faced by children in
                underserved communities — children who were bright, curious, and full of
                potential, but lacked the resources and support they needed to thrive.
              </p>
              <p>
                What began as informal community outreach — helping local children with
                homework, providing meals, and offering a safe place to play — gradually
                evolved into a more structured effort. As the needs became clearer and
                the desire to help grew stronger, Born Foundation was established as a
                formal organisation.
              </p>
              <p>
                Today, we work through five interconnected programme areas: education and
                learning, nutrition and essential needs, care and wellbeing, skills and
                development, and community support. Each programme is designed to address
                a specific aspect of a child&apos;s needs while recognising that true
                wellbeing requires a holistic approach.
              </p>
              <p>
                We are still early in our journey. We are building our team, refining our
                programmes, and establishing the systems and practices that will allow us
                to grow responsibly. We are committed to learning from our experiences,
                listening to the communities we serve, and continuously improving our
                work.
              </p>
            </div>
          </div>
        </Section>

        {/* Safeguarding Commitment */}
        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <Card variant="bordered" padding="lg" className="border-forest-green/30 bg-soft-sage/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-main-text">
                  Our Safeguarding Commitment
                </h2>
              </div>
              <div className="space-y-4 text-secondary-text leading-relaxed text-lg">
                <p>
                  The safety and protection of every child is at the heart of everything
                  we do. Born Foundation is committed to creating environments where
                  children are safe from harm, abuse, exploitation, and neglect.
                </p>
                <p>
                  We maintain rigorous safeguarding policies and practices that apply to
                  all staff, volunteers, partners, and anyone who comes into contact with
                  children through our programmes. This includes background checks,
                  comprehensive training, clear codes of conduct, and robust reporting
                  mechanisms.
                </p>
                <p>
                  We believe that safeguarding is not just a policy — it is a culture. We
                  continuously work to strengthen our safeguarding practices and ensure
                  that every child in our care is treated with dignity, respect, and
                  compassion.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/safeguarding">
                  <Button variant="primary" size="md">
                    <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
                    Read Our Full Safeguarding Policy
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </Section>

        {/* CTA */}
        <Section background="green">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Have questions about Born Foundation? Want to learn more about our
              work, explore partnership opportunities, or find out how you can get
              involved? We&apos;d love to hear from you.
            </p>
            <Link href="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-forest-green hover:bg-warm-ivory"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
