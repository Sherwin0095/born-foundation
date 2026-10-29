"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Lock, Mail, AlertCircle, Shield, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card, Input, Button } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@bornfoundation.org");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    if (res.success) {
      router.push("/admin");
    } else {
      setError(res.error || "Authentication failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-ivory flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-forest-green rounded-full flex items-center justify-center text-white">
            <Heart className="w-6 h-6" />
          </div>
        </Link>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Staff Administration
        </h1>
        <p className="mt-2 text-sm text-secondary-text">
          Authorized personnel access only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Staff Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@bornfoundation.org"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3"
              disabled={loading}
            >
              {loading ? (
                "Signing In..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Sign In to Dashboard
                </span>
              )}
            </Button>
          </form>

          {/* Quick Mock Role Login Helper for Testing */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary-text mb-3">
              Offline Demo Credentials (Password: admin123)
            </p>
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@bornfoundation.org");
                  setPassword("admin123");
                }}
                className="w-full text-left p-2 rounded bg-surface-muted hover:bg-soft-sage text-main-text flex items-center justify-between"
              >
                <span><strong>Super Admin:</strong> admin@bornfoundation.org</span>
                <span className="text-forest-green font-medium">Select</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail("editor@bornfoundation.org");
                  setPassword("admin123");
                }}
                className="w-full text-left p-2 rounded bg-surface-muted hover:bg-soft-sage text-main-text flex items-center justify-between"
              >
                <span><strong>Content Editor:</strong> editor@bornfoundation.org</span>
                <span className="text-forest-green font-medium">Select</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail("reviewer@bornfoundation.org");
                  setPassword("admin123");
                }}
                className="w-full text-left p-2 rounded bg-surface-muted hover:bg-soft-sage text-main-text flex items-center justify-between"
              >
                <span><strong>Reviewer:</strong> reviewer@bornfoundation.org</span>
                <span className="text-forest-green font-medium">Select</span>
              </button>
            </div>
          </div>
        </Card>

        <p className="text-center mt-6 text-xs text-secondary-text">
          <Link href="/" className="hover:text-forest-green underline">
            Return to Public Website
          </Link>
        </p>
      </div>
    </div>
  );
}
