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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Analytics>("/api/jobs/recruiter/analytics")
      .then((res) => setData(res))
      .catch(() => setData({ activeJobs: 0, pausedJobs: 0, draftJobs: 0, topSkills: [] }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Hiring analytics">
      <div className="space-y-6">
        <PageState loading={loading} error="" />
        {data ? (
          <>
            <StatGrid items={[
              { label: "Active jobs", value: data.activeJobs || 0 },
              { label: "Paused jobs", value: data.pausedJobs || 0 },
              { label: "Draft jobs", value: data.draftJobs || 0 },
              { label: "Top skills", value: data.topSkills?.length || 0 },
            ]} />
            <Panel title="Most requested skills" subtitle="A quick signal from your currently posted jobs.">
              {data.topSkills && data.topSkills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {data.topSkills.map((skill) => (
                    <span key={skill} className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-semibold text-slate-500 py-4">No job skills published yet.</p>
              )}
            </Panel>
          </>
        ) : null}
      </div>
    </PortalLayout>
  );
}
