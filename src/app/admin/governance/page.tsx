"use client";

import React, { useMemo } from "react";
import { Scale, FileText, Activity } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { MOCK_AUDIT_LOGS } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { SITE_CONFIG } from "@/lib/site-config";
import type { AuditLog } from "@/lib/types";

export default function AdminGovernancePage() {
  const rawLogs = useStoredData<AuditLog[]>("audit_logs", MOCK_AUDIT_LOGS);
  const logs = useMemo(
    () =>
      [...rawLogs].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [rawLogs]
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Governance, Compliance Documents &amp; Audit Logs
        </h1>
        <p className="text-sm text-secondary-text">
          Track statutory verification status, legal draft documents, impact metrics readiness, and staff activity trails.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="bordered" padding="lg" className="bg-white space-y-4">
          <h2 className="text-base font-bold text-main-text flex items-center gap-2">
            <Scale className="w-4 h-4 text-forest-green" aria-hidden="true" />
            Registry &amp; Legal Verification Tracker
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>Registration Ref: {SITE_CONFIG.registry.registrationReference}</span>
              <Badge variant="warning">Pending Document Upload</Badge>
            </div>
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>12A / 80G / FCRA Records</span>
              <Badge variant="warning">Unverified Reference</Badge>
            </div>
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>Privacy Policy &amp; Terms of Use</span>
              <Badge variant="warning">Legal Counsel Review Needed</Badge>
            </div>
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>Child Safeguarding Policy</span>
              <Badge variant="warning">Board Adoption Needed</Badge>
            </div>
          </div>
        </Card>

        <Card variant="bordered" padding="lg" className="bg-white space-y-4">
          <h2 className="text-base font-bold text-main-text flex items-center gap-2">
            <FileText className="w-4 h-4 text-forest-green" aria-hidden="true" />
            Impact Report &amp; Financial Gateway Readiness
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>Audited Annual Report</span>
              <Badge variant="warning">Awaiting Verified Data</Badge>
            </div>
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>Online Donation Payment Gateway</span>
              <Badge variant="danger">Intentionally Disabled</Badge>
            </div>
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>Official Organisational Email</span>
              <Badge variant="warning">Pending Confirmation</Badge>
            </div>
            <div className="p-3 rounded-lg bg-surface-muted flex items-center justify-between gap-2">
              <span>EXIF Metadata &amp; Archive Isolation</span>
              <Badge variant="success">Enforced</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Audit Log Viewer */}
      <Card variant="bordered" padding="lg" className="bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-main-text flex items-center gap-2">
            <Activity className="w-4 h-4 text-forest-green" aria-hidden="true" />
            Staff Audit Log Trail
          </h2>
          <Badge variant="default">{logs.length} Recorded Event(s)</Badge>
        </div>

        <div className="divide-y divide-border text-xs">
          {logs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono font-bold text-forest-green mr-2">{log.action}</span>
                <span className="text-main-text font-medium">
                  ({log.entity_type} / {log.entity_id})
                </span>
                {log.details && (
                  <p className="text-secondary-text mt-0.5">{log.details}</p>
                )}
              </div>
              <span className="text-[11px] text-secondary-text shrink-0">
                Actor: {log.user_id}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
