"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

export default function RecruiterUsersPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<User[]>("/api/users/talent").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Talent pool">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <Panel title="Candidate directory" subtitle="Browse student profiles currently visible in the portal.">
            <DataTable
              rows={rows}
              emptyText="No candidates available."
              columns={[
                { key: "name", label: "Candidate", render: (row) => <div><p className="font-semibold">{row.fullName}</p><p className="text-xs text-slate-500">{row.college}</p></div> },
                { key: "headline", label: "Headline", render: (row) => row.headline || "Student profile" },
                { key: "skills", label: "Skills", render: (row) => (row.skills || []).slice(0, 3).join(", ") },
              ]}
            />
          </Panel>
        ) : null}
      </div>
    </PortalLayout>
  );
}
