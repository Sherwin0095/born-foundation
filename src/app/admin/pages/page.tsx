"use client";

import React, { useState } from "react";
import { Edit } from "lucide-react";
import { Card, Button, Badge, Input, Textarea, Select } from "@/components/ui";
import { savePage } from "@/lib/data-store";
import { MOCK_PAGES } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { useAuth } from "@/lib/auth-context";
import type { Page, ContentStatus } from "@/lib/types";

export default function AdminPagesPage() {
  const { user } = useAuth();
  const pages = useStoredData<Page[]>("pages", MOCK_PAGES);
  const [editing, setEditing] = useState<Page | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    meta_title: "",
    meta_description: "",
    status: "published" as ContentStatus,
  });

  const handleEdit = (p: Page) => {
    setEditing(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content,
      meta_title: p.meta_title || "",
      meta_description: p.meta_description || "",
      status: p.status,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    savePage(
      {
        ...editing,
        ...formData,
        reviewer_id: user?.id,
        updated_at: new Date().toISOString(),
      },
      user?.id
    );
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Page Content Management
        </h1>
        <p className="text-sm text-secondary-text">
          Inspect, edit metadata, and control editorial workflow statuses across core public pages.
        </p>
      </div>

      {editing ? (
        <Card variant="bordered" padding="lg" className="bg-white">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
            <h2 className="text-lg font-bold text-main-text">
              Editing Page: {editing.title} ({editing.slug})
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Page Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Select
                label="Workflow Status"
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "in_review", label: "In Review" },
                  { value: "approved", label: "Approved" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" },
                ]}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
              />
            </div>
            <Input
              label="SEO Meta Title"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            />
            <Textarea
              label="Lead Content Summary"
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Page Record
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-muted border-b border-border text-xs text-secondary-text font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Page &amp; Route</th>
                <th className="py-3 px-4">Summary</th>
                <th className="py-3 px-4">Workflow Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-surface-muted/50">
                  <td className="py-3.5 px-4 font-semibold text-main-text">
                    {p.title}
                    <span className="block text-xs text-secondary-text font-mono font-normal">
                      {p.slug}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-secondary-text max-w-md truncate">
                    {p.excerpt}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={p.status === "published" ? "success" : "warning"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
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
