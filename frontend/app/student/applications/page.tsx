"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Application } from "@/lib/types";
import { stageLabel } from "@/lib/application-stages";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Panel } from "@/components/dashboard/Panel";
import { PageState } from "@/components/dashboard/PageState";

export default function StudentApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Application[]>("/api/applications/student/me")
      .then((data) => setRows(Array.isArray(data) ? data : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STUDENT" title="Application tracker">
      <div className="space-y-6">
        <PageState loading={loading} error="" />
        {!loading ? (
          <Panel title="Recent applications" subtitle="Follow your progress across each hiring stage.">
            <DataTable
              rows={rows}
              emptyText="No applications submitted yet. Browse jobs and apply to start tracking your applications!"
              columns={[
                { key: "job", label: "Job Role", render: (item) => <div><p className="font-semibold">{item.jobTitle || item.job?.title}</p><p className="text-xs text-slate-500">{item.companyName || item.job?.companyName}</p></div> },
                { key: "stage", label: "Status", render: (item) => <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">{stageLabel(item.stage)}</span> },
                { key: "date", label: "Applied Date", render: (item) => formatDate(item.createdAt || item.appliedAt) },
              ]}
            />
          </Panel>
        ) : null}
      </div>
    </PortalLayout>
  );
}
