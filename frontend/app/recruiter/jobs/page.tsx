"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Job } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";
import { InlineError } from "@/components/ui/InlineError";
import { getErrorMessage } from "@/lib/api-error";

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get<Job[]>("/api/jobs/recruiter/me").then(setJobs).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Manage jobs">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Post a role" subtitle="Keep descriptions specific, concise, and outcome-oriented.">
          <JobForm onSuccess={load} />
        </Panel>
        <div className="space-y-6">
          <PageState loading={loading} error={error} />
          {!loading && !error ? (
            <Panel title="Open roles" subtitle="Jobs currently owned by your recruiter workspace.">
              <DataTable
                rows={jobs}
                emptyText="No jobs posted yet."
                columns={[
                  { key: "title", label: "Role", render: (job) => <div><p className="font-semibold">{job.title}</p><p className="text-xs text-slate-500">{job.companyName}</p></div> },
                  { key: "mode", label: "Mode", render: (job) => job.workMode },
                  { key: "status", label: "Status", render: (job) => <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{job.status}</span> },
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
            workMode: form.get("workMode"),
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
      {["title", "companyName", "location", "type", "salaryRange", "skills"].map((name) => <input key={name} name={name} placeholder={name} className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" required />)}
      <select name="workMode" className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none" defaultValue="HYBRID">
        {["REMOTE", "HYBRID", "ONSITE"].map((mode) => <option key={mode}>{mode}</option>)}
      </select>
      <textarea name="description" rows={5} placeholder="Role description (min 20 characters)" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" required minLength={20} />
      <p className="text-xs text-slate-500">Skills: comma separated (e.g. React, Node). Description: at least 20 characters.</p>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full signature-gradient px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? "Publishing..." : "Publish job"}
      </button>
    </form>
  );
}
