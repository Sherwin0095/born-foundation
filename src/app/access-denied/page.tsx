import Link from "next/link";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui";

export default function AccessDeniedPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-border shadow-xs">
          <div className="w-16 h-16 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Access Denied
          </h1>
          <p className="text-secondary-text text-sm leading-relaxed">
            This resource or administrative section is restricted to authorised BORN FOUNDATION staff
            accounts with appropriate role permissions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/login">
              <Button variant="primary" size="sm">
                <Lock className="w-4 h-4 mr-2" aria-hidden="true" />
                Staff Sign In
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
