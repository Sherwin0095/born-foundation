"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ShieldCheck,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
  ImageOff,
} from "lucide-react";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import {
  APPROVED_PUBLIC_GALLERY,
  RESTRICTED_ARCHIVE_BREAKDOWN,
  type PublicGalleryItem,
} from "@/lib/media-register";

const GALLERY_CATEGORIES = [
  { id: "all", label: "All Approved Photographs" },
  { id: "women-community", label: "Women & Community" },
  { id: "education", label: "Education & Learning" },
  { id: "cultural", label: "Cultural & Community" },
  { id: "nutrition", label: "Nutrition & Wellbeing" },
  { id: "experiences", label: "Educational Outings" },
];

export function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const visiblePhotos =
    selectedCategory === "all"
      ? APPROVED_PUBLIC_GALLERY
      : APPROVED_PUBLIC_GALLERY.filter((p) => p.category === selectedCategory);

  const activePhoto: PublicGalleryItem | null =
    activeIndex !== null && visiblePhotos[activeIndex] ? visiblePhotos[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, visiblePhotos.length]);

  const heldInCurrentCategory = RESTRICTED_ARCHIVE_BREAKDOWN.heldCategories.find(
    (c) => c.category === selectedCategory
  );

  return (
    <div className="space-y-10">
      {/* Safeguarding & Privacy Review Disclosure */}
      <div className="p-6 rounded-2xl bg-soft-sage/45 border border-soft-sage-dark/40 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-forest-green text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-main-text">
              Child Safeguarding Gallery Protocol
            </h2>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed max-w-3xl">
              To uphold children&apos;s dignity and privacy, every supplied photograph undergoes
              EXIF metadata removal and safeguarding screening before public display. Of{" "}
              <strong>{RESTRICTED_ARCHIVE_BREAKDOWN.totalArchivedPhotographs}</strong> archived source
              photographs, <strong>{RESTRICTED_ARCHIVE_BREAKDOWN.publiclyApprovedDerivatives}</strong>{" "}
              non-identifying community scenes are published here while{" "}
              <strong>{RESTRICTED_ARCHIVE_BREAKDOWN.heldPendingConsentCount}</strong> photographs showing
              identifiable children remain safeguarded in private review awaiting documented guardian consent.
            </p>
          </div>
        </div>
        <Link href="/safeguarding" className="shrink-0">
          <Button variant="outline" size="sm">
            Read Safeguarding Policy
          </Button>
        </Link>
      </div>

      {/* Category Filter Tabs */}
      <nav aria-label="Gallery category filters" className="flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveIndex(null);
              }}
              aria-pressed={isSelected}
              className={`min-h-10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isSelected
                  ? "bg-forest-green text-white"
                  : "bg-surface-muted text-main-text hover:bg-soft-sage border border-border"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {/* Gallery Grid or Graceful Safeguarding Empty State */}
      {visiblePhotos.length === 0 ? (
        <EmptyState
          icon={<Lock className="w-12 h-12 text-forest-green" aria-hidden="true" />}
          title="Photographs Held Pending Safeguarding Consent"
          description={
            heldInCurrentCategory
              ? `${heldInCurrentCategory.count} archived photograph(s) in "${heldInCurrentCategory.label}" show identifiable children and are held in BORN FOUNDATION's private review queue until documented guardian consent is authorised.`
              : "No approved non-identifying photographs are currently published in this category."
          }
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="sm" onClick={() => setSelectedCategory("all")}>
                Show Approved Photographs
              </Button>
              <Link href="/safeguarding">
                <Button variant="outline" size="sm">
                  View Photography Consent Standards
                </Button>
              </Link>
            </div>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePhotos.map((item, idx) => (
            <Card
              key={item.id}
              variant="interactive"
              padding="none"
              className="overflow-hidden flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="text-left w-full group focus-visible:outline-2 focus-visible:outline-forest-green cursor-pointer"
                aria-label={`Open larger view of ${item.title}`}
              >
                <div className="relative aspect-[16/10] bg-surface-muted overflow-hidden border-b border-border">
                  <Image
                    src={item.mediumWebpSrc}
                    alt={item.altText}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] font-medium flex items-center gap-1">
                    <Camera className="w-3 h-3" aria-hidden="true" />
                    Inspect
                  </span>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="default" className="text-[11px] whitespace-nowrap">
                      {item.categoryLabel}
                    </Badge>
                    <Badge variant="success" className="text-[10px] whitespace-nowrap shrink-0">
                      EXIF Stripped
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] text-main-text group-hover:text-forest-green transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Restricted Archive Breakdown Transparency Box */}
      <div className="p-6 rounded-2xl bg-warm-ivory border border-border">
        <div className="flex items-start gap-3 mb-4">
          <ImageOff className="w-5 h-5 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-bold text-base text-main-text">
              Why Additional Field Photographs Remain Restricted
            </h3>
            <p className="text-xs sm:text-sm text-secondary-text leading-relaxed mt-1">
              Our field archive documents additional classroom learning, meal sharing, creative art,
              recreational events, and educational museum visits. Because those images contain identifiable
              children&apos;s faces, private copies are kept exclusively in internal staff moderation:
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
          {RESTRICTED_ARCHIVE_BREAKDOWN.heldCategories.map((hc) => (
            <div
              key={hc.category}
              className="p-3.5 rounded-xl bg-white border border-border text-xs space-y-1"
            >
              <span className="font-bold text-main-text block">{hc.label}</span>
              <span className="text-secondary-text">
                {hc.count} item{hc.count > 1 ? "s" : ""} in safeguarding review
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Keyboard Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-muted">
              <div className="flex items-center gap-2 min-w-0">
                <Badge variant="default" className="text-[11px] shrink-0">
                  {activePhoto.categoryLabel}
                </Badge>
                <h3
                  id="lightbox-title"
                  className="font-bold text-sm sm:text-base text-main-text truncate"
                >
                  {activePhoto.title}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setActiveIndex(null)}
                className="min-w-10 min-h-10 p-2 rounded-lg border border-border bg-white text-main-text hover:bg-surface-muted inline-flex items-center justify-center cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              <Image
                src={activePhoto.webpSrc}
                alt={activePhoto.altText}
                width={activePhoto.width}
                height={activePhoto.height}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 space-y-3 bg-white">
              <p className="text-sm sm:text-base text-main-text font-medium">
                {activePhoto.caption}
              </p>
              <p className="text-xs text-secondary-text">
                <strong>Safeguarding Review Note:</strong> {activePhoto.safeguardingNote}
              </p>

              {visiblePhotos.length > 1 && (
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex! - 1 + visiblePhotos.length) % visiblePhotos.length
                      )
                    }
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
                    Previous
                  </Button>
                  <span className="text-xs text-secondary-text font-medium">
                    {activeIndex! + 1} of {visiblePhotos.length} (Use arrow keys or Esc)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setActiveIndex((activeIndex! + 1) % visiblePhotos.length)
                    }
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
