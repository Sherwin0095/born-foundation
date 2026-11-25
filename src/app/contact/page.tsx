"use client";

import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare,
  Info,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PageHero,
  Section,
  Card,
  Input,
  Textarea,
  Select,
  Button,
} from "@/components/ui";
import { saveEnquiry } from "@/lib/data-store";
import { SITE_CONFIG } from "@/lib/site-config";
import type { ContactEnquiry } from "@/lib/types";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (minimum 2 characters).";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required so we can reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Please provide at least 15 characters describing your enquiry.";
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setErrors({
          form:
            payload.error ||
            "Unable to submit your enquiry right now. You may also call +91 99864 95292.",
        });
        setIsSubmitting(false);
        return;
      }

      const newEnquiry: ContactEnquiry = {
        id: `enq-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject,
        message: formData.message.trim(),
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      saveEnquiry(newEnquiry);

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Enquiry",
        message: "",
        honeypot: "",
      });
    } catch {
      setErrors({
        form: "Network error submitting message. Please check your connection or call +91 99864 95292.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title="Contact Us"
          subtitle="Reach BORN FOUNDATION in Shanthinagar, Bengaluru for general enquiries, supervised volunteering, partnerships, or safeguarding concerns."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
        />

        <Section background="white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-muted-terracotta-dark text-xs uppercase tracking-wider font-bold mb-2">
                  Secretariat &amp; Direct Telephone
                </p>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-3">
                  Connect With Our Team
                </h2>
                <p className="text-secondary-text text-sm sm:text-base leading-relaxed">
                  Whether asking about community programmes, coordinating stationery or in-kind
                  support, or discussing women and child development, please call or use the enquiry form.
                </p>
              </div>

              <div className="space-y-4">
                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Telephone (Click to Call)</h3>
                    <a
                      href={SITE_CONFIG.contact.phoneHref}
                      className="text-forest-green font-bold text-base hover:underline inline-block mt-0.5"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                    <p className="text-xs text-secondary-text mt-1">
                      Supplied directory telephone number
                    </p>
                  </div>
                </Card>

                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Address</h3>
                    <p className="text-secondary-text text-sm leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.address}
                    </p>
                    <p className="text-xs text-secondary-text mt-2 italic">
                      Map pin and verified exact landmark coordinates pending physical verification.
                    </p>
                  </div>
                </Card>

                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Opening Hours Note</h3>
                    <p className="text-secondary-text text-xs leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.openingHoursStatus}
                    </p>
                  </div>
                </Card>

                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Official Email Status</h3>
                    <p className="text-secondary-text text-xs leading-relaxed mt-0.5">
                      {SITE_CONFIG.contact.emailStatusNotice}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Honest Safeguarding Reporting Box */}
              <div className="p-5 rounded-xl bg-forest-green text-white space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <Shield className="w-5 h-5 text-warm-gold-light" aria-hidden="true" />
                  <h3>Child Safeguarding Concerns</h3>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  {SITE_CONFIG.contact.safeguardingContactNotice}
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 space-y-6">
              <Card variant="elevated" padding="lg">
                {isSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                      Enquiry Recorded
                    </h3>
                    <p className="text-secondary-text max-w-md mx-auto text-sm leading-relaxed">
                      Thank you for reaching out to BORN FOUNDATION. Your enquiry has been saved for
                      review by an authorised staff coordinator.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSuccess(false)}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                      Send an Enquiry
                    </h3>

                    {/* Anti-spam honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website-url">Leave this field blank</label>
                      <input
                        id="website-url"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      />
                    </div>

                    <Input
                      label="Your Full Name"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      error={errors.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Email Address"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        error={errors.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />

                      <Input
                        label="Telephone Number (Optional)"
                        type="tel"
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <Select
                      label="Subject / Nature of Enquiry"
                      required
                      options={[
                        { value: "General Enquiry", label: "General Enquiry" },
                        { value: "Women & Child Development", label: "Women & Child Development" },
                        { value: "Volunteering Screening Enquiry", label: "Volunteering Screening Enquiry" },
                        { value: "In-Kind Supplies Support", label: "In-Kind Supplies Support" },
                        { value: "Organisational Partnership", label: "Organisational Partnership" },
                        { value: "Confidential Safeguarding Concern", label: "Confidential Safeguarding Concern" },
                      ]}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />

                    <Textarea
                      label="Your Message"
                      required
                      placeholder="Please describe how BORN FOUNDATION can assist or collaborate..."
                      value={formData.message}
                      error={errors.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div className="p-3.5 bg-surface-muted rounded-lg border border-border text-xs text-secondary-text flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        <strong>Privacy Notice:</strong> Details entered here are stored solely to
                        review and respond to your enquiry and are never shared with marketers.
                        Please avoid sharing confidential identifying information about minors in
                        this general web form.
                      </span>
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
                        "Sending Message..."
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Submit Enquiry
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
