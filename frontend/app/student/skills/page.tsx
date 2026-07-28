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
            <div className="flex flex-wrap gap-3">{(user.skills?.length ? user.skills : ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs"]).map((skill) => <span key={skill} className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">{skill}</span>)}</div>
          </Panel>
          <Panel title="Suggested growth areas" subtitle="Useful tags inferred from current hiring demand in the demo portal.">
            <div className="space-y-3">{recommendations.map((skill) => <div key={skill} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">{skill}</div>)}</div>
          </Panel>
        </div>
      )}
    </PortalLayout>
  );
}
