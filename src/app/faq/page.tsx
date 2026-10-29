"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section, Accordion } from "@/components/ui";
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
          subtitle="Find answers to common questions about Born Foundation, our programmes, volunteering, donations, and more."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />

        <Section background="white">
          <div className="max-w-4xl mx-auto">
            {/* Category Filter Tabs */}
            <div className="mb-10">
              <nav aria-label="FAQ categories" className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

            {/* FAQ Accordion */}
            {accordionItems.length > 0 ? (
              <Accordion items={accordionItems} />
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary-text text-lg">
                  No questions found for this category.
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-12 p-8 bg-soft-sage/50 rounded-xl text-center">
              <h2 className="text-xl font-bold text-main-text mb-3">
                Still Have Questions?
              </h2>
              <p className="text-secondary-text mb-6 max-w-lg mx-auto">
                If you couldn&apos;t find the answer you were looking for, please don&apos;t
                hesitate to get in touch. We&apos;re happy to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-forest-green text-white font-medium rounded-lg hover:bg-forest-green-light transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
