"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles, Shield, Crown, Zap } from "lucide-react";
import { clearSession } from "@/lib/session";
import { initials } from "@/lib/format";
import type { User } from "@/lib/types";

export function PortalHeader({ title, user }: { title: string; user: User | null }) {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const plan = localStorage.getItem("recruiter_active_plan") || "";
      setActivePlan(plan);
    }
  }, []);

  const getHeaderBadge = () => {
    if (user?.role === "RECRUITER") {
      if (activePlan.includes("Pro")) {
        return (
          <span className="flex items-center gap-1 rounded-full signature-gradient px-3 py-1 text-[10px] font-black uppercase text-white shadow-sm">
            <Sparkles className="h-3 w-3" /> Pro AI
          </span>
        );
      }
      if (activePlan.includes("Basic")) {
        return (
          <span className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-[10px] font-black uppercase text-purple-800 border border-purple-200">
            <Shield className="h-3 w-3 text-purple-600" /> Basic Plan
          </span>
        );
      }
      if (activePlan.includes("Enterprise")) {
        return (
          <span className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black uppercase text-amber-400 border border-slate-700">
            <Crown className="h-3 w-3 text-amber-400" /> Enterprise
          </span>
        );
      }
      return (
        <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase text-amber-900 border border-amber-300">
          No Active Plan
        </span>
      );
    }
    if (user?.role === "STUDENT") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase text-emerald-800 border border-emerald-200">
          <Zap className="h-3 w-3 text-emerald-600" /> Candidate Free
        </span>
      );
    }
    if (user?.role === "ADMIN") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-purple-900 px-3 py-1 text-[10px] font-black uppercase text-amber-300 border border-purple-700">
          <Crown className="h-3 w-3 text-amber-300" /> Admin
        </span>
      );
    }
    return null;
  };

  return (
    <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/80 px-6 py-5 shadow-[0_20px_50px_rgba(35,28,78,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--on-surface-variant)]">HireVerse command center</p>
        <h2 className="mt-2 text-[2rem] font-black tracking-[-0.04em] text-[var(--on-surface)] font-display">{title}</h2>
        <p className="mt-1 text-sm font-medium text-[var(--on-surface-variant)]">{user?.location || "India"} • {user?.email || "portal user"}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Avatar Profile Pill with Active Plan */}
        <div className="flex items-center gap-2.5 rounded-full bg-slate-50 border border-slate-200/80 p-1.5 pr-4 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6c2bd9,#3b82f6)] text-xs font-black text-white shadow-md">
            {initials(user?.fullName)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-slate-900 leading-tight">{user?.fullName || "User"}</p>
            <div className="mt-0.5">{getHeaderBadge()}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            clearSession();
            router.push("/login");
          }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--outline-variant)] px-4 py-2 text-xs font-bold text-[var(--on-surface-variant)] transition hover:border-[var(--accent)] hover:bg-[var(--primary-fixed)]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
