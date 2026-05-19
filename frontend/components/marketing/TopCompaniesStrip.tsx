"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const companies = [
  { name: "GrowStack", roles: "120+ roles" },
  { name: "Nova Design", roles: "85+ roles" },
  { name: "Astra Labs", roles: "60+ roles" },
  { name: "Campusify", roles: "95+ roles" },
  { name: "CloudAxis", roles: "70+ roles" },
  { name: "InsightHub", roles: "55+ roles" },
];

export function TopCompaniesStrip() {
  const stripRef = useRef<HTMLDivElement | null>(null);

  const scrollStrip = (direction: "left" | "right") => {
    if (!stripRef.current) return;
    const distance = stripRef.current.clientWidth * 0.7;
    stripRef.current.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  };

  return (
    <section id="companies" className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Top companies</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[var(--on-surface)] font-display">Verified recruiters hiring now</h2>
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => scrollStrip("left")}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--outline-variant)] bg-white/90 p-2 text-[var(--primary)] shadow-[0_12px_26px_rgba(44,22,84,0.12)] backdrop-blur sm:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div ref={stripRef} className="scrollbar-hidden flex gap-4 overflow-x-auto pb-2 scroll-smooth">
          {companies.map((company) => (
            <div key={company.name} className="min-w-[220px] rounded-[20px] border border-[var(--outline-variant)] bg-white px-5 py-5 shadow-[0_16px_36px_rgba(44,22,84,0.08)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-fixed)] text-lg font-black text-[var(--primary)]">
                {company.name[0]}
              </div>
              <p className="mt-4 text-lg font-bold text-[var(--on-surface)]">{company.name}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--on-surface-variant)]">{company.roles}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollStrip("right")}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-[var(--outline-variant)] bg-white/90 p-2 text-[var(--primary)] shadow-[0_12px_26px_rgba(44,22,84,0.12)] backdrop-blur sm:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
