// ============================================================
// BORN FOUNDATION — CENTRALIZED SITE CONTENT & CONFIGURATION
// Easily editable configuration for banners, announcement pills,
// programme metadata, external links, and organisational details.
// ============================================================

export const SITE_CONFIG = {
  name: "Born Foundation",
  legalName: "Born Foundation Non-Governmental Organisation",
  tagline: "Caring for Every Child's Tomorrow",
  description:
    "An organisation dedicated to the holistic care, wellbeing, development, and protection of vulnerable children across community centres in India.",

  // Top Announcement Banner (Editable anytime)
  banner: {
    enabled: true,
    text: "✨ Empowering Children Through Education, Nutrition & Protective Care",
    badge: "Official NGO Initiative",
    linkText: "Learn About 2026 Focus Tracks",
    linkHref: "/programmes",
  },

  // Contact & Regulatory Info
  contact: {
    email: "info@bornfoundation.org",
    safeguardingEmail: "safeguarding@bornfoundation.org",
    phone: "+91 11 2345 6789", // Placeholder for official secretariat phone
    address: "National Operations Secretariat, New Delhi, India",
    workingHours: "Monday to Friday: 9:00 AM – 6:00 PM IST",
  },

  // Focus Areas Summary (Modular & Editable)
  focusAreas: [
    {
      id: "education",
      title: "Education & Literacy",
      tagline: "Academic bridge courses & reading centres",
      desc: "Providing after-school tutoring, learning kits, and digital literacy tools to children from underserved backgrounds.",
      icon: "BookOpen",
      slug: "bright-futures-learning",
    },
    {
      id: "nutrition",
      title: "Nutritional Security",
      tagline: "Wholesome meals & growth tracking",
      desc: "Delivering balanced nutrition workshops and fortified food support to ensure optimal physical and cognitive development.",
      icon: "Apple",
      slug: "nourish-and-thrive",
    },
    {
      id: "safeguarding",
      title: "Protective Care & Wellbeing",
      tagline: "Safe spaces & emotional resilience",
      desc: "Establishing trauma-informed child-safe community hubs with trained counsellors and strict protection protocols.",
      icon: "Shield",
      slug: "safe-haven-care",
    },
    {
      id: "skills",
      title: "Youth Skills & Development",
      tagline: "Vocational guidance & self-reliance",
      desc: "Equipping older adolescents with life skills, vocational workshops, and mentorship for long-term independence.",
      icon: "Lightbulb",
      slug: "youth-skills-workshop",
    },
    {
      id: "community",
      title: "Family & Community Roots",
      tagline: "Caregiver training & sustainable networks",
      desc: "Partnering with parents, teachers, and local stakeholders to create enduring protective safety nets.",
      icon: "Users",
      slug: "community-roots",
    },
  ],

  // Core Impact Pillars (Skeleton / Verified Format)
  pillars: [
    {
      title: "Child Safeguarding Priority",
      description: "Zero-tolerance safeguarding policy with background checks, code of conduct inductions, and privacy protection.",
      badge: "Non-Negotiable",
    },
    {
      title: "Audited Financial Stewardship",
      description: "Dual-key expenditure authorizations with transparent annual report publishing and zero fabrication.",
      badge: "100% Accountable",
    },
    {
      title: "Community-Led Interventions",
      description: "We work directly alongside local families and teachers rather than imposing external assumptions.",
      badge: "Grassroots",
    },
  ],
};
