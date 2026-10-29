"use client";

import React, { useState } from "react";
import {
  Image,
  Upload,
  CheckCircle,
  AlertTriangle,
  Shield,
  FileCheck,
  Trash2,
} from "lucide-react";
import { Card, Button, Badge, Input } from "@/components/ui";

interface MediaItem {
  id: string;
  filename: string;
  alt_text: string;
  caption: string;
  size: string;
  status: "approved" | "pending";
  date: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: "med-1",
      filename: "illustrative_classroom_learning.jpg",
      alt_text: "Children engaged in group interactive tutoring session",
      caption: "Community center learning hours (Illustrative imagery)",
      size: "240 KB",
      status: "approved",
      date: "2024-05-10",
    },
    {
      id: "med-2",
      filename: "nutrition_workshop_supplies.jpg",
      alt_text: "Fresh organic vegetables and meal packs arranged for families",
      caption: "Ingredients for family balanced diet workshop",
      size: "310 KB",
      status: "approved",
      date: "2024-06-12",
    },
    {
      id: "med-3",
      filename: "volunteer_induction_group.jpg",
      alt_text: "Volunteer group participating in safeguarding training",
      caption: "Safeguarding orientation for new volunteers",
      size: "450 KB",
      status: "pending",
      date: "2024-08-01",
    },
  ]);

  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !altText) return;

    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      filename: fileName,
      alt_text: altText,
      caption: caption || "Safeguarded community activity illustration",
      size: "185 KB",
      status: "approved",
      date: new Date().toISOString().split("T")[0],
    };

    setMediaList([newItem, ...mediaList]);
    setFileName("");
    setAltText("");
    setCaption("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Media Library & Digital Asset Compliance
        </h1>
        <p className="text-sm text-secondary-text">
          Upload and audit imagery with mandatory EXIF stripping and child privacy vetting.
        </p>
      </div>

      {/* Mandatory Safeguarding Protocol Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-sm text-amber-950 mb-1">Child Safeguarding Image Protocol</h3>
          <p className="leading-relaxed">
            All images must be stripped of EXIF, GPS location tags, and camera metadata prior to public use.
            Under no circumstances may photographs depicting distressed minors, medical vulnerabilities, or
            identifiable uniforms be uploaded without parental consent and executive safeguarding sign-off.
          </p>
        </div>
      </div>

      {/* Upload Box */}
      <Card variant="bordered" padding="lg" className="bg-white">
        <h2 className="text-base font-bold text-main-text mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-forest-green" />
          Add Approved Media Asset
        </h2>
        <form onSubmit={handleSimulatedUpload} className="grid sm:grid-cols-3 gap-4">
          <Input
            label="File Name / Descriptor"
            required
            placeholder="e.g. art_workshop_activity.jpg"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Input
            label="Accessible Alt Text (Required)"
            required
            placeholder="Describe visual content for screen-readers..."
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
          <Input
            label="Public Caption"
            placeholder="Context or activity summary"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="sm:col-span-3 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Register Asset
            </Button>
          </div>
        </form>
      </Card>

      {/* Media Items Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-muted border-b border-border text-xs text-secondary-text font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Preview & Name</th>
              <th className="py-3 px-4">Alt Description</th>
              <th className="py-3 px-4">Safeguarding Status</th>
              <th className="py-3 px-4 text-right">Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mediaList.map((item) => (
              <tr key={item.id} className="hover:bg-surface-muted/50 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-main-text flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <Image className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block truncate max-w-xs">{item.filename}</span>
                    <span className="text-[11px] text-secondary-text font-normal">{item.caption}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-xs text-secondary-text max-w-xs truncate">
                  {item.alt_text}
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant={item.status === "approved" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 text-right text-xs text-secondary-text">
                  {item.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
