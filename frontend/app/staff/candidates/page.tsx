"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application, User } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { stageLabel } from "@/lib/application-stages";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";

export default function StaffCandidatesPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<User[]>("/api/users/talent"),
      api.get<Application[]>("/api/admin/applications"),
    ])
      .then(([users, apps]) => {
        setRows(users);
        setApplications(apps);
      })
      .catch((response) => setError(response instanceof Error ? response.message : "Failed"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="STAFF" title="Candidate oversight">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
          <>
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
            <Panel title="Shortlist & selection status" subtitle="Track application movement across companies.">
              <DataTable
                rows={applications}
                emptyText="No applications yet."
                columns={[
                  { key: "student", label: "Student", render: (row) => row.student?.fullName || "-" },
                  { key: "company", label: "Company", render: (row) => row.job?.companyName || "-" },
                  { key: "role", label: "Role", render: (row) => row.job?.title || "-" },
                  { key: "stage", label: "Status", render: (row) => stageLabel(row.stage) },
                  { key: "applied", label: "Applied", render: (row) => formatDate(row.appliedAt) },
                ]}
              />
            </Panel>
          </>
        ) : null}
      </div>
    </PortalLayout>
  );
}
