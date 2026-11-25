// ============================================================
// BORN FOUNDATION — PUBLIC SAFE MEDIA REGISTER
// Contains ONLY approved, EXIF-stripped, non-identifying
// derivatives safe for public rendering. Private originals and
// child-identifiable photos remain isolated outside public/.
// ============================================================

export interface PublicGalleryItem {
  id: string;
  slug: string;
  title: string;
  category: "women-community" | "education" | "cultural" | "nutrition" | "experiences" | "child-development";
  categoryLabel: string;
  caption: string;
  altText: string;
  webpSrc: string;
  mediumWebpSrc: string;
  fallbackJpgSrc: string;
  width: number;
  height: number;
  safeguardingStatus: "approved_non_identifying";
  safeguardingNote: string;
}

export const APPROVED_PUBLIC_GALLERY: PublicGalleryItem[] = [
  {
    id: "bf-media-10",
    slug: "womens-community-participation",
    title: "Women's Community Participation Session",
    category: "women-community",
    categoryLabel: "Women & Community",
    caption:
      "Women participating in a community outreach discussion with facilitators inside a neighbourhood hall in Bengaluru.",
    altText:
      "Group of women seated in a supportive community discussion circle with two female facilitators in a sunlit hall.",
    webpSrc: "/images/gallery/womens-community-circle-1200.webp",
    mediumWebpSrc: "/images/gallery/womens-community-circle-800.webp",
    fallbackJpgSrc: "/images/gallery/womens-community-circle-800.jpg",
    width: 1200,
    height: 589,
    safeguardingStatus: "approved_non_identifying",
    safeguardingNote:
      "Adult gathering photograph. Foreground child excluded by framing and distant background child softly anonymised; all EXIF metadata stripped.",
  },
  {
    id: "bf-media-03",
    slug: "learning-kits-facilitators",
    title: "Learning Supplies & Stationery Preparation",
    category: "education",
    categoryLabel: "Education & Learning",
    caption:
      "Community educators and staff organising boxed pencils and stationery sets at a learning centre table in Bengaluru.",
    altText:
      "Adult community staff organising boxed stationery supplies and writing materials on a wooden table in front of the Born Foundation banner.",
    webpSrc: "/images/gallery/learning-kits-facilitators-1200.webp",
    mediumWebpSrc: "/images/gallery/learning-kits-facilitators-800.webp",
    fallbackJpgSrc: "/images/gallery/learning-kits-facilitators-800.jpg",
    width: 1100,
    height: 825,
    safeguardingStatus: "approved_non_identifying",
    safeguardingNote:
      "Tightly framed on adult facilitators, learning kit inventory, and organisational banner; zero minors shown; EXIF metadata stripped.",
  },
  {
    id: "bf-media-02",
    slug: "community-flag-ceremony",
    title: "Courtyard National Day Observance",
    category: "cultural",
    categoryLabel: "Cultural & Recreational",
    caption:
      "Adult community coordinators hoisting a decorated tricolour pole during a national day observance in the centre courtyard.",
    altText:
      "Two adult coordinators hoisting a decorated flagpole inside an arched courtyard while women community members watch.",
    webpSrc: "/images/gallery/community-flag-ceremony-1200.webp",
    mediumWebpSrc: "/images/gallery/community-flag-ceremony-800.webp",
    fallbackJpgSrc: "/images/gallery/community-flag-ceremony-800.jpg",
    width: 1100,
    height: 745,
    safeguardingStatus: "approved_non_identifying",
    safeguardingNote:
      "Framed above younger attendees to show adult community coordinators and courtyard celebration without exposing children; EXIF metadata stripped.",
  },
];

// Non-identifying aggregate breakdown of held source photographs (never exposes private filenames or paths)
export const RESTRICTED_ARCHIVE_BREAKDOWN = {
  totalArchivedPhotographs: 15,
  publiclyApprovedDerivatives: 3,
  heldPendingConsentCount: 12,
  heldCategories: [
    { category: "nutrition", label: "Nutrition & Meal Sharing", count: 4 },
    { category: "cultural", label: "Cultural & Seasonal Gatherings", count: 3 },
    { category: "experiences", label: "Educational Science & Group Excursions", count: 2 },
    { category: "education", label: "Classroom Drawing & Backpack Support", count: 2 },
    { category: "child-development", label: "Centre Group Mentoring Sessions", count: 1 },
  ],
};
