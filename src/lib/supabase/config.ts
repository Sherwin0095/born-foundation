// ============================================================
// Supabase Feature Detection & Configuration Guard
// Safely keeps live Supabase calls disabled during offline mode
// or when valid project credentials are not present.
// ============================================================

export function isSupabaseConfigured(): boolean {
  const offline = process.env.NEXT_PUBLIC_OFFLINE_MODE === "true";
  if (offline) return false;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return false;
  if (
    url.includes("localhost:54321") ||
    url.includes("your-supabase") ||
    anonKey === "offline-mode" ||
    anonKey.includes("your-supabase")
  ) {
    return false;
  }
  return url.startsWith("https://");
}
