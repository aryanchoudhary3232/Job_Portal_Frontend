"use client";

import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";

const recommendations = ["System Design", "Node.js", "SQL", "Testing", "Problem Solving", "Communication"];

export default function StudentSkillsPage() {
  return (
    <PortalLayout role="STUDENT" title="Skills plan">
      {(user) => (
        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Current strengths" subtitle="Pulled directly from your editable profile.">
            <div className="flex flex-wrap gap-3">{(user.skills || []).map((skill) => <span key={skill} className="rounded-full bg-[var(--primary-fixed)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">{skill}</span>)}</div>
          </Panel>
          <Panel title="Suggested growth areas" subtitle="Useful tags inferred from current hiring demand in the demo portal.">
            <div className="space-y-3">{recommendations.map((skill) => <div key={skill} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">{skill}</div>)}</div>
          </Panel>
        </div>
      )}
    </PortalLayout>
  );
}
