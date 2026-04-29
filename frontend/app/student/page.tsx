"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  MessageCircleMore,
  MonitorPlay,
  Palette,
  Plus,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const recommendedJobs = [
  {
    title: "Junior Product Designer",
    company: "DesignCo",
    location: "London, UK",
    salary: "$45k - $60k",
    match: "95% Match",
    icon: Palette,
  },
  {
    title: "Frontend Developer Intern",
    company: "StackFlow",
    location: "Remote",
    salary: "$25/hr - $35/hr",
    match: "92% Match",
    icon: MonitorPlay,
  },
];

const recentApplications = [
  {
    title: "Junior UX Researcher",
    company: "CreativAgency",
    meta: "Submitted Jan 12, 2024",
    status: "Applied",
    accent: "bg-[#5b4cf1]",
    icon: Check,
    badge:
      "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
  },
  {
    title: "UX/UI Design Intern",
    company: "Fintech Global",
    meta: "Jan 18 @ 2:00 PM",
    status: "Interview Scheduled",
    accent: "bg-[#b55b16]",
    icon: Clock3,
    badge:
      "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
  },
  {
    title: "Product Designer (Associate)",
    company: "TravelWise",
    meta: "Status updated yesterday",
    status: "Under Review",
    accent: "bg-slate-100",
    icon: Eye,
    iconColor: "text-slate-500",
    badge:
      "bg-sky-50 text-sky-600 ring-1 ring-sky-100",
  },
] satisfies Array<{
  title: string;
  company: string;
  meta: string;
  status: string;
  accent: string;
  badge: string;
  icon: LucideIcon;
  iconColor?: string;
}>;

const skillScores = [
  { name: "Figma", value: 98 },
  { name: "React", value: 85 },
  { name: "Design Systems", value: 92 },
];

const upcomingEvents = [
  {
    month: "JAN",
    day: "18",
    title: "Portfolio Review",
    speaker: "Sarah Jenkins",
    detail: "Google Meet",
  },
  {
    month: "JAN",
    day: "20",
    title: "Design Workshop",
    speaker: "Advanced Auto Layout",
    detail: "2:00 PM Session",
  },
];

const unreadMessages = [
  {
    name: "Jessica from Team Pixel",
    message: "We would love to see your updated case study.",
    time: "2m ago",
    tone: "from-amber-300 to-orange-500",
  },
  {
    name: "David (Mentor)",
    message: "Did you check the frontend challenge brief?",
    time: "5m ago",
    tone: "from-slate-700 to-slate-900",
  },
];

