"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

export default function StaffVerificationPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get<User[]>("/api/users/recruiters/pending").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  return (
    <PortalLayout role="STAFF" title="Recruiter verification">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error && rows.length === 0 ? (
          <Panel title="Recruiter verification" subtitle="No profiles are waiting for manual review right now.">
            <div className="rounded-2xl border border-dashed border-[var(--outline-variant)] px-4 py-10 text-center text-sm font-medium text-slate-500">
              All recruiter submissions have been processed.
            </div>
          </Panel>
        ) : null}
        {!loading && !error ? rows.map((row) => (
          <Panel key={row.id} title={row.fullName} subtitle={`${row.companyName || "Unknown company"} • ${row.email}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-slate-600">{row.bio || "Recruiter profile awaiting staff review."}</p>
              <div className="flex gap-2">
                <button onClick={() => api.patch(`/api/users/recruiters/${row.id}/verification`, { status: "APPROVED" }).then(load)} className="rounded-full signature-gradient px-4 py-2 text-sm font-semibold text-white">Approve</button>
                <button onClick={() => api.patch(`/api/users/recruiters/${row.id}/verification`, { status: "REJECTED" }).then(load)} className="rounded-full border border-[var(--outline-variant)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">Reject</button>
              </div>
            </div>
          </Panel>
        )) : null}
      </div>
    </PortalLayout>
  );
}
