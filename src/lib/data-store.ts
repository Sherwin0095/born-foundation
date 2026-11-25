// ============================================================
// Born Foundation — Offline Data Store & Audit Recorder
// In-memory + localStorage persistence for offline development.
// Designed alongside Supabase helpers for seamless live transition.
// ============================================================

import type {
  Profile,
  Page,
  Programme,
  Story,
  ContactEnquiry,
  VolunteerApplication,
  ImpactMetric,
  MediaAsset,
  AuditLog,
  FAQItem,
  MediaApprovalStatus,
} from "./types";

import {
  MOCK_PROFILES,
  MOCK_PAGES,
  MOCK_PROGRAMMES,
  MOCK_STORIES,
  MOCK_ENQUIRIES,
  MOCK_VOLUNTEER_APPS,
  MOCK_IMPACT_METRICS,
  MOCK_MEDIA_ASSETS,
  MOCK_AUDIT_LOGS,
  MOCK_FAQ,
} from "./mock-data";

// ---- React 19 Hydration-Safe Subscription Helpers ----
const STORAGE_PREFIX = "born_foundation_v2_";
const STORE_CHANGE_EVENT = "bf-local-store-change";

function emitStoreChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STORE_CHANGE_EVENT));
  }
}

export function subscribeStore(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(STORE_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(STORE_CHANGE_EVENT, handler);
  };
}

export function getStoredJsonSnapshot<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors in restricted browsing contexts
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    emitStoreChange();
  } catch {
    // Ignore quota errors
  }
}

// ---- Audit Logging ----

