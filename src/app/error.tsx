"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log without exposing confidential stack in production
    console.error("[Application Error]:", error.message);
  }, [error]);

  return (
    <div className="min-h-screen bg-warm-ivory flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-border text-center space-y-6 shadow-sm">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Something went wrong
        </h1>
        <p className="text-sm text-secondary-text leading-relaxed">
          We encountered an unexpected problem rendering this page. Our team has been notified.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" onClick={() => reset()}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
