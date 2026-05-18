"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

const stages = ["SCREENING", "INTERVIEW", "OFFER", "REJECTED"];

export default function RecruiterApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get<Application[]>("/api/applications/recruiter/me").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Application pipeline">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? rows.map((row) => (
          <Panel key={row.id} title={row.student?.fullName || "Candidate"} subtitle={`${row.job?.title || "Role"} • ${row.stage}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-slate-600">{row.note}</p>
              <div className="flex flex-wrap gap-2">
                {stages.map((stage) => (
                  <button key={stage} onClick={() => api.patch(`/api/applications/${row.id}/stage`, { stage }).then(load)} className={`rounded-full px-3 py-2 text-xs font-semibold ${row.stage === stage ? "signature-gradient text-white" : "border border-[var(--outline-variant)] text-[var(--primary)]"}`}>
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          </Panel>
        )) : null}
      </div>
    </PortalLayout>
  );
}
