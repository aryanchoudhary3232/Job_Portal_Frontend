"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";
import { RECRUITER_STAGE_ACTIONS, stageLabel } from "@/lib/application-stages";
import { InlineError } from "@/components/ui/InlineError";
import { getErrorMessage } from "@/lib/api-error";

export default function RecruiterApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () =>
    api.get<Application[]>("/api/applications/recruiter/me").then(setRows).catch((response) => setError(response instanceof Error ? response.message : "Failed")).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  return (
    <PortalLayout role="RECRUITER" title="Application pipeline">
      <div className="space-y-6">
        <Panel title="Hiring workflow" subtitle="Shortlist candidates, manage interviews and offers offline, then mark as Selected or Rejected.">
          <p className="text-sm text-slate-600">
            New applicants start in the <strong>Applied</strong> stage. After shortlisting, schedule interviews on your side—the portal tracks status only.
          </p>
        </Panel>
        <InlineError message={actionError} />
        <PageState loading={loading} error={error} />
        {!loading && !error ? rows.map((row) => {
          const resumeUrl = row.resumeData && row.resumeMimeType ? `data:${row.resumeMimeType};base64,${row.resumeData}` : "";
          return (
            <Panel key={row.id} title={row.student?.fullName || "Candidate"} subtitle={`${row.job?.title || "Role"} • ${stageLabel(row.stage)}`}>
              <div className="flex flex-col gap-4">
                <p className="max-w-2xl text-sm leading-7 text-slate-600">{row.note}</p>
                <div className="grid gap-3 text-xs text-slate-600 md:grid-cols-2">
                  <p><span className="font-semibold text-slate-900">Phone:</span> {row.details?.phone || "-"}</p>
                  <p><span className="font-semibold text-slate-900">College:</span> {row.details?.college || "-"}</p>
                  <p><span className="font-semibold text-slate-900">Degree:</span> {row.details?.degree || "-"}</p>
                  <p><span className="font-semibold text-slate-900">Grad year:</span> {row.details?.graduationYear || "-"}</p>
                  <p><span className="font-semibold text-slate-900">Experience:</span> {row.details?.experience || "-"}</p>
                  <p><span className="font-semibold text-slate-900">Expected salary:</span> {row.details?.expectedSalary || "-"}</p>
                  <p><span className="font-semibold text-slate-900">Availability:</span> {row.details?.availability || "-"}</p>
                  <p><span className="font-semibold text-slate-900">Portfolio:</span> {row.details?.portfolioUrl ? <a className="text-[var(--primary)] underline" href={row.details?.portfolioUrl} target="_blank" rel="noreferrer">View</a> : "-"}</p>
                  <p><span className="font-semibold text-slate-900">LinkedIn:</span> {row.details?.linkedinUrl ? <a className="text-[var(--primary)] underline" href={row.details?.linkedinUrl} target="_blank" rel="noreferrer">View</a> : "-"}</p>
                </div>
                {resumeUrl ? (
                  <a
                    href={resumeUrl}
                    download={row.resumeFileName || "resume"}
                    className="w-fit rounded-full border border-[var(--outline-variant)] px-4 py-2 text-xs font-semibold text-[var(--primary)]"
                  >
                    Download resume
                  </a>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  {RECRUITER_STAGE_ACTIONS.map(({ stage, label }) => (
                    <button
                      key={stage}
                      onClick={async () => {
                        setActionError("");
                        try {
                          await api.patch(`/api/applications/${row.id}/stage`, { stage });
                          await load();
                        } catch (err) {
                          setActionError(getErrorMessage(err, "Could not update status"));
                        }
                      }}
                      className={`rounded-full px-3 py-2 text-xs font-semibold ${row.stage === stage ? "signature-gradient text-white" : "border border-[var(--outline-variant)] text-[var(--primary)]"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </Panel>
          );
        }) : null}
      </div>
    </PortalLayout>
  );
}
