"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Job } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";
import { InlineError } from "@/components/ui/InlineError";
import { getErrorMessage } from "@/lib/api-error";
import { Lock, Sparkles, Home, Building2, MapPin, CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Recruiter Subscription State
  const [hasPlan, setHasPlan] = useState<boolean>(false);
  const [planName, setPlanName] = useState<string>("");

  const checkPlanStatus = () => {
    if (typeof window !== "undefined") {
      const active = localStorage.getItem("recruiter_active_plan");
      if (active) {
        setHasPlan(true);
        setPlanName(active);
      } else {
        setHasPlan(false);
        setPlanName("");
      }
    }
  };

  const load = () =>
    api.get<Job[]>("/api/jobs/recruiter/me")
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    checkPlanStatus();
  }, []);

  const handleActivateDevPlan = (plan: string) => {
    localStorage.setItem("recruiter_active_plan", plan);
    setHasPlan(true);
    setPlanName(plan);
  };

  const activeJobsCount = jobs.filter((j) => j.status === "PUBLISHED" || j.status === "OPEN").length;
  const isBasicLimitReached = planName === "Recruiter Basic" && activeJobsCount >= 10;

  return (
    <PortalLayout role="RECRUITER" title="Manage jobs">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Post a role" subtitle="Keep descriptions specific, concise, and outcome-oriented.">
          {!hasPlan ? (
            <div className="space-y-5 rounded-3xl bg-gradient-to-b from-purple-900 to-indigo-900 p-6 text-white shadow-2xl animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black">
                  <Lock className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">Action Required</span>
                  <h3 className="text-lg font-black font-display">Active Recruiter Plan Required</h3>
                </div>
              </div>

              <p className="text-xs text-purple-100 font-medium leading-relaxed">
                Job posting is restricted to active subscribers. Select a plan (**Recruiter Basic** for 10 jobs or **Recruiter Pro** for Unlimited jobs) via Razorpay checkout.
              </p>

              <div className="space-y-2.5">
                <Link
                  href="/recruiter/pricing"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl signature-gradient font-extrabold text-xs uppercase tracking-wider text-white shadow-xl transition hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" /> Subscribe Plan with Razorpay <ChevronRight className="h-4 w-4" />
                </Link>

                <div className="flex justify-between gap-2 pt-1">
                  <button
                    onClick={() => handleActivateDevPlan("Recruiter Basic")}
                    className="flex-1 text-center text-[10px] font-bold text-amber-300 hover:text-amber-200 underline"
                  >
                    ⚡ Test Basic Plan (10 Jobs)
                  </button>
                  <button
                    onClick={() => handleActivateDevPlan("Recruiter Pro AI")}
                    className="flex-1 text-center text-[10px] font-bold text-green-300 hover:text-green-200 underline"
                  >
                    ⚡ Test Pro AI (Unlimited)
                  </button>
                </div>
              </div>
            </div>
          ) : isBasicLimitReached ? (
            <div className="space-y-5 rounded-3xl bg-amber-950 border border-amber-500/50 p-6 text-white shadow-2xl animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-slate-950 font-black">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Plan Limit Reached</span>
                  <h3 className="text-lg font-black font-display">10 Active Jobs Limit Reached (10/10)</h3>
                </div>
              </div>

              <p className="text-xs text-amber-100 font-medium leading-relaxed">
                Your **Recruiter Basic Plan** includes up to 10 active job postings. You currently have {activeJobsCount} active jobs. Upgrade to **Recruiter Pro AI** for unlimited job postings and AI applicant ranking!
              </p>

              <Link
                href="/recruiter/pricing"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl signature-gradient font-extrabold text-xs uppercase tracking-wider text-white shadow-xl transition hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4" /> Upgrade to Recruiter Pro AI <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-green-50 border border-green-200 text-xs text-green-900 font-bold">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" /> Plan: <strong>{planName}</strong> ({planName === "Recruiter Basic" ? `${activeJobsCount}/10 Jobs Used` : "Unlimited Jobs"})
                </span>
                <Link href="/recruiter/pricing" className="text-[10px] uppercase font-black tracking-wider text-purple-700 hover:underline">
                  Upgrade Plan
                </Link>
              </div>
              <JobForm onSuccess={load} />
            </div>
          )}
        </Panel>

        <div className="space-y-6">
          <PageState loading={loading} error={error} />
          {!loading && !error ? (
            <Panel title="Open roles" subtitle="Jobs currently owned by your recruiter workspace.">
              <DataTable
                rows={jobs}
                emptyText="No jobs posted yet. Use the form on the left to post a new job role!"
                columns={[
                  { key: "title", label: "Role", render: (job) => <div><p className="font-semibold">{job.title}</p><p className="text-xs text-slate-500">{job.companyName}</p></div> },
                  { key: "mode", label: "Mode", render: (job) => job.workMode },
                  { key: "status", label: "Status", render: (job) => <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">{job.status}</span> },
                ]}
              />
            </Panel>
          ) : null}
        </div>
      </div>
    </PortalLayout>
  );
}

