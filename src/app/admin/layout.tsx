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
  Image,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  Heart,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Badge, Button } from "@/components/ui";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Programmes", href: "/admin/programmes", icon: BookOpen },
  { label: "Stories & News", href: "/admin/stories", icon: FileText },
  { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
  { label: "Volunteer Apps", href: "/admin/volunteers", icon: Users },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
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
          <p className="text-sm text-secondary-text font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-forest-green text-white flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Org */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-warm-gold text-main-text flex items-center justify-center font-bold">
                <Heart className="w-4 h-4 text-forest-green" />
              </div>
              <div>
                <span className="font-bold text-base block font-[family-name:var(--font-heading)]">
                  Born Admin
                </span>
                <span className="text-[10px] text-white/60 tracking-wider uppercase block">
                  Management Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-white/10 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-warm-gold text-main-text flex items-center justify-center font-bold text-sm">
                {user.full_name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold truncate text-white">{user.full_name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge variant="warning" className="text-[10px] px-1.5 py-0 uppercase">
                    {user.role.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
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
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </span>
          </Link>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-300 hover:text-red-200 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-main-text hover:bg-surface-muted"
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
            <span className="text-xs text-secondary-text bg-soft-sage/40 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-forest-green" />
              Offline Datastore Active
            </span>
          </div>
        </header>

        {/* Dynamic page container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
