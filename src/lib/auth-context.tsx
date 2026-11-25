// ============================================================
// Born Foundation — Offline Auth Context
// Uses useSyncExternalStore for hydration-safe session reading.
// Will be replaced by Supabase Auth when online.
// ============================================================

"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import type { Profile, UserRole } from "./types";
import { MOCK_PROFILES } from "./mock-data";

interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: [
    "manage_staff", "manage_settings", "manage_roles",
    "create_content", "edit_content", "delete_content",
    "submit_content", "review_content", "approve_content", "publish_content",
    "manage_enquiries", "manage_volunteers", "manage_media",
    "view_donations", "manage_donations",
    "view_audit_logs", "view_reports",
  ],
  editor: [
    "create_content", "edit_own_content", "submit_content",
    "manage_media", "view_own_content",
  ],
  reviewer: [
    "view_content", "review_content", "approve_content",
    "request_changes",
  ],
  publisher: [
    "view_content", "publish_content", "unpublish_content",
    "archive_content",
  ],
  enquiry_coordinator: [
    "manage_enquiries", "view_enquiries", "assign_enquiries",
  ],
  finance: [
    "view_donations", "manage_donations", "view_reports",
  ],
  auditor: [
    "view_content", "view_enquiries", "view_donations",
    "view_audit_logs", "view_reports",
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "born_foundation_auth";
const AUTH_CHANGE_EVENT = "bf-auth-store-change";

let cachedAuthString: string | null | undefined = undefined;
let cachedAuthUser: Profile | null = null;

function subscribeAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedAuthString = undefined;
    callback();
  };
  window.addEventListener("storage", handler);
  window.addEventListener(AUTH_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(AUTH_CHANGE_EVENT, handler);
  };
}

function getAuthSnapshot(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw === cachedAuthString) return cachedAuthUser;
    cachedAuthString = raw;
    cachedAuthUser = raw ? (JSON.parse(raw) as Profile) : null;
    return cachedAuthUser;
  } catch {
    return null;
  }
}

function getServerAuthSnapshot(): Profile | null {
  return null;
}

const subscribeClientHydration = () => () => {};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribeClientHydration,
    () => true,
    () => false
  );
  const user = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getServerAuthSnapshot);

  const isLoading = !isClient;
  const isAuthenticated = Boolean(user);

  const login = useCallback(async (email: string, password: string) => {
    const profile = MOCK_PROFILES.find(
      (p) => p.email.toLowerCase() === email.toLowerCase() && p.is_active
    );

    if (!profile || password !== "admin123") {
      return { success: false, error: "Invalid email or password." };
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    cachedAuthString = undefined;
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    cachedAuthString = undefined;
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT));
  }, []);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => {
      if (!user) return false;
      const roleList = Array.isArray(roles) ? roles : [roles];
      return roleList.includes(user.role);
    },
    [user]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      if (!user) return false;
      const permissions = ROLE_PERMISSIONS[user.role] || [];
      return permissions.includes(permission);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout, hasRole, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
