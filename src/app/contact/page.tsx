"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
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
    subject: "General Inquiry",
    message: "",
    honeypot: "", // anti-spam field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Please share at least 15 characters describing your enquiry";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Spam detected silently
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

      // Persist in local storage for offline mode
      saveEnquiry(newEnquiry);

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
        honeypot: "",
      });
    } catch (err) {
      setErrors({ form: "An error occurred while saving your message. Please try again." });
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
          subtitle="Reach out to learn more about our programmes, volunteer, explore partnerships, or share concerns."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
        />

        <Section background="white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-muted-terracotta text-sm uppercase tracking-wider font-semibold mb-2">
                  Get in Touch
                </p>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-4">
                  We'd Love to Hear From You
                </h2>
                <p className="text-secondary-text leading-relaxed">
                  Whether you wish to sponsor a child development initiative, coordinate corporate CSR
                  partnerships, or report a community safeguarding concern, our team is here.
                </p>
              </div>

              <div className="space-y-4">
                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Official Email</h3>
                    <a
                      href="mailto:info@bornfoundation.org"
                      className="text-secondary-text text-sm hover:text-forest-green transition-colors"
                    >
                      info@bornfoundation.org
                    </a>
                  </div>
                </Card>

                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Response Time</h3>
                    <p className="text-secondary-text text-sm">
                      We aim to review and respond to all inquiries within 48 business hours.
                    </p>
                  </div>
                </Card>

                <Card variant="bordered" padding="md" className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-soft-sage text-forest-green flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-sm">Registered Secretariat & Office</h3>
                    <p className="text-secondary-text text-sm leading-relaxed">
                      {SITE_CONFIG.contact.address}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Safeguarding Contact Callout */}
              <div className="p-5 rounded-xl bg-forest-green text-white">
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <Shield className="w-5 h-5 text-warm-gold" />
                  <h4>Child Safeguarding Concern?</h4>
                </div>
                <p className="text-xs text-white/80 leading-relaxed mb-3">
                  Urgent disclosures regarding child welfare or safety receive immediate priority review
                  by our designated safeguarding officer.
                </p>
                <span className="text-xs font-semibold text-warm-gold">
                  safeguarding@bornfoundation.org
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Card variant="elevated" padding="lg">
                {isSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-main-text">
                      Message Successfully Sent
                    </h3>
                    <p className="text-secondary-text max-w-md mx-auto text-sm leading-relaxed">
                      Thank you for contacting Born Foundation. Your enquiry has been securely logged
                      in our administration system. An authorized coordinator will review it shortly.
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
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-main-text mb-2">
                      Send an Inquiry
                    </h3>

                    {/* Anti-spam honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website-url">Leave this empty</label>
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
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      error={errors.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Email Address"
                        type="email"
                        required
                        placeholder="e.g. priya@example.com"
                        value={formData.email}
                        error={errors.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />

                      <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <Select
                      label="Subject / Nature of Inquiry"
                      required
                      options={[
                        { value: "General Inquiry", label: "General Inquiry" },
                        { value: "Volunteering Interest", label: "Volunteering Interest" },
                        { value: "Corporate CSR / Partnership", label: "Corporate CSR / Partnership" },
                        { value: "Financial Contribution Question", label: "Financial Contribution Question" },
                        { value: "Media & Press", label: "Media & Press" },
                        { value: "Child Safeguarding Concern", label: "Child Safeguarding Concern" },
                      ]}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />

                    <Textarea
                      label="Your Message"
                      required
                      placeholder="Please share detailed information regarding your inquiry..."
                      value={formData.message}
                      error={errors.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div className="p-3 bg-surface-muted rounded-lg border border-border text-xs text-secondary-text flex items-start gap-2">
                      <Shield className="w-4 h-4 text-forest-green shrink-0 mt-0.5" />
                      <span>
                        <strong>Privacy Notice:</strong> We store contact submissions exclusively for responding to
                        your request. We never sell, lease, or distribute personal information to external marketers.
                      </span>
                    </div>

                    {errors.form && (
                      <p className="text-sm text-red-600" role="alert">
                        {errors.form}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
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
