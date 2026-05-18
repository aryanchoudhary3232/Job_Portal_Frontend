"use client";

import Link from "next/link";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";

export default function RecruiterOnboardingPage() {
  return (
    <PortalLayout role="RECRUITER" title="Recruiter onboarding">
      {(user) => (
        <Panel title="Launch checklist" subtitle="Use this as the minimum setup before scaling hiring activity.">
          <div className="space-y-4 text-sm text-slate-600">
            {[
              `Profile owner: ${user.fullName}`,
              `Company registered: ${user.companyName || "Pending"}`,
              `Verification status: ${user.verificationStatus || "Pending"}`,
              "Post at least one role from the Jobs page",
            ].map((item) => <div key={item} className="rounded-2xl border border-[var(--outline-variant)] px-4 py-3">{item}</div>)}
          </div>
          <div className="mt-6 flex gap-3">
            <Link href="/recruiter/settings" className="rounded-full signature-gradient px-5 py-3 text-sm font-semibold text-white">Edit settings</Link>
            <Link href="/recruiter/jobs" className="rounded-full border border-[var(--outline-variant)] px-5 py-3 text-sm font-semibold text-[var(--primary)]">Post a job</Link>
          </div>
        </Panel>
      )}
    </PortalLayout>
  );
}
