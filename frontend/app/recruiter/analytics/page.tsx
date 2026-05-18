"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { StatGrid } from "@/components/dashboard/StatGrid";
import { PageState } from "@/components/dashboard/PageState";

type Analytics = { activeJobs: number; pausedJobs: number; draftJobs: number; topSkills: string[] };

export default function RecruiterAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Analytics>("/api/jobs/recruiter/analytics").then(setData).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Hiring analytics">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {data ? (
          <>
            <StatGrid items={[
              { label: "Active jobs", value: data.activeJobs },
              { label: "Paused jobs", value: data.pausedJobs },
              { label: "Draft jobs", value: data.draftJobs },
              { label: "Top skills", value: data.topSkills.length },
            ]} />
            <Panel title="Most requested skills" subtitle="A quick signal from your currently posted jobs.">
              <div className="flex flex-wrap gap-3">{data.topSkills.map((skill) => <span key={skill} className="rounded-full bg-[var(--primary-fixed)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">{skill}</span>)}</div>
            </Panel>
          </>
        ) : null}
      </div>
    </PortalLayout>
  );
}
