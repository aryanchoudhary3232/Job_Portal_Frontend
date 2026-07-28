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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<Job[]>("/api/jobs/recruiter/me"),
      api.get<Application[]>("/api/applications/recruiter/me"),
    ])
      .then(([jobList, applicationList]) => {
        setJobs(Array.isArray(jobList) ? jobList : []);
        setApplications(Array.isArray(applicationList) ? applicationList : []);
      })
      .catch(() => {
        setJobs([]);
        setApplications([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const liveJobsCount = jobs.filter((job) => job.status === "PUBLISHED" || job.status === "OPEN").length;
  const shortlistedCount = applications.filter((item) => item.stage === "SHORTLISTED").length;
  const selectedCount = applications.filter((item) => item.stage === "HIRED").length;

  return (
    <PortalLayout role="RECRUITER" title="Recruiter dashboard">
      <div className="space-y-6">
        <PageState loading={loading} error="" />
        {!loading ? (
          <>
            <StatGrid items={[
              { label: "Live jobs", value: liveJobsCount },
              { label: "Applications", value: applications.length },
              { label: "Shortlisted", value: shortlistedCount },
              { label: "Selected", value: selectedCount },
            ]} />
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel title="Recent applications" subtitle="Latest candidate movement across your roles.">
                <DataTable
                  rows={applications.slice(0, 5)}
                  emptyText="No applicants yet. Post a job to start receiving applications!"
                  columns={[
                    { key: "student", label: "Candidate", render: (row) => row.applicantName || row.student?.fullName || "Candidate" },
                    { key: "job", label: "Role", render: (row) => row.jobTitle || row.job?.title || "Role" },
                    { key: "stage", label: "Stage", render: (row) => <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">{stageLabel(row.stage)}</span> },
                  ]}
                />
              </Panel>
              <Panel title="Hiring priorities" subtitle="Fast reminders for keeping velocity high.">
                <div className="space-y-3 text-sm text-slate-600">
                  {["Post new jobs to reach verified candidates", "Review new applications daily with AI screening", "Use AI Job Description generator to craft roles"].map((item) => (
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
