"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Application } from "@/lib/types";
import { stageLabel } from "@/lib/application-stages";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { PageState } from "@/components/dashboard/PageState";
import { Video, FileCheck, CheckCircle2, Calendar, ExternalLink, Sparkles, Award, XCircle } from "lucide-react";

export default function StudentApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Application[]>("/api/applications/student/me")
      .then((data) => setRows(Array.isArray(data) ? data : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const pipelineStages = [
    { key: "APPLIED", label: "Applied" },
    { key: "SHORTLISTED", label: "Shortlisted" },
    { key: "INTERVIEW", label: "Interview Scheduled" },
    { key: "OFFER", label: "Selected & Offer Received 🎉" },
  ];

  const getStageIndex = (stage: string) => {
    switch (stage) {
      case "APPLIED": return 0;
      case "SHORTLISTED": return 1;
      case "INTERVIEW": return 2;
      case "OFFER": return 3;
      case "HIRED": return 3;
      default: return 0;
    }
  };

  return (
    <PortalLayout role="STUDENT" title="Application tracker">
      <div className="space-y-6">
        <PageState loading={loading} error="" />
        {!loading ? (
          rows.length === 0 ? (
            <Panel title="Recent Applications" subtitle="Track your hiring journey in real-time.">
              <p className="text-sm font-semibold text-slate-500 py-10 text-center">
                No applications submitted yet. Browse open jobs and apply to start tracking your interviews & offer letters!
              </p>
            </Panel>
          ) : (
            <div className="space-y-6">
              {rows.map((app) => {
                const activeIndex = getStageIndex(app.stage);
                const isRejected = app.stage === "REJECTED";
                const isInterview = app.stage === "INTERVIEW";
                const isOffer = app.stage === "OFFER" || app.stage === "HIRED";
                const details = typeof app.details === "string" ? JSON.parse(app.details) : (app.details || {});
                const hasInterview = Boolean(details.meetingLink || details.interviewDate);

                return (
                  <Panel
                    key={app.id}
                    title={app.job?.title || app.jobTitle || "Role"}
                    subtitle={`${app.job?.companyName || app.companyName || "Company"} • Applied on ${formatDate(app.createdAt || app.appliedAt)}`}
                  >
                    <div className="space-y-6">
                      {/* Interactive Stage Progress Bar */}
                      {!isRejected ? (
                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
                            {pipelineStages.map((stg, idx) => {
                              const isPassed = idx <= activeIndex;
                              const isCurrent = idx === activeIndex;
                              return (
                                <div key={stg.key} className="flex flex-1 flex-col items-center text-center min-w-[90px]">
                                  <div className="flex items-center w-full">
                                    {idx > 0 && (
                                      <div className={`h-1 flex-1 ${idx <= activeIndex ? "bg-purple-600" : "bg-slate-200"}`} />
                                    )}
                                    <div
                                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                        isCurrent
                                          ? "bg-purple-600 text-white ring-4 ring-purple-100 scale-110 shadow-md"
                                          : isPassed
                                          ? "bg-purple-600 text-white"
                                          : "bg-slate-200 text-slate-500"
                                      }`}
                                    >
                                      {isPassed ? "✓" : idx + 1}
                                    </div>
                                    {idx < pipelineStages.length - 1 && (
                                      <div className={`h-1 flex-1 ${idx < activeIndex ? "bg-purple-600" : "bg-slate-200"}`} />
                                    )}
                                  </div>
                                  <span className={`mt-2 text-[11px] font-bold ${isCurrent ? "text-purple-700" : "text-slate-500"}`}>
                                    {stg.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-3xl border-2 border-red-200 bg-red-50 p-5 space-y-2 text-xs text-red-900 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <p className="font-extrabold text-red-700 flex items-center gap-2 text-sm">
                              <XCircle className="h-5 w-5 text-red-600" /> Application Status: Rejected
                            </p>
                            <span className="rounded-full bg-red-200 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-red-900">
                              Closed by Recruiter
                            </span>
                          </div>
                          <p className="text-red-700 leading-relaxed font-medium">
                            Thank you for your interest in this role. The employer has decided not to move forward with your application at this time. Keep building your skills and apply to other open positions on HireVerse!
                          </p>
                        </div>
                      )}

                      {/* 📹 LIVE ZOOM INTERVIEW CARD */}
                      {(isInterview || hasInterview) && (() => {
                        const statusInfo = (() => {
                          if (!details.interviewDate) return { isLive: false, label: "SCHEDULED VIDEO INTERVIEW", dot: "bg-purple-400" };
                          const interviewTime = new Date(details.interviewDate).getTime();
                          const now = Date.now();
                          const diffMinutes = (interviewTime - now) / (1000 * 60);

                          if (diffMinutes <= 15 && diffMinutes >= -90) {
                            return { isLive: true, label: "LIVE INTERVIEW NOW — JOIN CALL", dot: "bg-red-500 animate-ping" };
                          }
                          if (diffMinutes > 15) {
                            return { isLive: false, label: "SCHEDULED VIDEO INTERVIEW", dot: "bg-purple-300" };
                          }
                          return { isLive: false, label: "INTERVIEW CONCLUDED", dot: "bg-emerald-400" };
                        })();

                        return (
                          <div className={`rounded-3xl border-2 p-6 text-white shadow-xl space-y-4 animate-in fade-in duration-300 ${
                            statusInfo.isLive
                              ? "border-red-400 bg-gradient-to-br from-red-950 via-purple-900 to-indigo-950 ring-4 ring-red-500/20"
                              : "border-purple-300 bg-gradient-to-br from-purple-950 to-indigo-900"
                          }`}>
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${statusInfo.dot}`} />
                                <span className={`text-xs font-black uppercase tracking-widest ${statusInfo.isLive ? "text-red-300" : "text-purple-200"}`}>
                                  {statusInfo.label}
                                </span>
                              </div>
                              <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-100 backdrop-blur-sm">
                                Resend Invite Delivered
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xl font-black tracking-tight text-white font-display">
                                {app.job?.title || "Role"} Technical Round
                              </h3>
                              <p className="text-xs text-purple-200 mt-0.5">Interviewer: {app.job?.companyName || "Recruiter Team"}</p>
                            </div>

                            <div className="grid gap-3 rounded-2xl bg-white/10 p-4 text-xs backdrop-blur-md border border-white/10 md:grid-cols-2">
                              <div>
                                <span className="text-purple-300 font-bold block">📅 Scheduled Date & Time:</span>
                                <span className="text-white font-extrabold text-sm">
                                  {details.interviewDate ? new Date(details.interviewDate).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }) : "Scheduled"}
                                </span>
                              </div>
                              <div>
                                <span className="text-purple-300 font-bold block">📝 Preparation Notes:</span>
                                <span className="text-white font-medium">{details.interviewNotes || "Technical Assessment"}</span>
                              </div>
                            </div>

                            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
                              <p className="text-xs text-purple-200">
                                {statusInfo.isLive ? "🔴 Interview is live! Join the meeting now." : "Please test your mic & camera before joining the call."}
                              </p>
                              <a
                                href={details.meetingLink || "https://zoom.us"}
                                target="_blank"
                                rel="noreferrer"
                                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-wider shadow-xl transition hover:scale-105 ${
                                  statusInfo.isLive
                                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                                    : "bg-white hover:bg-purple-100 text-purple-900"
                                }`}
                              >
                                <Video className="h-4 w-4" /> {statusInfo.isLive ? "🔴 JOIN LIVE ZOOM CALL NOW" : "Join Zoom Call"} <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>
                        );
                      })()}

                      {/* 📜 OFFICIAL OFFER LETTER CARD */}
                      {isOffer && details.offerCtc && (
                        <div className="rounded-3xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-950 to-teal-900 p-6 text-white shadow-xl space-y-4 animate-in fade-in duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-amber-300 animate-bounce" />
                              <span className="text-xs font-black uppercase tracking-widest text-emerald-200">Official Job Offer Received</span>
                            </div>
                            <span className="rounded-full bg-emerald-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200 border border-emerald-400/40">
                              Email Offer Sent
                            </span>
                          </div>

                          <div>
                            <h3 className="text-2xl font-black tracking-tight text-white font-display">
                              Job Offer: {app.job?.title || "Role"}
                            </h3>
                            <p className="text-xs text-emerald-200 mt-0.5">Company: {app.job?.companyName || "Employer"}</p>
                          </div>

                          <div className="grid gap-3 rounded-2xl bg-white/10 p-4 text-xs backdrop-blur-md border border-white/10 md:grid-cols-2">
                            <div>
                              <span className="text-emerald-300 font-bold block">💰 Offered CTC / Salary:</span>
                              <span className="text-emerald-100 font-extrabold text-base">{details.offerCtc}</span>
                            </div>
                            <div>
                              <span className="text-emerald-300 font-bold block">📅 Joining Date:</span>
                              <span className="text-white font-extrabold text-sm">{details.joiningDate}</span>
                            </div>
                            <div className="md:col-span-2">
                              <span className="text-emerald-300 font-bold block">📜 Offer Terms & Benefits:</span>
                              <span className="text-emerald-100 font-medium">{details.offerNotes}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-emerald-200 font-semibold">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Offer Letter delivered to your registered email address via Resend.
                          </div>
                        </div>
                      )}
                    </div>
                  </Panel>
                );
              })}
            </div>
          )
        ) : null}
      </div>
    </PortalLayout>
  );
}
