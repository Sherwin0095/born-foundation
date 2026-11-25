import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero, Section } from "@/components/ui";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "View safeguarding-approved, EXIF-stripped community activity photographs from BORN FOUNDATION in Bengaluru.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Community Photo Gallery"
          subtitle="Non-identifying community and educator photographs reviewed and processed under strict Child Safeguarding guidelines."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Gallery" },
          ]}
        />
        <Section background="white">
          <div className="max-w-6xl mx-auto">
            <GalleryClient />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
