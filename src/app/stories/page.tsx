"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Badge, EmptyState } from "@/components/ui";
import { getPublishedStories } from "@/lib/data-store";
import { formatDate } from "@/lib/utils";

export default function StoriesPage() {
  const stories = useMemo(() => {
    return getPublishedStories();
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Stories & Updates"
          subtitle="Insight into our grassroots work, community transformations, and milestones in child empowerment."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Stories & Updates" },
          ]}
        />

        <Section background="white">
          <div className="max-w-6xl mx-auto">
            {/* Child Safeguarding Note */}
            <div className="mb-10 p-4 rounded-xl bg-warm-ivory border border-border flex items-center gap-3 text-xs text-secondary-text">
              <ShieldCheck className="w-5 h-5 text-forest-green shrink-0" />
              <span>
                <strong>Safeguarding Disclosure:</strong> To protect the dignity and privacy of minors,
                all stories use anonymized identities and authorized illustrative context in strict compliance
                with our Child Safeguarding Policy.
              </span>
            </div>

            {stories.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="w-12 h-12 text-secondary-text" />}
                title="No Stories Published Yet"
                description="Our team is in the field. Stories undergoing editorial and safeguarding review will be published shortly."
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                  <Link key={story.id} href={`/stories/${story.slug}`} className="group block h-full">
                    <Card
                      variant="bordered"
                      padding="none"
                      className="h-full flex flex-col justify-between overflow-hidden hover:border-forest-green hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="h-48 bg-soft-sage/50 flex items-center justify-center border-b border-border">
                          <BookOpen className="w-10 h-10 text-forest-green/40 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <Badge variant="default">{story.category}</Badge>
                            {story.published_at && (
                              <span className="text-xs text-secondary-text flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(story.published_at)}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2 group-hover:text-forest-green transition-colors">
                            {story.title}
                          </h3>
                          <p className="text-secondary-text text-sm line-clamp-3 leading-relaxed">
                            {story.excerpt || story.content}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-green">
                          Read Story
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Card>
                  </Link>
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
