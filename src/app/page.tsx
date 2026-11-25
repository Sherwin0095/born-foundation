"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  BookOpen,
  Apple,
  Shield,
  Users,
  Sparkles,
  Compass,
  ArrowRight,
  HandHeart,
  Phone,
  ChevronRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Camera,
  MapPin,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button, Card, Badge, Section, SectionHeading } from "@/components/ui";
import { MOCK_PROGRAMMES } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { APPROVED_PUBLIC_GALLERY } from "@/lib/media-register";
import { truncate } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/site-config";
import type { Programme } from "@/lib/types";

export default function HomePage() {
  const allProgrammes = useStoredData<Programme[]>("programmes", MOCK_PROGRAMMES);
  const programmes = useMemo(
    () =>
      allProgrammes
        .filter((p) => p.status === "published")
        .sort((a, b) => a.order_index - b.order_index)
        .slice(0, 6),
    [allProgrammes]
  );

  const heroImage = APPROVED_PUBLIC_GALLERY[1]; // learning-kits-facilitators
  const womensImage = APPROVED_PUBLIC_GALLERY[0]; // womens-community-circle

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <BookOpen className="w-6 h-6" aria-hidden="true" />;
      case "nutrition":
        return <Apple className="w-6 h-6" aria-hidden="true" />;
      case "child-development":
        return <Shield className="w-6 h-6" aria-hidden="true" />;
      case "cultural":
        return <Sparkles className="w-6 h-6" aria-hidden="true" />;
      case "experiences":
        return <Compass className="w-6 h-6" aria-hidden="true" />;
      case "women-community":
        return <Users className="w-6 h-6" aria-hidden="true" />;
      default:
        return <Heart className="w-6 h-6" aria-hidden="true" />;
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        {/* ═══ 1. HERO SECTION ═══ */}
        <section className="relative bg-forest-green text-white overflow-hidden py-16 sm:py-22 lg:py-28 border-b border-forest-green-dark">
          <div className="absolute inset-0 opacity-12 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-32 right-10 w-[28rem] h-[28rem] rounded-full bg-warm-gold blur-3xl" />
            <div className="absolute -bottom-32 left-10 w-[28rem] h-[28rem] rounded-full bg-soft-sage blur-3xl" />
          </div>

          <div className="page-container relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column (7 cols): Headline & Primary Actions */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-semibold tracking-wider text-warm-gold-light uppercase">
                  <ShieldCheck className="w-4 h-4 text-warm-gold-light shrink-0" aria-hidden="true" />
                  <span>{SITE_CONFIG.legalName}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.16] tracking-tight font-[family-name:var(--font-heading)] text-white">
                  Every Child Deserves a{" "}
                  <span className="text-warm-gold-light block sm:inline">Brighter Tomorrow</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl">
                  {SITE_CONFIG.supportingStatement}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/get-involved">
                    <Button variant="secondary" size="lg" className="shadow-md">
                      <HandHeart className="w-5 h-5 mr-2.5" aria-hidden="true" />
                      Get Involved
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/60 text-white hover:bg-white hover:text-forest-green"
                    >
                      About Us
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>

                <div className="pt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm text-white/85 border-t border-white/15">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-warm-gold-light shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.contact.shortLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-warm-gold-light shrink-0" aria-hidden="true" />
                    <span>Child Safeguarding Priority</span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Approved Documentary Photography */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/25 bg-forest-green-deep shadow-2xl">
                  <Image
                    src={heroImage.webpSrc}
                    alt={heroImage.altText}
                    width={heroImage.width}
                    height={heroImage.height}
                    sizes="(max-width: 1023px) 100vw, 520px"
                    priority
                    loading="eager"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="bg-forest-green-deep/95 px-5 py-4 border-t border-white/15 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-warm-gold-light">
                        Educators & Learning Support
                      </p>
                      <p className="text-xs text-white/85 mt-0.5 line-clamp-1">
                        Preparing learning supplies in Bengaluru community centres
                      </p>
                    </div>
                    <Link
                      href="/gallery"
                      className="text-xs font-bold text-warm-gold-light hover:text-white underline underline-offset-2 shrink-0"
                    >
                      Gallery →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 2. INTRODUCTION TO BORN FOUNDATION ═══ */}
        <Section background="white" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-forest-green px-3.5 py-1.5 rounded-full bg-soft-sage">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text leading-tight">
                Committed to Children&apos;s Welfare and{" "}
                <span className="text-forest-green">Community Strength</span>
              </h2>
              <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
                BORN FOUNDATION is a non-profit organisation based in Shanthinagar, Bengaluru, dedicated
                to supporting children from underprivileged and underserved backgrounds alongside
                encouraging women and child development.
              </p>
              <p className="text-secondary-text text-base leading-relaxed">
                A child&apos;s circumstances should never determine the limits of their dreams. We work
                alongside families, educators, and local volunteers to promote essential resources,
                educational encouragement, personal development, and protective community spaces.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-forest-green font-bold text-base hover:text-forest-green-deep group transition-colors"
                >
                  <span>Read our About Us charter & safeguarding commitment</span>
                  <ChevronRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* 4 Core Commitments */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Heart,
                    title: "Compassion & Dignity",
                    desc: "Children are seen for their abilities and possibilities — never portrayed as objects of pity.",
                  },
                  {
                    icon: Shield,
                    title: "Safety & Protection First",
                    desc: "Safeguarding practices protect children's wellbeing, dignity, privacy, and image rights at every step.",
                  },
                  {
                    icon: Users,
                    title: "Women & Family Participation",
                    desc: "Inclusive women's dialogue and family collaboration strengthen protective support around every child.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Transparent Stewardship",
                    desc: "Strict zero-fabrication policy: supplied registry references and public data are verified before claims.",
                  },
                ].map((val) => (
                  <Card key={val.title} variant="interactive" padding="md">
                    <div className="w-12 h-12 rounded-xl bg-soft-sage text-forest-green flex items-center justify-center mb-4 group-hover:bg-forest-green group-hover:text-white transition-colors">
                      <val.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">{val.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 3. MISSION & VISION HIGHLIGHTS ═══ */}
        <Section background="sage" padding="lg">
          <SectionHeading
            eyebrow="Guiding Statements"
            title="Proposed Mission & Vision"
            subtitle="Reflecting BORN FOUNDATION's commitment to children's learning, dignity, protection, and women's empowerment."
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            <Card variant="default" padding="lg" className="bg-white shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-forest-green text-white rounded-xl flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Our Mission
                </h3>
                <p className="text-secondary-text text-base leading-relaxed">
                  {SITE_CONFIG.proposedMission}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border text-xs font-bold text-forest-green uppercase tracking-wider">
                Children&apos;s Welfare • Women &amp; Community Empowerment
              </div>
            </Card>

            <Card variant="default" padding="lg" className="bg-white shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-muted-terracotta text-white rounded-xl flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Our Vision
                </h3>
                <p className="text-secondary-text text-base leading-relaxed">
                  {SITE_CONFIG.proposedVision}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border text-xs font-bold text-muted-terracotta-dark uppercase tracking-wider">
                Dignity • Safety • Equal Opportunity
              </div>
            </Card>
          </div>
        </Section>

        {/* ═══ 4. CORE FOCUS AREAS & ACTIVITY THEMES ═══ */}
        <Section background="ivory" padding="lg">
          <SectionHeading
            eyebrow="Focus Areas"
            title="How Our Work Supports Children & Women"
            subtitle="Organisational focus areas and community activity themes grounded in BORN FOUNDATION's community work in Bengaluru."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
            {programmes.map((prog) => (
              <Link key={prog.id} href={`/programmes/${prog.slug}`} className="block h-full group">
                <Card
                  variant="interactive"
                  padding="lg"
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 bg-soft-sage rounded-xl flex items-center justify-center text-forest-green group-hover:bg-forest-green group-hover:text-white transition-colors">
                        {getCategoryIcon(prog.category)}
                      </div>
                      <Badge variant="default" className="text-[11px]">
                        Focus Area
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2.5 group-hover:text-forest-green transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed">
                      {truncate(prog.description, 130)}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-border flex items-center justify-between text-xs sm:text-sm font-semibold text-forest-green">
                    <span>Explore Focus Area</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/programmes">
              <Button variant="outline" size="md">
                Explore All Focus Areas & Activities
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </Section>

        {/* ═══ 5. WOMEN & COMMUNITY DEVELOPMENT + APPROVED GALLERY PREVIEW ═══ */}
        <Section background="white" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-forest-green px-3.5 py-1.5 rounded-full bg-soft-sage">
                Women &amp; Community Development
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text leading-tight">
                Strengthening Women, Families &amp; Grassroots Networks
              </h2>
              <p className="text-secondary-text text-base leading-relaxed">
                Supporting children cannot stand apart from supporting the mothers, women caregivers,
                and community members around them. Through neighbourhood discussion circles and shared
                community engagement, BORN FOUNDATION encourages women&apos;s voices and mutual support.
              </p>
              <p className="text-secondary-text text-sm leading-relaxed">
                Our public photographic gallery displays only EXIF-stripped, non-identifying
                activity photographs curated under strict child safeguarding standards.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/gallery">
                  <Button variant="primary" size="md">
                    <Camera className="w-4 h-4 mr-2" aria-hidden="true" />
                    View Approved Photo Gallery
                  </Button>
                </Link>
                <Link href="/programmes/women-community-development">
                  <Button variant="outline" size="md">
                    Women &amp; Community Focus
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-border shadow-md bg-warm-ivory">
                <Image
                  src={womensImage.webpSrc}
                  alt={womensImage.altText}
                  width={womensImage.width}
                  height={womensImage.height}
                  sizes="(max-width: 1023px) 100vw, 580px"
                  loading="eager"
                  className="w-full h-auto object-cover"
                />
                <div className="px-6 py-4 bg-white border-t border-border flex items-center justify-between gap-4">
                  <p className="text-xs sm:text-sm text-secondary-text">
                    {womensImage.caption}
                  </p>
                  <Badge variant="success" className="shrink-0 text-[11px]">
                    Safeguarded
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ 6. SAFEGUARDING & TRANSPARENCY COMMITMENT ═══ */}
        <Section background="ivory" padding="lg">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-forest-green px-3.5 py-1.5 rounded-full bg-soft-sage">
                Accountability &amp; Safeguarding
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                Honest Disclosures &amp; Child Privacy Protection
              </h2>
              <p className="text-secondary-text text-base leading-relaxed">
                We publish verified details transparently and clearly distinguish supplied registry
                references (<span className="font-medium text-main-text">{SITE_CONFIG.registry.registrationReference}</span>,{" "}
                directory listings referencing 12A/80G/FCRA) that still await independent document verification.
              </p>
              <p className="text-secondary-text text-base leading-relaxed">
                Online donations remain disabled pending bank and compliance clearance, and all
                photographs containing identifiable minors remain restricted in staff review unless
                documented parental permission is obtained.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/impact">
                  <Button variant="outline" size="md">
                    <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                    Impact &amp; Registry Disclosures
                  </Button>
                </Link>
                <Link href="/safeguarding">
                  <Button variant="ghost" size="md">
                    <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
                    Child Safeguarding Policy
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-5">
              {[
                {
                  icon: Shield,
                  label: "Child Safeguarding",
                  desc: "Mandatory volunteer screening & photography consent",
                },
                {
                  icon: FileText,
                  label: "Zero Fabrication",
                  desc: "Unverified claims & compliance items clearly marked",
                },
                {
                  icon: Users,
                  label: "Supervised Access",
                  desc: "No unsupervised volunteer access to children",
                },
                {
                  icon: Heart,
                  label: "Ethical Communication",
                  desc: "Dignity-first storytelling without exploitation",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl border border-border p-6 text-center shadow-xs"
                >
                  <item.icon className="w-8 h-8 text-forest-green mx-auto mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-base text-main-text mb-1">{item.label}</h3>
                  <p className="text-xs text-secondary-text leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ 7. WAYS TO CONTRIBUTE ═══ */}
        <Section background="white" padding="lg">
          <SectionHeading
            eyebrow="Get Involved"
            title="Ways to Support Safely & Responsibly"
            subtitle="Whether offering vetted volunteer skills, educational supplies, or community partnerships, every contribution starts with dialogue."
          />

          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            <Card variant="bordered" padding="lg" className="text-center flex flex-col justify-between">
              <div>
                <div className="w-13 h-13 bg-soft-sage text-forest-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HandHeart className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2.5">
                  Volunteer (Screened)
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  Express interest in supervised learning assistance, creative workshops, or logistics after safeguarding checks.
                </p>
              </div>
              <Link href="/get-involved#volunteer-form">
                <Button variant="primary" size="md" className="w-full">
                  Express Interest
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg" className="text-center flex flex-col justify-between">
              <div>
                <div className="w-13 h-13 bg-muted-terracotta/15 text-muted-terracotta-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2.5">
                  Support &amp; Supplies
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  Donate books, stationery kits, or review our financial support &amp; payment verification notice.
                </p>
              </div>
              <Link href="/support">
                <Button variant="secondary" size="md" className="w-full">
                  Support Information
                </Button>
              </Link>
            </Card>

            <Card variant="bordered" padding="lg" className="text-center flex flex-col justify-between">
              <div>
                <div className="w-13 h-13 bg-warm-gold/25 text-main-text rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2.5">
                  Partnerships &amp; Outreach
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed mb-6">
                  Explore responsible collaborations across schools, community groups, and organisations in Bengaluru.
                </p>
              </div>
              <Link href="/get-involved#partnerships">
                <Button variant="outline" size="md" className="w-full">
                  Partner With Us
                </Button>
              </Link>
            </Card>
          </div>
        </Section>

        {/* ═══ 8. BOTTOM CONTACT CALL TO ACTION ═══ */}
        <section className="bg-forest-green text-white py-16 sm:py-22 border-t border-forest-green-dark">
          <div className="page-container text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white">
              Connect With BORN FOUNDATION
            </h2>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed">
              Visit our secretariat note or reach us from Shanthinagar, Bengaluru to learn more about supporting children and community development.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href={SITE_CONFIG.contact.phoneHref}>
                <Button variant="gold" size="lg">
                  <Phone className="w-5 h-5 mr-2.5" aria-hidden="true" />
                  Call {SITE_CONFIG.contact.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/60 text-white hover:bg-white hover:text-forest-green"
                >
                  Open Enquiry Form
                  <ArrowRight className="w-5 h-5 ml-2.5" aria-hidden="true" />
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
