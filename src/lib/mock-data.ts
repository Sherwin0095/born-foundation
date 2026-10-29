// ============================================================
// Born Foundation — Offline Mock Data
// Provides realistic sample data for offline development.
// All data is illustrative and does not represent real people.
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
} from "./types";

// ---- Staff Profiles ----
export const MOCK_PROFILES: Profile[] = [
  {
    id: "admin-001",
    email: "admin@bornfoundation.org",
    full_name: "Admin User",
    role: "super_admin",
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "editor-001",
    email: "editor@bornfoundation.org",
    full_name: "Priya Sharma",
    role: "editor",
    is_active: true,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },
  {
    id: "reviewer-001",
    email: "reviewer@bornfoundation.org",
    full_name: "Ravi Mehta",
    role: "reviewer",
    is_active: true,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },
];

// ---- Programmes ----
export const MOCK_PROGRAMMES: Programme[] = [
  {
    id: "prog-001",
    title: "Bright Futures Learning Programme",
    slug: "bright-futures-learning",
    description:
      "Supporting children with access to quality education through tutoring, mentoring, and learning materials. This programme aims to bridge educational gaps for children from underserved communities.",
    objectives:
      "Provide supplementary education to children who lack access to quality schooling. Offer one-on-one tutoring and group learning sessions. Supply essential learning materials including books, stationery, and digital resources.",
    activities:
      "After-school tutoring sessions, weekend learning camps, distribution of learning materials, digital literacy workshops, and mentorship pairing.",
    eligibility: "Children aged 6–16 from underserved communities.",
    outcomes:
      "Outcomes will be reported after the programme completes its first operational cycle and data has been independently verified.",
    category: "education",
    status: "published",
    author_id: "editor-001",
    order_index: 1,
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "prog-002",
    title: "Nourish & Thrive",
    slug: "nourish-and-thrive",
    description:
      "Ensuring children receive adequate nutrition through regular meal programmes, nutrition education, and family support. Good nutrition is fundamental to a child's physical and cognitive development.",
    objectives:
      "Provide nutritious meals to children in need. Educate families on affordable, balanced nutrition. Identify and address cases of malnutrition early.",
    activities:
      "Meal distribution, nutrition workshops for parents and caregivers, growth monitoring, and referrals to healthcare providers when needed.",
    eligibility: "Children and families identified through community outreach.",
    outcomes:
      "Outcomes will be reported after the programme completes its first operational cycle and data has been independently verified.",
    category: "nutrition",
    status: "published",
    author_id: "editor-001",
    order_index: 2,
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "prog-003",
    title: "Safe Haven Care",
    slug: "safe-haven-care",
    description:
      "Creating safe, nurturing environments where children can heal, grow, and feel protected. This programme provides emotional support, counselling, and safe spaces for children who need them most.",
    objectives:
      "Offer emotional and psychological support to vulnerable children. Provide safe community spaces for children to learn and play. Train caregivers and community members in child protection practices.",
    activities:
      "Counselling sessions, safe-space community centres, caregiver training workshops, and child protection awareness campaigns.",
    eligibility: "Children and families referred through community partners and social workers.",
    outcomes:
      "Outcomes will be reported after the programme completes its first operational cycle and data has been independently verified.",
    category: "care",
    status: "published",
    author_id: "editor-001",
    order_index: 3,
    created_at: "2024-04-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "prog-004",
    title: "Youth Skills Workshop",
    slug: "youth-skills-workshop",
    description:
      "Equipping older children and young people with practical skills for self-reliance. From vocational training to life skills, this programme prepares young people for a brighter, more independent future.",
    objectives:
      "Provide vocational and life skills training to adolescents. Build confidence and self-reliance. Connect young people with mentors and employment opportunities.",
    activities:
      "Vocational training workshops, life skills classes, mentorship programmes, career guidance, and micro-enterprise support.",
    eligibility: "Young people aged 14–21 from programme communities.",
    outcomes:
      "Outcomes will be reported after the programme completes its first operational cycle and data has been independently verified.",
    category: "skills",
    status: "published",
    author_id: "editor-001",
    order_index: 4,
    created_at: "2024-05-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "prog-005",
    title: "Community Roots",
    slug: "community-roots",
    description:
      "Strengthening the communities that surround and support children. By working with families, local leaders, and organisations, we build lasting support networks that protect and uplift children.",
    objectives:
      "Build community capacity to support children's wellbeing. Engage parents and local leaders in child development initiatives. Create sustainable community support structures.",
    activities:
      "Community meetings, parent support groups, local leader training, inter-agency coordination, and community development projects.",
    eligibility: "Communities served by Born Foundation programmes.",
    outcomes:
      "Outcomes will be reported after the programme completes its first operational cycle and data has been independently verified.",
    category: "community",
    status: "draft",
    author_id: "editor-001",
    order_index: 5,
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2024-06-01T00:00:00Z",
  },
];

