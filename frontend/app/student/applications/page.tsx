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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Application[]>("/api/applications/student/me").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STUDENT" title="Application tracker">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <Panel title="Recent applications" subtitle="Follow your progress across each hiring stage.">
            <DataTable
              rows={rows}
              emptyText="No applications yet."
              columns={[
                { key: "job", label: "Job", render: (item) => <div><p className="font-semibold">{item.job?.title}</p><p className="text-xs text-slate-500">{item.job?.companyName}</p></div> },
                { key: "stage", label: "Status", render: (item) => <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{stageLabel(item.stage)}</span> },
                { key: "date", label: "Applied", render: (item) => formatDate(item.appliedAt) },
              ]}
            />
          </Panel>
        ) : null}
      </div>
    </PortalLayout>
  );
}
