// ============================================================
// BORN FOUNDATION — CENTRALISED SITE CONTENT & CONFIGURATION
// Facts strictly separated from proposed brand copy and
// supplied-but-unverified compliance references.
// ============================================================

export const SITE_CONFIG = {
  name: "BORN FOUNDATION",
  displayName: "Born Foundation",
  legalName: "Born Foundation Non-Governmental Organisation",
  tagline: "Caring for Every Child's Tomorrow",
  homepageHeadline: "Every Child Deserves a Brighter Tomorrow",
  supportingStatement:
    "Supporting underprivileged children through care, learning, development and community participation, while promoting the wellbeing of women and children.",
  proposedMission:
    "To support underprivileged children through opportunities for education, care, wellbeing and personal development, while encouraging the empowerment and wellbeing of women and strengthening communities.",
  proposedVision:
    "A society where every child, regardless of their background or circumstances, has the opportunity to learn, grow safely, live with dignity and realise their full potential.",

  // Top Announcement Banner (Editable)
  banner: {
    enabled: true,
    text: "Supporting underprivileged children's welfare alongside women & community development in Bengaluru",
    badge: "Shanthinagar, Bengaluru",
    linkText: "Explore Our Work",
    linkHref: "/programmes",
  },

  // Supplied Contact & Location Information (Strict adherence — no fabricated email/hours)
  contact: {
    phone: "+91 99864 95292",
    phoneHref: "tel:+919986495292",
    address:
      "No. 6/2, Langford Road, 4th Cross, Shanthinagar, Bengaluru, Karnataka 560027, India",
    shortLocation: "Shanthinagar, Bengaluru, Karnataka 560027",
    emailConfirmed: false,
    emailStatusNotice:
      "Official email address awaiting confirmation by BORN FOUNDATION. Please use the online enquiry form or call +91 99864 95292.",
    safeguardingContactNotice:
      "Designated safeguarding email and officer contact details will be published once confirmed by BORN FOUNDATION. If a child is in immediate danger, contact local emergency or statutory child protection services first, and notify our team via telephone or the confidential enquiry form.",
    openingHoursStatus:
      "Directory listings report opening hours beginning around 09:30 AM (unverified — please call ahead to confirm).",
  },

  // Supplied Registry & Compliance References (Treated as supplied but unverified)
  registry: {
    registrationReference: "BNG(U)-JNR 304/2004-2005",
    registrationStatus: "Supplied reference — official certificate verification pending",
    section12A:
      "NGO directory references 12A granted (reportedly March 2022) — verification via official certificate pending",
    section80G:
      "NGO directory references 80G granted (reportedly December 2025) — tax exemption claims withheld until verified",
    fcraNotice:
      "Directory listings reference FCRA records; active FCRA validity and foreign contribution eligibility are unverified and are not advertised on this website.",
  },

  // Six Thematic Focus Areas (Aligned with supplied scope & observed community activities)
  focusAreas: [
    {
      id: "education",
      title: "Education & Learning Support",
      tagline: "Stationery supplies, learning materials & study spaces",
      desc: "Encouraging learning and helping bridge resource barriers through stationery kits, creative drawing sessions, and guided educational encouragement.",
      icon: "BookOpen",
      slug: "education-learning-support",
      statusNote: "Active Focus Area",
    },
    {
      id: "nutrition",
      title: "Nutrition & Essential Wellbeing",
      tagline: "Shared meals, hydration support & everyday essentials",
      desc: "Promoting children's physical health and daily energy through community meal sharing, clean hydration initiatives, and essential necessities.",
      icon: "Apple",
      slug: "nutrition-essential-wellbeing",
      statusNote: "Active Focus Area",
    },
    {
      id: "child-development",
      title: "Child Development & Safe Spaces",
      tagline: "Dignity, confidence, protection & mentorship",
      desc: "Fostering welcoming community spaces where children are respected, heard, encouraged to build life skills, and protected from harm.",
      icon: "Shield",
      slug: "child-development-safe-spaces",
      statusNote: "Active Focus Area",
    },
    {
      id: "cultural",
      title: "Cultural & Recreational Activities",
      tagline: "Collective celebrations, arts & joyful participation",
      desc: "Supporting creative expression, national day observances, group performances, and constructive recreational gatherings that build confidence.",
      icon: "Sparkles",
      slug: "cultural-recreational-activities",
      statusNote: "Observed Activity Theme",
    },
    {
      id: "experiences",
      title: "Educational Experiences & Outings",
      tagline: "Science curiosity & supervised community visits",
      desc: "Broadening horizons beyond the classroom through supervised educational visits, science gallery trips, and shared discovery experiences.",
      icon: "Compass",
      slug: "educational-experiences-visits",
      statusNote: "Observed Activity Theme",
    },
    {
      id: "women-community",
      title: "Women & Community Development",
      tagline: "Women's participation, family engagement & grassroots solidarity",
      desc: "Encouraging women's wellbeing, informed dialogue, family participation, and supportive community networks that surround every child.",
      icon: "Users",
      slug: "women-community-development",
      statusNote: "Core Focus Area",
    },
  ],

  pillars: [
    {
      title: "Child Safeguarding First",
      description:
        "Children's dignity, privacy, and safety take precedence over publicity. Identifiable photographs of minors remain restricted until documented authorisation is verified.",
      badge: "Non-Negotiable",
    },
    {
      title: "Honest Accountability",
      description:
        "We distinguish verified facts from supplied references, publish zero fabricated numbers, and keep live online payment gateways disabled until statutory clearance.",
      badge: "Zero Fabrication",
    },
    {
      title: "Women & Community Roots",
      description:
        "Sustainable change grows when mothers, caregivers, educators, and neighbours are active participants in shaping supportive local communities.",
      badge: "Community-Led",
    },
  ],
};
