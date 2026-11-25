"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Shield,
  CheckCircle,
  Lock,
  XCircle,
} from "lucide-react";
import { Card, Button, Badge, Input } from "@/components/ui";
import { updateMediaApproval, addMediaAsset } from "@/lib/data-store";
import { MOCK_MEDIA_ASSETS } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { useAuth } from "@/lib/auth-context";
import type { MediaAsset } from "@/lib/types";

export default function AdminMediaPage() {
  const { user, hasRole } = useAuth();
  const assets = useStoredData<MediaAsset[]>("media_assets", MOCK_MEDIA_ASSETS);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");

  const canApprove = hasRole(["super_admin", "reviewer"]);

  const handleSimulatedRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !altText) return;

    addMediaAsset(
      {
        id: `med-${Date.now()}`,
        filename: fileName,
        original_filename: fileName,
        mime_type: "image/webp",
        size_bytes: 0,
        url: "",
        alt_text: altText,
        caption: caption || "Pending safeguarding inspection",
        has_identifiable_children: true,
        safeguarding_risk: "medium",
        exif_stripped: true,
        approval_status: "pending",
        uploaded_by: user?.id || "editor-001",
        is_public: false,
        review_notes: "Registered into private queue; requires safeguarding review prior to public release.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      user?.id
    );

    setFileName("");
    setAltText("");
    setCaption("");
  };

  const filteredAssets = assets.filter((a) =>
    filter === "all" ? true : a.approval_status === filter
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Gallery &amp; Safeguarding Media Approval
        </h1>
        <p className="text-sm text-secondary-text">
          Workflow: Private Upload → EXIF Strip → Safeguarding Review → Approval → Public Derivative.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h2 className="font-bold text-sm mb-1">Mandatory Child Safeguarding Media Lock</h2>
          <p className="leading-relaxed">
            12 photographs from the supplied ZIP contain identifiable children and are held strictly
            as non-public archive items (`is_public = false`) until verified guardian consent is
            documented. Only 3 non-identifying EXIF-stripped derivatives are active on the public gallery.
          </p>
        </div>
      </div>

      {/* Add Private Queue Asset */}
      <Card variant="bordered" padding="lg" className="bg-white">
        <h2 className="text-base font-bold text-main-text mb-4">
          Register New Private Media Item (Auto-Enters Pending Safeguarding Queue)
        </h2>
        <form onSubmit={handleSimulatedRegister} className="grid sm:grid-cols-3 gap-4">
          <Input
            label="Sanitised Slug / Filename"
            required
            placeholder="e.g. workshop-supplies.webp"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Input
            label="Accessible Alt Text (Required)"
            required
            placeholder="Objective visual description..."
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
          <Input
            label="Caption"
            placeholder="Neutral activity context"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="sm:col-span-3 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Queue for Safeguarding Review
            </Button>
          </div>
        </form>
      </Card>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: `All (${assets.length})` },
          { id: "approved", label: `Publicly Approved (${assets.filter((a) => a.approval_status === "approved").length})` },
          { id: "pending", label: `Held Pending Consent (${assets.filter((a) => a.approval_status === "pending").length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
              filter === tab.id
                ? "bg-forest-green text-white"
                : "bg-white border border-border text-main-text hover:bg-soft-sage/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-muted border-b border-border text-xs text-secondary-text font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Asset</th>
              <th className="py-3 px-4">Safeguarding Assessment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAssets.map((item) => (
              <tr key={item.id} className="hover:bg-surface-muted/40">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    {item.is_public && item.url ? (
                      <Image
                        src={item.url}
                        alt={item.alt_text || item.filename}
                        width={56}
                        height={40}
                        className="w-14 h-10 rounded-lg object-cover border border-border shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4" aria-hidden="true" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="font-semibold text-main-text block text-xs sm:text-sm">
                        {item.filename}
                      </span>
                      <span className="text-[11px] text-secondary-text block truncate max-w-xs">
                        {item.caption}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs text-secondary-text max-w-xs">
                  <span className="font-medium text-main-text block">
                    {item.has_identifiable_children
                      ? "Identifiable Minors: Yes (Consent Required)"
                      : "Non-Identifying / Adult Frame"}
                  </span>
                  <span className="block text-[11px]">{item.review_notes}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="space-y-1">
                    <Badge
                      variant={
                        item.approval_status === "approved"
                          ? "success"
                          : item.approval_status === "rejected"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {item.approval_status}
                    </Badge>
                    <span className="block text-[10px] text-secondary-text">
                      {item.is_public ? "Public Derivative" : "Private Restricted"}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {canApprove ? (
                    <div className="flex items-center justify-end gap-2">
                      {item.is_public ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateMediaApproval(
                              item.id,
                              "pending",
                              false,
                              "Withheld by reviewer back into pending review.",
                              user?.id
                            );
                          }}
                        >
                          Unpublish
                        </Button>
                      ) : !item.has_identifiable_children ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            updateMediaApproval(
                              item.id,
                              "approved",
                              true,
                              "Approved non-identifying EXIF-stripped derivative.",
                              user?.id
                            );
                          }}
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                          Approve Public
                        </Button>
                      ) : (
                        <span className="text-[11px] text-amber-800 font-medium flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          Blocked (Needs Signed Consent)
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[11px] text-secondary-text">Reviewer Only</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
