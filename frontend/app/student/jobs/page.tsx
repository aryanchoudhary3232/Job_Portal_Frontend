"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Job } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { PageState } from "@/components/dashboard/PageState";

export default function StudentJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState<string>("");

  useEffect(() => {
    api.get<Job[]>("/api/jobs").then(setJobs).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  const apply = async (jobId: string) => {
    setActiveJob(jobId);
    try {
      await api.post("/api/applications", { jobId, note: "Excited to contribute with strong product and engineering skills." });
      setJobs((current) => [...current]);
    } catch (response) {
      setError(response instanceof Error ? response.message : "Application failed");
    } finally {
      setActiveJob("");
    }
  };

  return (
    <PortalLayout role="STUDENT" title="Browse jobs">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {jobs.map((job) => (
              <Panel key={job.id} title={job.title} subtitle={`${job.companyName} • ${job.location} • ${job.workMode}`}>
                <p className="text-sm leading-7 text-slate-600">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{skill}</span>)}</div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950">{job.salaryRange}</p>
                  <button onClick={() => apply(job.id)} className="rounded-full signature-gradient px-4 py-2 text-sm font-semibold text-white" disabled={activeJob === job.id}>
                    {activeJob === job.id ? "Applying..." : "Apply now"}
                  </button>
                </div>
              </Panel>
            ))}
          </div>
        ) : null}
      </div>
    </PortalLayout>
  );
}
