"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Archive,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Card, Button, Badge, Input, Textarea, Select } from "@/components/ui";
import { getAllProgrammes, saveProgramme } from "@/lib/data-store";
import { useAuth } from "@/lib/auth-context";
import type { Programme, ContentStatus } from "@/lib/types";

export default function AdminProgrammesPage() {
  const { user, hasPermission } = useAuth();
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [editingProg, setEditingProg] = useState<Programme | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "education",
    description: "",
    objectives: "",
    activities: "",
    eligibility: "",
    outcomes: "",
    status: "draft" as ContentStatus,
  });

  const loadData = () => {
    setProgrammes(getAllProgrammes());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (prog: Programme) => {
    setEditingProg(prog);
    setFormData({
      title: prog.title,
      slug: prog.slug,
      category: prog.category,
      description: prog.description,
      objectives: prog.objectives || "",
      activities: prog.activities || "",
      eligibility: prog.eligibility || "",
      outcomes: prog.outcomes || "",
      status: prog.status,
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const progToSave: Programme = {
      id: editingProg ? editingProg.id : `prog-${Date.now()}`,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      category: formData.category,
      description: formData.description,
      objectives: formData.objectives,
      activities: formData.activities,
      eligibility: formData.eligibility,
      outcomes: formData.outcomes,
      status: formData.status,
      author_id: editingProg ? editingProg.author_id : (user?.id || "admin"),
      order_index: editingProg ? editingProg.order_index : programmes.length + 1,
      created_at: editingProg ? editingProg.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveProgramme(progToSave);
    setIsCreating(false);
    setEditingProg(null);
    loadData();
  };

  const handleStatusChange = (prog: Programme, newStatus: ContentStatus) => {
    saveProgramme({ ...prog, status: newStatus });
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Programme Management
          </h1>
          <p className="text-sm text-secondary-text">
            Create, audit, review, and publish community developmental programmes.
          </p>
        </div>
        {!isCreating && (
          <Button
            variant="primary"
            onClick={() => {
              setEditingProg(null);
              setFormData({
                title: "",
                slug: "",
                category: "education",
                description: "",
                objectives: "",
                activities: "",
                eligibility: "",
                outcomes: "",
                status: "draft",
              });
              setIsCreating(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Programme
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card variant="bordered" padding="lg" className="bg-white">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
            <h2 className="text-lg font-bold text-main-text">
              {editingProg ? "Edit Programme Details" : "Create New Programme"}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Programme Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Input
                label="URL Slug (Optional)"
                placeholder="e.g. bright-futures-learning"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Programme Category"
                options={[
                  { value: "education", label: "Education & Learning" },
                  { value: "nutrition", label: "Nutrition & Essential Needs" },
                  { value: "care", label: "Care & Wellbeing" },
                  { value: "skills", label: "Skills & Development" },
                  { value: "community", label: "Community Support" },
                ]}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />

              <Select
                label="Publication Status"
                options={[
                  { value: "draft", label: "Draft (Internal Only)" },
                  { value: "submitted", label: "Submitted for Review" },
                  { value: "approved", label: "Approved by Reviewer" },
                  { value: "published", label: "Published (Live on Site)" },
                  { value: "archived", label: "Archived" },
                ]}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
              />
            </div>

            <Textarea
              label="Summary Description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Textarea
              label="Strategic Objectives"
              value={formData.objectives}
              onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            />

            <Textarea
              label="Field Activities & Curriculum"
              value={formData.activities}
              onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Target Beneficiaries & Eligibility"
                value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              />
              <Input
                label="Audited Outcomes Description"
                value={formData.outcomes}
                onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Programme
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-muted border-b border-border text-xs text-secondary-text font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {programmes.map((prog) => (
                <tr key={prog.id} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-main-text">
                    {prog.title}
                    <div className="text-xs text-secondary-text font-normal truncate max-w-xs">
                      {prog.description}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 capitalize text-secondary-text">
                    {prog.category}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        prog.status === "published"
                          ? "success"
                          : prog.status === "submitted"
                          ? "warning"
                          : prog.status === "approved"
                          ? "info"
                          : "default"
                      }
                    >
                      {prog.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {prog.status !== "published" && (
                        <button
                          onClick={() => handleStatusChange(prog, "published")}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1"
                          title="Publish"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Publish
                        </button>
                      )}
                      {prog.status === "published" && (
                        <button
                          onClick={() => handleStatusChange(prog, "draft")}
                          className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 text-xs font-semibold flex items-center gap-1"
                          title="Unpublish"
                        >
                          <Archive className="w-4 h-4" />
                          Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(prog)}
                        className="p-1.5 rounded-lg text-forest-green hover:bg-soft-sage text-xs font-medium"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
