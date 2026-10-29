// ============================================================
// Born Foundation — TypeScript Data Models
// ============================================================

export type UserRole =
  | "super_admin"
  | "editor"
  | "reviewer"
  | "publisher"
  | "enquiry_coordinator"
  | "finance"
  | "auditor";

export type ContentStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "archived";

export type EnquiryStatus =
  | "new"
  | "in_progress"
  | "responded"
  | "resolved"
  | "archived";

export type VolunteerStatus =
  | "pending"
  | "under_review"
  | "accepted"
  | "declined"
  | "archived";

export type DonationStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded";

export type MediaApprovalStatus =
  | "pending"
  | "approved"
  | "rejected";

// ---- Core Models ----

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  featured_image_url?: string;
  status: ContentStatus;
  author_id: string;
  reviewer_id?: string;
  publisher_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Programme {
  id: string;
  title: string;
  slug: string;
  description: string;
  objectives?: string;
  activities?: string;
  eligibility?: string;
  outcomes?: string;
  category: string;
  featured_image_url?: string;
  status: ContentStatus;
  author_id: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  featured_image_url?: string;
  meta_title?: string;
  meta_description?: string;
  is_featured: boolean;
  status: ContentStatus;
  author_id: string;
  reviewer_id?: string;
  publisher_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  original_filename: string;
  mime_type: string;
  size_bytes: number;
  url: string;
  alt_text?: string;
  caption?: string;
  approval_status: MediaApprovalStatus;
  uploaded_by: string;
  approved_by?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  description?: string;
  reporting_period?: string;
  is_verified: boolean;
  is_published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  assigned_to?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  city?: string;
  area_of_interest: string;
  availability?: string;
  experience?: string;
  motivation?: string;
  status: VolunteerStatus;
  reviewer_id?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donor_name?: string;
  donor_email?: string;
  payment_provider?: string;
  payment_id?: string;
  status: DonationStatus;
  is_recurring: boolean;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: string;
  created_at: string;
}

export interface ContentVersion {
  id: string;
  entity_type: string;
  entity_id: string;
  version_number: number;
  content_snapshot: string;
  changed_by: string;
  change_summary?: string;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
  updated_by?: string;
  updated_at: string;
}

// ---- Navigation ----

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  about: [
    { label: "About Us", href: "/about" },
    { label: "Our Programmes", href: "/programmes" },
    { label: "Impact & Transparency", href: "/impact" },
    { label: "Stories", href: "/stories" },
    { label: "FAQ", href: "/faq" },
  ],
  support: [
    { label: "Donate", href: "/support" },
    { label: "Volunteer", href: "/support#volunteer" },
    { label: "Partner With Us", href: "/support#partnerships" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Safeguarding Policy", href: "/safeguarding" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

// ---- Programme Categories ----
export const PROGRAMME_CATEGORIES = [
  { value: "education", label: "Education & Learning" },
  { value: "nutrition", label: "Nutrition & Essential Needs" },
  { value: "care", label: "Care & Wellbeing" },
  { value: "skills", label: "Skills & Development" },
  { value: "community", label: "Community Support" },
] as const;

// ---- FAQ Data ----
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_CATEGORIES = [
  "About the Foundation",
  "Programmes",
  "Donations",
  "Volunteering",
  "Partnerships",
  "Transparency",
  "Contact",
] as const;
