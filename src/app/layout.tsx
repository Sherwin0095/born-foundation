import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { SITE_CONFIG } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.supportingStatement,
  keywords: [
    "BORN FOUNDATION",
    "Bengaluru NGO",
    "children welfare",
    "women and child development",
    "education support",
    "Shanthinagar Bengaluru",
    "child safeguarding",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.homepageHeadline}`,
    description: SITE_CONFIG.supportingStatement,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data built strictly from supplied organisational details
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.legalName,
    telephone: "+91-99864-95292",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 6/2, Langford Road, 4th Cross, Shanthinagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560027",
      addressCountry: "IN",
    },
    areaServed: "Bengaluru, Karnataka, India",
    description: SITE_CONFIG.supportingStatement,
  };

  return (
    <html lang="en-IN" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
