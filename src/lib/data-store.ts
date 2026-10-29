// ============================================================
// Born Foundation — Offline Data Store
// In-memory + localStorage persistence for offline development.
// Will be replaced by Supabase queries when online.
// ============================================================

import type {
  Profile,
  Programme,
  Story,
  ContactEnquiry,
  VolunteerApplication,
  ImpactMetric,
  ContentStatus,
  FAQItem,
} from "./types";

import {
  MOCK_PROFILES,
  MOCK_PROGRAMMES,
  MOCK_STORIES,
  MOCK_ENQUIRIES,
  MOCK_VOLUNTEER_APPS,
  MOCK_IMPACT_METRICS,
  MOCK_FAQ,
} from "./mock-data";

const STORAGE_PREFIX = "born_foundation_";

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

// ---- Programmes ----

export function getPublishedProgrammes(): Programme[] {
  const programmes = loadFromStorage<Programme>("programmes", MOCK_PROGRAMMES);
  return programmes
    .filter((p) => p.status === "published")
    .sort((a, b) => a.order_index - b.order_index);
}

export function getAllProgrammes(): Programme[] {
  return loadFromStorage<Programme>("programmes", MOCK_PROGRAMMES).sort(
    (a, b) => a.order_index - b.order_index
  );
}

export function getProgrammeBySlug(slug: string): Programme | undefined {
  const programmes = loadFromStorage<Programme>("programmes", MOCK_PROGRAMMES);
  return programmes.find((p) => p.slug === slug);
}

export function saveProgramme(programme: Programme): void {
  const programmes = loadFromStorage<Programme>("programmes", MOCK_PROGRAMMES);
  const idx = programmes.findIndex((p) => p.id === programme.id);
  if (idx >= 0) {
    programmes[idx] = { ...programme, updated_at: new Date().toISOString() };
  } else {
    programmes.push(programme);
  }
  saveToStorage("programmes", programmes);
}

// ---- Stories ----

export function getPublishedStories(): Story[] {
  const stories = loadFromStorage<Story>("stories", MOCK_STORIES);
  return stories
    .filter((s) => s.status === "published")
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
}

export function getFeaturedStories(): Story[] {
  return getPublishedStories().filter((s) => s.is_featured);
}

export function getAllStories(): Story[] {
  return loadFromStorage<Story>("stories", MOCK_STORIES).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getStoryBySlug(slug: string): Story | undefined {
  const stories = loadFromStorage<Story>("stories", MOCK_STORIES);
  return stories.find((s) => s.slug === slug);
}

export function saveStory(story: Story): void {
  const stories = loadFromStorage<Story>("stories", MOCK_STORIES);
  const idx = stories.findIndex((s) => s.id === story.id);
  if (idx >= 0) {
    stories[idx] = { ...story, updated_at: new Date().toISOString() };
  } else {
    stories.push(story);
  }
  saveToStorage("stories", stories);
}

// ---- Enquiries ----

export function getAllEnquiries(): ContactEnquiry[] {
  return loadFromStorage<ContactEnquiry>("enquiries", MOCK_ENQUIRIES).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function saveEnquiry(enquiry: ContactEnquiry): void {
  const enquiries = loadFromStorage<ContactEnquiry>("enquiries", MOCK_ENQUIRIES);
  const idx = enquiries.findIndex((e) => e.id === enquiry.id);
  if (idx >= 0) {
    enquiries[idx] = { ...enquiry, updated_at: new Date().toISOString() };
  } else {
    enquiries.push(enquiry);
  }
  saveToStorage("enquiries", enquiries);
}

// ---- Volunteer Applications ----

export function getAllVolunteerApps(): VolunteerApplication[] {
  return loadFromStorage<VolunteerApplication>("volunteer_apps", MOCK_VOLUNTEER_APPS).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function saveVolunteerApp(app: VolunteerApplication): void {
  const apps = loadFromStorage<VolunteerApplication>("volunteer_apps", MOCK_VOLUNTEER_APPS);
  const idx = apps.findIndex((a) => a.id === app.id);
  if (idx >= 0) {
    apps[idx] = { ...app, updated_at: new Date().toISOString() };
  } else {
    apps.push(app);
  }
  saveToStorage("volunteer_apps", apps);
}

// ---- Impact Metrics ----

export function getPublishedMetrics(): ImpactMetric[] {
  const metrics = loadFromStorage<ImpactMetric>("metrics", MOCK_IMPACT_METRICS);
  return metrics
    .filter((m) => m.is_published && m.is_verified)
    .sort((a, b) => a.order_index - b.order_index);
}

// ---- FAQ ----

export function getFAQ(): FAQItem[] {
  return loadFromStorage<FAQItem>("faq", MOCK_FAQ);
}

// ---- Profiles ----

export function getProfiles(): Profile[] {
  return loadFromStorage<Profile>("profiles", MOCK_PROFILES);
}

export function getProfileById(id: string): Profile | undefined {
  return getProfiles().find((p) => p.id === id);
}

// ---- Dashboard Stats ----

export interface DashboardStats {
  totalPublished: number;
  totalDrafts: number;
  pendingReviews: number;
  newEnquiries: number;
  pendingVolunteers: number;
  totalProgrammes: number;
}

export function getDashboardStats(): DashboardStats {
  const programmes = getAllProgrammes();
  const stories = getAllStories();
  const enquiries = getAllEnquiries();
  const volunteers = getAllVolunteerApps();

  const allContent = [...programmes, ...stories];

  return {
    totalPublished: allContent.filter((c) => c.status === "published").length,
    totalDrafts: allContent.filter((c) => c.status === "draft").length,
    pendingReviews: allContent.filter((c) => c.status === "submitted").length,
    newEnquiries: enquiries.filter((e) => e.status === "new").length,
    pendingVolunteers: volunteers.filter((v) => v.status === "pending").length,
    totalProgrammes: programmes.length,
  };
}
