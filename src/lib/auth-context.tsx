// ============================================================
// Born Foundation — Offline Auth Context
// Simulates authentication for offline development.
// Will be replaced by Supabase Auth when online.
// ============================================================

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for stored auth session
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const user = JSON.parse(stored) as Profile;
        setState({ user, isLoading: false, isAuthenticated: true });
      } else {
        setState((s) => ({ ...s, isLoading: false }));
      }
    } catch {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Offline mode: accept any password for mock users
    const profile = MOCK_PROFILES.find(
      (p) => p.email.toLowerCase() === email.toLowerCase() && p.is_active
    );

    if (!profile) {
      return { success: false, error: "Invalid email or password." };
    }

    // In offline mode, accept password "admin123" for all mock users
    if (password !== "admin123") {
      return { success: false, error: "Invalid email or password." };
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    setState({ user: profile, isLoading: false, isAuthenticated: true });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({ user: null, isLoading: false, isAuthenticated: false });
  }, []);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => {
      if (!state.user) return false;
      const roleList = Array.isArray(roles) ? roles : [roles];
      return roleList.includes(state.user.role);
    },
    [state.user]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      if (!state.user) return false;
      const permissions = ROLE_PERMISSIONS[state.user.role] || [];
      return permissions.includes(permission);
    },
    [state.user]
  );

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, hasRole, hasPermission }}
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
