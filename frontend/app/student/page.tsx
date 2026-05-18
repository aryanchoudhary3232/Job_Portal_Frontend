"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application, Job, User } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";

export default function StudentPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get<Job[]>("/api/jobs"), api.get<Application[]>("/api/applications/student/me")])
      .then(([jobList, applicationList]) => {
        setJobs(jobList);
        setApplications(applicationList);
      })
      .catch((response) => setError(response instanceof Error ? response.message : "Could not load data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STUDENT" title="Student overview">
      {(user: User) => (
        <div className="space-y-6">
          <PageState loading={loading} error={error} />
          {!loading && !error ? (
            <>
              <StatGrid items={[
                { label: "Matched jobs", value: jobs.length },
                { label: "Applications", value: applications.length },
                { label: "Skills listed", value: user.skills?.length || 0 },
                { label: "Verification", value: "Profile live" },
              ]} />
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <Panel title="Featured jobs" subtitle="Open roles aligned to the student side of the marketplace.">
                  <DataTable
                    rows={jobs.slice(0, 4)}
                    emptyText="No jobs available yet."
                    columns={[
                      { key: "title", label: "Role", render: (job) => <div><p className="font-semibold">{job.title}</p><p className="text-xs text-slate-500">{job.companyName}</p></div> },
                      { key: "mode", label: "Mode", render: (job) => job.workMode },
                      { key: "salary", label: "Salary", render: (job) => job.salaryRange },
                    ]}
                  />
                </Panel>
                <Panel title="Profile snapshot" subtitle="The recruiter-facing summary pulled from your current profile.">
                  <div className="space-y-4 text-sm text-slate-600">
                    <div><p className="font-semibold text-slate-950">{user.headline}</p><p className="mt-1">{user.bio}</p></div>
                    <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Location</p><p className="mt-2 font-medium">{user.location}</p></div>
                    <div><p className="text-xs uppercase tracking-[0.25em] text-slate-400">Skills</p><div className="mt-3 flex flex-wrap gap-2">{(user.skills || []).map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{skill}</span>)}</div></div>
                  </div>
                </Panel>
              </div>
            </>
          ) : null}
        </div>
      )}
    </PortalLayout>
  );
}
