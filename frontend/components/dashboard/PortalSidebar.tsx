"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { initials } from "@/lib/format";
import type { Role, User } from "@/lib/types";

export function PortalSidebar({ role, user }: { role: Role; user: User | null }) {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-white/70 bg-white/70 px-5 py-7 shadow-[0_20px_60px_rgba(35,28,78,0.08)] backdrop-blur-xl xl:block">
      <div>
        <Image src="/logo-wordmark.svg" alt="NCRJobs" width={160} height={36} className="h-9 w-auto" />
        <div className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--on-surface-variant)]">{role.toLowerCase()} workspace</div>
      </div>
      <div className="mt-8 rounded-[22px] bg-white/90 p-4 shadow-[0_18px_40px_rgba(35,28,78,0.08)] ring-1 ring-[var(--outline-variant)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827,#475569)] text-[12px] font-black text-white">
          {initials(user?.fullName)}
        </div>
        <p className="mt-4 text-[13px] font-black text-[var(--on-surface)]">{user?.fullName || "Portal User"}</p>
        <p className="text-[10px] font-semibold text-[var(--on-surface-variant)]">{user?.headline || user?.companyName || user?.email}</p>
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
        active ? "bg-[var(--primary-fixed)] text-[var(--primary)] shadow-[0_14px_30px_rgba(109,75,255,0.25)]" : "text-[var(--on-surface-variant)] hover:bg-white/80 hover:text-[var(--on-surface)]"
      }`}
    >
      <Icon className={`h-4.5 w-4.5 ${active ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]"}`} />
      {item.label}
    </Link>
  );
}
