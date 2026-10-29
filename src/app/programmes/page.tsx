"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Apple,
  Shield,
  Lightbulb,
  Users,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Badge, Button } from "@/components/ui";
import { getPublishedProgrammes } from "@/lib/data-store";
import { PROGRAMME_CATEGORIES } from "@/lib/types";

export default function ProgrammesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const programmes = useMemo(() => {
    return getPublishedProgrammes();
  }, []);

  const filteredProgrammes = useMemo(() => {
    if (selectedCategory === "all") return programmes;
    return programmes.filter((p) => p.category === selectedCategory);
  }, [programmes, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <BookOpen className="w-5 h-5" />;
      case "nutrition":
        return <Apple className="w-5 h-5" />;
      case "care":
        return <Shield className="w-5 h-5" />;
      case "skills":
        return <Lightbulb className="w-5 h-5" />;
      case "community":
        return <Users className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Our Programmes"
          subtitle="Holistic, structured initiatives tailored to the real needs of vulnerable children and their communities."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Programmes" },
          ]}
        />

        <Section background="white">
          <div className="max-w-6xl mx-auto">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-forest-green text-white"
                    : "bg-surface-muted text-secondary-text hover:text-main-text"
                }`}
              >
                All Focus Areas
              </button>
              {PROGRAMME_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-forest-green text-white"
                      : "bg-surface-muted text-secondary-text hover:text-main-text"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Programmes Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProgrammes.map((prog) => (
                <Card
                  key={prog.id}
                  variant="bordered"
                  padding="lg"
                  className="flex flex-col justify-between hover:border-forest-green hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-soft-sage text-forest-green flex items-center justify-center group-hover:bg-forest-green group-hover:text-white transition-colors">
                        {getCategoryIcon(prog.category)}
                      </div>
                      <Badge variant="default" className="capitalize">
                        {prog.category}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3 group-hover:text-forest-green transition-colors">
                      {prog.title}
                    </h3>

                    <p className="text-secondary-text text-sm leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    {prog.objectives && (
                      <div className="mb-6 p-4 rounded-lg bg-surface-muted border border-border">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-forest-green mb-1">
                          Core Objective
                        </h4>
                        <p className="text-xs text-secondary-text leading-relaxed">
                          {prog.objectives}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-secondary-text">
                      Eligibility: <span className="text-main-text font-medium">{prog.eligibility || "Open Referral"}</span>
                    </span>

                    <Link
                      href={`/programmes/${prog.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-green hover:text-forest-green-light"
                    >
                      Full Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