function JobForm({ onSuccess }: { onSuccess: () => void }) {
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedWorkMode, setSelectedWorkMode] = useState<"REMOTE" | "HYBRID" | "ONSITE">("HYBRID");

  const fields = [
    { name: "title", label: "Job Title", placeholder: "e.g. Senior Full Stack Engineer" },
    { name: "companyName", label: "Company Name", placeholder: "e.g. HireVerse Tech Solutions" },
    { name: "location", label: "Location", placeholder: "e.g. Gurgaon, India / Remote" },
    { name: "type", label: "Job Type", placeholder: "e.g. Full-time / Internship" },
    { name: "salaryRange", label: "Salary Range", placeholder: "e.g. ₹8 - ₹12 LPA or $90,000 / year" },
    { name: "skills", label: "Required Skills", placeholder: "e.g. React, Node.js, TypeScript (comma separated)" },
  ];

  const workModes = [
    { id: "REMOTE", label: "Remote", icon: Home, desc: "Work from anywhere" },
    { id: "HYBRID", label: "Hybrid", icon: Building2, desc: "Office + Remote days" },
    { id: "ONSITE", label: "Onsite", icon: MapPin, desc: "In-office physical role" },
  ];

  return (
    <form
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        setFormError("");
        setSubmitting(true);
        try {
          await api.post("/api/jobs", {
            title: form.get("title"),
            companyName: form.get("companyName"),
            location: form.get("location"),
            workMode: selectedWorkMode,
            type: form.get("type"),
            salaryRange: form.get("salaryRange"),
            description: form.get("description"),
            skills: String(form.get("skills") || "").split(",").map((item) => item.trim()).filter(Boolean),
          });
          formElement.reset();
          onSuccess();
        } catch (err) {
          setFormError(getErrorMessage(err, "Could not publish job"));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <InlineError message={formError} />

      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
            {field.label}
          </label>
          <input
            name={field.name}
            placeholder={field.placeholder}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-purple-600 focus:bg-white"
            required
          />
        </div>
      ))}

      {/* Custom Designed Work Mode Dropdown Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Work Mode Selection
        </label>
        <div className="grid grid-cols-3 gap-2">
          {workModes.map((mode) => {
            const MIcon = mode.icon;
            const isSelected = selectedWorkMode === mode.id;
            return (
              <button
                type="button"
                key={mode.id}
                onClick={() => setSelectedWorkMode(mode.id as typeof selectedWorkMode)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 ${
                  isSelected
                    ? "border-purple-600 bg-purple-50/80 text-purple-900 shadow-md ring-2 ring-purple-600/30"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <MIcon className={`h-5 w-5 mb-1 ${isSelected ? "text-purple-600" : "text-slate-400"}`} />
                <span className="text-xs font-extrabold">{mode.label}</span>
                <span className="text-[10px] text-slate-400 font-medium">{mode.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Role Description
        </label>
        <textarea
          name="description"
          rows={5}
          placeholder="Enter clear, detailed role responsibilities and requirements (min 20 characters)"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-purple-600 focus:bg-white"
          required
          minLength={20}
        />
      </div>

      <p className="text-xs font-semibold text-slate-400">
        💡 Skills should be comma separated. Description must be at least 20 characters.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-full signature-gradient text-white text-xs font-extrabold uppercase tracking-wider shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {submitting ? "Publishing Job..." : "Publish Job Role"}
      </button>
    </form>
  );
}
