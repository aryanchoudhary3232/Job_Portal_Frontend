"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Job } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

export default function StaffJobsPage() {
  const [rows, setRows] = useState<Job[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Job[]>("/api/jobs").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STAFF" title="Marketplace jobs">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <Panel title="All live jobs" subtitle="Cross-check listings across recruiter workspaces.">
            <DataTable
              rows={rows}
              emptyText="No jobs available."
              columns={[
                { key: "job", label: "Role", render: (row) => <div><p className="font-semibold">{row.title}</p><p className="text-xs text-slate-500">{row.companyName}</p></div> },
                { key: "location", label: "Location", render: (row) => row.location },
                { key: "status", label: "Status", render: (row) => row.status },
              ]}
            />
          </Panel>
        ) : null}
      </div>
    </PortalLayout>
  );
}
