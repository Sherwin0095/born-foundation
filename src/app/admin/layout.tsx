"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Mail,
  Users,
  Image as ImageIcon,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  Heart,
  ExternalLink,
  FileEdit,
  Scale,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, perm: null },
  { label: "Pages & Content", href: "/admin/pages", icon: FileEdit, perm: "create_content" },
  { label: "Focus Areas & Work", href: "/admin/programmes", icon: BookOpen, perm: "create_content" },
  { label: "Stories & Updates", href: "/admin/stories", icon: FileText, perm: "create_content" },
  { label: "Gallery & Media", href: "/admin/media", icon: ImageIcon, perm: "manage_media" },
  { label: "Enquiries", href: "/admin/enquiries", icon: Mail, perm: "manage_enquiries" },
  { label: "Volunteer Screening", href: "/admin/volunteers", icon: Users, perm: "manage_volunteers" },
  { label: "Governance & Logs", href: "/admin/governance", icon: Scale, perm: "view_audit_logs" },
  { label: "Site Settings", href: "/admin/settings", icon: Settings, perm: "manage_settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-warm-ivory flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-forest-green border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-secondary-text font-medium">Verifying staff authorisation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-forest-green text-white flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-warm-gold text-main-text flex items-center justify-center font-bold">
                <Heart className="w-4 h-4 text-forest-green" aria-hidden="true" />
              </div>
              <div>
                <span className="font-bold text-base block font-[family-name:var(--font-heading)]">
                  Born Admin
                </span>
                <span className="text-[10px] text-white/70 tracking-wider uppercase block">
                  Management Console
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/75 hover:text-white p-1"
              aria-label="Close admin sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 mx-3 my-4 rounded-xl bg-white/10 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-warm-gold text-main-text flex items-center justify-center font-bold text-sm shrink-0">
                {user.full_name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate text-white">{user.full_name}</p>
                <Badge variant="warning" className="text-[10px] px-1.5 py-0 uppercase mt-0.5">
                  {user.role.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>

          <nav className="px-3 space-y-1" aria-label="Admin sidebar navigation">
            {ADMIN_NAV.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/20 text-white font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span>View Public Website</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-main-text hover:bg-surface-muted"
              aria-label="Open admin sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-secondary-text hidden sm:flex items-center gap-2">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-main-text font-medium capitalize">
                {pathname.replace("/admin/", "").replace("/admin", "Dashboard") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-secondary-text bg-soft-sage/50 px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-forest-green" aria-hidden="true" />
              Offline Sandbox Mode
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
