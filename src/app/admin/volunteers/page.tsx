"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Search,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Card, Button, Badge, Input, Select, Textarea } from "@/components/ui";
import { getAllVolunteerApps, saveVolunteerApp } from "@/lib/data-store";
import { formatDate } from "@/lib/utils";
import type { VolunteerApplication, VolunteerStatus } from "@/lib/types";

export default function AdminVolunteersPage() {
  const [apps, setApps] = useState<VolunteerApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);
  const [internalNotes, setInternalNotes] = useState("");

  const loadData = () => {
    setApps(getAllVolunteerApps());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelect = (app: VolunteerApplication) => {
    setSelectedApp(app);
    setInternalNotes(app.internal_notes || "");
  };

  const handleStatusChange = (status: VolunteerStatus) => {
    if (!selectedApp) return;
    const updated: VolunteerApplication = {
      ...selectedApp,
      status,
      internal_notes: internalNotes,
      updated_at: new Date().toISOString(),
    };
    saveVolunteerApp(updated);
    setSelectedApp(updated);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Volunteer Applications
        </h1>
        <p className="text-sm text-secondary-text">
          Review candidate profiles, availability, and conduct background check verification.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-7 space-y-3">
          {apps.length === 0 ? (
            <Card variant="bordered" padding="lg" className="bg-white text-center py-12">
              <p className="text-sm text-secondary-text">No volunteer submissions yet.</p>
            </Card>
          ) : (
            apps.map((app) => {
              const isSelected = selectedApp?.id === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => handleSelect(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-soft-sage/40 border-forest-green shadow-sm"
                      : "bg-white border-border hover:border-forest-green/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-sm text-main-text">{app.full_name}</h3>
                      <p className="text-xs text-secondary-text">{app.email}</p>
                    </div>
                    <Badge
                      variant={
                        app.status === "accepted"
                          ? "success"
                          : app.status === "pending"
                          ? "warning"
                          : "default"
                      }
                    >
                      {app.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-secondary-text mt-2">
                    <span>
                      Focus: <strong className="text-main-text">{app.area_of_interest}</strong>
                    </span>
                    {app.city && (
                      <span>
                        City: <strong className="text-main-text">{app.city}</strong>
                      </span>
                    )}
                    {app.availability && (
                      <span>
                        Availability: <strong className="text-main-text">{app.availability}</strong>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail & Evaluation View */}
        <div className="lg:col-span-5">
          {selectedApp ? (
            <Card variant="bordered" padding="lg" className="bg-white sticky top-24 space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-border">
                <div>
                  <h3 className="font-bold text-main-text text-base">{selectedApp.full_name}</h3>
                  <div className="text-xs text-secondary-text space-y-0.5 mt-1">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{selectedApp.email}</span>
                    </div>
                    {selectedApp.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedApp.phone}</span>
                      </div>
                    )}
                    {selectedApp.city && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{selectedApp.city}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant="default" className="capitalize">
                  {selectedApp.status.replace("_", " ")}
                </Badge>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-1">
                  Area of Interest & Availability
                </h4>
                <p className="text-sm font-semibold text-main-text">{selectedApp.area_of_interest}</p>
                <p className="text-xs text-secondary-text mt-0.5">
                  Available: {selectedApp.availability || "Flexible"}
                </p>
              </div>

              {selectedApp.experience && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-1">
                    Prior Experience
                  </h4>
                  <div className="p-3 rounded-lg bg-surface-muted text-xs text-secondary-text leading-relaxed">
                    {selectedApp.experience}
                  </div>
                </div>
              )}

              {selectedApp.motivation && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-1">
                    Motivation & Statement of Intent
                  </h4>
                  <div className="p-3 rounded-lg bg-surface-muted text-xs text-secondary-text leading-relaxed">
                    {selectedApp.motivation}
                  </div>
                </div>
              )}

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Vetting Checklist:</strong> In-person interview, identity document verification, and
                  formal child safeguarding induction required before field deployment.
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-2">
                  Staff Evaluation Notes
                </h4>
                <Textarea
                  rows={2}
                  placeholder="Record interview notes or background verification status..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleStatusChange("accepted")}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Accept & Clear
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange("under_review")}
                >
                  <Clock className="w-4 h-4 mr-1.5" />
                  Under Review
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleStatusChange("declined")}
                >
                  <XCircle className="w-4 h-4 mr-1.5" />
                  Decline
                </Button>
              </div>
            </Card>
          ) : (
            <Card variant="bordered" padding="lg" className="bg-white text-center py-16">
              <Users className="w-10 h-10 text-secondary-text mx-auto mb-3" />
              <h3 className="font-semibold text-main-text text-sm mb-1">Select an Application</h3>
              <p className="text-xs text-secondary-text">
                Choose a volunteer applicant to inspect their skills, background, and update review status.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