// ---- Stories ----
export const MOCK_STORIES: Story[] = [
  {
    id: "story-001",
    title: "How Community Learning Centres Are Changing Lives",
    slug: "community-learning-centres-changing-lives",
    content:
      "Across several communities, learning centres have become beacons of hope for children who previously had limited access to education. These centres provide a safe, welcoming space where children can study, receive tutoring, and explore new interests.\n\nVolunteers and trained educators work together to create engaging learning experiences that go beyond traditional classroom instruction. Children are encouraged to ask questions, think critically, and support one another.\n\nThe impact of these centres extends beyond academics. Children who attend regularly show improved confidence, social skills, and a renewed enthusiasm for learning. Parents have noted positive changes at home as well, with children becoming more curious and self-motivated.\n\nAs we continue to grow this initiative, we remain committed to creating environments where every child feels valued, supported, and inspired to reach their full potential.",
    excerpt:
      "Learning centres across communities are providing safe, welcoming spaces where children can study, explore, and grow with the support of dedicated volunteers and educators.",
    category: "Education",
    is_featured: true,
    status: "published",
    author_id: "editor-001",
    reviewer_id: "reviewer-001",
    publisher_id: "admin-001",
    published_at: "2024-07-15T00:00:00Z",
    created_at: "2024-07-10T00:00:00Z",
    updated_at: "2024-07-15T00:00:00Z",
  },
  {
    id: "story-002",
    title: "Building a Nutrition-Aware Community",
    slug: "building-nutrition-aware-community",
    content:
      "Good nutrition is the foundation of a healthy childhood. Our community nutrition workshops bring together parents, caregivers, and local health workers to learn about affordable, balanced diets for children.\n\nParticipants learn practical skills like preparing nutritious meals with locally available ingredients, understanding food labels, and recognising signs of nutritional deficiencies. The workshops also address common myths about child nutrition.\n\nFeedback from participants has been overwhelmingly positive. Many parents have shared that they now feel more confident in providing balanced meals for their families, even on limited budgets.\n\nWe believe that by empowering communities with knowledge, we can create lasting change in children's health and wellbeing.",
    excerpt:
      "Community nutrition workshops are empowering parents with practical knowledge to provide balanced, nutritious meals for their children.",
    category: "Nutrition",
    is_featured: true,
    status: "published",
    author_id: "editor-001",
    reviewer_id: "reviewer-001",
    publisher_id: "admin-001",
    published_at: "2024-08-20T00:00:00Z",
    created_at: "2024-08-15T00:00:00Z",
    updated_at: "2024-08-20T00:00:00Z",
  },
  {
    id: "story-003",
    title: "Volunteers Making a Difference Every Weekend",
    slug: "volunteers-making-difference",
    content:
      "Every weekend, dedicated volunteers gather to support children through tutoring, mentoring, and recreational activities. Their commitment has a profound impact on the children they work with.\n\nFrom helping with homework to teaching new skills, volunteers bring warmth, patience, and genuine care to every interaction. Many have developed meaningful relationships with the children, becoming trusted mentors and role models.\n\nThe children look forward to these weekend sessions, not just for the learning, but for the sense of belonging and encouragement they receive. For many, it is the highlight of their week.\n\nWe are deeply grateful to every volunteer who gives their time and energy to make a difference in a child's life.",
    excerpt:
      "Dedicated volunteers spend their weekends supporting children through tutoring, mentoring, and meaningful connection.",
    category: "Volunteering",
    is_featured: false,
    status: "published",
    author_id: "editor-001",
    published_at: "2024-09-10T00:00:00Z",
    created_at: "2024-09-05T00:00:00Z",
    updated_at: "2024-09-10T00:00:00Z",
  },
];

// ---- Impact Metrics ----
export const MOCK_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: "metric-001",
    label: "Communities Served",
    value: "—",
    description: "Number of communities actively served by Born Foundation programmes. This figure will be updated once our first reporting period is complete.",
    is_verified: false,
    is_published: false,
    order_index: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

// ---- Contact Enquiries ----
export const MOCK_ENQUIRIES: ContactEnquiry[] = [
  {
    id: "enq-001",
    name: "Ananya Desai",
    email: "ananya@example.com",
    subject: "Volunteering Enquiry",
    message: "I would like to know more about volunteering opportunities with Born Foundation. I am based in Mumbai and available on weekends.",
    status: "new",
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2024-10-01T10:00:00Z",
  },
  {
    id: "enq-002",
    name: "Rahul Patel",
    email: "rahul@example.com",
    phone: "+91-9876543210",
    subject: "Corporate Partnership",
    message: "Our company is interested in partnering with Born Foundation for a CSR initiative focused on child education. Could we arrange a meeting?",
    status: "in_progress",
    assigned_to: "admin-001",
    created_at: "2024-10-05T14:30:00Z",
    updated_at: "2024-10-06T09:00:00Z",
  },
];

