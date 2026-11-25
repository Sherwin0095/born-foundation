"use client";

import { useSyncExternalStore } from "react";
import { subscribeStore } from "./data-store";

const STORAGE_PREFIX = "born_foundation_v2_";

const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();

/**
 * Hydration-safe React 19 hook to subscribe to localStorage collections
 * without calling setState synchronously inside useEffect.
 */
export function useStoredData<T>(key: string, fallback: T): T {
  const fullKey = STORAGE_PREFIX + key;

  return useSyncExternalStore(
    subscribeStore,
    () => {
      if (typeof window === "undefined") return fallback;
      try {
        const raw = localStorage.getItem(fullKey);
        if (raw === null) return fallback;
        const cached = snapshotCache.get(fullKey);
        if (cached && cached.raw === raw) {
          return cached.value as T;
        }
        const parsed = JSON.parse(raw) as T;
        snapshotCache.set(fullKey, { raw, value: parsed });
        return parsed;
      } catch {
        return fallback;
      }
    },
    () => fallback
  );
}
