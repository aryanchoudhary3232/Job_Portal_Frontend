"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearSession } from "@/lib/session";
import type { User } from "@/lib/types";

export function PortalHeader({ title, user }: { title: string; user: User | null }) {
  const router = useRouter();
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/80 px-6 py-5 shadow-[0_20px_50px_rgba(35,28,78,0.08)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--on-surface-variant)]">NCR command center</p>
        <h2 className="mt-2 text-[2rem] font-black tracking-[-0.04em] text-[var(--on-surface)] font-display">{title}</h2>
        <p className="mt-1 text-sm font-medium text-[var(--on-surface-variant)]">{user?.location || "India"} • {user?.email || "portal user"}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          clearSession();
          router.push("/login");
        }}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--outline-variant)] px-4 py-2 text-sm font-bold text-[var(--on-surface-variant)] transition hover:border-[var(--accent)] hover:bg-[var(--primary-fixed)]"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </header>
  );
}
