"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertCircle,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import {
  MOCK_PROGRAMMES,
  MOCK_STORIES,
  MOCK_ENQUIRIES,
  MOCK_VOLUNTEER_APPS,
  MOCK_MEDIA_ASSETS,
} from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { useAuth } from "@/lib/auth-context";
import type {
  Programme,
  Story,
  ContactEnquiry,
  VolunteerApplication,
  MediaAsset,
} from "@/lib/types";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const programmes = useStoredData<Programme[]>("programmes", MOCK_PROGRAMMES);
  const stories = useStoredData<Story[]>("stories", MOCK_STORIES);
  const enquiries = useStoredData<ContactEnquiry[]>("enquiries", MOCK_ENQUIRIES);
  const volunteers = useStoredData<VolunteerApplication[]>("volunteer_apps", MOCK_VOLUNTEER_APPS);
  const media = useStoredData<MediaAsset[]>("media_assets", MOCK_MEDIA_ASSETS);

  const stats = useMemo(() => {
    const allContent = [...programmes, ...stories];
    return {
      totalPublished: allContent.filter((c) => c.status === "published").length,
      totalDrafts: allContent.filter((c) => c.status === "draft").length,
      pendingReviews: allContent.filter(
        (c) => c.status === "submitted" || c.status === "in_review"
      ).length,
      newEnquiries: enquiries.filter((e) => e.status === "new").length,
      pendingVolunteers: volunteers.filter((v) => v.status === "pending").length,
      totalProgrammes: programmes.length,
      pendingMedia: media.filter((m) => m.approval_status === "pending").length,
      approvedMedia: media.filter((m) => m.approval_status === "approved").length,
    };
  }, [programmes, stories, enquiries, volunteers, media]);

  const recentEnquiries = useMemo(
    () =>
      [...enquiries]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4),
    [enquiries]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border shadow-xs">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Welcome, {user?.full_name}
          </h1>
          <p className="text-secondary-text text-sm mt-1">
            Editorial workflow, child safeguarding media review, and inbound enquiries overview.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/media">
            <Button variant="outline" size="sm">
              Review Held Photos ({stats.pendingMedia})
            </Button>
          </Link>
          <Link href="/admin/stories">
            <Button variant="primary" size="sm">
              Draft Update / Story
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Published Items",
            value: stats.totalPublished,
            icon: CheckCircle2,
            color: "text-forest-green",
            bg: "bg-soft-sage/60",
          },
          {
            label: "Media Approved Publicly",
            value: stats.approvedMedia,
            icon: ImageIcon,
            color: "text-emerald-700",
            bg: "bg-emerald-50",
          },
          {
            label: "Media Held (Consent)",
            value: stats.pendingMedia,
            icon: Lock,
            color: "text-amber-700",
            bg: "bg-amber-50",
          },
          {
            label: "New Enquiries",
            value: stats.newEnquiries,
            icon: Mail,
            color: "text-blue-700",
            bg: "bg-blue-50",
          },
          {
            label: "Volunteer Apps",
            value: stats.pendingVolunteers,
            icon: Users,
            color: "text-purple-700",
            bg: "bg-purple-50",
          },
          {
            label: "Focus Areas / Tracks",
            value: stats.totalProgrammes,
            icon: BookOpen,
            color: "text-forest-green",
            bg: "bg-soft-sage/50",
          },
          {
            label: "Drafts in Progress",
            value: stats.totalDrafts,
            icon: Clock,
            color: "text-secondary-text",
            bg: "bg-surface-muted",
          },
          {
            label: "In Editorial Review",
            value: stats.pendingReviews,
            icon: AlertCircle,
            color: "text-muted-terracotta-dark",
            bg: "bg-orange-50",
          },
        ].map((stat, idx) => (
          <Card key={idx} variant="bordered" padding="sm" className="bg-white">
            <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <p className="text-xs text-secondary-text">{stat.label}</p>
            <p className="text-xl font-bold text-main-text mt-0.5">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] text-main-text">
              Recent Inbound Enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs text-forest-green font-medium hover:underline flex items-center gap-1"
            >
              View all enquiries
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.length === 0 ? (
              <Card variant="bordered" padding="md" className="bg-white text-center py-8">
                <p className="text-sm text-secondary-text">
                  No inbound enquiries submitted yet in this local browser session.
                </p>
              </Card>
            ) : (
              recentEnquiries.map((enq) => (
                <Card key={enq.id} variant="bordered" padding="md" className="bg-white">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-sm text-main-text">{enq.name}</h3>
                      <p className="text-xs text-secondary-text">{enq.email}</p>
                    </div>
                    <Badge variant={enq.status === "new" ? "warning" : "default"}>
                      {enq.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-forest-green mb-1">{enq.subject}</p>
                  <p className="text-xs text-secondary-text line-clamp-2">{enq.message}</p>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card variant="bordered" padding="md" className="bg-white">
            <h3 className="font-bold text-sm text-main-text mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-forest-green" />
              Child Safeguarding Verification Checklist
            </h3>
            <ul className="text-xs text-secondary-text space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>All 12 photos showing identifiable minors isolated outside public directories</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>3 non-identifying public derivatives stripped of EXIF &amp; GPS metadata</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>Live online payments disabled pending official compliance &amp; bank verification</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>Zero fabricated counts, stories, or unverified staff emails published</span>
              </li>
            </ul>
          </Card>

          <Card variant="bordered" padding="md" className="bg-white">
            <h3 className="font-bold text-sm text-main-text mb-2">Publication Workflow</h3>
            <div className="flex items-center justify-between text-[11px] font-semibold text-forest-green bg-surface-muted p-2.5 rounded-lg border border-border">
              <span>DRAFT</span>
              <span>→</span>
              <span>IN REVIEW</span>
              <span>→</span>
              <span>APPROVED</span>
              <span>→</span>
              <span>PUBLISHED</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
