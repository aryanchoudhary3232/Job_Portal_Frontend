"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application, Job } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { stageLabel } from "@/lib/application-stages";

export default function RecruiterDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get<Job[]>("/api/jobs/recruiter/me"), api.get<Application[]>("/api/applications/recruiter/me")])
      .then(([jobList, applicationList]) => {
        setJobs(jobList);
        setApplications(applicationList);
      })
      .catch((response) => setError(response instanceof Error ? response.message : "Failed to load recruiter data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Recruiter dashboard">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <>
            <StatGrid items={[
              { label: "Live jobs", value: jobs.filter((job) => job.status === "PUBLISHED").length },
              { label: "Applications", value: applications.length },
              { label: "Shortlisted", value: applications.filter((item) => item.stage === "SHORTLISTED").length },
              { label: "Selected", value: applications.filter((item) => item.stage === "HIRED").length },
            ]} />
            <StatGrid items={[
              { label: "In interview", value: applications.filter((item) => item.stage === "INTERVIEW").length },
              { label: "Offers", value: applications.filter((item) => item.stage === "OFFER").length },
              { label: "Rejected", value: applications.filter((item) => item.stage === "REJECTED").length },
              { label: "New (applied)", value: applications.filter((item) => item.stage === "APPLIED").length },
            ]} />
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel title="Recent applications" subtitle="Latest candidate movement across your roles.">
                <DataTable
                  rows={applications.slice(0, 5)}
                  emptyText="No applicants yet."
                  columns={[
                    { key: "student", label: "Candidate", render: (row) => row.student?.fullName || "Unknown" },
                    { key: "job", label: "Role", render: (row) => row.job?.title || "Untitled" },
                    { key: "stage", label: "Stage", render: (row) => <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{stageLabel(row.stage)}</span> },
                  ]}
                />
              </Panel>
              <Panel title="Hiring priorities" subtitle="Fast reminders for keeping velocity high.">
                <div className="space-y-3 text-sm text-slate-600">
                  {["Review new applications daily", "Move top candidates to shortlist within 48h", "Keep job descriptions outcome-focused"].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 px-4 py-3">{item}</div>
                  ))}
                </div>
              </Panel>
            </div>
          </>
        ) : null}
      </div>
    </PortalLayout>
  );
}
