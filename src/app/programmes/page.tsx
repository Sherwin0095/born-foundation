"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Apple,
  Shield,
  Sparkles,
  Compass,
  Users,
  ArrowRight,
  Info,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Badge, EmptyState } from "@/components/ui";
import { MOCK_PROGRAMMES } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { PROGRAMME_CATEGORIES, type Programme } from "@/lib/types";

export default function ProgrammesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const rawProgrammes = useStoredData<Programme[]>("programmes", MOCK_PROGRAMMES);

  const programmes = useMemo(
    () =>
      rawProgrammes
        .filter((p) => p.status === "published")
        .sort((a, b) => a.order_index - b.order_index),
    [rawProgrammes]
  );

  const filteredProgrammes = useMemo(() => {
    if (selectedCategory === "all") return programmes;
    return programmes.filter((p) => p.category === selectedCategory);
  }, [programmes, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <BookOpen className="w-5 h-5" aria-hidden="true" />;
      case "nutrition":
        return <Apple className="w-5 h-5" aria-hidden="true" />;
      case "child-development":
        return <Shield className="w-5 h-5" aria-hidden="true" />;
      case "cultural":
        return <Sparkles className="w-5 h-5" aria-hidden="true" />;
      case "experiences":
        return <Compass className="w-5 h-5" aria-hidden="true" />;
      case "women-community":
        return <Users className="w-5 h-5" aria-hidden="true" />;
      default:
        return <BookOpen className="w-5 h-5" aria-hidden="true" />;
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Our Programmes & Focus Areas"
          subtitle="Structured community focus areas supporting children's learning, wellbeing, and women & child development."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Our Work" },
          ]}
        />

        <Section background="white">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Honest Scope Classification Note */}
            <div className="p-5 rounded-2xl bg-warm-ivory border border-border flex items-start gap-3 text-xs sm:text-sm text-secondary-text">
              <Info className="w-5 h-5 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">
                <strong className="text-main-text">Distinguishing Focus Areas from Formal Programme Schedules:</strong>{" "}
                The six tracks below reflect BORN FOUNDATION&apos;s stated focus areas and community
                activities observed in supplied documentation. Formal programme titles, batch timings,
                and centre intake procedures will be published upon organisational confirmation.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <nav aria-label="Focus area category filters" className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                aria-pressed={selectedCategory === "all"}
                className={`min-h-10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-forest-green text-white"
                    : "bg-surface-muted text-main-text hover:bg-soft-sage border border-border"
                }`}
              >
                All Focus Areas
              </button>
              {PROGRAMME_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  aria-pressed={selectedCategory === cat.value}
                  className={`min-h-10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat.value
                      ? "bg-forest-green text-white"
                      : "bg-surface-muted text-main-text hover:bg-soft-sage border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* Grid */}
            {filteredProgrammes.length === 0 ? (
              <EmptyState
                title="No Focus Areas in Selection"
                description="Try selecting All Focus Areas to browse all documented themes."
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProgrammes.map((prog) => (
                  <Card
                    key={prog.id}
                    variant="interactive"
                    padding="none"
                    className="flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {prog.featured_image_url ? (
                        <div className="aspect-[16/9] bg-surface-muted overflow-hidden border-b border-border">
                          <Image
                            src={prog.featured_image_url}
                            alt={prog.title}
                            width={800}
                            height={450}
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-32 bg-soft-sage/45 border-b border-border flex items-center justify-center text-forest-green">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center shadow-xs">
                            {getCategoryIcon(prog.category)}
                          </div>
                        </div>
                      )}

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="default" className="text-[11px] capitalize">
                            {prog.category.replace("-", " ")}
                          </Badge>
                          <span className="text-[11px] text-secondary-text font-medium">
                            {prog.is_focus_area_only ? "Focus Area" : "Published Track"}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text group-hover:text-forest-green transition-colors">
                          {prog.title}
                        </h2>

                        <p className="text-secondary-text text-sm leading-relaxed">
                          {prog.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-surface-muted/40">
                      <span className="text-xs text-secondary-text truncate pr-2">
                        {prog.is_focus_area_only ? "Details pending confirmation" : "Verified"}
                      </span>

                      <Link
                        href={`/programmes/${prog.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-green hover:text-forest-green-deep shrink-0"
                      >
                        Full Details
                        <ArrowRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
