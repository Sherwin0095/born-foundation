"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Share2,
  BookOpen,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Badge, Button } from "@/components/ui";
import { getStoryBySlug } from "@/lib/data-store";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function StoryDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const story = getStoryBySlug(slug);

  if (!story || story.status !== "published") {
    notFound();
  }

  const paragraphs = story.content.split("\n\n");

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={story.title}
          subtitle={story.excerpt}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Stories", href: "/stories" },
            { label: story.title },
          ]}
        />

        <Section background="white">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm text-secondary-text hover:text-forest-green mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all stories
            </Link>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Badge variant="default" className="text-sm">
                  {story.category}
                </Badge>
                {story.published_at && (
                  <span className="text-xs text-secondary-text flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Published {formatDate(story.published_at)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-secondary-text bg-soft-sage/40 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-forest-green" />
                <span>Safeguarding Approved</span>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg text-main-text leading-relaxed space-y-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-secondary-text text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </article>

            {/* Footer disclosure */}
            <div className="mt-12 p-6 rounded-xl bg-warm-ivory border border-border text-xs text-secondary-text">
              <p className="font-semibold text-main-text mb-1">Notice on Anonymization</p>
              <p>
                In compliance with the Born Foundation Child Safeguarding Code, personal identifiers
                and locations have been generalized to safeguard children and their families.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