export default function StudentPage() {
  const [displayName] = useState(() => {
    if (typeof window === "undefined") {
      return "Alex";
    }

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        return "Alex";
      }

      const parsed = JSON.parse(storedUser) as { name?: string };
      return parsed.name?.trim().split(/\s+/)[0] || "Alex";
    } catch {
      return "Alex";
    }
  });

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.08),_transparent_30%),linear-gradient(180deg,#f8f8fb_0%,#f5f7fb_55%,#f8f9fc_100%)]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-[2.6rem]">
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 text-sm font-semibold text-slate-500 sm:text-base">
              You have{" "}
              <span className="font-extrabold text-[#5b4cf1]">2 interviews</span>{" "}
              scheduled for this week. Good luck!
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200 transition hover:-translate-y-0.5">
              Update Resume
            </button>
            <Link
              href="/student/jobs"
              className="rounded-full bg-[linear-gradient(135deg,#6152f7,#4a37ea)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(91,76,241,0.32)] transition hover:-translate-y-0.5"
            >
              Find Jobs
            </Link>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,2.1fr)_380px]">
          <div className="space-y-6">
            <section className="relative overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 sm:p-8">
              <div className="absolute right-12 top-7 h-16 w-16 rounded-full border border-slate-200/80 bg-white/80" />
              <div className="absolute right-5 top-12 h-12 w-12 rounded-full border border-slate-200/70 bg-slate-50/90" />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                  <div className="h-28 w-28 rounded-full bg-[conic-gradient(#5b4cf1_0_85%,#eef1f7_85%_100%)] p-[8px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[1.75rem] font-black text-slate-900">
                      85%
                    </div>
                  </div>
                </div>

                <div className="max-w-xl">
                  <h2 className="text-[1.65rem] font-black tracking-[-0.03em] text-slate-900">
                    Complete your profile
                  </h2>
                  <p className="mt-2 max-w-lg text-sm font-medium leading-6 text-slate-500">
                    Profiles with completed &quot;Skill Assessment&quot; and
                    &quot;Portfolio&quot; sections receive 3x more recruiter
                    views.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/student-onboarding"
                      className="rounded-full bg-[linear-gradient(135deg,#6152f7,#4a37ea)] px-5 py-2.5 text-xs font-extrabold text-white shadow-[0_12px_24px_rgba(91,76,241,0.24)]"
                    >
                      Complete Profile
                    </Link>
                    <button className="rounded-full bg-slate-100 px-5 py-2.5 text-xs font-extrabold text-slate-600">
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-[1.55rem] font-black tracking-[-0.03em] text-slate-900">
                  Recommended for you
                </h2>
                <Link
                  href="/student/jobs"
                  className="text-sm font-bold text-[#5b4cf1] transition hover:text-[#4837dc]"
                >
                  View all recommendations
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {recommendedJobs.map((job) => (
                  <article
                    key={job.title}
                    className="rounded-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 transition hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        <job.icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-[#f2f0ff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#5b4cf1]">
                        {job.match}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3 className="text-xl font-black leading-7 text-slate-900">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-slate-500">
                        {job.company} • {job.location}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-base font-black text-slate-800">
                        {job.salary}
                      </span>
                      <Link
                        href="/student/jobs"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-[#5b4cf1] hover:text-white"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 sm:p-7">
              <h2 className="text-[1.45rem] font-black tracking-[-0.03em] text-slate-900">
                Recent Applications
              </h2>

              <div className="mt-6 space-y-7">
                {recentApplications.map((application, index) => (
                  <div key={application.title} className="relative flex gap-4">
                    {index !== recentApplications.length - 1 && (
                      <div className="absolute left-5 top-14 h-[calc(100%+18px)] w-px bg-slate-200" />
                    )}

                    <div
                      className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${application.accent} ring-8 ring-white`}
                    >
                      <application.icon
                        className={`h-4.5 w-4.5 ${
                          application.iconColor || "text-white"
                        }`}
                        strokeWidth={2.6}
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="truncate text-base font-black text-slate-900">
                          {application.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                          {application.company} • {application.meta}
                        </p>
                      </div>

                      <span
                        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${application.badge}`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[30px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-slate-800">
                  Skill Score
                </h2>
                <Sparkles className="h-4 w-4 text-slate-400" />
              </div>

              <div className="mt-6 text-center">
                <div className="text-[3.2rem] font-black leading-none text-[#5b4cf1]">
                  94
                  <span className="text-xl text-slate-400">/100</span>
                </div>
                <p className="mt-2 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                  Top 5% among peers
                </p>
              </div>

              <div className="mt-7 space-y-5">
                {skillScores.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-600">
                      <span>{skill.name}</span>
                      <span className="text-[#5b4cf1]">{skill.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#6a5bf8,#4938ea)]"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-7 w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200">
                Take New Assessment
              </button>
            </section>

            <section className="relative rounded-[30px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <div className="mb-4 flex items-center gap-2 text-slate-900">
                <CalendarDays className="h-4 w-4 text-[#5b4cf1]" />
                <h2 className="text-lg font-black">Upcoming Events</h2>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.title}
                    className="flex items-center gap-4 rounded-[24px] bg-[#f8f9fd] p-4 ring-1 ring-slate-100"
                  >
                    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-center ring-1 ring-slate-100">
                      <span className="text-[10px] font-black tracking-[0.18em] text-[#5b4cf1]">
                        {event.month}
                      </span>
                      <span className="text-2xl font-black text-slate-900">
                        {event.day}
                      </span>
                    </div>

                    <div className="min-w-0 pr-6">
                      <h3 className="text-sm font-black leading-5 text-slate-900 sm:whitespace-nowrap">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        with {event.speaker}
                      </p>
                      <p className="mt-2 text-[11px] font-bold text-[#5b4cf1]">
                        {event.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="absolute bottom-5 right-[-10px] flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6152f7,#4a37ea)] text-white shadow-[0_18px_34px_rgba(91,76,241,0.34)] transition hover:scale-105">
                <Plus className="h-6 w-6" />
              </button>
            </section>

            <section className="rounded-[30px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-900">
                  <MessageCircleMore className="h-4 w-4 text-[#5b4cf1]" />
                  <h2 className="text-lg font-black">Unread Messages</h2>
                </div>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white">
                  2
                </span>
              </div>

              <div className="space-y-4">
                {unreadMessages.map((message) => (
                  <div
                    key={message.name}
                    className="flex items-start gap-3 rounded-[22px] p-2 transition hover:bg-slate-50"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${message.tone} text-sm font-black text-white shadow-sm`}
                    >
                      {message.name.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="truncate text-sm font-black text-slate-900">
                          {message.name}
                        </h3>
                        <span className="shrink-0 text-[11px] font-bold text-slate-400">
                          {message.time}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
