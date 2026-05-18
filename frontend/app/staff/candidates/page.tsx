"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

export default function StaffCandidatesPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<User[]>("/api/users/talent").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STAFF" title="Candidate oversight">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <Panel title="Student directory" subtitle="Spot-check profile quality and marketplace readiness.">
            <DataTable
              rows={rows}
              emptyText="No candidates available."
              columns={[
                { key: "candidate", label: "Candidate", render: (row) => row.fullName },
                { key: "headline", label: "Headline", render: (row) => row.headline || "-" },
                { key: "skills", label: "Skills", render: (row) => (row.skills || []).slice(0, 4).join(", ") },
              ]}
            />
          </Panel>
        ) : null}
      </div>
    </PortalLayout>
  );
}
