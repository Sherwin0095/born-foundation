// ============================================================
// Born Foundation — Offline Development Seed Data
// Public-facing focus areas reflect supplied info & observed
// community activities. Stories default empty to uphold zero
// fabrication; admin workflows remain fully interactive.
// ============================================================

import type {
  Profile,
  Page,
  Programme,
  Story,
  ImpactMetric,
  ContactEnquiry,
  VolunteerApplication,
  MediaAsset,
  FAQItem,
  SiteSetting,
  AuditLog,
} from "./types";

// ---- Offline Admin Sandbox Accounts (Never indexed or displayed on public pages) ----
export const MOCK_PROFILES: Profile[] = [
  {
    id: "admin-001",
    email: "admin@bornfoundation.org",
    full_name: "System Administrator (Sandbox)",
    role: "super_admin",
    is_active: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "editor-001",
    email: "editor@bornfoundation.org",
    full_name: "Content Editor (Sandbox)",
    role: "editor",
    is_active: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
  {
    id: "reviewer-001",
    email: "reviewer@bornfoundation.org",
    full_name: "Safeguarding Reviewer (Sandbox)",
    role: "reviewer",
    is_active: true,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-01-01T00:00:00Z",
  },
];

// ---- Editable Public Page Sections (Managed via Admin -> Pages) ----
export const MOCK_PAGES: Page[] = [
  {
    id: "page-home",
    title: "Homepage",
    slug: "/",
    excerpt: "Primary landing page introducing BORN FOUNDATION's work for children and women.",
    content:
      "Supporting underprivileged children through care, learning, development and community participation, while promoting the wellbeing of women and children.",
    meta_title: "BORN FOUNDATION — Every Child Deserves a Brighter Tomorrow",
    meta_description:
      "Non-profit organisation in Shanthinagar, Bengaluru supporting underprivileged children's welfare alongside women and child development.",
    status: "published",
    author_id: "admin-001",
    published_at: "2026-11-25T00:00:00Z",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "page-about",
    title: "About Us",
    slug: "/about",
    excerpt: "Purpose, mission, vision, values, operating approach, and safeguarding commitments.",
    content:
      "Every child deserves the opportunity to learn, grow, feel safe and build a brighter future. A child's circumstances should never determine the limits of their dreams.",
    meta_title: "About Us — Caring for Every Child's Tomorrow",
    meta_description:
      "Learn about BORN FOUNDATION's mission, vision, core values, safeguarding principles, and commitment to transparency.",
    status: "published",
    author_id: "admin-001",
    published_at: "2026-11-25T00:00:00Z",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "page-get-involved",
    title: "Get Involved",
    slug: "/get-involved",
    excerpt: "Volunteering with mandatory screening, community participation, in-kind support, and CSR partnerships.",
    content:
      "Every safe, responsible contribution strengthens the network surrounding children and women in our communities.",
    meta_title: "Get Involved — Volunteering & Partnerships",
    meta_description:
      "Explore supervised volunteering, community participation, in-kind educational supplies, and partnerships with BORN FOUNDATION.",
    status: "published",
    author_id: "admin-001",
    published_at: "2026-11-25T00:00:00Z",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
];

// ---- Focus Areas & Activity Themes (Grounded in supplied scope & observed photos; formal schedule pending confirmation) ----
export const MOCK_PROGRAMMES: Programme[] = [
  {
    id: "prog-001",
    title: "Education & Learning Support",
    slug: "education-learning-support",
    description:
      "Organisational focus area dedicated to helping underprivileged children access learning materials, stationery kits, creative drawing sessions, and encouraging educational environments.",
    objectives:
      "Encourage curiosity and school readiness; provide essential stationery sets, backpacks, and notebooks; foster creative learning through drawing and guided centre sessions.",
    activities:
      "Distribution of writing stationery kits and school bags; supervised creative drawing and art activities; collaborative centre learning sessions led by adult educators.",
    eligibility: "Open organisational focus area — formal enrolment guidelines awaiting confirmation.",
    outcomes:
      "Quantitative enrolment and learning outcomes will be published only after verified cycle compilation.",
    category: "education",
    featured_image_url: "/images/gallery/learning-kits-facilitators-800.webp",
    is_focus_area_only: true,
    status: "published",
    author_id: "editor-001",
    order_index: 1,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "prog-002",
    title: "Nutrition & Essential Wellbeing",
    slug: "nutrition-essential-wellbeing",
    description:
      "Focus area addressing everyday nutritional needs and daily essentials so children have the energy and physical wellbeing required to participate actively in learning and community life.",
    objectives:
      "Support wholesome shared meals during centre gatherings and group outings; encourage healthy hydration and practical day-to-day essentials.",
    activities:
      "Supervised community meal sharing, outdoor breakfast gatherings during group activities, and provision of reusable drinking water bottles.",
    eligibility: "Open organisational focus area — centre participation criteria awaiting confirmation.",
    outcomes:
      "Meal distribution counts and nutritional reporting remain pending independent documentation.",
    category: "nutrition",
    is_focus_area_only: true,
    status: "published",
    author_id: "editor-001",
    order_index: 2,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "prog-003",
    title: "Child Development & Safe Spaces",
    slug: "child-development-safe-spaces",
    description:
      "Focus area centred on nurturing children's holistic personal development, emotional confidence, dignity, and protection within respectful community environments.",
    objectives:
      "Foster welcoming spaces where children are listened to, supported, and safeguarded; nurture personal confidence, social skills, and mutual respect.",
    activities:
      "Facilitated indoor centre sessions, age-appropriate group mentoring, seasonal workshops, and adult supervision aligned with child safeguarding standards.",
    eligibility: "Open organisational focus area for underprivileged and underserved children.",
    outcomes:
      "Programmatic evaluations will be published once verified impact cycles are documented.",
    category: "child-development",
    is_focus_area_only: true,
    status: "published",
    author_id: "editor-001",
    order_index: 3,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "prog-004",
    title: "Cultural & Recreational Activities",
    slug: "cultural-recreational-activities",
    description:
      "Observed community activities offering children joyful opportunities for teamwork, cultural expression, creative performance, and national day commemorations.",
    objectives:
      "Encourage self-expression, teamwork, cultural belonging, and joyful recreational participation outside routine academic pressure.",
    activities:
      "National day flag hoisting observances, group cultural dance and stage presentations, and community festive celebrations.",
    eligibility: "Open community participation — formal calendar awaiting publication.",
    outcomes:
      "Verified event participation figures will be shared after organisational sign-off.",
    category: "cultural",
    featured_image_url: "/images/gallery/community-flag-ceremony-800.webp",
    is_focus_area_only: true,
    status: "published",
    author_id: "editor-001",
    order_index: 4,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "prog-005",
    title: "Educational Experiences & Outings",
    slug: "educational-experiences-visits",
    description:
      "Observed supervised exposure activities designed to spark scientific curiosity and widen horizons through educational visits beyond everyday neighbourhoods.",
    objectives:
      "Promote practical curiosity and discovery through supervised excursions to educational institutions, museums, and science galleries.",
    activities:
      "Adult-chaperoned group bus excursions, interactive science centre visits, and shared group reflection.",
    eligibility: "Authorised group activities with adult chaperones and guardian permission.",
    outcomes:
      "Summary reports will be published once annual review records are compiled.",
    category: "experiences",
    is_focus_area_only: true,
    status: "published",
    author_id: "editor-001",
    order_index: 5,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "prog-006",
    title: "Women & Community Development",
    slug: "women-community-development",
    description:
      "Core organisational focus promoting women's wellbeing, collective dialogue, family participation, and cohesive community support networks around children.",
    objectives:
      "Strengthen women's participation in community decision-making and mutual support; build collaborative relationships with parents, caregivers, and local partners.",
    activities:
      "Women's community discussion circles, caregiver engagement alongside learning support, and neighbourhood awareness gatherings.",
    eligibility: "Women, mothers, caregivers, and families across community neighbourhoods.",
    outcomes:
      "Community participation metrics will be published following formal verification.",
    category: "women-community",
    featured_image_url: "/images/gallery/womens-community-circle-800.webp",
    is_focus_area_only: true,
    status: "published",
    author_id: "editor-001",
    order_index: 6,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
];

// ---- Stories (Default EMPTY per strict anti-fabrication policy — admin creates & approves genuine updates) ----
export const MOCK_STORIES: Story[] = [];

// ---- Media Assets Catalogue (Safeguarding-first status synced with ZIP review) ----
export const MOCK_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: "bf-media-10",
    filename: "womens-community-circle-1200.webp",
    original_filename: "archive-asset-10",
    mime_type: "image/webp",
    size_bytes: 79400,
    url: "/images/gallery/womens-community-circle-1200.webp",
    alt_text: "Group of women seated in a supportive community discussion circle with two female facilitators.",
    caption: "Women participating in a community outreach discussion in Bengaluru.",
    category: "women-community",
    has_identifiable_children: false,
    safeguarding_risk: "low",
    exif_stripped: true,
    approval_status: "approved",
    uploaded_by: "admin-001",
    approved_by: "reviewer-001",
    is_public: true,
    review_notes: "Non-identifying adult group circle; foreground edge cropped & distant background toddler softly anonymised.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-03",
    filename: "learning-kits-facilitators-1200.webp",
    original_filename: "archive-asset-03",
    mime_type: "image/webp",
    size_bytes: 82500,
    url: "/images/gallery/learning-kits-facilitators-1200.webp",
    alt_text: "Adult staff organising boxed stationery supplies and writing materials on a centre table.",
    caption: "Educators preparing writing supplies and pencil kits at a learning centre.",
    category: "education",
    has_identifiable_children: false,
    safeguarding_risk: "low",
    exif_stripped: true,
    approval_status: "approved",
    uploaded_by: "admin-001",
    approved_by: "reviewer-001",
    is_public: true,
    review_notes: "Public derivative tightly cropped to adult educators, learning supplies table, and organisational banner; zero minors shown.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-02",
    filename: "community-flag-ceremony-1200.webp",
    original_filename: "archive-asset-02",
    mime_type: "image/webp",
    size_bytes: 68200,
    url: "/images/gallery/community-flag-ceremony-1200.webp",
    alt_text: "Two adult coordinators hoisting a decorated flagpole inside an arched courtyard.",
    caption: "National day observance led by adult community coordinators.",
    category: "cultural",
    has_identifiable_children: false,
    safeguarding_risk: "low",
    exif_stripped: true,
    approval_status: "approved",
    uploaded_by: "admin-001",
    approved_by: "reviewer-001",
    is_public: true,
    review_notes: "Upper courtyard crop displays adult coordinators only; foreground minors excluded.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-01",
    filename: "classroom-meal-sharing-review.webp",
    original_filename: "archive-asset-01",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Children seated indoors sharing a community meal on steel plates.",
    caption: "Withheld pending guardian consent: indoor meal gathering.",
    category: "nutrition",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; identifiable minors require verified parental/guardian consent.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-04",
    filename: "youth-cultural-programme-review.webp",
    original_filename: "archive-asset-04",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Young participants during a group cultural presentation.",
    caption: "Withheld pending guardian consent: group summer presentation.",
    category: "cultural",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; multiple identifiable adolescents visible.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-05",
    filename: "warm-meal-distribution-review.webp",
    original_filename: "archive-asset-05",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Community volunteer serving warm rice meals onto steel plates.",
    caption: "Withheld pending guardian consent: community meal serving.",
    category: "nutrition",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; minors' side-frontal faces visible.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-06",
    filename: "creative-drawing-circle-review.webp",
    original_filename: "archive-asset-06",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Children seated in a circle drawing and colouring on paper.",
    caption: "Withheld pending guardian consent: creative drawing activity.",
    category: "education",
    has_identifiable_children: true,
    safeguarding_risk: "medium",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; several faces visible around perimeter.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-07",
    filename: "independence-day-cultural-dance-review.webp",
    original_filename: "archive-asset-07",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Children performing group cultural dance before national flag.",
    caption: "Withheld pending guardian consent: national day dance performance.",
    category: "cultural",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; clear frontal faces of multiple children.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-08",
    filename: "reusable-water-bottles-review.webp",
    original_filename: "archive-asset-08",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Children holding reusable water bottles inside learning centre.",
    caption: "Withheld pending guardian consent: clean hydration support.",
    category: "nutrition",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; direct close-range minor portraits.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-09",
    filename: "science-museum-excursion-review.webp",
    original_filename: "archive-asset-09",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Children and educators visiting Science for Kids gallery.",
    caption: "Withheld pending guardian consent: educational science outing.",
    category: "experiences",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; ~20 minors visible frontally.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-11",
    filename: "outdoor-breakfast-gathering-review.webp",
    original_filename: "archive-asset-11",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Older youths seated outdoors sharing breakfast.",
    caption: "Withheld pending guardian consent: outdoor communal breakfast.",
    category: "nutrition",
    has_identifiable_children: true,
    safeguarding_risk: "medium",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; partial profiles of youths visible.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-12",
    filename: "group-excursion-coach-review.webp",
    original_filename: "archive-asset-12",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Children and chaperones waving beside excursion coach.",
    caption: "Withheld pending guardian consent: group educational outing.",
    category: "experiences",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; frontal group portrait of minors.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-13",
    filename: "school-backpack-distribution-review.webp",
    original_filename: "archive-asset-13",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Staff handing school backpack to mother and child beside supply stacks.",
    caption: "Withheld pending guardian consent: school bag distribution.",
    category: "education",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; identifiable child and family members visible.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-14",
    filename: "centre-mentoring-gathering-review.webp",
    original_filename: "archive-asset-14",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Facilitator speaking to participants seated on mats at centre.",
    caption: "Withheld pending guardian consent: centre group mentoring.",
    category: "child-development",
    has_identifiable_children: true,
    safeguarding_risk: "medium",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; side-profile minors visible on foreground floor mats.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "bf-media-15",
    filename: "childrens-day-gift-celebration-review.webp",
    original_filename: "archive-asset-15",
    mime_type: "image/webp",
    size_bytes: 0,
    url: "",
    alt_text: "Young participants in festive attire holding gift packets with educators.",
    caption: "Withheld pending guardian consent: centre celebration gathering.",
    category: "cultural",
    has_identifiable_children: true,
    safeguarding_risk: "high",
    exif_stripped: true,
    approval_status: "pending",
    uploaded_by: "admin-001",
    is_public: false,
    review_notes: "Held in private archive; multiple close frontal portraits of minors.",
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
];

// ---- Impact Metrics (Zero fabricated stats — unpublished until verified) ----
export const MOCK_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: "metric-001",
    label: "Communities Served",
    value: "Verification Pending",
    description:
      "Aggregate reach metrics will be published only after verification and organisational sign-off.",
    is_verified: false,
    is_published: false,
    order_index: 1,
    created_at: "2026-11-25T00:00:00Z",
    updated_at: "2026-11-25T00:00:00Z",
  },
];

