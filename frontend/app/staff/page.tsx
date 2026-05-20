"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { PageState } from "@/components/dashboard/PageState";

type Overview = {
  totalStudents: number;
  totalRecruiters: number;
  totalJobs: number;
  totalApplications: number;
  pendingRecruiters: number;
  totalShortlisted: number;
  totalSelected: number;
  totalRejected: number;
};

export default function StaffPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Overview>("/api/admin/overview").then(setData).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STAFF" title="Operations overview">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {data ? (
          <>
            <StatGrid items={[
              { label: "Students", value: data.totalStudents },
              { label: "Recruiters", value: data.totalRecruiters },
              { label: "Jobs posted", value: data.totalJobs },
              { label: "Total applications", value: data.totalApplications },
            ]} />
            <StatGrid items={[
              { label: "Shortlisted", value: data.totalShortlisted ?? 0 },
              { label: "Selected", value: data.totalSelected ?? 0 },
              { label: "Rejected", value: data.totalRejected ?? 0 },
              { label: "Pending verifications", value: data.pendingRecruiters },
            ]} />
            <Panel title="Hiring pipeline" subtitle="Platform-wide application, selection, and rejection metrics.">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Applications</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{data.totalApplications}</p>
                  <p className="mt-1 text-sm text-slate-600">Total student applications submitted</p>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Selected</p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-900">{data.totalSelected ?? 0}</p>
                  <p className="mt-1 text-sm text-emerald-800">Candidates marked as hired or selected</p>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">Rejected</p>
                  <p className="mt-2 text-2xl font-semibold text-rose-900">{data.totalRejected ?? 0}</p>
                  <p className="mt-1 text-sm text-rose-800">Applications closed by recruiters</p>
                </div>
              </div>
            </Panel>
          </>
        ) : null}
      </div>
    </PortalLayout>
  );
}
