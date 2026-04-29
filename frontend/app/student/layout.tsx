"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  ChevronDown,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
  type LucideIcon,
} from "lucide-react";

type StudentUser = {
  name?: string;
  role?: string;
  profile_pic?: string | null;
};

const navItems: Array<{
  href: string;
  icon: LucideIcon;
  label: string;
}> = [
  { href: "/student", icon: Home, label: "Home" },
  { href: "/student/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/student/applications", icon: FileText, label: "Applications" },
  { href: "/student/skills", icon: GraduationCap, label: "Learning" },
  { href: "/student/settings", icon: Settings, label: "Settings" },
];

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-1.5">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              isActive
                ? "bg-white text-[#4c3df0] shadow-[0_10px_22px_rgba(91,76,241,0.12)]"
                : "text-slate-500 hover:bg-white hover:text-slate-900"
            }`}
          >
            <Icon
              className={isActive ? "h-4.5 w-4.5" : "h-4.5 w-4.5 text-slate-400"}
              strokeWidth={isActive ? 2.6 : 2.2}
            />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState<StudentUser>(() => {
    if (typeof window === "undefined") {
      return {
        name: "Alex Rivers",
        role: "student",
        profile_pic: null,
      };
    }

    try {
      const storedUserRaw = localStorage.getItem("user");
      if (!storedUserRaw) {
        return {
          name: "Alex Rivers",
          role: "student",
          profile_pic: null,
        };
      }

      const storedUser = JSON.parse(storedUserRaw) as StudentUser;
      return {
        name: storedUser.name || "Alex Rivers",
        role: storedUser.role || "student",
        profile_pic: storedUser.profile_pic || null,
      };
    } catch {
      return {
        name: "Alex Rivers",
        role: "student",
        profile_pic: null,
      };
    }
  });

  const initials =
    (user.name || "Alex Rivers")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "AR";

  const profileRole =
    user.role === "jobseeker"
      ? "Student"
      : user.role
        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
        : "Student";

  const sidebarRole =
    user.role && user.role !== "student" && user.role !== "jobseeker"
      ? profileRole
      : "Product Design Intern";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[228px] shrink-0 self-start border-r border-slate-100 bg-[#fbfbfe] px-5 py-6 xl:flex xl:flex-col">
          <div className="px-1 py-1">
            <div className="text-[18px] font-black tracking-[-0.04em] text-[#4f46e5]">
              CareerArchitect
            </div>
          </div>

          <div className="mt-8 rounded-[20px] bg-white p-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#465365)] text-sm font-black text-white shadow-sm"
                style={
                  user.profile_pic
                    ? {
                        backgroundImage: `url(${user.profile_pic})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }
                    : undefined
                }
              >
                {!user.profile_pic ? initials : null}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-black text-slate-900">
                  {user.name || "Alex Rivers"}
                </p>
                <p className="truncate text-[10px] font-semibold text-slate-400">
                  {sidebarRole}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <NavLinks pathname={pathname} />
            <Link
              href="/student/settings"
              className="mt-1.5 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
            >
              <User className="h-4.5 w-4.5 text-slate-400" strokeWidth={2.2} />
              View Profile
            </Link>
          </div>

          <div className="mt-auto">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_28px_rgba(91,76,241,0.24)] transition hover:-translate-y-0.5"
            >
              Upload Resume
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 bg-[#f6f7fb]/96 px-4 pt-4 backdrop-blur-xl sm:px-6 lg:px-8 xl:pr-10">
            <div className="mx-auto flex w-full max-w-[1180px] items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 xl:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="hidden items-center gap-3 xl:flex">
                <div className="w-2" />
              </div>

              <div className="relative min-w-0 max-w-[460px] flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, skills, certifications..."
                  className="h-11 w-full rounded-full border border-slate-200/70 bg-white pl-11 pr-4 text-sm font-medium text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.03)] outline-none transition focus:border-[#d5cffd] focus:bg-white focus:ring-4 focus:ring-[#5b4cf1]/8"
                />
              </div>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </button>
                <button className="hidden h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900 sm:flex">
                  <Settings className="h-3.5 w-3.5" />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((value) => !value)}
                    className="flex items-center gap-2 rounded-2xl px-1 py-1 transition hover:bg-slate-50"
                  >
                    <div className="relative">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#334155)] text-[11px] font-black text-white shadow-sm"
                        style={
                          user.profile_pic
                            ? {
                                backgroundImage: `url(${user.profile_pic})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }
                            : undefined
                        }
                      >
                        {!user.profile_pic ? initials : null}
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                        <ChevronDown
                          className={`h-3 w-3 text-slate-500 transition ${
                            isProfileOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 top-[calc(100%+12px)] z-50 w-56 overflow-hidden rounded-[24px] border border-slate-100 bg-white p-2 shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
                      >
                        <div className="px-3 py-3">
                          <p className="text-sm font-black text-slate-900">
                            {user.name || "Alex Rivers"}
                          </p>
                          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            {profileRole}
                          </p>
                        </div>
                        <Link
                          href="/student/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                          <User className="h-4 w-4 text-slate-400" />
                          View Profile
                        </Link>
                        <Link
                          href="/student/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                          <Settings className="h-4 w-4 text-slate-400" />
                          Account Settings
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-red-500 transition hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 text-red-400" />
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-slate-950/30 xl:hidden"
                />
                <motion.aside
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -24, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-[#fbfbfe] px-4 py-5 shadow-2xl xl:hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-black tracking-[-0.04em] text-[#4f46e5]">
                      CareerArchitect
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6 rounded-[26px] border border-slate-100 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#131a28,#485468)] text-sm font-black text-white shadow-sm"
                        style={
                          user.profile_pic
                            ? {
                                backgroundImage: `url(${user.profile_pic})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }
                            : undefined
                        }
                      >
                        {!user.profile_pic ? initials : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900">
                          {user.name || "Alex Rivers"}
                        </p>
                        <p className="truncate text-[11px] font-semibold text-slate-400">
                          {sidebarRole}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <NavLinks
                      pathname={pathname}
                      onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                    <Link
                      href="/student/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="mt-1.5 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-900"
                    >
                      <User className="h-4.5 w-4.5 text-slate-400" strokeWidth={2.2} />
                      View Profile
                    </Link>
                  </div>

                  <div className="mt-auto space-y-3 pt-8">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_28px_rgba(91,76,241,0.24)]"
                    >
                      Upload Resume
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-center rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-500"
                    >
                      Log out
                    </button>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8 xl:pr-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