export function getAuditLogs(): AuditLog[] {
  return loadFromStorage<AuditLog>("audit_logs", MOCK_AUDIT_LOGS).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function recordAuditAction(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  details?: string
): void {
  const logs = loadFromStorage<AuditLog>("audit_logs", MOCK_AUDIT_LOGS);
  logs.unshift({
    id: `audit-${Date.now()}`,
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details,
    created_at: new Date().toISOString(),
  });
  saveToStorage("audit_logs", logs.slice(0, 200));
}

// ---- Pages ----

export function getAllPages(): Page[] {
  return loadFromStorage<Page>("pages", MOCK_PAGES);
}

export function savePage(page: Page, actorId = "admin-001"): void {
  const pages = loadFromStorage<Page>("pages", MOCK_PAGES);
  const idx = pages.findIndex((p) => p.id === page.id);
  const updated = { ...page, updated_at: new Date().toISOString() };
  if (idx >= 0) {
    pages[idx] = updated;
  } else {
    pages.push(updated);
  }
  saveToStorage("pages", pages);
  recordAuditAction(actorId, `PAGE_${page.status.toUpperCase()}`, "pages", page.id, page.title);
}

// ---- Programmes & Focus Areas ----

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

export function saveProgramme(programme: Programme, actorId = "admin-001"): void {
  const programmes = loadFromStorage<Programme>("programmes", MOCK_PROGRAMMES);
  const idx = programmes.findIndex((p) => p.id === programme.id);
  const updated = { ...programme, updated_at: new Date().toISOString() };
  if (idx >= 0) {
    programmes[idx] = updated;
  } else {
    programmes.push(updated);
  }
  saveToStorage("programmes", programmes);
  recordAuditAction(
    actorId,
    `PROGRAMME_${programme.status.toUpperCase()}`,
    "programmes",
    programme.id,
    programme.title
  );
}

// ---- Stories ----

export function getPublishedStories(): Story[] {
  const stories = loadFromStorage<Story>("stories", MOCK_STORIES);
  return stories
    .filter((s) => s.status === "published")
    .sort(
      (a, b) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime()
    );
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

export function saveStory(story: Story, actorId = "admin-001"): void {
  const stories = loadFromStorage<Story>("stories", MOCK_STORIES);
  const idx = stories.findIndex((s) => s.id === story.id);
  const updated = { ...story, updated_at: new Date().toISOString() };
  if (idx >= 0) {
    stories[idx] = updated;
  } else {
    stories.push(updated);
  }
  saveToStorage("stories", stories);
  recordAuditAction(actorId, `STORY_${story.status.toUpperCase()}`, "stories", story.id, story.title);
}

// ---- Media Library ----

export function getAllMediaAssets(): MediaAsset[] {
  return loadFromStorage<MediaAsset>("media_assets", MOCK_MEDIA_ASSETS);
}

export function getPublicMediaAssets(): MediaAsset[] {
  return getAllMediaAssets().filter(
    (m) => m.is_public && m.approval_status === "approved" && !m.has_identifiable_children
  );
}

export function updateMediaApproval(
  mediaId: string,
  status: MediaApprovalStatus,
  isPublic: boolean,
  reviewNotes?: string,
  actorId = "reviewer-001"
): void {
  const assets = loadFromStorage<MediaAsset>("media_assets", MOCK_MEDIA_ASSETS);
  const idx = assets.findIndex((a) => a.id === mediaId);
  if (idx < 0) return;

  // Safeguarding lock: cannot make identifiable children photo public without explicit review confirmation
  const current = assets[idx];
  const updated: MediaAsset = {
    ...current,
    approval_status: status,
    is_public: isPublic,
    review_notes: reviewNotes ?? current.review_notes,
    approved_by: status === "approved" ? actorId : current.approved_by,
    updated_at: new Date().toISOString(),
  };
  assets[idx] = updated;
  saveToStorage("media_assets", assets);
  recordAuditAction(
    actorId,
    `MEDIA_${status.toUpperCase()}`,
    "media_assets",
    mediaId,
    `public=${isPublic}`
  );
}

export function addMediaAsset(asset: MediaAsset, actorId = "admin-001"): void {
  const assets = loadFromStorage<MediaAsset>("media_assets", MOCK_MEDIA_ASSETS);
  assets.unshift(asset);
  saveToStorage("media_assets", assets);
  recordAuditAction(actorId, "MEDIA_UPLOADED", "media_assets", asset.id, asset.filename);
}

// ---- Enquiries ----

export function getAllEnquiries(): ContactEnquiry[] {
  return loadFromStorage<ContactEnquiry>("enquiries", MOCK_ENQUIRIES).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function saveEnquiry(enquiry: ContactEnquiry, actorId?: string): void {
  const enquiries = loadFromStorage<ContactEnquiry>("enquiries", MOCK_ENQUIRIES);
  const idx = enquiries.findIndex((e) => e.id === enquiry.id);
  const updated = { ...enquiry, updated_at: new Date().toISOString() };
  if (idx >= 0) {
    enquiries[idx] = updated;
  } else {
    enquiries.push(updated);
  }
  saveToStorage("enquiries", enquiries);
  if (actorId) {
    recordAuditAction(
      actorId,
      `ENQUIRY_${enquiry.status.toUpperCase()}`,
      "contact_enquiries",
      enquiry.id,
      enquiry.subject
    );
  }
}

// ---- Volunteer Applications ----

export function getAllVolunteerApps(): VolunteerApplication[] {
  return loadFromStorage<VolunteerApplication>("volunteer_apps", MOCK_VOLUNTEER_APPS).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function saveVolunteerApp(app: VolunteerApplication, actorId?: string): void {
  const apps = loadFromStorage<VolunteerApplication>("volunteer_apps", MOCK_VOLUNTEER_APPS);
  const idx = apps.findIndex((a) => a.id === app.id);
  const updated = { ...app, updated_at: new Date().toISOString() };
  if (idx >= 0) {
    apps[idx] = updated;
  } else {
    apps.push(updated);
  }
  saveToStorage("volunteer_apps", apps);
  if (actorId) {
    recordAuditAction(
      actorId,
      `VOLUNTEER_${app.status.toUpperCase()}`,
      "volunteer_applications",
      app.id,
      app.area_of_interest
    );
  }
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
  pendingMedia: number;
  approvedMedia: number;
}

export function getDashboardStats(): DashboardStats {
  const programmes = getAllProgrammes();
  const stories = getAllStories();
  const enquiries = getAllEnquiries();
  const volunteers = getAllVolunteerApps();
  const media = getAllMediaAssets();

  const allContent = [...programmes, ...stories];

  return {
    totalPublished: allContent.filter((c) => c.status === "published").length,
    totalDrafts: allContent.filter((c) => c.status === "draft").length,
    pendingReviews: allContent.filter(
      (c) => c.status === "submitted" || c.status === "in_review"
    ).length,
    newEnquiries: enquiries.filter((e) => e.status === "new").length,
    pendingVolunteers: volunteers.filter((v) => v.status === "pending").length,
    totalProgrammes: programmes.length,
    pendingMedia: media.filter((m) => m.approval_status === "pending").length,
    approvedMedia: media.filter((m) => m.approval_status === "approved").length,
  };
}
