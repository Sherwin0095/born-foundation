"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  CheckCircle,
  Clock,
  Archive,
  Search,
  Filter,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { Card, Button, Badge, Input, Select, Textarea } from "@/components/ui";
import { getAllEnquiries, saveEnquiry } from "@/lib/data-store";
import { formatDate } from "@/lib/utils";
import type { ContactEnquiry, EnquiryStatus } from "@/lib/types";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [internalNotes, setInternalNotes] = useState("");

  const loadData = () => {
    setEnquiries(getAllEnquiries());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelect = (enq: ContactEnquiry) => {
    setSelectedEnquiry(enq);
    setInternalNotes(enq.internal_notes || "");
  };

  const handleUpdateStatus = (status: EnquiryStatus) => {
    if (!selectedEnquiry) return;
    const updated: ContactEnquiry = {
      ...selectedEnquiry,
      status,
      internal_notes: internalNotes,
      updated_at: new Date().toISOString(),
    };
    saveEnquiry(updated);
    setSelectedEnquiry(updated);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Enquiry Management
        </h1>
        <p className="text-sm text-secondary-text">
          Track, assign, and respond to incoming correspondence and partnership requests.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Enquiries List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-44">
              <Select
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "new", label: "New Only" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "resolved", label: "Resolved" },
                  { value: "archived", label: "Archived" },
                ]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredEnquiries.length === 0 ? (
              <Card variant="bordered" padding="lg" className="bg-white text-center py-10">
                <p className="text-sm text-secondary-text">No enquiries match your search filter.</p>
              </Card>
            ) : (
              filteredEnquiries.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                return (
                  <div
                    key={enq.id}
                    onClick={() => handleSelect(enq)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-soft-sage/40 border-forest-green shadow-sm"
                        : "bg-white border-border hover:border-forest-green/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-sm text-main-text">{enq.name}</h3>
                        <p className="text-xs text-secondary-text">{enq.email}</p>
                      </div>
                      <Badge
                        variant={
                          enq.status === "new"
                            ? "warning"
                            : enq.status === "resolved"
                            ? "success"
                            : "default"
                        }
                      >
                        {enq.status}
                      </Badge>
                    </div>

                    <p className="text-xs font-semibold text-forest-green mb-1">{enq.subject}</p>
                    <p className="text-xs text-secondary-text line-clamp-2 leading-relaxed">
                      {enq.message}
                    </p>
                    <div className="mt-2 text-[10px] text-secondary-text">
                      Received {formatDate(enq.created_at)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Detail View */}
        <div className="lg:col-span-5">
          {selectedEnquiry ? (
            <Card variant="bordered" padding="lg" className="bg-white sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h3 className="font-bold text-main-text text-base">{selectedEnquiry.name}</h3>
                  <p className="text-xs text-secondary-text">{selectedEnquiry.email}</p>
                  {selectedEnquiry.phone && (
                    <p className="text-xs text-secondary-text mt-0.5">{selectedEnquiry.phone}</p>
                  )}
                </div>
                <Badge variant="default" className="capitalize">
                  {selectedEnquiry.status}
                </Badge>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-1">
                  Subject
                </h4>
                <p className="text-sm font-semibold text-main-text">{selectedEnquiry.subject}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-1">
                  Message Content
                </h4>
                <div className="p-4 rounded-lg bg-surface-muted border border-border text-xs text-main-text leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-green mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Internal Staff Notes (Restricted)
                </h4>
                <Textarea
                  rows={3}
                  placeholder="Record follow-up calls, staff assignments, or resolution notes..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleUpdateStatus("resolved")}
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Mark Resolved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus("in_progress")}
                >
                  <Clock className="w-4 h-4 mr-1.5" />
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpdateStatus("archived")}
                >
                  <Archive className="w-4 h-4 mr-1.5" />
                  Archive
                </Button>
              </div>
            </Card>
          ) : (
            <Card variant="bordered" padding="lg" className="bg-white text-center py-16">
              <Mail className="w-10 h-10 text-secondary-text mx-auto mb-3" />
              <h3 className="font-semibold text-main-text text-sm mb-1">No Enquiry Selected</h3>
              <p className="text-xs text-secondary-text">
                Select an inbound inquiry from the list to view its complete message and update its status.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
