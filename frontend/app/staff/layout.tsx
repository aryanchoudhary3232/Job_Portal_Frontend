"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/staff/analytics", icon: "dashboard", label: "Analytics" },
  { href: "/staff", icon: "hub", label: "Matching" },
  { href: "/staff/candidates", icon: "groups", label: "Candidates" },
  { href: "/staff/verification", icon: "verified_user", label: "Verification" },
  { href: "/staff/settings", icon: "settings", label: "Settings" },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f3f4f7] p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] overflow-hidden rounded-[22px] border border-[#dfe2ee] bg-white shadow-[0_20px_50px_rgba(17,24,39,0.08)] md:min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-64 shrink-0 border-r border-[#eceffa] bg-[#fafbff] lg:flex lg:flex-col">
          <div className="border-b border-[#eceffa] px-6 py-6">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4f46e5]">Nexus Talent</p>
            <p className="mt-2 text-lg font-extrabold text-[#181b2a]">Staff Console</p>
          </div>

          <div className="px-4 py-5">
            <div className="flex items-center gap-3 rounded-2xl border border-[#e4e7f4] bg-white p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4f46e5] text-sm font-bold text-white">SJ</div>
              <div>
                <p className="text-sm font-bold text-[#181b2a]">Sara Jenkins</p>
                <p className="text-xs text-[#69708d]">Operations Lead</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3">
            {navItems.map(({ href, icon, label }) => {
              const isActive = href === "/staff" ? pathname === "/staff" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#ecebff] text-[#3525cd]"
                      : "text-[#525a75] hover:bg-[#f1f3fb] hover:text-[#181b2a]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {icon}
                  </span>
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#eceffa] p-3">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#525a75] transition hover:bg-[#f1f3fb] hover:text-[#181b2a]"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Logout
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceffa] px-4 py-4 md:px-7 lg:px-8">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#dfe3f0] bg-white text-[#535b78] lg:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="order-3 flex w-full items-center gap-2 rounded-full border border-[#e6e9f4] bg-[#f8f9fd] px-4 py-2 text-sm text-[#6d7490] sm:order-2 sm:max-w-md lg:order-1">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <input
                className="w-full bg-transparent outline-none placeholder:text-[#9ca3bd]"
                placeholder="Search candidates, jobs, schools"
              />
            </div>

            <div className="order-2 ml-auto flex items-center gap-2 sm:order-3">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e5f2] bg-white text-[#5b6280]">
                <span className="material-symbols-outlined text-[18px]">notifications</span>
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e5f2] bg-white text-[#5b6280]">
                <span className="material-symbols-outlined text-[18px]">help</span>
              </button>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto bg-[#f8f9fd] p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
