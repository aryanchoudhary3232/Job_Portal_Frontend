"use client";

import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  FileCheck,
  Heart,
  MapPin,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

type JobCard = {
  company: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  match: number;
  summary: string;
  tags: string[];
  mark: string;
  markTone: string;
};

const jobs: JobCard[] = [
  {
    company: "Stripe",
    title: "Product Designer, Ecosystem",
    location: "San Francisco / Remote",
    type: "Full Time",
    salary: "$120k - $165k",
    match: 95,
    summary:
      "Join our design team to build the financial infrastructure of the internet. You'll be working on core product experiences that empower millions.",
    tags: ["Figma", "Design Systems", "Fintech"],
    mark: "S",
    markTone: "bg-[#eef6fb] text-[#56a7c9]",
  },
  {
    company: "Spotify",
    title: "Visual Interaction Intern",
    location: "Stockholm / Hybrid",
    type: "Internship",
    salary: "$60k - $80k",
    match: 89,
    summary:
      "Shape how millions of users interact with music. We're looking for an intern with a passion for motion and micro-interactions.",
    tags: ["After Effects", "UX Design"],
    mark: "S",
    markTone: "bg-black text-[#43d675]",
  },
  {
    company: "Uber",
    title: "Design Technologist",
    location: "New York City",
    type: "Hybrid",
    salary: "$140k - $180k",
    match: 92,
    summary:
      "Bridge the gap between design and engineering. You will prototype complex interactions and build high-fidelity components for our design system.",
    tags: ["React", "Prototyping"],
    mark: "U",
    markTone: "bg-slate-900 text-white",
  },
];

const pipeline = [
  { label: "Saved", count: 12 },
  { label: "Applied", count: 4 },
];

const pipelineItems = [
  {
    title: "UX Researcher (Intern)",
    company: "Google",
    status: "Posted 2d ago",
    mark: "G",
    tone: "bg-[#0f172a] text-white",
  },
  {
    title: "Interface Engineer",
    company: "X",
    status: "Posted 5h ago",
    mark: "X",
    tone: "bg-black text-white",
  },
];

const careerInsights = [
  {
    title: "Interview Hack",
    detail:
      "Mentioning \"Design Systems\" in your summary can increase visibility by 24% for Stripe.",
  },
];

export default function StudentJobsPage() {
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [savedJobs, setSavedJobs] = useState<string[]>(["Stripe-Product Designer, Ecosystem"]);

  const visibleJobs = useMemo(() => {
    if (activeFilter === "Remote Only") {
      return jobs.filter((job) => job.location.toLowerCase().includes("remote"));
    }

    return jobs;
  }, [activeFilter]);

  const toggleSaved = (jobId: string) => {
    setSavedJobs((current) =>
      current.includes(jobId)
        ? current.filter((item) => item !== jobId)
        : [...current, jobId]
    );
  };

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.06),_transparent_30%),linear-gradient(180deg,#f8f8fb_0%,#f5f7fb_100%)]">
      <div className="mx-auto flex w-full max-w-[1460px] flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-[2.6rem]">
              Discovery Hub
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-500 sm:text-base">
              Personalized career opportunities matching your profile as a{" "}
              <span className="font-extrabold text-[#5b4cf1]">
                Product Design Intern.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["All Jobs", "Remote Only"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  activeFilter === filter
                    ? "bg-[linear-gradient(135deg,#6152f7,#4a37ea)] text-white shadow-[0_14px_30px_rgba(91,76,241,0.28)]"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}

            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_320px]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black uppercase tracking-[0.22em] text-slate-400">
                Jobs For You
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {visibleJobs.map((job) => {
              const jobId = `${job.company}-${job.title}`;
              const isSaved = savedJobs.includes(jobId);

              return (
                <article
                  key={jobId}
                  className="rounded-[30px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 transition hover:-translate-y-1 sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black ${job.markTone}`}
                      >
                        {job.mark}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h2 className="text-[1.6rem] font-black tracking-[-0.03em] text-slate-900">
                            {job.title}
                          </h2>
                          <span className="rounded-full bg-[#f1efff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#5b4cf1]">
                            {job.match}% Match
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
                            {job.type}
                          </span>
                          <span className="font-semibold text-slate-400">•</span>
                          <span>{job.salary}</span>
                        </div>

                        <p className="mt-4 max-w-3xl text-sm font-medium leading-6 text-slate-500">
                          {job.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => toggleSaved(jobId)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
                          isSaved
                            ? "bg-rose-50 text-rose-500"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                        }`}
                      >
                        <Heart
                          className={`h-4.5 w-4.5 ${isSaved ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl bg-[linear-gradient(135deg,#6152f7,#4a37ea)] px-5 py-3 text-sm font-black text-white shadow-[0_14px_28px_rgba(91,76,241,0.28)] transition hover:-translate-y-0.5"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="space-y-5">
            <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  Your Pipeline
                </h2>
                <button className="text-[11px] font-black uppercase tracking-[0.14em] text-[#5b4cf1]">
                  Update
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-[20px] bg-slate-50 p-1">
                {pipeline.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white px-3 py-3 text-center shadow-sm ring-1 ring-slate-100"
                  >
                    <p className="text-xs font-black text-slate-800">
                      {item.label} ({item.count})
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                {pipelineItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-[22px] bg-slate-50 px-3 py-3 ring-1 ring-slate-100"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${item.tone}`}
                    >
                      {item.mark}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 truncate text-xs font-medium text-slate-500">
                        {item.company} • {item.status}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#5b4cf1] ring-1 ring-[#d8d3ff] transition hover:bg-[#f6f4ff]">
                View Full Dashboard
              </button>
            </section>

            <section className="overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#5f50f6,#4331e0)] p-5 text-white shadow-[0_24px_60px_rgba(91,76,241,0.26)]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <h2 className="text-xl font-black tracking-[-0.02em]">
                  Profile Strength
                </h2>
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-white/80">
                Your profile is 85% complete. Add a portfolio to unlock more
                matches.
              </p>

              <div className="mt-6 h-2 rounded-full bg-white/20">
                <div className="h-full w-[85%] rounded-full bg-white" />
              </div>

              <button className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#4a37ea] transition hover:bg-slate-100">
                Complete Profile
              </button>
            </section>

            <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Career Insights
              </h2>

              <div className="mt-4 space-y-3">
                {careerInsights.map((insight) => (
                  <div
                    key={insight.title}
                    className="flex gap-3 rounded-[22px] bg-[#fff7ef] p-4 ring-1 ring-[#ffe7ce]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffdcb6] text-[#8c4b0f]">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        {insight.title}
                      </p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                        {insight.detail}
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
