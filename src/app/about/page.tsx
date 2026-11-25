import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Shield,
  Users,
  BookOpen,
  HandHeart,
  Sparkles,
  Scale,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  GraduationCap,
  FileText,
  Mail,
  Camera,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button, Badge } from "@/components/ui";
import { APPROVED_PUBLIC_GALLERY } from "@/lib/media-register";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us — Caring for Every Child's Tomorrow",
  description:
    "Learn about BORN FOUNDATION — supporting underprivileged children's welfare alongside women and child development in Bengaluru, guided by safety, dignity, and transparency.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Page Hero */}
        <PageHero
          title="About BORN FOUNDATION"
          subtitle="Caring for Every Child's Tomorrow • Dedicated to the care, wellbeing, development, and support of children who need assistance."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
        />

        {/* ═══ 1. ABOUT BORN FOUNDATION ═══ */}
        <Section background="white" padding="lg">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-soft-sage">
                Our Purpose & Identity
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-4 mb-6 leading-tight">
                Every child deserves the opportunity to learn, grow, feel safe and build a brighter future.
              </h2>
              <p className="text-xl sm:text-2xl font-semibold text-muted-terracotta font-[family-name:var(--font-heading)] mb-6">
                A child&apos;s circumstances should never determine the limits of their dreams.
              </p>
            </div>

            <div className="prose prose-lg text-secondary-text space-y-5 text-base sm:text-lg leading-relaxed">
              <p>
                <strong>BORN FOUNDATION</strong> is dedicated to supporting children from underprivileged
                and underserved backgrounds by promoting access to essential needs, education, care,
                personal development, and opportunities for a better future, alongside encouraging the
                wellbeing and empowerment of women and child development across Bengaluru communities.
              </p>
              <p>
                We believe that every child has inherent worth, unique abilities, and the potential
                to achieve meaningful things in life. Yet, for many children, financial hardship, limited
                access to educational resources, and challenging circumstances can create barriers to their
                growth and development.
              </p>
              <p>
                Our purpose is to help address these barriers through compassionate support, community
                participation, and a commitment to children&apos;s wellbeing.
              </p>
              <p>
                We believe that meaningful change begins when children are given the opportunity to be heard,
                supported, protected, and encouraged to discover their potential.
              </p>
              <p>
                At BORN FOUNDATION, we see children not through the difficulties they face, but through the
                possibilities their future holds.
              </p>
            </div>

            {/* Commitment Highlight Callout */}
            <div className="p-8 sm:p-10 rounded-3xl bg-forest-green text-white shadow-md">
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-warm-gold shrink-0 mt-1 fill-warm-gold/20" aria-hidden="true" />
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-heading)] text-white">
                    Our Unwavering Commitment
                  </h3>
                  <p className="text-white/95 text-base sm:text-lg leading-relaxed font-medium">
                    Every child matters, every opportunity counts, and every effort toward a brighter future has value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 2 & 3. OUR MISSION & OUR VISION ═══ */}
        <Section background="sage" padding="lg">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Mission Card */}
              <Card variant="default" padding="lg" className="bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-forest-green text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Heart className="w-7 h-7 fill-white/20" aria-hidden="true" />
                  </div>
                  <Badge variant="default" className="mb-3 text-xs">
                    Mission Statement
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-4">
                    Our Mission
                  </h3>
                  <p className="text-lg font-bold text-forest-green mb-4 leading-snug">
                    To empower underprivileged children with the care, education, support and opportunities they need to grow with dignity, confidence and hope.
                  </p>
                  <p className="text-secondary-text text-sm sm:text-base leading-relaxed mb-6">
                    Our mission is to work towards a future where children from disadvantaged backgrounds can access essential resources, develop their abilities, and pursue their aspirations without being limited by their circumstances.
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-border">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-main-text">
                      Initiatives Focused On:
                    </h4>
                    <ul className="text-xs sm:text-sm text-secondary-text space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                        <span><strong>Education:</strong> Encouraging learning and improving access to resources and opportunities.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                        <span><strong>Essential needs:</strong> Supporting access to basic necessities that contribute to children&apos;s wellbeing.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                        <span><strong>Care and protection:</strong> Promoting environments where children are respected and protected.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                        <span><strong>Personal development:</strong> Encouraging confidence, creativity, life skills, and potential.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                        <span><strong>Community participation:</strong> Strengthening support networks involving adults and partners.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border text-xs text-secondary-text italic">
                  Not simply addressing immediate needs, but helping children build secure, independent futures.
                </div>
              </Card>

              {/* Vision Card */}
              <Card variant="default" padding="lg" className="bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-muted-terracotta text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Sparkles className="w-7 h-7 fill-white/20" aria-hidden="true" />
                  </div>
                  <Badge variant="warning" className="mb-3 text-xs">
                    Vision Statement
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-4">
                    Our Vision
                  </h3>
                  <p className="text-lg font-bold text-muted-terracotta mb-4 leading-snug">
                    A world where every child, regardless of their background or circumstances, has the opportunity to live safely, learn freely and realise their full potential.
                  </p>
                  <p className="text-secondary-text text-sm sm:text-base leading-relaxed mb-6">
                    We envision communities where no child is overlooked because of poverty, social disadvantage, or a lack of opportunity. We aspire to a future where children can access education, receive appropriate care, develop their talents, express their thoughts, and grow into confident individuals who contribute positively to society.
                  </p>
                  <p className="text-secondary-text text-sm sm:text-base leading-relaxed">
                    Our vision extends beyond meeting today&apos;s needs. It is about helping create lasting opportunities, strengthening communities, and encouraging a culture in which children&apos;s rights, dignity, and wellbeing are valued.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border text-xs text-secondary-text italic">
                  A brighter future becomes possible when children are given the support and freedom to shape their own paths.
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* ═══ 4. OUR CORE VALUES (8 PILLARS) ═══ */}
        <Section background="white" padding="lg">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-soft-sage">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Our Core Values
              </h2>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                Our values guide how we approach our work, make decisions, and engage with children, families, volunteers, supporters, and communities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Compassion",
                  desc: "We approach every child and family with empathy, patience and understanding. We recognise that every person's circumstances are different, and we strive to respond with kindness and respect.",
                },
                {
                  icon: ShieldCheck,
                  title: "Dignity and Respect",
                  desc: "Every child deserves to be treated as an individual with worth, rights, feelings and aspirations. We respect their identities, listen to their perspectives and avoid defining them by their circumstances.",
                },
                {
                  icon: Shield,
                  title: "Safety and Protection",
                  desc: "Children's safety and wellbeing must come before publicity, convenience or organisational interests. We are committed to promoting safe environments, responsible conduct and appropriate safeguarding practices.",
                },
                {
                  icon: Scale,
                  title: "Equality and Inclusion",
                  desc: "Every child deserves fair opportunities to learn, participate and develop. We strive to support children without discrimination and to recognise the different barriers they may face.",
                },
                {
                  icon: BookOpen,
                  title: "Education and Empowerment",
                  desc: "Education can open doors to opportunity. We value learning, creativity, confidence and the development of skills that help children make informed choices about their futures.",
                },
                {
                  icon: Award,
                  title: "Integrity and Accountability",
                  desc: "Trust must be earned through honesty, responsible decisions and transparency. We are committed to communicating truthfully about our work, using resources responsibly and being accountable.",
                },
                {
                  icon: Users,
                  title: "Community and Collaboration",
                  desc: "Lasting change requires collective effort. We value responsible partnerships with families, volunteers, educators, donors and community organisations that share our commitment.",
                },
                {
                  icon: Sparkles,
                  title: "Hope and Opportunity",
                  desc: "We believe that a child's present circumstances should not define their future. We encourage children to discover their strengths, explore their interests and approach their aspirations with confidence.",
                },
              ].map((val) => (
                <Card key={val.title} variant="interactive" padding="lg" className="flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-soft-sage text-forest-green flex items-center justify-center mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
                      <val.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2.5">
                      {val.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 5. OUR STORY ═══ */}
        <Section background="ivory" padding="lg">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-terracotta px-4 py-1.5 rounded-full bg-white border border-border shadow-xs">
              Origin & Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Our Story
            </h2>
            <p className="text-xl font-bold text-muted-terracotta font-[family-name:var(--font-heading)]">
              Every meaningful journey begins with the belief that something better is possible.
            </p>

            <div className="prose prose-lg text-secondary-text space-y-4 text-base sm:text-lg leading-relaxed">
              <p>
                BORN FOUNDATION&apos;s story is rooted in the belief that children from underprivileged backgrounds deserve opportunities to grow beyond the limitations imposed by difficult circumstances.
              </p>
              <p>
                For many children, the path towards a brighter future can be affected by challenges that are beyond their control. Access to education, essential resources, encouragement, and a safe environment can make a meaningful difference to their development.
              </p>
              <p>
                We believe that these challenges should not prevent children from discovering their abilities, developing their confidence, and pursuing their dreams.
              </p>
              <p>
                This belief shapes the purpose of BORN FOUNDATION: to stand alongside children who need support, encourage opportunities for their growth, and contribute towards communities where their wellbeing matters.
              </p>
              <p>
                Our story is not only about the challenges children face. It is also about their abilities, aspirations, resilience, and potential.
              </p>
              <p>
                We recognise that meaningful support requires more than good intentions. It requires responsibility, consistency, collaboration, and a genuine commitment to doing what is best for children.
              </p>
              <p>
                As BORN FOUNDATION grows, we aspire to strengthen our efforts, build responsible partnerships, and contribute to a future in which more children have the opportunity to learn, thrive, and live with dignity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border mt-6">
              <p className="text-base sm:text-lg font-bold text-forest-green font-[family-name:var(--font-heading)]">
                Our story continues with every opportunity created, every child supported and every responsible step taken towards a better tomorrow.
              </p>
              <p className="text-xs text-secondary-text mt-3 border-t border-border pt-3">
                <strong>Historical Record Note:</strong> BORN FOUNDATION&apos;s verified founding history,
                trustee details, and chronological milestones will be added once formal archival documents are confirmed.
              </p>
            </div>
          </div>
        </Section>

        {/* ═══ 5B. WOMEN & CHILD DEVELOPMENT FOCUS AREAS ═══ */}
        <Section background="sage" padding="lg">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="default">Broader Focus</Badge>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Women &amp; Child Development Focus Areas
              </h2>
              <p className="text-secondary-text text-sm sm:text-base leading-relaxed">
                Children thrive best when families and communities thrive. Alongside direct educational,
                nutritional, creative, and developmental support for children, BORN FOUNDATION promotes
                women&apos;s community participation and supportive neighbourhood networks.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                {SITE_CONFIG.focusAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/programmes/${area.slug}`}
                    className="p-3 rounded-xl bg-white border border-border hover:border-forest-green font-semibold text-main-text transition-colors"
                  >
                    {area.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
                <Image
                  src={APPROVED_PUBLIC_GALLERY[0].mediumWebpSrc}
                  alt={APPROVED_PUBLIC_GALLERY[0].altText}
                  width={APPROVED_PUBLIC_GALLERY[0].width}
                  height={APPROVED_PUBLIC_GALLERY[0].height}
                  sizes="(max-width: 1023px) 100vw, 540px"
                  loading="eager"
                  className="w-full h-auto object-cover"
                />
                <div className="p-4 text-xs text-secondary-text">
                  {APPROVED_PUBLIC_GALLERY[0].caption}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 6. OUR APPROACH ═══ */}
        <Section background="white" padding="lg">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-soft-sage">
                Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Our Approach
              </h2>
              <p className="text-xl font-bold text-forest-green font-[family-name:var(--font-heading)]">
                Understanding needs. Creating opportunities. Supporting potential.
              </p>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                We believe that meaningful support should recognise each child&apos;s circumstances, respect their individuality, and focus on their long-term wellbeing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: "01",
                  title: "Listen and understand",
                  desc: "Recognise the needs, experiences and aspirations of children and their communities before determining how support can be provided.",
                },
                {
                  step: "02",
                  title: "Support essential development",
                  desc: "Work towards improving access to education, essential resources, care and opportunities for personal growth, according to the foundation's actual programmes and capacity.",
                },
                {
                  step: "03",
                  title: "Encourage independence and confidence",
                  desc: "Help children discover their abilities, participate in decisions appropriate to their age and development, and develop the confidence to pursue their interests.",
                },
                {
                  step: "04",
                  title: "Build stronger communities",
                  desc: "Encourage responsible collaboration among families, educators, volunteers, supporters and community organisations to help create sustainable opportunities.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-surface-muted rounded-2xl border border-border p-8 flex items-start gap-5">
                  <div className="w-12 h-12 bg-forest-green text-white rounded-xl flex items-center justify-center text-lg font-bold shrink-0 font-[family-name:var(--font-heading)]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-secondary-text max-w-2xl mx-auto italic">
              We recognise that every child is different. Our approach should therefore be respectful, inclusive, age-appropriate and responsive to individual needs.
            </div>
          </div>
        </Section>

        {/* ═══ 7. OUR SAFEGUARDING COMMITMENT (8 PRINCIPLES) ═══ */}
        <Section background="sage" padding="lg">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-white border border-border">
                Child Protection
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Our Safeguarding Commitment
              </h2>
              <p className="text-xl font-bold text-muted-terracotta font-[family-name:var(--font-heading)]">
                Every child deserves to feel safe, respected, heard and protected.
              </p>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                At BORN FOUNDATION, child safeguarding must be central to the way we work. Anyone working with children has a responsibility to act in their best interests and protect their dignity, privacy, and wellbeing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Children's Safety Comes First",
                  desc: "Decisions involving children must prioritise their safety, dignity, wellbeing and best interests.",
                },
                {
                  icon: Shield,
                  title: "Protection from Harm",
                  desc: "We do not accept abuse, exploitation, harassment, neglect or discriminatory treatment. Concerns must be taken seriously and handled through appropriate procedures.",
                },
                {
                  icon: Heart,
                  title: "Respect for Dignity and Privacy",
                  desc: "Children must not be treated as objects of pity or used to generate attention, sympathy or donations. Their personal information and images must be handled responsibly.",
                },
                {
                  icon: Camera,
                  title: "Responsible Photography & Storytelling",
                  desc: "Photographs, videos and personal stories must be considered carefully. Appropriate permissions, informed consent, and safeguarding reviews are necessary before publication.",
                },
                {
                  icon: CheckCircle2,
                  title: "Responsible Conduct",
                  desc: "Staff, volunteers, representatives and personnel should understand their safeguarding responsibilities, follow the code of conduct, and participate in appropriate screening.",
                },
                {
                  icon: Mail,
                  title: "Safe Reporting and Response",
                  desc: "Safeguarding concerns must be reported through designated, confidential channels and handled promptly. Responses prioritise immediate safety and privacy.",
                },
                {
                  icon: Lock,
                  title: "Confidentiality and Accountability",
                  desc: "Safeguarding information must be accessible only to authorised individuals with legitimate purpose, handled securely in accordance with legal requirements.",
                },
                {
                  icon: Award,
                  title: "Continuous Improvement",
                  desc: "Safeguarding practices should be reviewed regularly and strengthened through training, risk assessment, feedback, and learning from concerns.",
                },
              ].map((principle) => (
                <div key={principle.title} className="bg-white rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                      <principle.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-main-text mb-1.5">
                        {principle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                        {principle.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-white border border-forest-green/20 text-center space-y-4">
              <p className="text-base sm:text-lg font-bold text-forest-green font-[family-name:var(--font-heading)]">
                Our promise is to place children&apos;s safety, dignity and best interests at the heart of every decision. Safeguarding is an ongoing responsibility, not simply a statement on a website.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link href="/safeguarding">
                  <Button variant="primary" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Read Operational Safeguarding Policy
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Designated Safeguarding Contacts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 8. WHO WE WORK WITH ═══ */}
        <Section background="white" padding="lg">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-terracotta px-4 py-1.5 rounded-full bg-surface-muted border border-border">
                Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Who We Work With
              </h2>
              <p className="text-xl font-bold text-muted-terracotta font-[family-name:var(--font-heading)]">
                A stronger future is built together.
              </p>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                Supporting children is a shared responsibility. Responsible collaboration can help expand access to opportunities and strengthen the communities in which children grow.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: HandHeart,
                  title: "Volunteers",
                  desc: "Contributing time and appropriate skills through authorised and vetted field activities.",
                },
                {
                  icon: Heart,
                  title: "Donors and Supporters",
                  desc: "Helping fund verified initiatives and essential resources for children in need.",
                },
                {
                  icon: Users,
                  title: "Community Partners",
                  desc: "Working together on grassroots activities that support children's holistic development.",
                },
                {
                  icon: GraduationCap,
                  title: "Educational Partners",
                  desc: "Exploring opportunities that encourage learning, literacy, and future skills development.",
                },
                {
                  icon: Building2,
                  title: "Organisations & Institutions",
                  desc: "Building responsible partnerships that strictly align with child safeguarding principles.",
                },
              ].map((partner) => (
                <Card key={partner.title} variant="bordered" padding="lg" className="bg-surface-muted flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-white rounded-2xl border border-border flex items-center justify-center text-forest-green mb-4 shadow-xs">
                      <partner.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                      {partner.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {partner.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center text-xs sm:text-sm text-secondary-text italic max-w-2xl mx-auto">
              Every partnership should respect children&apos;s rights, follow appropriate safeguarding requirements, and contribute to the foundation&apos;s genuine mission.
            </div>
          </div>
        </Section>

        {/* ═══ 9. OUR COMMITMENT TO TRANSPARENCY ═══ */}
        <Section background="ivory" padding="lg">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border p-8 sm:p-12 space-y-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-soft-sage">
              Accountability
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Our Commitment to Transparency
            </h2>
            <p className="text-xl font-bold text-forest-green font-[family-name:var(--font-heading)]">
              Trust grows when responsibility is matched by honesty.
            </p>

            <div className="prose prose-lg text-secondary-text space-y-4 text-base sm:text-lg leading-relaxed">
              <p>
                We believe supporters and communities should be able to understand the purpose of our work and how the organisation uses its resources.
              </p>
              <p>
                BORN FOUNDATION aims to communicate its activities clearly, provide accurate information about its programmes, and publish verified reports and outcomes as they become available.
              </p>
              <p>
                We are committed to responsible resource management, appropriate oversight, and accountability in accordance with the foundation&apos;s legal obligations and operational capacity.
              </p>
              <p className="font-semibold text-main-text">
                We will not present unverified statistics or promises as achievements. We believe that honest communication is essential to building lasting trust.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/impact">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View Impact & Statutory Transparency Information
                </Button>
              </Link>
            </div>
          </div>
        </Section>

        {/* ═══ 10. BE PART OF A BRIGHTER TOMORROW (CALL TO ACTION) ═══ */}
        <section className="bg-forest-green text-white py-20 sm:py-28 border-t border-forest-green-dark">
          <div className="page-container text-center max-w-3xl mx-auto space-y-8">
            <span className="text-xs font-bold uppercase tracking-wider text-warm-gold px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
              Get Involved
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white">
              Be Part of a Brighter Tomorrow
            </h2>
            <p className="text-xl font-bold text-warm-gold font-[family-name:var(--font-heading)]">
              Every child deserves an opportunity. Together, we can help create one.
            </p>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              A child&apos;s future can be shaped by the opportunities, encouragement, and support available to them today. Whether through volunteering, responsible partnerships, financial contributions, or sharing our mission, there are meaningful ways to support efforts that help children grow and thrive.
            </p>
            <p className="text-white/80 text-sm sm:text-base">
              We invite individuals and organisations who share our commitment to children&apos;s wellbeing to learn more about BORN FOUNDATION and explore appropriate ways to contribute.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/support">
                <Button variant="secondary" size="lg" className="shadow-lg">
                  <Heart className="w-5 h-5 mr-2.5 fill-white/20" />
                  Support Our Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white hover:text-forest-green">
                  <Mail className="w-5 h-5 mr-2.5" />
                  Contact BORN FOUNDATION
                </Button>
              </Link>
              <Link href="/programmes">
                <Button variant="gold" size="lg">
                  Learn About Our Programmes
                  <ArrowRight className="w-5 h-5 ml-2.5" />
                </Button>
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-warm-gold/90 font-semibold tracking-wider pt-4 italic">
              Every child matters. Every opportunity counts. Every tomorrow holds possibility.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
