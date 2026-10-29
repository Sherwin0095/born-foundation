import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-soft-sage text-forest-green rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Page Not Found
          </h1>
          <p className="text-secondary-text text-sm leading-relaxed">
            The resource, story, or programme you are looking for may have been moved, updated,
            or is currently undergoing editorial review.
          </p>
          <div className="pt-2">
            <Link href="/">
              <Button variant="primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
