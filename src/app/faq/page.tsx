"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Accordion, Button } from "@/components/ui";
import { MOCK_FAQ } from "@/lib/mock-data";

const ALL_CATEGORY = "All";

export default function FAQPage() {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(MOCK_FAQ.map((faq) => faq.category)));
    return [ALL_CATEGORY, ...cats];
  }, []);

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const filteredFAQs = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return MOCK_FAQ;
    return MOCK_FAQ.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const accordionItems = filteredFAQs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Frequently Asked Questions"
          subtitle="Clear answers about BORN FOUNDATION, children's welfare, women & child development, volunteering screening, and safeguarding."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      activeCategory === category
                        ? "bg-forest-green text-white"
                        : "bg-soft-sage text-main-text hover:bg-soft-sage-dark"
                    }`}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            {accordionItems.length > 0 ? (
              <Accordion items={accordionItems} />
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary-text text-lg">
                  No questions found for this category.
                </p>
              </div>
            )}

            <div className="mt-12 p-8 bg-soft-sage/50 rounded-2xl border border-border text-center space-y-4">
              <h2 className="text-xl font-bold text-main-text">Still Have Questions?</h2>
              <p className="text-secondary-text text-sm sm:text-base max-w-lg mx-auto">
                Reach out through our online contact form or telephone if your question isn&apos;t listed here.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="md">
                  Contact BORN FOUNDATION
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
