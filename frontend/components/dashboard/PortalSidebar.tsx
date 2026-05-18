"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { initials } from "@/lib/format";
import type { Role, User } from "@/lib/types";

export function PortalSidebar({ role, user }: { role: Role; user: User | null }) {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[230px] shrink-0 border-r border-slate-200/70 bg-[var(--surface-container-lowest)] px-5 py-6 xl:block">
      <div>
        <div className="text-[30px] font-black tracking-[-0.06em] text-[var(--primary)] font-display">NCRJobs</div>
        <div className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">{role.toLowerCase()} workspace</div>
      </div>
      <div className="mt-8 rounded-[20px] bg-white p-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#475569)] text-[12px] font-black text-white">
          {initials(user?.fullName)}
        </div>
        <p className="mt-4 text-[13px] font-black text-slate-900">{user?.fullName || "Portal User"}</p>
        <p className="text-[10px] font-semibold text-slate-400">{user?.headline || user?.companyName || user?.email}</p>
      </div>
      <nav className="mt-8 space-y-1.5">
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
        active ? "bg-white text-[var(--primary)] shadow-[0_12px_24px_rgba(11,59,115,0.12)]" : "text-slate-500 hover:bg-white hover:text-slate-900"
      }`}
    >
      <Icon className={`h-4.5 w-4.5 ${active ? "text-[var(--primary)]" : "text-slate-400"}`} />
      {item.label}
    </Link>
  );
}
