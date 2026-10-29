import Link from "next/link";
import { Heart, Mail, MapPin, ShieldCheck } from "lucide-react";
import { FOOTER_NAV } from "@/lib/types";
import { SITE_CONFIG } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-green text-white border-t border-forest-green-dark" role="contentinfo">
      <div className="page-container">
        {/* Main Footer Links */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Purpose (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white/20 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white">
                Born Foundation
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Dedicated to the care, wellbeing, development, and support of children
              who need assistance. Every child deserves a secure, nurturing environment
              to learn, grow, and thrive.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-white/80 pt-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@bornfoundation.org"
                  className="hover:text-warm-gold transition-colors"
                >
                  info@bornfoundation.org
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-warm-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-snug">{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-warm-gold shrink-0" aria-hidden="true" />
                <span>Child Protection Code of Conduct Compliant</span>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gold">
              Organisation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.about.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gold">
              Get Involved
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gold">
              Governance
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; {currentYear} Born Foundation. Non-governmental Organisation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/safeguarding" className="hover:text-white transition-colors">
              Safeguarding Policy
            </Link>
            <Link href="/login" className="hover:text-warm-gold transition-colors font-medium">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
