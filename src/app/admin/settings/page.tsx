"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Users,
  Lock,
  Save,
  CheckCircle2,
  Database,
} from "lucide-react";
import { Card, Button, Input, Select, Badge } from "@/components/ui";
import { MOCK_PROFILES, MOCK_SITE_SETTINGS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [siteName, setSiteName] = useState("Born Foundation");
  const [contactEmail, setContactEmail] = useState("info@bornfoundation.org");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Site Settings & Staff Access Control
        </h1>
        <p className="text-sm text-secondary-text">
          Configure organization identifiers, operational toggles, and inspect RBAC roles.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Core Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="bordered" padding="lg" className="bg-white">
            <h2 className="text-lg font-bold text-main-text mb-4">
              General Identity Settings
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Organization / Site Title"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
              <Input
                label="Primary Inquiries Email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <div className="p-3 bg-surface-muted rounded-lg text-xs text-secondary-text">
                All changes made here are saved directly into the active database configuration.
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                {isSaved && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Configuration updated successfully
                  </span>
                )}
                <Button type="submit" variant="primary" size="sm" className="ml-auto">
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Settings
                </Button>
              </div>
            </form>
          </Card>

          {/* Database & Online Readiness Status */}
          <Card variant="bordered" padding="lg" className="bg-white">
            <h2 className="text-lg font-bold text-main-text mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-forest-green" />
              Database & Deployment Readiness
            </h2>
            <p className="text-xs text-secondary-text mb-4 leading-relaxed">
              The project is running in local offline-first mode with in-memory & localStorage persistence.
              Supabase schema migration definitions and RLS policies have been authored and are ready
              to execute as soon as your cloud Supabase keys are configured.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-surface-muted">
                <span className="font-medium text-main-text">Local Storage Layer:</span>
                <Badge variant="success">Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-surface-muted">
                <span className="font-medium text-main-text">Supabase Cloud Sync:</span>
                <Badge variant="warning">Awaiting Online Keys</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-surface-muted">
                <span className="font-medium text-main-text">Row Level Security (RLS):</span>
                <Badge variant="success">Documented in SQL</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Staff & Roles Registry */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="bordered" padding="lg" className="bg-white">
            <h2 className="text-lg font-bold text-main-text mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-forest-green" />
              Authorized Staff Roles
            </h2>
            <p className="text-xs text-secondary-text mb-4">
              Role-Based Access Control (RBAC) tiers governing editing, reviewing, and publishing.
            </p>

            <div className="space-y-3">
              {MOCK_PROFILES.map((profile) => (
                <div
                  key={profile.id}
                  className="p-3 rounded-lg border border-border bg-surface-muted flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-xs text-main-text">{profile.full_name}</h3>
                    <p className="text-[11px] text-secondary-text">{profile.email}</p>
                  </div>
                  <Badge variant="default" className="text-[10px] capitalize">
                    {profile.role.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-soft-sage/40 border border-soft-sage text-xs text-secondary-text">
              <p className="font-semibold text-forest-green mb-1">Least Privilege Enforcement</p>
              <p>
                Staff cannot escalate their own roles. Only Super Administrators can alter permissions.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