// ---- Offline Admin Inbox Defaults (Empty by default in public build — test/form submissions populate live) ----
export const MOCK_ENQUIRIES: ContactEnquiry[] = [];

export const MOCK_VOLUNTEER_APPS: VolunteerApplication[] = [];

// ---- Audit Logs ----
export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: "audit-001",
    user_id: "reviewer-001",
    action: "MEDIA_SAFEGUARDING_AUDIT",
    entity_type: "media_assets",
    entity_id: "zip-batch-15",
    details:
      "Processed 15 supplied source photographs; approved 3 non-identifying EXIF-stripped public derivatives and withheld 12 identifiable minor photographs pending documented consent.",
    created_at: "2026-11-25T00:00:00Z",
  },
];

// ---- FAQ ----
export const MOCK_FAQ: FAQItem[] = [
  {
    question: "What is BORN FOUNDATION and what is its focus?",
    answer:
      "BORN FOUNDATION is a non-profit organisation based in Shanthinagar, Bengaluru dedicated to supporting underprivileged and underserved children through care, learning, wellbeing, and personal development, alongside a broader focus on women and child development.",
    category: "About the Foundation",
  },
  {
    question: "Is BORN FOUNDATION a residential orphanage, adoption centre, or school?",
    answer:
      "No. BORN FOUNDATION operates as a non-profit organisation supporting children's welfare, learning support, wellbeing, and women and child development. It should not be described as a residential orphanage, adoption agency, licensed residential childcare institution, or formal school.",
    category: "About the Foundation",
  },
  {
    question: "Where is BORN FOUNDATION located?",
    answer:
      "Our supplied address is No. 6/2, Langford Road, 4th Cross, Shanthinagar, Bengaluru, Karnataka 560027, India. You can also reach the secretariat by telephone at +91 99864 95292.",
    category: "Contact & Transparency",
  },
  {
    question: "What areas of activity does BORN FOUNDATION support?",
    answer:
      "Our work focuses on Education and Learning Support (including stationery and school bag distribution), Nutrition and Essential Wellbeing, Child Development and Safe Spaces, Cultural and Recreational Activities, Supervised Educational Experiences, and Women and Community Development.",
    category: "Programmes & Focus Areas",
  },
  {
    question: "How does the organisation support women and communities?",
    answer:
      "Alongside children's welfare, BORN FOUNDATION promotes women and child development through community discussion gatherings, caregiver and family participation, and supportive neighbourhood networks around children.",
    category: "Women & Child Development",
  },
  {
    question: "Are online donations currently enabled on this website?",
    answer:
      "Online payment gateways remain intentionally disabled until formal bank integration, compliance document verification, and executive authorisation are complete. Never send funds to unverified third-party links. Please use the Contact Us page or +91 99864 95292 for verified enquiries.",
    category: "Donations & Support",
  },
  {
    question: "Are donations eligible for 12A / 80G tax deductions or FCRA foreign contributions?",
    answer:
      "Directory listings reference registration number BNG(U)-JNR 304/2004-2005 as well as 12A (reported March 2022), 80G (reported December 2025), and historical FCRA records. However, because official certificates have not yet been independently verified on this portal, tax-deduction eligibility and foreign contribution status are not currently advertised.",
    category: "Donations & Support",
  },
  {
    question: "How can I volunteer, and will I interact directly with children?",
    answer:
      "Prospective volunteers can submit an Expression of Interest through our Get Involved page. No volunteer is permitted unsupervised or direct contact with children prior to identity vetting, reference checks, formal Child Safeguarding Policy induction, and staff authorisation.",
    category: "Volunteering & Screening",
  },
  {
    question: "Can businesses or schools contribute supplies or partner with BORN FOUNDATION?",
    answer:
      "Yes. In-kind contributions (such as stationery sets, books, reusable water bottles, or learning materials) and community or CSR partnerships are welcomed subject to safeguarding alignment. Reach out through Get Involved or Contact Us.",
    category: "Programmes & Focus Areas",
  },
  {
    question: "Why are only some activity photographs displayed publicly in the Gallery?",
    answer:
      "Under our Child Safeguarding Policy, photographs showing identifiable children are never automatically published—even when supplied internally—unless explicit guardian consent and safeguarding approval are documented. Only EXIF-stripped, non-identifying photographs appear publicly while other photographs stay protected in staff review.",
    category: "Safeguarding & Privacy",
  },
  {
    question: "Why are there no beneficiary counts or annual financial reports downloadable yet?",
    answer:
      "Our zero-fabrication policy prohibits publishing estimated beneficiary totals, invented impact percentages, or placeholder reports. Verified figures and official documents will appear on the Impact & Transparency page once formally confirmed and uploaded.",
    category: "Contact & Transparency",
  },
  {
    question: "How do I contact BORN FOUNDATION or raise a safeguarding concern?",
    answer:
      "You can call +91 99864 95292 or submit a message via the Contact Us page. If a child is in immediate danger, always contact local emergency or child protection authorities first. Verified email addresses and opening hours will be added once confirmed.",
    category: "Contact & Transparency",
  },
];

// ---- Site Settings ----
export const MOCK_SITE_SETTINGS: SiteSetting[] = [
  {
    id: "setting-001",
    key: "site_name",
    value: "BORN FOUNDATION",
    category: "general",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "setting-002",
    key: "site_tagline",
    value: "Caring for Every Child's Tomorrow",
    category: "general",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "setting-003",
    key: "contact_phone",
    value: "+91 99864 95292",
    category: "contact",
    updated_at: "2026-11-25T00:00:00Z",
  },
  {
    id: "setting-004",
    key: "donations_enabled",
    value: "false",
    category: "donations",
    updated_at: "2026-11-25T00:00:00Z",
  },
];
