"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Edit,
  CheckCircle,
  Archive,
  ShieldCheck,
} from "lucide-react";
import { Card, Button, Badge, Input, Textarea, Select } from "@/components/ui";
import { saveStory } from "@/lib/data-store";
import { MOCK_STORIES } from "@/lib/mock-data";
import { useStoredData } from "@/lib/use-stored-data";
import { useAuth } from "@/lib/auth-context";
import type { Story, ContentStatus } from "@/lib/types";

export default function AdminStoriesPage() {
  const { user } = useAuth();
  const rawStories = useStoredData<Story[]>("stories", MOCK_STORIES);
  const stories = useMemo(
    () =>
      [...rawStories].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [rawStories]
  );
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Education",
    excerpt: "",
    content: "",
    is_featured: false,
    status: "draft" as ContentStatus,
  });

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      slug: story.slug,
      category: story.category,
      excerpt: story.excerpt || "",
      content: story.content,
      is_featured: story.is_featured,
      status: story.status,
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const storyToSave: Story = {
      id: editingStory ? editingStory.id : `story-${Date.now()}`,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      is_featured: formData.is_featured,
      status: formData.status,
      author_id: editingStory ? editingStory.author_id : (user?.id || "admin"),
      reviewer_id: formData.status === "approved" || formData.status === "published" ? user?.id : undefined,
      publisher_id: formData.status === "published" ? user?.id : undefined,
      published_at: formData.status === "published" ? (editingStory?.published_at || new Date().toISOString()) : undefined,
      created_at: editingStory ? editingStory.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    saveStory(storyToSave, user?.id);
    setIsCreating(false);
    setEditingStory(null);
  };

  const handleStatusChange = (story: Story, newStatus: ContentStatus) => {
    saveStory(
      {
        ...story,
        status: newStatus,
        published_at:
          newStatus === "published" ? story.published_at || new Date().toISOString() : story.published_at,
      },
      user?.id
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Stories & Editorial Management
          </h1>
          <p className="text-sm text-secondary-text">
            Manage narratives and articles with strict child safeguarding redactions.
          </p>
        </div>
        {!isCreating && (
          <Button
            variant="primary"
            onClick={() => {
              setEditingStory(null);
              setFormData({
                title: "",
                slug: "",
                category: "Education",
                excerpt: "",
                content: "",
                is_featured: false,
                status: "draft",
              });
              setIsCreating(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Write Story
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card variant="bordered" padding="lg" className="bg-white">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
            <h2 className="text-lg font-bold text-main-text">
              {editingStory ? "Edit Story" : "Draft New Story"}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Safeguarding Review:</strong> Never include real surnames, exact residential addresses,
                school names, or identifiable sensitive medical diagnoses of children.
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Story Headline"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Input
                label="URL Slug (Optional)"
                placeholder="e.g. empowering-youth-skills"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={[
                  { value: "Education", label: "Education" },
                  { value: "Nutrition", label: "Nutrition" },
                  { value: "Volunteering", label: "Volunteering" },
                  { value: "Community", label: "Community" },
                  { value: "Advocacy", label: "Advocacy" },
                ]}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />

              <Select
                label="Approval & Publication Status"
                options={[
                  { value: "draft", label: "Draft (Editor Only)" },
                  { value: "submitted", label: "Submitted for Review" },
                  { value: "in_review", label: "In Safeguarding Review" },
                  { value: "changes_requested", label: "Changes Requested" },
                  { value: "approved", label: "Approved by Reviewer" },
                  { value: "published", label: "Published (Live on Public Website)" },
                  { value: "archived", label: "Archived" },
                ]}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
              />
            </div>

            <Textarea
              label="Short Excerpt (Lead Paragraph)"
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />

            <Textarea
              label="Full Story Narrative (Separate paragraphs by double line breaks)"
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />

            <div className="flex items-center gap-2">
              <input
                id="is_featured"
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-forest-green rounded border-border"
              />
              <label htmlFor="is_featured" className="text-sm font-medium text-main-text">
                Pin as featured story on homepage
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save & Update
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-muted border-b border-border text-xs text-secondary-text font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Headline</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stories.map((story) => (
                <tr key={story.id} className="hover:bg-surface-muted/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-main-text">
                    {story.title}
                    {story.is_featured && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-warm-gold/20 text-main-text font-medium">
                        Featured
                      </span>
                    )}
                    <div className="text-xs text-secondary-text font-normal truncate max-w-sm mt-0.5">
                      {story.excerpt || story.content}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-secondary-text">{story.category}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        story.status === "published"
                          ? "success"
                          : story.status === "submitted"
                          ? "warning"
                          : "default"
                      }
                    >
                      {story.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {story.status !== "published" && (
                        <button
                          onClick={() => handleStatusChange(story, "published")}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Publish
                        </button>
                      )}
                      {story.status === "published" && (
                        <button
                          onClick={() => handleStatusChange(story, "draft")}
                          className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 text-xs font-semibold flex items-center gap-1"
                        >
                          <Archive className="w-4 h-4" />
                          Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(story)}
                        className="p-1.5 rounded-lg text-forest-green hover:bg-soft-sage"
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
