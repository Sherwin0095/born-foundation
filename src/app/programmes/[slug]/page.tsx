"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Users,
  Target,
  Shield,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Button, Badge } from "@/components/ui";
import { getProgrammeBySlug, getPublishedProgrammes } from "@/lib/data-store";

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
            { label: "Programmes", href: "/programmes" },
            { label: programme.title },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 text-sm text-secondary-text hover:text-forest-green mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all programmes
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <Badge variant="default" className="text-sm px-3 py-1 capitalize">
                Focus: {programme.category}
              </Badge>
              <span className="text-xs text-secondary-text">
                Published & Verified Initiative
              </span>
            </div>

            {/* Strategic Overview */}
            <div className="prose max-w-none text-secondary-text space-y-6 text-base leading-relaxed mb-10">
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Overview & Background
                </h2>
                <p>{programme.description}</p>
              </div>

              {programme.objectives && (
                <div className="bg-warm-ivory p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-forest-green" />
                    Key Objectives
                  </h3>
                  <p>{programme.objectives}</p>
                </div>
              )}

              {programme.activities && (
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-forest-green" />
                    Field Activities & Support Components
                  </h3>
                  <p>{programme.activities}</p>
                </div>
              )}

              {programme.eligibility && (
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-forest-green" />
                    Intended Beneficiaries & Eligibility
                  </h3>
                  <p>{programme.eligibility}</p>
                </div>
              )}

              {programme.outcomes && (
                <div className="p-6 rounded-xl bg-soft-sage/40 border border-soft-sage">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-forest-green" />
                    Audited Outcomes & Verification
                  </h3>
                  <p className="text-sm">{programme.outcomes}</p>
                </div>
              )}
            </div>

            {/* Action Box */}
            <div className="mt-12 p-8 rounded-2xl bg-forest-green text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div>
                <h4 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-1">
                  Support This Programme
                </h4>
                <p className="text-sm text-white/80 max-w-md">
                  Contribute resources, volunteer in mentoring sessions, or sponsor learning aids for this initiative.
                </p>
              </div>
              <Link href="/contact">
                <Button variant="secondary" className="shrink-0">
                  <HeartHandshake className="w-4 h-4 mr-2" />
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
