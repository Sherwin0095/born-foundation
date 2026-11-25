"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  Target,
  Shield,
  HeartHandshake,
  Info,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Button, Badge } from "@/components/ui";
import { getProgrammeBySlug } from "@/lib/data-store";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProgrammeDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const programme = getProgrammeBySlug(slug);

  if (!programme || programme.status !== "published") {
    notFound();
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={programme.title}
          subtitle={programme.description}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Work", href: "/programmes" },
            { label: programme.title },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 text-sm text-secondary-text hover:text-forest-green mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to all focus areas
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="default" className="text-sm px-3 py-1 capitalize">
                Category: {programme.category.replace("-", " ")}
              </Badge>
              <Badge variant="warning" className="text-xs">
                {programme.is_focus_area_only
                  ? "Focus Area / Observed Community Theme"
                  : "Confirmed Initiative"}
              </Badge>
            </div>

            {programme.featured_image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-border shadow-sm max-w-2xl">
                <Image
                  src={programme.featured_image_url}
                  alt={programme.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-secondary-text text-base leading-relaxed mb-10">
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Overview
                </h2>
                <p>{programme.description}</p>
              </div>

              {programme.objectives && (
                <div className="bg-warm-ivory p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-forest-green" aria-hidden="true" />
                    Core Aims
                  </h3>
                  <p>{programme.objectives}</p>
                </div>
              )}

              {programme.activities && (
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-forest-green" aria-hidden="true" />
                    Observed &amp; Supporting Activities
                  </h3>
                  <p>{programme.activities}</p>
                </div>
              )}

              {programme.eligibility && (
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-forest-green" aria-hidden="true" />
                    Participation Scope
                  </h3>
                  <p>{programme.eligibility}</p>
                </div>
              )}

              {programme.outcomes && (
                <div className="p-6 rounded-xl bg-soft-sage/45 border border-soft-sage-dark/40">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-forest-green" aria-hidden="true" />
                    Reporting &amp; Verification Status
                  </h3>
                  <p className="text-sm">{programme.outcomes}</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-surface-muted border border-border text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Formal programme schedules, centre locations, and guardian registration forms will
                  be linked here once directly confirmed by BORN FOUNDATION.
                </span>
              </div>
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-forest-green text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-white mb-1">
                  Enquire About Supporting This Area
                </h3>
                <p className="text-sm text-white/85 max-w-md">
                  Connect regarding in-kind educational supplies, screened volunteering, or partnerships.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href="/get-involved">
                  <Button variant="secondary">
                    <HeartHandshake className="w-4 h-4 mr-2" aria-hidden="true" />
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
