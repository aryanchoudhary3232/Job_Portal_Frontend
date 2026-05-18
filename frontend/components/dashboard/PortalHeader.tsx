"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearSession } from "@/lib/session";
import type { User } from "@/lib/types";

export function PortalHeader({ title, user }: { title: string; user: User | null }) {
  const router = useRouter();
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-white px-6 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">NCR command center</p>
        <h2 className="mt-2 text-[2rem] font-black tracking-[-0.04em] text-slate-900 font-display">{title}</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">{user?.location || "India"} • {user?.email || "portal user"}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          clearSession();
          router.push("/login");
        }}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[var(--accent)] hover:bg-[var(--primary-fixed)]"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </header>
  );
}
