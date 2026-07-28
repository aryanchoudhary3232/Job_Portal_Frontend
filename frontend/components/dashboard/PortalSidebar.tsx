"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { initials } from "@/lib/format";
import type { Role, User } from "@/lib/types";
import { Sparkles, Shield, Crown, Zap, Lock } from "lucide-react";

export function PortalSidebar({ role, user }: { role: Role; user: User | null }) {
  const pathname = usePathname();
  const [activePlan, setActivePlan] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (role === "RECRUITER") {
        const plan = localStorage.getItem("recruiter_active_plan") || "";
        setActivePlan(plan);
      }
    }
  }, [role]);

  const getPlanBadge = () => {
    if (role === "STUDENT") {
      return (
        <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 border border-emerald-200/80">
          <Zap className="h-3 w-3 text-emerald-600" /> Free Candidate
        </span>
      );
    }
    if (role === "ADMIN") {
      return (
        <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-purple-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300 border border-purple-800">
          <Crown className="h-3 w-3 text-amber-300" /> System Admin
        </span>
      );
    }
    if (role === "RECRUITER") {
      if (activePlan.includes("Pro")) {
        return (
          <span className="flex w-full items-center justify-center gap-1.5 rounded-xl signature-gradient px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
            <Sparkles className="h-3.5 w-3.5" /> Pro AI Plan
          </span>
        );
      }
      if (activePlan.includes("Basic")) {
        return (
          <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-purple-100/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-purple-900 border border-purple-200">
            <Shield className="h-3.5 w-3.5 text-purple-600" /> Basic Plan
          </span>
        );
      }
      if (activePlan.includes("Enterprise")) {
        return (
          <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-400 border border-slate-700">
            <Crown className="h-3.5 w-3.5 text-amber-400" /> Enterprise
          </span>
        );
      }
      return (
        <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-900 border border-amber-300">
          <Lock className="h-3.5 w-3.5 text-amber-600" /> No Active Plan
        </span>
      );
    }
    return null;
  };

  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-white/70 bg-white/70 px-5 py-7 shadow-[0_20px_60px_rgba(35,28,78,0.08)] backdrop-blur-xl xl:block">
      <div>
        <Image src="/logo-wordmark.svg" alt="HireVerse" width={160} height={36} className="h-9 w-auto" />
        <div className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--on-surface-variant)]">{role.toLowerCase()} workspace</div>
      </div>

      {/* Redesigned Sleek Horizontal Profile Card */}
      <div className="mt-6 rounded-[22px] bg-white p-3.5 shadow-[0_10px_30px_rgba(35,28,78,0.06)] border border-slate-100/90 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 text-xs font-black text-white shadow-md ring-2 ring-purple-100">
              {initials(user?.fullName)}
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-slate-900 truncate leading-snug">
              {user?.fullName || "Portal User"}
            </h4>
            <p className="text-[10px] font-bold text-slate-500 truncate leading-none mt-0.5">
              {user?.headline || user?.companyName || user?.email}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          {getPlanBadge()}
        </div>
      </div>

      <nav className="mt-7 space-y-1.5">
        {navigation[role].map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>
    </aside>
  );
}

function NavLink({ item, active }: { item: { href: string; label: string; icon: LucideIcon }; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
        active ? "bg-[var(--primary-fixed)] text-[var(--primary)] shadow-[0_14px_30px_rgba(109,75,255,0.25)]" : "text-[var(--on-surface-variant)] hover:bg-white/80 hover:text-[var(--on-surface)]"
      }`}
    >
      <Icon className={`h-4.5 w-4.5 ${active ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]"}`} />
      {item.label}
    </Link>
  );
}
