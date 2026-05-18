import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="signature-gradient relative overflow-hidden rounded-[48px] px-6 py-10 text-white shadow-[0_35px_90px_rgba(11,59,115,0.22)] md:px-10 md:py-14">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-white blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="enter-fade-up text-xs font-bold uppercase tracking-[0.32em] text-white/70" style={{ animationDelay: "80ms" }}>
            NCRJobs command center
          </p>
          <h1 className="enter-fade-up mt-5 text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl font-display" style={{ animationDelay: "160ms" }}>
            NCR-first hiring operations for students, recruiters, and staff teams.
          </h1>
          <p className="enter-fade-up mt-6 max-w-2xl text-lg leading-8 text-white/80" style={{ animationDelay: "240ms" }}>
            NCRJobs keeps job posts, shortlists, interviews, and selection status in one verified flow with staff oversight and first-salary settlement tracking.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/register" className="enter-fade-up inline-flex items-center justify-center gap-2 rounded-[20px] bg-white px-7 py-3.5 text-sm font-bold text-[var(--primary-strong)] shadow-2xl" style={{ animationDelay: "320ms" }}>
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/login" className="enter-fade-up inline-flex items-center justify-center rounded-[20px] border border-white/20 px-7 py-3.5 text-sm font-bold text-white/90" style={{ animationDelay: "400ms" }}>
            Sign in
          </Link>
        </div>
      </div>
      <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["NCR-first", "Region-focused launch"],
          ["3 roles", "Student, recruiter, staff"],
          ["Verified outcomes", "Selection and settlement"],
        ].map(([value, label], index) => (
          <div key={label} className="enter-fade-up rounded-[24px] border border-white/12 bg-white/10 px-5 py-6 backdrop-blur-sm" style={{ animationDelay: `${480 + index * 80}ms` }}>
            <p className="text-3xl font-black">{value}</p>
            <p className="mt-2 text-sm text-white/60">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
