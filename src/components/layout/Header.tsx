"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Heart,
  Shield,
  ArrowRight,
  Phone,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_ITEMS } from "@/lib/types";
import { SITE_CONFIG } from "@/lib/site-config";

export function Header() {
  const pathname = usePathname();
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isMobileMenuOpen = openMenuPath === pathname;

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenuPath(null);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Top Organisational Info Banner */}
      {isBannerVisible && SITE_CONFIG.banner.enabled && (
        <div className="bg-forest-green-dark text-white text-xs sm:text-sm py-2 border-b border-white/10">
          <div className="page-container flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Sparkles
                className="w-3.5 h-3.5 text-warm-gold-light shrink-0 hidden sm:inline"
                aria-hidden="true"
              />
              <span className="hidden md:inline-flex px-2 py-0.5 rounded-full bg-white/10 text-warm-gold-light font-semibold text-[11px] tracking-wide uppercase shrink-0">
                {SITE_CONFIG.banner.badge}
              </span>
              <span className="text-white/95 truncate font-medium">
                {SITE_CONFIG.banner.text}
              </span>
              <Link
                href={SITE_CONFIG.banner.linkHref}
                className="hidden lg:inline-flex items-center gap-1 text-warm-gold-light hover:text-white font-semibold underline underline-offset-2 ml-1 shrink-0 transition-colors"
              >
                <span>{SITE_CONFIG.banner.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsBannerVisible(false)}
              className="text-white/75 hover:text-white p-1.5 rounded-md transition-colors shrink-0 min-w-8 min-h-8 inline-flex items-center justify-center cursor-pointer"
              aria-label="Dismiss top notice banner"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Row */}
      <div className="page-container">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Typographic Wordmark & Emblem */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 rounded-xl py-1 group"
            aria-label="BORN FOUNDATION Home"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-forest-green rounded-xl flex items-center justify-center text-white shadow-xs group-hover:bg-forest-green-deep transition-colors shrink-0">
              <Heart className="w-5 h-5 fill-white/20 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl xl:text-2xl font-bold tracking-tight text-forest-green font-[family-name:var(--font-heading)] leading-none group-hover:text-forest-green-deep transition-colors">
                BORN FOUNDATION
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary-text mt-1 hidden sm:block">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Primary Nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5"
            aria-label="Main navigation"
          >
            {PUBLIC_NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2.5 xl:px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors select-none",
                    isActive
                      ? "text-forest-green bg-soft-sage"
                      : "text-main-text hover:text-forest-green hover:bg-surface-muted"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/support"
              className="hidden sm:inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 min-h-11 bg-muted-terracotta text-white text-sm font-bold rounded-xl hover:bg-muted-terracotta-dark shadow-xs transition-colors whitespace-nowrap"
            >
              <Heart className="w-4 h-4 fill-white/20" aria-hidden="true" />
              <span>Support Us</span>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpenMenuPath(isMobileMenuOpen ? null : pathname)}
              className="lg:hidden min-w-11 min-h-11 p-2.5 rounded-xl border border-border text-main-text hover:text-forest-green hover:bg-surface-muted transition-colors inline-flex items-center justify-center cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Height Clean Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col"
          onClick={() => setOpenMenuPath(null)}
        >
          <div
            className="bg-white w-full max-h-[92vh] overflow-y-auto shadow-2xl border-b border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drawer Top Header */}
            <div className="page-container h-20 flex items-center justify-between border-b border-border">
              <span className="text-lg font-bold text-forest-green font-[family-name:var(--font-heading)]">
                BORN FOUNDATION
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpenMenuPath(null);
                  menuButtonRef.current?.focus();
                }}
                className="min-w-11 min-h-11 p-2.5 rounded-xl border border-border text-main-text hover:bg-surface-muted inline-flex items-center justify-center cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links & Actions */}
            <div className="page-container py-6 space-y-5">
              <nav className="space-y-1.5" aria-label="Mobile main navigation">
                {PUBLIC_NAV_ITEMS.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenMenuPath(null)}
                      className={cn(
                        "flex items-center justify-between min-h-12 px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                        isActive
                          ? "text-forest-green bg-soft-sage font-bold"
                          : "text-main-text hover:bg-surface-muted hover:text-forest-green"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-secondary-text" aria-hidden="true" />
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-border space-y-3">
                <Link
                  href="/support"
                  onClick={() => setOpenMenuPath(null)}
                  className="w-full min-h-12 flex items-center justify-center gap-2 py-3.5 px-6 bg-muted-terracotta text-white rounded-xl font-bold text-base shadow-xs hover:bg-muted-terracotta-dark transition-colors"
                >
                  <Heart className="w-5 h-5 fill-white/20" aria-hidden="true" />
                  <span>Support Our Work</span>
                </Link>

                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-secondary-text pt-2 px-1">
                  <Link
                    href="/safeguarding"
                    onClick={() => setOpenMenuPath(null)}
                    className="hover:text-forest-green underline flex items-center gap-1.5 py-2"
                  >
                    <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                    Safeguarding Policy
                  </Link>
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="hover:text-forest-green font-semibold flex items-center gap-1.5 py-2"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export { Header as SiteHeader };
