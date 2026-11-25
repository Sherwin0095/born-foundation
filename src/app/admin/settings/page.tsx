"use client";

import React, { useState } from "react";
import { Users, Save, CheckCircle2, Database } from "lucide-react";
import { Card, Button, Input, Badge } from "@/components/ui";
import { MOCK_PROFILES } from "@/lib/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { recordAuditAction } from "@/lib/data-store";
import { useAuth } from "@/lib/auth-context";

export default function AdminSettingsPage() {
  const { user, hasRole } = useAuth();
  const [siteName, setSiteName] = useState(SITE_CONFIG.name);
  const [contactPhone, setContactPhone] = useState(SITE_CONFIG.contact.phone);
  const [officialEmail, setOfficialEmail] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const canManageSettings = hasRole(["super_admin"]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageSettings) return;
    recordAuditAction(
      user?.id || "admin-001",
      "SITE_SETTINGS_UPDATED",
      "site_settings",
      "general",
      `Updated site settings preview`
    );
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Site Settings &amp; Staff Access Control
        </h1>
        <p className="text-sm text-secondary-text">
          Configure verified secretariat contact fields once available and inspect least-privilege RBAC roles.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card variant="bordered" padding="lg" className="bg-white">
            <h2 className="text-lg font-bold text-main-text mb-4">
              Organisational Contact &amp; Identity Settings
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <Input
                label="Organisation Title"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                disabled={!canManageSettings}
              />
              <Input
                label="Confirmed Secretariat Telephone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                disabled={!canManageSettings}
              />
              <Input
                label="Official Email Address (Currently Unconfirmed)"
                type="email"
                placeholder="Enter verified email once confirmed by BORN FOUNDATION"
                value={officialEmail}
                onChange={(e) => setOfficialEmail(e.target.value)}
                disabled={!canManageSettings}
              />

              <div className="flex items-center justify-between pt-4 border-t border-border">
                {isSaved && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Settings logged in local audit store
                  </span>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="ml-auto"
                  disabled={!canManageSettings}
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>

          <Card variant="bordered" padding="lg" className="bg-white">
            <h2 className="text-lg font-bold text-main-text mb-2 flex items-center gap-2">
              <Database className="w-5 h-5 text-forest-green" />
              Backend &amp; Deployment Readiness
            </h2>
            <p className="text-xs text-secondary-text mb-4 leading-relaxed">
              Running in offline sandbox mode (`localStorage`). Complete PostgreSQL migration +
              Row Level Security schema is authored in `supabase/migrations/20261028000000_initial_schema.sql`.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-surface-muted">
                <span className="font-medium text-main-text">Local Offline Store:</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-surface-muted">
                <span className="font-medium text-main-text">Supabase Project Keys:</span>
                <Badge variant="warning">Blocked Pending Credentials</Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-surface-muted">
                <span className="font-medium text-main-text">Online Payment Gateway:</span>
                <Badge variant="danger">Disabled Pending Compliance</Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card variant="bordered" padding="lg" className="bg-white">
            <h2 className="text-lg font-bold text-main-text mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-forest-green" />
              Role-Based Access Tiers
            </h2>
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
          </Card>
        </div>
      </div>
    </div>
  );
}
