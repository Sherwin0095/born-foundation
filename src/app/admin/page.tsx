"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Mail,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  AlertCircle,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";
import { getDashboardStats, getAllEnquiries, getAllProgrammes } from "@/lib/data-store";
import { useAuth } from "@/lib/auth-context";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPublished: 0,
    totalDrafts: 0,
    pendingReviews: 0,
    newEnquiries: 0,
    pendingVolunteers: 0,
    totalProgrammes: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);

  useEffect(() => {
    setStats(getDashboardStats());
    setRecentEnquiries(getAllEnquiries().slice(0, 4));
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Welcome back, {user?.full_name}
          </h1>
          <p className="text-secondary-text text-sm mt-1">
            System overview and pending actions across Born Foundation operations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/programmes">
            <Button variant="outline" size="sm">
              Manage Programmes
            </Button>
          </Link>
          <Link href="/admin/stories">
            <Button variant="primary" size="sm">
              Write New Story
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Operational Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Published Items",
            value: stats.totalPublished,
            icon: CheckCircle2,
            color: "text-forest-green",
            bg: "bg-soft-sage/50",
          },
          {
            label: "Drafts in Prep",
            value: stats.totalDrafts,
            icon: Clock,
            color: "text-warm-gold",
            bg: "bg-amber-50",
          },
          {
            label: "Awaiting Review",
            value: stats.pendingReviews,
            icon: AlertCircle,
            color: "text-muted-terracotta",
            bg: "bg-orange-50",
          },
          {
            label: "New Enquiries",
            value: stats.newEnquiries,
            icon: Mail,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Volunteer Apps",
            value: stats.pendingVolunteers,
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Programmes",
            value: stats.totalProgrammes,
            icon: BookOpen,
            color: "text-emerald-700",
            bg: "bg-emerald-50",
          },
        ].map((stat, idx) => (
          <Card key={idx} variant="bordered" padding="sm" className="bg-white">
            <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-secondary-text">{stat.label}</p>
            <p className="text-xl font-bold text-main-text mt-0.5">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Enquiries Queue */}
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
                <p className="text-sm text-secondary-text">No enquiries logged yet.</p>
              </Card>
            ) : (
              recentEnquiries.map((enq) => (
                <Card
                  key={enq.id}
                  variant="bordered"
                  padding="md"
                  className="bg-white hover:border-forest-green transition-colors"
                >
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

        {/* Content Approval Workflow Checklist & Safeguarding Status */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="bordered" padding="md" className="bg-white">
            <h3 className="font-bold text-sm text-main-text mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-forest-green" />
              Child Safeguarding Verification Checklist
            </h3>
            <ul className="text-xs text-secondary-text space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>Zero full names or home addresses exposed in public materials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>All public stories reviewed and scrubbed of location metadata</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>No live donation gateway transactions processed without bank KYC</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                <span>Dual-authorization required for publishing draft content</span>
              </li>
            </ul>
          </Card>

          <Card variant="bordered" padding="md" className="bg-white">
            <h3 className="font-bold text-sm text-main-text mb-2">Workflow Stages</h3>
            <p className="text-xs text-secondary-text leading-relaxed mb-4">
              All stories and programmes follow the required lifecycle:
            </p>
            <div className="flex items-center justify-between text-[11px] font-semibold text-forest-green bg-surface-muted p-2.5 rounded-lg border border-border">
              <span>DRAFT</span>
              <span>→</span>
              <span>SUBMITTED</span>
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
