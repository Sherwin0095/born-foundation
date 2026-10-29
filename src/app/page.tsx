"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button, Card, Badge, Section } from "@/components/ui";
import { getPublishedProgrammes, getFeaturedStories } from "@/lib/data-store";
import { formatDate, truncate } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site-config";
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
        {/* ═══ 1. HERO SECTION (SPACIOUS 2-COLUMN ART-DIRECTED LAYOUT) ═══ */}
        <section className="relative bg-forest-green text-white overflow-hidden py-20 sm:py-24 lg:py-32 border-b border-forest-green-dark">
          {/* Subtle Background Lighting */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 right-10 w-[30rem] h-[30rem] rounded-full bg-warm-gold blur-3xl" />
            <div className="absolute -bottom-32 left-10 w-[30rem] h-[30rem] rounded-full bg-soft-sage blur-3xl" />
          </div>

          <div className="page-container relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column (7 cols): Hero Messaging & Action */}
              <div className="lg:col-span-7 space-y-7 text-left">
                {/* Eyebrow Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider text-warm-gold uppercase">
                  <ShieldCheck className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                  <span>{SITE_CONFIG.legalName}</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.18] tracking-tight font-[family-name:var(--font-heading)] text-white">
                  Every Child Deserves a{" "}
                  <span className="text-warm-gold block sm:inline">Chance to Thrive</span>
                </h1>

                {/* Subtitle / Mission Statement */}
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl font-normal">
                  {SITE_CONFIG.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/support">
                    <Button variant="secondary" size="lg" className="shadow-lg">
                      <Heart className="w-5 h-5 mr-2.5 fill-white/20" aria-hidden="true" />
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
                      <ArrowRight className="w-5 h-5 ml-2.5" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>

                {/* Trust & Safeguarding Footnote */}
                <div className="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/80 border-t border-white/15">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                    <span>Strict Child Protection Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                    <span>Audited Financial Governance</span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Illustrative Artwork Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-lg lg:max-w-none">
                  {/* Outer Ambient Glow */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-warm-gold/25 via-white/10 to-soft-sage/25 rounded-3xl blur-xl opacity-75" />

                  {/* Main Visual Container */}
                  <div className="relative rounded-3xl overflow-hidden border-2 border-white/25 bg-forest-green-dark shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
                    <img
                      src="/images/hero-community.svg"
                      alt="Illustrative depiction of inclusive learning and mentorship at a community center"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />

                    {/* Subtle Gradient Shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-green-deep/80 via-transparent to-transparent pointer-events-none" />

                    {/* Integrated Trust Tag */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-forest-green-deep/90 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-white/95 flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-2 font-bold text-warm-gold">
                        <Sparkles className="w-4 h-4" />
                        <span>Nurturing Potential</span>
                      </div>
                      <span className="text-white/80 text-xs">Community Centred</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. WHO WE ARE & CORE VALUES (AIRY, UNCOMPRESSED 2-COLUMN) ═══ */}
        <Section background="white" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-sage text-forest-green text-xs font-bold tracking-wider uppercase">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text leading-tight">
                A Foundation Built on <span className="text-forest-green">Compassion & Trust</span>
              </h2>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                Born Foundation exists because every child matters. We believe that with structured
                guidance, wholesome nourishment, and secure surroundings, children facing severe socio-economic
                barriers can achieve emotional wellbeing and lifelong self-reliance.
              </p>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                We work directly with grassroots caregivers, schools, and certified mentors to establish
                sustainable developmental safety nets across underserved neighborhoods.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 text-forest-green font-bold text-base hover:text-forest-green-dark group transition-colors"
                >
                  <span>Explore our organizational charter & history</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Value Cards (7 cols: Balanced 2x2 Grid) */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Heart,
                    title: "Compassion",
                    desc: "Every intervention is anchored in empathy, dignity, and unconditional respect for every child and their family.",
                  },
                  {
                    icon: Shield,
                    title: "Child Safety",
                    desc: "Rigorous safeguarding standards govern all field activities, staff inductions, and volunteer appointments.",
                  },
                  {
                    icon: Users,
                    title: "Community Roots",
                    desc: "Collaborating alongside local educators, parents, and community leaders to create enduring grassroots ownership.",
                  },
                  {
                    icon: Lightbulb,
                    title: "Empowerment",
                    desc: "Equipping young minds with literacy, critical thinking, and vocational life skills for enduring self-reliance.",
                  },
                ].map((val) => (
                  <Card key={val.title} variant="interactive" padding="lg">
                    <div className="w-13 h-13 rounded-2xl bg-soft-sage text-forest-green flex items-center justify-center mb-5 group-hover:bg-forest-green group-hover:text-white transition-colors">
                      <val.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2.5">
                      {val.title}
                    </h3>
                    <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                      {val.desc}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 3. FIVE CORE PROGRAMMES (WELL-SPACED CARD GRID) ═══ */}
        <Section background="ivory" padding="lg">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-terracotta px-4 py-1.5 rounded-full bg-white border border-border shadow-xs">
              Focus Areas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Core Developmental Programmes
            </h2>
            <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
              Structured initiatives addressing the foundational pillars of child development,
              academic advancement, and protective community care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                      padding="lg"
                      className="h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-13 h-13 bg-soft-sage rounded-2xl flex items-center justify-center mb-5 text-forest-green group-hover:bg-forest-green group-hover:text-white transition-colors">
                          {icons[prog.category] || <Heart className="w-6 h-6" />}
                        </div>
                        <Badge variant="default" className="mb-3 text-[11px] capitalize">
                          {prog.category}
                        </Badge>
                        <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 group-hover:text-forest-green transition-colors">
                          {prog.title}
                        </h3>
                        <p className="text-sm text-secondary-text leading-relaxed">
                          {truncate(prog.description, 115)}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-xs sm:text-sm font-semibold text-forest-green">
                        <span>Read Full Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                      </div>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-secondary-text">Programme tracks are being prepared.</p>
              </div>
            )}
          </div>

          <div className="text-center mt-14">
            <Link href="/programmes">
              <Button variant="outline" size="lg">
                View All Programmes
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </Section>

        {/* ═══ 4. MISSION & VISION (BALANCED EXPANSIVE CARDS) ═══ */}
        <Section background="sage" padding="lg">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-white border border-border">
              Guiding Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Our Mission and Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <Card variant="default" padding="lg" className="bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-13 h-13 bg-forest-green text-white rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 fill-white/20" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-4">
                  Our Mission
                </h3>
                <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                  To provide holistic support to children in need through community-based initiatives
                  that bridge educational gaps, ensure nutritional security, foster emotional wellbeing,
                  and strengthen families — ensuring every child has the opportunity to thrive in a
                  protective, supportive, and dignified environment.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border text-xs font-bold text-forest-green uppercase tracking-wider">
                Action-Oriented • Community-Led
              </div>
            </Card>

            {/* Vision Card */}
            <Card variant="default" padding="lg" className="bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-13 h-13 bg-muted-terracotta text-white rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 fill-white/20" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-4">
                  Our Vision
                </h3>
                <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                  An equitable world where no child is left behind due to poverty, neglect, or circumstance
                  — where every young person is protected, cherished, and empowered with the knowledge,
                  values, and practical tools to shape their own fulfilling and dignified future.
                </p>
              </div>
              <div className="mt-8 pt-5 border-t border-border text-xs font-bold text-muted-terracotta uppercase tracking-wider">
                Long-Term Horizon • Sustainable Hope
              </div>
            </Card>
          </div>
        </Section>

        {/* ═══ 5. HOW WE HELP (3-STAGE STRUCTURED TIMELINE) ═══ */}
        <Section background="white" padding="lg">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-soft-sage">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              How We Create Enduring Change
            </h2>
            <p className="text-secondary-text text-base">
              A respectful, transparent 3-stage model focused on grassroots dignity and verifiable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Identify & Listen",
                desc: "We work directly with grassroots stakeholders to understand genuine local needs without imposing external preconceptions.",
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
              <div key={item.step} className="bg-surface-muted rounded-2xl border border-border p-8 sm:p-10 text-center shadow-xs">
                <div className="w-14 h-14 bg-forest-green text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold font-[family-name:var(--font-heading)] shadow">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ 6. WAYS TO CONTRIBUTE (EXPANSIVE CARDS) ═══ */}
        <Section background="ivory" padding="lg">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-terracotta px-4 py-1.5 rounded-full bg-white border border-border shadow-xs">
              Get Involved
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
              Ways You Can Stand With Children
            </h2>
            <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
              Every donation, volunteer hour, and corporate partnership directly transforms a child&apos;s daily reality.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Donate Card */}
            <Card variant="bordered" padding="lg" className="bg-white text-center flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-muted-terracotta/10 text-muted-terracotta rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Heart className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Donate
                </h3>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed mb-6">
                  Provide learning kits, nutrition packs, or sponsor community tutoring spaces.
                </p>
              </div>
              <Link href="/support">
                <Button variant="secondary" size="md" className="w-full">
                  Explore Giving Options
                </Button>
              </Link>
            </Card>

            {/* Volunteer Card */}
            <Card variant="bordered" padding="lg" className="bg-white text-center flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-forest-green/10 text-forest-green rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <HandHeart className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Volunteer
                </h3>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed mb-6">
                  Share your weekends teaching literacy, arts, mentoring, or assisting centre operations.
                </p>
              </div>
              <Link href="/support#volunteer">
                <Button variant="outline" size="md" className="w-full">
                  Apply as Volunteer
                </Button>
              </Link>
            </Card>

            {/* Corporate / CSR Card */}
            <Card variant="bordered" padding="lg" className="bg-white text-center flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-warm-gold/20 text-warm-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Users className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Partner / CSR
                </h3>
                <p className="text-sm sm:text-base text-secondary-text leading-relaxed mb-6">
                  Collaborate on audited corporate CSR projects aligned with UN Sustainable Development Goals.
                </p>
              </div>
              <Link href="/support#partnerships">
                <Button variant="gold" size="md" className="w-full">
                  Partner With Us
                </Button>
              </Link>
            </Card>
          </div>
        </Section>

        {/* ═══ 7. TRANSPARENCY & ACCOUNTABILITY ═══ */}
        <Section background="white" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-green px-4 py-1.5 rounded-full bg-soft-sage">
                Accountability
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Transparency, Integrity & Public Scrutiny
              </h2>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                We believe trust is earned through radical openness. Born Foundation upholds
                strict dual-key financial sign-offs, independent operational audits, and zero
                tolerance for fabricated impact figures.
              </p>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                All statutory filings, safeguarding compliance certifications, and programme audit reports
                are published directly on our portal for public inspection.
              </p>
              <div className="pt-2">
                <Link href="/impact">
                  <Button variant="outline" size="md">
                    <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                    Inspect Impact Disclosures
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-5">
              {[
                { icon: FileText, label: "Audited Filings", desc: "Formal report repository" },
                { icon: Shield, label: "Safeguarded", desc: "Child protection protocol" },
                { icon: Users, label: "Community Voice", desc: "Grassroots governance" },
                { icon: Heart, label: "Donor Trust", desc: "Tracked resource allocation" },
              ].map((item) => (
                <div key={item.label} className="bg-surface-muted rounded-2xl border border-border p-6 sm:p-7 text-center">
                  <item.icon className="w-8 h-8 text-forest-green mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-base text-main-text mb-1">
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

        {/* ═══ 8. BOTTOM INVITATION BANNER ═══ */}
        <section className="bg-forest-green text-white py-20 sm:py-24 border-t border-forest-green-dark">
          <div className="page-container text-center max-w-3xl mx-auto space-y-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white">
              Every Child Deserves Your Support
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed">
              Join our community of volunteers, mentors, donors, and partners working
              tirelessly to ensure no child is left behind.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-3">
              <Link href="/support#volunteer">
                <Button variant="gold" size="lg">
                  <HandHeart className="w-5 h-5 mr-2.5" aria-hidden="true" />
                  Become a Volunteer
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white hover:text-forest-green">
                  <Mail className="w-5 h-5 mr-2.5" aria-hidden="true" />
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
