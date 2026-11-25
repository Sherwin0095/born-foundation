"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Card, Badge, Button, EmptyState } from "@/components/ui";
import { MOCK_STORIES } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { formatDate } from "@/lib/utils";
import type { Story } from "@/lib/types";

export default function StoriesPage() {
  const rawStories = useStoredData<Story[]>("stories", MOCK_STORIES);
  const stories = useMemo(
    () =>
      rawStories
        .filter((s) => s.status === "published")
        .sort(
          (a, b) =>
            new Date(b.published_at || b.created_at).getTime() -
            new Date(a.published_at || a.created_at).getTime()
        ),
    [rawStories]
  );

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Stories & Updates"
          subtitle="Approved organisational updates and safeguarding-reviewed reflections from BORN FOUNDATION."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Stories & Updates" },
          ]}
        />

        <Section background="white">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="p-5 rounded-2xl bg-warm-ivory border border-border flex items-start gap-3 text-xs sm:text-sm text-secondary-text">
              <ShieldCheck className="w-5 h-5 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="text-main-text">Editorial &amp; Safeguarding Verification Policy:</strong>{" "}
                BORN FOUNDATION does not publish invented testimonials, assumed personal histories,
                or unverified event dates. Updates appear here only after editorial and safeguarding approval.
              </span>
            </div>

            {stories.length === 0 ? (
              <EmptyState
                icon={<BookOpen className="w-12 h-12 text-forest-green" aria-hidden="true" />}
                title="Verified Updates Coming Soon"
                description="No public news articles or field stories have been approved for publication yet. Staff can compose, review, and publish verified updates through the protected editorial console."
                action={
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/programmes">
                      <Button variant="primary" size="sm">
                        Explore Focus Areas
                      </Button>
                    </Link>
                    <Link href="/gallery">
                      <Button variant="outline" size="sm">
                        Browse Approved Gallery
                      </Button>
                    </Link>
                  </div>
                }
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
                        {story.featured_image_url ? (
                          <div className="aspect-[16/9] bg-surface-muted border-b border-border overflow-hidden">
                            <Image
                              src={story.featured_image_url}
                              alt={story.title}
                              width={800}
                              height={450}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-44 bg-soft-sage/45 flex items-center justify-center border-b border-border">
                            <BookOpen className="w-10 h-10 text-forest-green/50" aria-hidden="true" />
                          </div>
                        )}
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
                          <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2 group-hover:text-forest-green transition-colors">
                            {story.title}
                          </h2>
                          <p className="text-secondary-text text-sm line-clamp-3 leading-relaxed">
                            {story.excerpt || story.content}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-green">
                          Read Update
                          <ArrowRight
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          />
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