// ---- Volunteer Applications ----
export const MOCK_VOLUNTEER_APPS: VolunteerApplication[] = [
  {
    id: "vol-001",
    full_name: "Sneha Iyer",
    email: "sneha@example.com",
    phone: "+91-9123456789",
    city: "Bangalore",
    area_of_interest: "Education & Tutoring",
    availability: "Weekends",
    experience: "3 years teaching experience at a local school",
    motivation: "I want to help children from underserved communities get access to quality education.",
    status: "pending",
    created_at: "2024-10-10T08:00:00Z",
    updated_at: "2024-10-10T08:00:00Z",
  },
];

// ---- FAQ ----
export const MOCK_FAQ: FAQItem[] = [
  {
    question: "What is Born Foundation?",
    answer: "Born Foundation is a non-profit organisation dedicated to the care, wellbeing, development, and support of children who need assistance. We work through community-based programmes focused on education, nutrition, care, skills development, and community support.",
    category: "About the Foundation",
  },
  {
    question: "Where does Born Foundation operate?",
    answer: "Born Foundation operates in communities across India where children face challenges related to education, nutrition, and wellbeing. Specific locations are determined through community needs assessments.",
    category: "About the Foundation",
  },
  {
    question: "Is Born Foundation a registered organisation?",
    answer: "Born Foundation's registration and legal status details will be published here once confirmed. We are committed to full transparency about our organisational structure and governance.",
    category: "About the Foundation",
  },
  {
    question: "What programmes does Born Foundation run?",
    answer: "We focus on five key areas: Education and Learning, Nutrition and Essential Needs, Care and Wellbeing, Skills and Development, and Community Support. Visit our Programmes page for detailed information about each initiative.",
    category: "Programmes",
  },
  {
    question: "How can I donate to Born Foundation?",
    answer: "We are currently setting up our donation processing system. Once it is ready, you will be able to make secure online donations through our website. In the meantime, please contact us directly for information about how to contribute.",
    category: "Donations",
  },
  {
    question: "Are donations to Born Foundation tax-deductible?",
    answer: "Tax deductibility depends on the foundation's registration status and applicable regulations. We will publish clear information about tax benefits once our legal and tax compliance is confirmed.",
    category: "Donations",
  },
  {
    question: "How can I volunteer with Born Foundation?",
    answer: "We welcome volunteers who are passionate about helping children. You can express your interest through our volunteer application form on the Support page. We will contact you to discuss available opportunities that match your skills and availability.",
    category: "Volunteering",
  },
  {
    question: "What kind of volunteer roles are available?",
    answer: "Volunteer roles include tutoring, mentoring, community outreach, event support, administrative help, and skills-based volunteering. The specific roles available depend on current programme needs.",
    category: "Volunteering",
  },
  {
    question: "Can my company partner with Born Foundation?",
    answer: "Yes, we welcome corporate partnerships and CSR collaborations. Companies can support our work through funding, employee volunteering, in-kind contributions, or joint programme development. Contact us to discuss partnership opportunities.",
    category: "Partnerships",
  },
  {
    question: "How does Born Foundation ensure transparency?",
    answer: "We are committed to transparency in all our operations. We will publish annual reports, programme reports, and financial information on our Impact & Transparency page. All published statistics are verified before being made public.",
    category: "Transparency",
  },
  {
    question: "How does Born Foundation protect children's privacy?",
    answer: "Child safeguarding is a core priority. We never publish identifying information about children without appropriate authorisation. All stories and photographs go through a rigorous approval process, and we follow strict data protection practices for any child-related information.",
    category: "Transparency",
  },
  {
    question: "How can I contact Born Foundation?",
    answer: "You can reach us through the contact form on our Contact page, or by emailing us at the address listed there. We aim to respond to all enquiries within 48 hours.",
    category: "Contact",
  },
];

// ---- Site Settings ----
export const MOCK_SITE_SETTINGS: SiteSetting[] = [
  {
    id: "setting-001",
    key: "site_name",
    value: "Born Foundation",
    category: "general",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "setting-002",
    key: "site_tagline",
    value: "Caring for Every Child's Tomorrow",
    category: "general",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "setting-003",
    key: "contact_email",
    value: "info@bornfoundation.org",
    category: "contact",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "setting-004",
    key: "donations_enabled",
    value: "false",
    category: "donations",
    updated_at: "2024-01-01T00:00:00Z",
  },
];
