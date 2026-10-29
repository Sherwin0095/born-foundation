"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  BookOpen,
  Apple,
  Shield,
  Lightbulb,
  Users,
  ArrowRight,
  HandHeart,
  Mail,
  ChevronRight,
  FileText,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button, Card, Badge, Section } from "@/components/ui";
import { getPublishedProgrammes, getFeaturedStories } from "@/lib/data-store";
import { formatDate, truncate } from "@/lib/utils";
import type { Programme, Story } from "@/lib/types";

export default function HomePage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    setProgrammes(getPublishedProgrammes().slice(0, 4));
    setStories(getFeaturedStories().slice(0, 3));
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* ═══ 1. HERO SECTION (REBUILT BALANCED 2-COLUMN) ═══ */}
        <section className="relative bg-forest-green text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-forest-green-dark">
          {/* Ambient Lighting Orbs */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-warm-gold blur-3xl" />
            <div className="absolute -bottom-24 left-10 w-96 h-96 rounded-full bg-soft-sage blur-3xl" />
          </div>

          <div className="page-container relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* LEFT COLUMN: Mission & Call to Action (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold tracking-wider text-warm-gold uppercase">
                  <ShieldCheck className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                  <span>Born Foundation • Child Welfare NGO</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight font-[family-name:var(--font-heading)] text-white">
                  Every Child Deserves a{" "}
                  <span className="text-warm-gold block sm:inline">Chance to Thrive</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
                  Dedicated to the care, wellbeing, development, and support of
                  children who need assistance. Through community-based programmes,
                  we create safe spaces for children to learn, grow, and build dignity.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/support">
                    <Button variant="secondary" size="lg" className="shadow-lg">
                      <Heart className="w-5 h-5 mr-2" aria-hidden="true" />
                      Support Our Work
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/50 text-white hover:bg-white hover:text-forest-green"
                    >
                      Learn About Us
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>

                {/* Trust & Safeguarding Footnote */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-white/75 border-t border-white/15">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                    <span>Zero-tolerance Child Safeguarding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                    <span>Transparent Community Stewardship</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Art-Directed Visual Card (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-lg lg:max-w-none">
                  {/* Decorative Frame Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-warm-gold/20 via-white/5 to-soft-sage/20 rounded-3xl blur-lg opacity-70" />

                  {/* Main Visual Container */}
                  <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 bg-forest-green-dark shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                    <img
                      src="/images/hero-community.svg"
                      alt="Illustrative depiction of children engaged in inclusive learning and mentorship at a community center"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-green-deep/70 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-forest-green-deep/85 backdrop-blur-md border border-white/15 text-xs text-white/90 flex items-center justify-between">
                      <span className="font-semibold text-warm-gold flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-warm-gold text-warm-gold" />
                        Safe Learning Spaces
                      </span>
                      <span className="text-[11px] text-white/70">Empowering Every Minor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. WHO WE ARE & CORE VALUES (REBUILT BALANCED 2-COLUMN) ═══ */}
        <Section background="white" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Content (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage text-forest-green text-xs font-bold tracking-wider uppercase">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text leading-tight">
                A Foundation Built on <span className="text-forest-green">Compassion</span>
              </h2>
              <p className="text-secondary-text text-base leading-relaxed">
                Born Foundation exists because every child matters. We believe
                that with structured assistance, secure surroundings, and dedicated
                mentorship, children facing severe socio-economic hardships can realize
                their potential.
              </p>
              <p className="text-secondary-text text-base leading-relaxed">
                We work directly with grassroots caregivers, schools, and local volunteers
                to build lasting support structures across education, nutrition, health, and
                character development.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-forest-green font-bold text-base hover:text-forest-green-dark group transition-colors"
                >
                  <span>Explore our mission & background</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Value Cards (7 cols: Balanced 2x2 Grid) */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: Heart,
                    title: "Compassion",
                    desc: "Every intervention is anchored in empathy, dignity, and unconditional respect for every child.",
                  },
                  {
                    icon: Shield,
                    title: "Safety",
                    desc: "Uncompromising child safeguarding standards govern all field activities, staff, and partners.",
                  },
                  {
                    icon: Users,
                    title: "Community",
                    desc: "Working alongside local families, teachers, and leaders to create enduring social impact.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Empowerment",
                    desc: "Equipping young minds with literacy, critical thinking, and essential life skills for self-reliance.",
                  },
                ].map((val) => (
                  <Card key={val.title} variant="interactive" padding="md">
                    <div className="w-12 h-12 rounded-xl bg-soft-sage text-forest-green flex items-center justify-center mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
                      <val.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {val.desc}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 3. MISSION & VISION (INTEGRATED BALANCED CARDS) ═══ */}
        <Section background="sage" padding="lg">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-3 py-1 rounded-full bg-white border border-border">
              Guiding Charter
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-3">
              Our Purpose and Future Direction
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <Card variant="default" padding="lg" className="bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-forest-green text-white rounded-xl flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Our Mission
                </h3>
                <p className="text-secondary-text text-base leading-relaxed">
                  To provide holistic support to children in need through
                  community-based initiatives that bridge educational gaps, ensure nutritional
                  security, foster emotional wellbeing, and strengthen families — ensuring every
                  child has the opportunity to thrive in a protective and nurturing environment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-forest-green uppercase tracking-wider">
                Action-Oriented • Community-Led
              </div>
            </Card>

            {/* Vision Card */}
            <Card variant="default" padding="lg" className="bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-muted-terracotta text-white rounded-xl flex items-center justify-center mb-5">
                  <Lightbulb className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Our Vision
                </h3>
                <p className="text-secondary-text text-base leading-relaxed">
                  An equitable world where no child is left behind due to poverty, neglect,
                  or circumstance — where every young person is protected, cherished, and
                  empowered with the knowledge, values, and tools to shape their own fulfilling future.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-muted-terracotta uppercase tracking-wider">
                Long-Term Horizon • Sustainable Hope
              </div>
            </Card>
          </div>
        </Section>

        {/* ═══ 4. OUR PROGRAMMES SECTION (INTEGRATED TRANSITION) ═══ */}
        <Section background="white" padding="lg">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-terracotta px-3 py-1 rounded-full bg-surface-muted border border-border">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-3 mb-4">
              Core Developmental Programmes
            </h2>
            <p className="text-secondary-text text-base leading-relaxed">
              Structured initiatives addressing the foundational pillars of child development,
              academic advancement, and protective community care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmes.length > 0 ? (
              programmes.map((prog) => {
                const icons: Record<string, React.ReactNode> = {
                  education: <BookOpen className="w-6 h-6" />,
                  nutrition: <Apple className="w-6 h-6" />,
                  care: <Shield className="w-6 h-6" />,
                  skills: <Lightbulb className="w-6 h-6" />,
                  community: <Users className="w-6 h-6" />,
                };
                return (
                  <Link key={prog.id} href={`/programmes/${prog.slug}`} className="block h-full group">
                    <Card
                      variant="interactive"
                      padding="md"
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 bg-soft-sage rounded-xl flex items-center justify-center mb-4 text-forest-green group-hover:bg-forest-green group-hover:text-white transition-colors">
                          {icons[prog.category] || <Heart className="w-6 h-6" />}
                        </div>
                        <Badge variant="default" className="mb-2 text-[11px] capitalize">
                          {prog.category}
                        </Badge>
                        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-main-text mb-2 group-hover:text-forest-green transition-colors">
                          {prog.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                          {truncate(prog.description, 110)}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-forest-green">
                        <span>Read Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </div>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-secondary-text">Programme information is being prepared.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/programmes">
              <Button variant="outline" size="md">
                View All Programmes
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </Section>

        {/* ═══ 5. HOW WE HELP (3-STEP OPERATIONAL MODEL) ═══ */}
        <Section background="ivory" padding="lg">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-3 py-1 rounded-full bg-soft-sage">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-3 mb-3">
              How We Create Sustainable Change
            </h2>
            <p className="text-secondary-text text-sm md:text-base">
              A respectful, systematic model focused on community partnership and verifiable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Identify & Listen",
                desc: "We work directly with grassroots leaders to understand genuine local needs without imposing external assumptions.",
              },
              {
                step: "02",
                title: "Nurture & Protect",
                desc: "We deliver structured educational tutoring, wholesome nutrition, and safe protective spaces tailored for vulnerable minors.",
              },
              {
                step: "03",
                title: "Empower & Sustain",
                desc: "We train local caregivers, mentor older youth, and establish community ownership so positive change outlasts direct aid.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl border border-border p-8 text-center shadow-sm">
                <div className="w-14 h-14 bg-forest-green text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl font-bold font-[family-name:var(--font-heading)] shadow">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ 6. WAYS TO CONTRIBUTE ═══ */}
        <Section background="white" padding="lg">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-terracotta px-3 py-1 rounded-full bg-surface-muted border border-border">
              Get Involved
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-3 mb-3">
              Ways You Can Stand With Children
            </h2>
            <p className="text-secondary-text text-base leading-relaxed">
              Every donation, volunteer hour, and corporate partnership directly transforms a child&apos;s daily reality.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card variant="bordered" padding="lg" className="text-center flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-muted-terracotta/10 text-muted-terracotta rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                  Donate
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  Provide learning kits, nutrition packs, or sponsor community tutoring spaces.
                </p>
              </div>
              <Link href="/support">
                <Button variant="secondary" size="sm" className="w-full">
                  Explore Giving Options
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg" className="text-center flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-forest-green/10 text-forest-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                  Volunteer
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  Share your weekends teaching literacy, arts, mentoring, or assisting centre operations.
                </p>
              </div>
              <Link href="/support#volunteer">
                <Button variant="outline" size="sm" className="w-full">
                  Apply as Volunteer
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg" className="text-center flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-warm-gold/20 text-warm-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                  Partner / CSR
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  Collaborate on audited corporate CSR projects aligned with UN Sustainable Development Goals.
                </p>
              </div>
              <Link href="/support#partnerships">
                <Button variant="gold" size="sm" className="w-full">
                  Partner With Us
                </Button>
              </Link>
            </Card>
          </div>
        </Section>

        {/* ═══ 7. FIELD STORIES ═══ */}
        {stories.length > 0 && (
          <Section background="sage" padding="lg">
            <div className="flex flex-col md:flex-row md:items-end justify-between max-w-6xl mx-auto mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-3 py-1 rounded-full bg-white border border-border">
                  From the Field
                </span>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text mt-2">
                  Stories of Growth & Care
                </h2>
              </div>
              <Link href="/stories">
                <Button variant="ghost" size="sm">
                  View all stories <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {stories.map((story) => (
                <Link key={story.id} href={`/stories/${story.slug}`} className="block h-full group">
                  <Card
                    variant="interactive"
                    padding="none"
                    className="h-full flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="h-44 bg-forest-green-dark/10 flex items-center justify-center border-b border-border">
                        <BookOpen className="w-10 h-10 text-forest-green/30 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Badge variant="default">{story.category}</Badge>
                          {story.published_at && (
                            <span className="text-xs text-secondary-text flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                              {formatDate(story.published_at)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-main-text mb-2 group-hover:text-forest-green transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-secondary-text leading-relaxed line-clamp-3">
                          {story.excerpt || story.content}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-green">
                        Read Story
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ 8. TRANSPARENCY & ACCOUNTABILITY ═══ */}
        <Section background="white" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-3 py-1 rounded-full bg-soft-sage">
                Accountability
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Transparency, Integrity & Public Scrutiny
              </h2>
              <p className="text-secondary-text text-base leading-relaxed">
                We believe trust is earned through radical openness. Born Foundation upholds
                strict dual-key financial sign-offs, independent operational audits, and zero
                tolerance for fabricated impact figures.
              </p>
              <p className="text-secondary-text text-base leading-relaxed">
                All statutory filings, safeguarding compliance certifications, and programme audit reports
                are published directly on our portal for public inspection.
              </p>
              <div className="pt-2">
                <Link href="/impact">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                    Inspect Impact Disclosures
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                { icon: FileText, label: "Audited Filings", desc: "Formal report repository" },
                { icon: Shield, label: "Safeguarded", desc: "Child protection protocol" },
                { icon: Users, label: "Community Voice", desc: "Grassroots governance" },
                { icon: Heart, label: "Donor Trust", desc: "Tracked resource allocation" },
              ].map((item) => (
                <div key={item.label} className="bg-surface-muted rounded-2xl border border-border p-6 text-center">
                  <item.icon className="w-8 h-8 text-forest-green mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-sm text-main-text mb-1">
                    {item.label}
                  </h3>
                  <p className="text-xs text-secondary-text">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 9. BOTTOM ACTION CALLOUT ═══ */}
        <section className="bg-forest-green text-white py-16 sm:py-20 border-t border-forest-green-dark">
          <div className="page-container text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white">
              Every Child Deserves Your Support
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Join our community of volunteers, mentors, donors, and partners working
              tirelessly to ensure no child is left behind.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/support#volunteer">
                <Button variant="gold" size="lg">
                  <HandHeart className="w-5 h-5 mr-2" aria-hidden="true" />
                  Become a Volunteer
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white hover:text-forest-green">
                  <Mail className="w-5 h-5 mr-2" aria-hidden="true" />
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
