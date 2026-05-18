"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { PageState } from "@/components/dashboard/PageState";

type Overview = { totalStudents: number; totalRecruiters: number; totalJobs: number; totalApplications: number; pendingRecruiters: number };

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
              { label: "Jobs", value: data.totalJobs },
              { label: "Pending checks", value: data.pendingRecruiters },
            ]} />
            <Panel title="Platform pulse" subtitle="A concise summary for staff operators.">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-600">Applications flowing through the system: {data.totalApplications}</div>
                <div className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-600">Pending recruiter verifications: {data.pendingRecruiters}</div>
              </div>
            </Panel>
          </>
        ) : null}
      </div>
    </PortalLayout>
  );
}
