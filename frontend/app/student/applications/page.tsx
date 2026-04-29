"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  FileCheck,
  Filter,
  HeartPulse,
  Search,
  Sparkles,
} from "lucide-react";

type TrackerRow = {
  company: string;
  role: string;
  applied: string;
  status: string;
  statusTone: string;
  nextStep: string;
  mark: string;
  markTone: string;
};

const statCards = [
  {
    label: "Total Applications",
    value: "42",
    meta: "+4 this week",
    accent: "text-[#5b4cf1]",
  },
  {
    label: "Interviews",
    value: "8",
    meta: "3 active loops",
    accent: "text-slate-900",
  },
  {
    label: "Offers Received",
    value: "2",
    meta: "1 new update",
    accent: "text-slate-900",
    highlight: true,
  },
  {
    label: "Response Rate",
    value: "64%",
    meta: "Avg. 12 days",
    accent: "text-slate-900",
  },
];

const trackerRows: TrackerRow[] = [
  {
    company: "Stripe",
    role: "Junior Product Designer",
    applied: "Oct 24, 2023",
    status: "Interviewed",
    statusTone: "bg-[#ece9ff] text-[#5b4cf1]",
    nextStep: "Technical Portfolio Review",
    mark: "S",
    markTone: "bg-[#0f172a] text-white",
  },
  {
    company: "Linear",
    role: "Design Systems Intern",
    applied: "Oct 20, 2023",
    status: "Hired",
    statusTone: "bg-emerald-50 text-emerald-600",
    nextStep: "Onboarding Nov 15",
    mark: "N",
    markTone: "bg-[#eef7ff] text-[#4da1d9]",
  },
  {
    company: "Vercel",
    role: "UI/UX Associate",
    applied: "Oct 18, 2023",
    status: "Under Review",
    statusTone: "bg-slate-100 text-slate-600",
    nextStep: "Awaiting Feedback",
    mark: "V",
    markTone: "bg-slate-100 text-slate-500",
  },
  {
    company: "Figma",
    role: "Product Intern",
    applied: "Oct 12, 2023",
    status: "Rejected",
    statusTone: "bg-rose-50 text-rose-500",
    nextStep: "View Feedback",
    mark: "F",
    markTone: "bg-[#2b0505] text-[#ff8b7b]",
  },
];

const upcomingInterviews = [
  {
    title: "Stripe • Tech Review",
    when: "Tomorrow, 2:00 PM",
    detail: "Google Meet",
  },
  {
    title: "Airbnb • Culture Fit",
    when: "Nov 04, 10:30 AM",
    detail: "Remote Interview",
  },
];

const insights = [
  {
    title: "Interview Progress",
    detail: "19%",
    tone: "bar",
  },
  {
    title: 'Users with "System Design" in their resume get more callbacks this month.',
    detail: "",
    tone: "note",
  },
  {
    title: "You've applied to 12 Design roles. Consider expanding to Product roles.",
    detail: "",
    tone: "note",
  },
];

export default function ApplicationsPage() {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return trackerRows;
    }

    return trackerRows.filter((row) =>
      [row.company, row.role, row.status, row.nextStep]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [query]);

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.06),_transparent_30%),linear-gradient(180deg,#f8f8fb_0%,#f5f7fb_100%)]">
      <div className="mx-auto flex w-full max-w-[1460px] flex-col gap-7 px-4 py-5 sm:px-6 lg:px-8">
        <section>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-[2.4rem]">
            Applications
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            Track responses, upcoming loops, and next steps from one clean
            dashboard.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article
              key={card.label}
              className={`rounded-[26px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 ${
                card.highlight ? "border-l-4 border-l-[#5b4cf1]" : ""
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                {card.label}
              </p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <p className={`text-[2.25rem] font-black leading-none ${card.accent}`}>
                  {card.value}
                </p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                  {card.meta}
                </span>
              </div>
            </article>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.72fr)_320px]">
          <section className="rounded-[30px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 sm:p-6">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-[1.45rem] font-black tracking-[-0.03em] text-slate-900">
                Active Trackers
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative min-w-0 sm:w-[260px]">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search companies..."
                    className="h-11 w-full rounded-full border border-transparent bg-slate-100 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-[#d4ceff] focus:bg-white focus:ring-4 focus:ring-[#5b4cf1]/8"
                  />
                </label>

                <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-slate-100 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[1.2fr_1.35fr_1fr_1fr_1.2fr] gap-4 px-2 pb-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  <div>Company</div>
                  <div>Role</div>
                  <div>Date Applied</div>
                  <div>Status</div>
                  <div>Next Steps</div>
                </div>

                <div className="space-y-1">
                  {filteredRows.map((row) => (
                    <div
                      key={`${row.company}-${row.role}`}
                      className="grid grid-cols-[1.2fr_1.35fr_1fr_1fr_1.2fr] gap-4 rounded-[22px] px-2 py-4 transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${row.markTone}`}
                        >
                          {row.mark}
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {row.company}
                        </span>
                      </div>

                      <div className="text-sm font-medium leading-5 text-slate-600">
                        {row.role}
                      </div>

                      <div className="text-sm font-medium text-slate-500">
                        {row.applied}
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${row.statusTone}`}
                        >
                          {row.status}
                        </span>
                      </div>

                      <div className="text-sm font-medium leading-5 text-[#5b4cf1]">
                        {row.nextStep}
                      </div>
                    </div>
                  ))}

                  {filteredRows.length === 0 && (
                    <div className="rounded-[22px] bg-slate-50 px-5 py-10 text-center text-sm font-semibold text-slate-500">
                      No applications match your search right now.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#5f50f6,#4331e0)] p-5 text-white shadow-[0_24px_60px_rgba(91,76,241,0.26)]">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/80">
                  Upcoming Interviews
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {upcomingInterviews.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-sm"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/60">
                      {item.when}
                    </p>
                    <p className="mt-2 text-sm font-black text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-medium text-white/75">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#4a37ea] transition hover:bg-slate-100">
                Open Calendar
              </button>
            </section>

            <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <h2 className="text-sm font-black text-slate-900">
                Application Insights
              </h2>

              <div className="mt-4 rounded-[20px] bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>{insights[0].title}</span>
                  <span className="text-[#5b4cf1]">{insights[0].detail}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className="h-full w-[19%] rounded-full bg-[linear-gradient(90deg,#6a5bf8,#4938ea)]" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex gap-3 rounded-[20px] bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#f1efff] text-[#5b4cf1]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium leading-5 text-slate-500">
                    {insights[1].title}
                  </p>
                </div>

                <div className="flex gap-3 rounded-[20px] bg-slate-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#eef8ff] text-[#57a5d4]">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium leading-5 text-slate-500">
                    {insights[2].title}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] bg-[#fff6ed] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.05)] ring-1 ring-[#ffe5cc]">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffdcb8] text-[#a55618]">
                  <FileCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">
                    Interview Playbook
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    24 hand-picked resources
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>

        <section className="flex flex-col gap-5 rounded-[30px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 lg:flex-row lg:items-center lg:justify-between lg:p-6">
          <div className="max-w-3xl">
            <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
              Feeling overwhelmed by the hunt?
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              Our career architects recommend focusing on 3 high-quality
              applications per week rather than mass-applying. Quality always
              wins the algorithmic gatekeepers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
              Archive Old
            </button>
            <button className="rounded-2xl bg-[linear-gradient(135deg,#6152f7,#4a37ea)] px-5 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(91,76,241,0.28)] transition hover:-translate-y-0.5">
              Resume Audit
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
