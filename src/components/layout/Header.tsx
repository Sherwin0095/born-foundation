"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Shield, ArrowRight, Mail, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_ITEMS } from "@/lib/types";
import { SITE_CONFIG } from "@/lib/site-config";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const pathname = usePathname();

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* ── Top Announcement Banner (Easily Editable via SITE_CONFIG) ── */}
      {isBannerVisible && SITE_CONFIG.banner.enabled && (
        <div className="bg-forest-green-dark text-white text-xs sm:text-sm py-2 px-4 border-b border-white/10 transition-all">
          <div className="page-container flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 truncate mx-auto sm:mx-0">
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-warm-gold/20 text-warm-gold font-semibold text-[11px] tracking-wide uppercase">
                {SITE_CONFIG.banner.badge}
              </span>
              <span className="text-white/90 truncate font-medium">
                {SITE_CONFIG.banner.text}
              </span>
              <Link
                href={SITE_CONFIG.banner.linkHref}
                className="hidden md:inline-flex items-center gap-1 text-warm-gold hover:text-white font-semibold underline underline-offset-2 ml-2 transition-colors"
              >
                <span>{SITE_CONFIG.banner.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <button
              onClick={() => setIsBannerVisible(false)}
              className="text-white/60 hover:text-white p-1 rounded-md transition-colors shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Main Navigation Bar ── */}
      <div className="page-container">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3.5 shrink-0 focus-visible:outline-2 focus-visible:outline-forest-green rounded-xl py-1 group"
            aria-label="Born Foundation Home"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-forest-green rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:bg-forest-green-deep transition-all shrink-0">
              <Heart className="w-6 h-6 fill-white/20 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-forest-green font-[family-name:var(--font-heading)] leading-none group-hover:text-forest-green-deep transition-colors">
                Born Foundation
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary-text mt-1.5 hidden sm:block">
                Caring for Every Child
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-2 xl:gap-3"
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
                    "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 select-none",
                    isActive
                      ? "text-forest-green bg-soft-sage/80 shadow-xs"
                      : "text-main-text hover:text-forest-green hover:bg-surface-muted"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Hamburger Toggle */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/support"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-muted-terracotta text-white text-sm font-bold rounded-xl hover:bg-muted-terracotta-dark shadow-sm transition-all active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 fill-white/20" aria-hidden="true" />
              <span>Support Us</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl border border-border text-main-text hover:text-forest-green hover:bg-surface-muted transition-colors focus-visible:outline-2 focus-visible:outline-forest-green"
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

      {/* ── Mobile Drawer Overlay ── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-x-0 bottom-0 bg-black/60 z-50 backdrop-blur-xs top-[81px] sm:top-[89px]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-border shadow-2xl p-6 space-y-6 max-h-full overflow-y-auto animate-in slide-in-from-top-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nav list */}
            <nav className="space-y-1.5" aria-label="Mobile main navigation">
              {PUBLIC_NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-colors",
                      isActive
                        ? "text-forest-green bg-soft-sage font-bold"
                        : "text-main-text hover:bg-surface-muted hover:text-forest-green"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-secondary-text opacity-50" />
                  </Link>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border space-y-3">
              <Link
                href="/support"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-muted-terracotta text-white rounded-xl font-bold text-base shadow-sm hover:bg-muted-terracotta-dark transition-colors"
              >
                <Heart className="w-5 h-5 fill-white/20" aria-hidden="true" />
                <span>Support Our Work</span>
              </Link>

              <div className="flex items-center justify-between text-xs text-secondary-text pt-2 px-1">
                <Link
                  href="/safeguarding"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-forest-green underline flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Safeguarding
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-forest-green underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
