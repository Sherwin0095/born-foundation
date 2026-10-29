import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: {
    default: "Born Foundation — Caring for Every Child's Tomorrow",
    template: "%s | Born Foundation",
  },
  description:
    "Born Foundation is a non-profit organisation dedicated to the care, wellbeing, development and support of children who need assistance.",
  keywords: [
    "Born Foundation",
    "NGO",
    "children",
    "education",
    "nutrition",
    "child welfare",
    "India",
    "non-profit",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Born Foundation",
    title: "Born Foundation — Caring for Every Child's Tomorrow",
    description:
      "Dedicated to the care, wellbeing, development and support of children who need assistance.",
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
