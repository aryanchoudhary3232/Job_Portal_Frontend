"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Application } from "@/lib/types";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { PageState } from "@/components/dashboard/PageState";
import { Panel } from "@/components/dashboard/Panel";
import { RECRUITER_STAGE_ACTIONS, stageLabel } from "@/lib/application-stages";
import { InlineError } from "@/components/ui/InlineError";
import { getErrorMessage } from "@/lib/api-error";
import { FileText, Sparkles } from "lucide-react";

export default function RecruiterApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [actionError, setActionError] = useState("");
  const [loading, setLoading] = useState(true);

  // Resume views counter state for Basic Plan
  const [planName, setPlanName] = useState("");
  const [viewsCount, setViewsCount] = useState(0);

  const load = () =>
    api.get<Application[]>("/api/applications/recruiter/me")
      .then((data) => setRows(Array.isArray(data) ? data : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    if (typeof window !== "undefined") {
      const active = localStorage.getItem("recruiter_active_plan") || "Recruiter Basic";
      const views = parseInt(localStorage.getItem("recruiter_resume_views_count") || "0", 10);
      setPlanName(active);
      setViewsCount(views);
    }
  }, []);

  const handleDownloadResume = (row: Application) => {
    setActionError("");
    if (planName === "Recruiter Basic" && viewsCount >= 100) {
      setActionError("⚠️ Basic Plan 100 Resume Views Limit Reached! Upgrade to Recruiter Pro for Unlimited Resume Views.");
      return;
    }
    // Increment view count
    const nextViews = viewsCount + 1;
    setViewsCount(nextViews);
    localStorage.setItem("recruiter_resume_views_count", String(nextViews));

    // Trigger download
    const resumeUrl = `data:${row.resumeMimeType};base64,${row.resumeData}`;
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = row.resumeFileName || "resume.pdf";
    a.click();
  };

  return (
    <PortalLayout role="RECRUITER" title="Application pipeline">
      <div className="space-y-6">
        <Panel title="Hiring workflow" subtitle="Shortlist candidates, manage interviews and offers, then mark as Selected or Rejected.">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              New applicants start in the <strong>Applied</strong> stage. After shortlisting, schedule interviews on your side.
            </p>
            {planName === "Recruiter Basic" && (
              <div className="flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-1.5 border border-purple-200 text-xs font-bold text-purple-900 shrink-0">
                <FileText className="h-4 w-4 text-purple-600" /> Resume Views: {viewsCount}/100 Used
                <Link href="/recruiter/pricing" className="text-[10px] uppercase font-black tracking-wider text-purple-700 hover:underline">
                  Upgrade
                </Link>
              </div>
            )}
          </div>
        </Panel>
        <InlineError message={actionError} />
        <PageState loading={loading} error="" />
        {!loading ? (
          rows.length === 0 ? (
            <Panel title="Candidate Applications" subtitle="Real-time pipeline">
              <p className="text-sm font-semibold text-slate-500 py-8 text-center">
                No candidate applications received yet. Once candidates apply to your jobs, they will appear here!
              </p>
            </Panel>
          ) : (
            rows.map((row) => {
              const hasResume = row.resumeData && row.resumeMimeType;
              return (
                <Panel key={row.id} title={row.student?.fullName || row.applicantName || "Candidate"} subtitle={`${row.job?.title || row.jobTitle || "Role"} • ${stageLabel(row.stage)}`}>
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
                      <p><span className="font-semibold text-slate-900">Portfolio:</span> {row.details?.portfolioUrl ? <a className="text-purple-600 underline" href={row.details?.portfolioUrl} target="_blank" rel="noreferrer">View</a> : "-"}</p>
                      <p><span className="font-semibold text-slate-900">LinkedIn:</span> {row.details?.linkedinUrl ? <a className="text-purple-600 underline" href={row.details?.linkedinUrl} target="_blank" rel="noreferrer">View</a> : "-"}</p>
                    </div>
                    {hasResume ? (
                      <button
                        onClick={() => handleDownloadResume(row)}
                        className="w-fit rounded-full border border-purple-200 px-4 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 transition"
                      >
                        Download resume ({planName === "Recruiter Basic" ? `${100 - viewsCount} views left` : "Unlimited"})
                      </button>
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
                          className={`rounded-full px-3 py-2 text-xs font-semibold ${row.stage === stage ? "signature-gradient text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Panel>
              );
            })
          )
        ) : null}
      </div>
    </PortalLayout>
  );
}
