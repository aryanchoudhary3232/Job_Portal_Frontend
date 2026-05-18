"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

type Analytics = {
  jobsByMode: Array<{ label: string; value: number }>;
  applicationsByStage: Array<{ label: string; value: number }>;
};

export default function StaffAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Analytics>("/api/admin/analytics").then(setData).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STAFF" title="Platform analytics">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {data ? (
          <div className="grid gap-6 xl:grid-cols-2">
            <Panel title="Jobs by work mode">
              <ChartList rows={data.jobsByMode} />
            </Panel>
            <Panel title="Applications by stage">
              <ChartList rows={data.applicationsByStage} />
            </Panel>
          </div>
        ) : null}
      </div>
    </PortalLayout>
  );
}

function ChartList({ rows }: { rows: Array<{ label: string; value: number }> }) {
  const max = Math.max(...rows.map((row) => row.value), 1);
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-2 flex items-center justify-between text-sm"><span>{row.label}</span><span className="font-semibold">{row.value}</span></div>
          <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-[var(--primary-container)]" style={{ width: `${(row.value / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
