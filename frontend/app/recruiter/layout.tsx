"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  FolderKanban,
  Home,
  MessageSquare,
  Search,
  Settings,
  ShieldPlus,
  Users2,
} from "lucide-react";

const navItems = [
  { href: "/recruiter/dashboard", icon: Home, label: "Home" },
  { href: "/recruiter/applications", icon: FolderKanban, label: "Applications" },
  { href: "/recruiter/jobs", icon: BriefcaseBusiness, label: "Jobs" },
  { href: "/recruiter/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/recruiter/users", icon: Users2, label: "Users" },
  { href: "/recruiter/settings", icon: Settings, label: "Settings" },
];

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname === "/recruiter";

  if (isOnboarding) {
    return <div className="min-h-screen bg-[#f7f8fc]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.08),_transparent_24%),linear-gradient(180deg,#f7f8fc_0%,#f5f7fb_100%)] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[230px] shrink-0 border-r border-slate-100 bg-[#fbfbfe] px-5 py-6 xl:flex xl:flex-col">
          <div>
            <div className="text-[30px] font-black tracking-[-0.06em] text-[#4f46e5]">
              Nexus Talent
            </div>
            <div className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-300">
              Recruiter Workspace
            </div>
          </div>

          <nav className="mt-10 space-y-1.5">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-[#4c3df0] shadow-[0_12px_24px_rgba(91,76,241,0.12)]"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 ${
                      isActive ? "text-[#4c3df0]" : "text-slate-400"
                    }`}
                    strokeWidth={2.3}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4">
            <button className="w-full rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_28px_rgba(91,76,241,0.24)] transition hover:-translate-y-0.5">
              + Post New Job
            </button>

            <div className="rounded-[20px] bg-white p-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f766e,#5eead4)] text-[12px] font-black text-white">
                  MC
                </div>
                <div>
                  <p className="text-[13px] font-black text-slate-900">
                    Marcus Chen
                  </p>
                  <p className="text-[10px] font-semibold text-slate-400">
                    Senior Recruiter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 bg-[#f7f8fc]/92 px-4 pt-4 backdrop-blur-xl sm:px-6 lg:px-8 xl:pr-10">
            <div className="mx-auto flex w-full max-w-[1320px] items-center gap-3">
              <div className="relative min-w-0 max-w-[420px] flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search candidates, jobs, or tags..."
                  className="h-11 w-full rounded-full border border-slate-200/70 bg-white pl-11 pr-4 text-sm font-medium text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.03)] outline-none transition focus:border-[#d5cffd] focus:ring-4 focus:ring-[#5b4cf1]/8"
                />
              </div>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900">
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900">
                  <MessageSquare className="h-3.5 w-3.5" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:text-slate-900">
                  <ShieldPlus className="h-3.5 w-3.5" />
                </button>
                <div className="h-7 w-px bg-slate-200" />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#475569)] text-[11px] font-black text-white shadow-sm">
                  AR
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-8 xl:pr-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
