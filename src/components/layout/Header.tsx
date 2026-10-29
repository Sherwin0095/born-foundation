"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_ITEMS } from "@/lib/types";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu automatically on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="page-container">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity (Left) */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-forest-green rounded-lg py-1"
            aria-label="Born Foundation Home"
          >
            <div className="w-11 h-11 bg-forest-green rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
              <Heart className="w-6 h-6 fill-white/20 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-forest-green font-[family-name:var(--font-heading)] leading-none">
                Born Foundation
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary-text mt-1 hidden sm:block">
                Caring for Every Child
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav
            className="hidden lg:flex items-center gap-1.5"
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
                    "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                    isActive
                      ? "text-forest-green bg-soft-sage shadow-xs"
                      : "text-main-text hover:text-forest-green hover:bg-surface-muted"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Toggle (Right) */}
          <div className="flex items-center gap-3">
            <Link
              href="/support"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-muted-terracotta text-white text-sm font-bold rounded-lg hover:bg-muted-terracotta-dark shadow-sm transition-all active:scale-[0.98]"
            >
              <Heart className="w-4 h-4 fill-white/20" aria-hidden="true" />
              <span>Support Us</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-main-text hover:text-forest-green hover:bg-surface-muted transition-colors focus-visible:outline-2 focus-visible:outline-forest-green"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-black/40 z-50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-border shadow-xl px-5 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
                      "block px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                      isActive
                        ? "text-forest-green bg-soft-sage font-bold"
                        : "text-main-text hover:bg-surface-muted hover:text-forest-green"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-border">
              <Link
                href="/support"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-muted-terracotta text-white rounded-xl font-bold text-base shadow-sm hover:bg-muted-terracotta-dark transition-colors"
              >
                <Heart className="w-5 h-5 fill-white/20" aria-hidden="true" />
                <span>Support Our Work</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
