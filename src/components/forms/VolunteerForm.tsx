"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";
import { Button, Card, Input, Select, Textarea } from "@/components/ui";
import { saveVolunteerApp } from "@/lib/data-store";
import type { VolunteerApplication } from "@/lib/types";

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Bengaluru",
    areaOfInterest: "Education & Learning Support",
    availability: "Weekends",
    experience: "",
    motivation: "",
    safeguardingAcknowledged: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address for follow-up.";
    }
    if (!formData.motivation.trim() || formData.motivation.trim().length < 15) {
      errs.motivation = "Please briefly share your motivation (at least 15 characters).";
    }
    if (!formData.safeguardingAcknowledged) {
      errs.safeguardingAcknowledged =
        "You must acknowledge mandatory screening and safeguarding training prior to participation.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      setIsSuccess(true);
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        setErrors({
          form: payload.error || "Unable to submit application right now. Please try again.",
        });
        setIsSubmitting(false);
        return;
      }

      const appRecord: VolunteerApplication = {
        id: `vol-${Date.now()}`,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        city: formData.city.trim() || undefined,
        area_of_interest: formData.areaOfInterest,
        availability: formData.availability,
        experience: formData.experience.trim() || undefined,
        motivation: formData.motivation.trim(),
        safeguarding_acknowledged: formData.safeguardingAcknowledged,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      saveVolunteerApp(appRecord);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "Bengaluru",
        areaOfInterest: "Education & Learning Support",
        availability: "Weekends",
        experience: "",
        motivation: "",
        safeguardingAcknowledged: false,
        honeypot: "",
      });
    } catch {
      setErrors({ form: "Network error submitting application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card variant="elevated" padding="lg" className="text-center py-12 space-y-4">
        <div className="w-14 h-14 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
          Volunteer Expression of Interest Recorded
        </h3>
        <p className="text-secondary-text max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Thank you for offering your time. Our coordinator will review your submission against
          our safeguarding screening process before discussing suitable supervised roles.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Submit Another Expression of Interest
        </Button>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text">
            Volunteer Expression of Interest
          </h3>
          <p className="text-xs sm:text-sm text-secondary-text mt-1">
            All prospective volunteers undergo verification and safeguarding induction prior to any assignment.
          </p>
        </div>

        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="vol-company-url">Leave empty</label>
          <input
            id="vol-company-url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            placeholder="Your full name"
            value={formData.fullName}
            error={errors.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            error={errors.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Telephone Number (Optional)"
            type="tel"
            placeholder="+91 98XXX XXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="City / Locality"
            placeholder="e.g. Bengaluru"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            label="Area of Interest"
            required
            options={[
              { value: "Education & Learning Support", label: "Education & Learning Support" },
              { value: "Women & Community Participation", label: "Women & Community Participation" },
              { value: "Nutrition & Essential Support", label: "Nutrition & Essential Support" },
              { value: "Cultural & Creative Workshops", label: "Cultural & Creative Workshops" },
              { value: "Operations & Administration", label: "Operations & Administration" },
            ]}
            value={formData.areaOfInterest}
            onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
          />
          <Select
            label="Typical Availability"
            options={[
              { value: "Weekends", label: "Weekends" },
              { value: "Weekday Mornings", label: "Weekday Mornings" },
              { value: "Weekday Afternoons", label: "Weekday Afternoons" },
              { value: "Project-Based / Occasional", label: "Project-Based / Occasional" },
            ]}
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          />
        </div>

        <Textarea
          label="Relevant Skills or Background (Optional)"
          placeholder="Teaching, community outreach, administration, arts, translation, etc."
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />

        <Textarea
          label="How would you like to contribute?"
          required
          placeholder="Tell us about your motivation and how you hope to support BORN FOUNDATION's mission..."
          value={formData.motivation}
          error={errors.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
        />

        <div className="p-4 rounded-xl bg-soft-sage/50 border border-soft-sage-dark/40 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-main-text">
            <input
              type="checkbox"
              checked={formData.safeguardingAcknowledged}
              onChange={(e) =>
                setFormData({ ...formData, safeguardingAcknowledged: e.target.checked })
              }
              className="mt-1 w-4 h-4 rounded border-border text-forest-green shrink-0"
              aria-invalid={errors.safeguardingAcknowledged ? "true" : undefined}
            />
            <span>
              <strong className="inline-flex items-center gap-1.5 text-forest-green">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Safeguarding & Screening Acknowledgement:
              </strong>{" "}
              I understand that submission does not grant direct or unsupervised access to children,
              and that identity vetting, reference checks, and Child Safeguarding induction are required
              prior to participating in centre activities.
            </span>
          </label>
          {errors.safeguardingAcknowledged && (
            <p className="text-xs font-medium text-red-700" role="alert">
              {errors.safeguardingAcknowledged}
            </p>
          )}
        </div>

        {errors.form && (
          <p className="text-sm text-red-700 font-medium" role="alert">
            {errors.form}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Recording Application..."
          ) : (
            <span className="inline-flex items-center gap-2">
              <Send className="w-4 h-4" aria-hidden="true" />
              Submit Expression of Interest
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
}
