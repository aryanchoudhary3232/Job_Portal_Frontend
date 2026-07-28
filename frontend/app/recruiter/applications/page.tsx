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
import { FileText, ExternalLink, Calendar, Video, FileCheck, CheckCircle, Mail, X } from "lucide-react";

export default function RecruiterApplicationsPage() {
  const [rows, setRows] = useState<Application[]>([]);
  const [actionError, setActionError] = useState("");
  const [loading, setLoading] = useState(true);

  // Resume views counter state for Basic Plan
  const [planName, setPlanName] = useState("");
  const [viewsCount, setViewsCount] = useState(0);

  // Modal states for Interview & Offer
  const [activeModal, setActiveModal] = useState<"INTERVIEW" | "OFFER" | null>(null);
  const [activeApp, setActiveApp] = useState<Application | null>(null);
  const [submittingModal, setSubmittingModal] = useState(false);

  // Interview modal fields
  const [interviewDate, setInterviewDate] = useState("2026-07-29T14:30");
  const [meetingLink, setMeetingLink] = useState("https://zoom.us/j/9876543210?pwd=hireverse_live");
  const [interviewNotes, setInterviewNotes] = useState("Live technical discussion round covering System Design, React & Node.js.");

  // Offer modal fields
  const [offerCtc, setOfferCtc] = useState("₹12,00,000 / annum");
  const [joiningDate, setJoiningDate] = useState("2026-08-15");
  const [offerNotes, setOfferNotes] = useState("Full-time engineering position with complete medical insurance and equity performance bonuses.");

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

  const safeUrl = (url?: string) => {
    if (!url || typeof url !== "string" || !url.trim() || url.toLowerCase().includes("invalid url")) return null;
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    if (trimmed.includes(".")) return `https://${trimmed}`;
    return null;
  };

  const handleDownloadResume = (row: Application) => {
    setActionError("");
    if (planName === "Recruiter Basic" && viewsCount >= 100) {
      setActionError("⚠️ Basic Plan 100 Resume Views Limit Reached! Upgrade to Recruiter Pro for Unlimited Resume Views.");
      return;
    }
    const nextViews = viewsCount + 1;
    setViewsCount(nextViews);
    localStorage.setItem("recruiter_resume_views_count", String(nextViews));

    const resumeUrl = `data:${row.resumeMimeType};base64,${row.resumeData}`;
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = row.resumeFileName || "resume.pdf";
    a.click();
  };

  const handleStageClick = async (row: Application, targetStage: string) => {
    setActionError("");
    if (targetStage === "INTERVIEW") {
      setActiveApp(row);
      setActiveModal("INTERVIEW");
      return;
    }
    if (targetStage === "OFFER") {
      setActiveApp(row);
      setActiveModal("OFFER");
      return;
    }

    try {
      await api.patch(`/api/applications/${row.id}/stage`, { stage: targetStage });
      await load();
    } catch (err) {
      setActionError(getErrorMessage(err, "Could not update status"));
    }
  };

  const submitInterviewModal = async () => {
    if (!activeApp) return;
    setSubmittingModal(true);
    setActionError("");
    try {
      await api.patch(`/api/applications/${activeApp.id}/stage`, {
        stage: "INTERVIEW",
        details: {
          interviewDate,
          meetingLink,
          interviewNotes,
        },
      });
      setActiveModal(null);
      setActiveApp(null);
      await load();
    } catch (err) {
      setActionError(getErrorMessage(err, "Could not schedule interview"));
    } finally {
      setSubmittingModal(false);
    }
  };

  const submitOfferModal = async () => {
    if (!activeApp) return;
    setSubmittingModal(true);
    setActionError("");
    try {
      await api.patch(`/api/applications/${activeApp.id}/stage`, {
        stage: "OFFER",
        details: {
          offerCtc,
          joiningDate,
          offerNotes,
        },
      });
      setActiveModal(null);
      setActiveApp(null);
      await load();
    } catch (err) {
      setActionError(getErrorMessage(err, "Could not issue offer letter"));
    } finally {
      setSubmittingModal(false);
    }
  };

  return (
    <PortalLayout role="RECRUITER" title="Application pipeline">
      <div className="space-y-6">
        <Panel title="Hiring workflow" subtitle="Shortlist candidates, schedule live Zoom interviews, issue offer letters, then finalize selections.">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Applicants progress from <strong>Applied</strong> ➔ <strong>Shortlisted</strong> ➔ <strong>Interview</strong> (with Zoom link) ➔ <strong>Offer Letter</strong> ➔ <strong>Selected</strong>. All updates trigger real Resend email notifications.
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
              const detailsObj = typeof row.details === "string" ? JSON.parse(row.details) : (row.details || {});
              const portfolio = safeUrl(detailsObj.portfolioUrl);
              const linkedin = safeUrl(detailsObj.linkedinUrl);
              const hasInterviewInfo = Boolean(detailsObj.interviewDate || detailsObj.meetingLink);
              const hasOfferInfo = Boolean(detailsObj.offerCtc);

              return (
                <Panel key={row.id} title={row.student?.fullName || row.applicantName || "Candidate"} subtitle={`${row.job?.title || row.jobTitle || "Role"} • ${stageLabel(row.stage)}`}>
                  <div className="flex flex-col gap-4">
                    <p className="max-w-2xl text-sm leading-7 text-slate-600">{row.note}</p>
                    
                    <div className="grid gap-3 text-xs text-slate-600 md:grid-cols-2">
                      <p><span className="font-semibold text-slate-900">Email:</span> {row.student?.email || "-"}</p>
                      <p><span className="font-semibold text-slate-900">Phone:</span> {detailsObj.phone || "-"}</p>
                      <p><span className="font-semibold text-slate-900">College:</span> {detailsObj.college || "-"}</p>
                      <p><span className="font-semibold text-slate-900">Degree:</span> {detailsObj.degree || "-"}</p>
                      <p><span className="font-semibold text-slate-900">Grad year:</span> {detailsObj.graduationYear || "-"}</p>
                      <p><span className="font-semibold text-slate-900">Portfolio:</span> {portfolio ? <a className="inline-flex items-center gap-1 text-purple-700 font-bold underline" href={portfolio} target="_blank" rel="noreferrer">View Portfolio <ExternalLink className="h-3 w-3" /></a> : "-"}</p>
                      <p><span className="font-semibold text-slate-900">LinkedIn:</span> {linkedin ? <a className="inline-flex items-center gap-1 text-purple-700 font-bold underline" href={linkedin} target="_blank" rel="noreferrer">View Profile <ExternalLink className="h-3 w-3" /></a> : "-"}</p>
                    </div>

                    {/* Scheduled Interview Card Preview */}
                    {hasInterviewInfo && (() => {
                      const isLiveNow = (() => {
                        if (!detailsObj.interviewDate) return false;
                        const diffMinutes = (new Date(detailsObj.interviewDate).getTime() - Date.now()) / (1000 * 60);
                        return diffMinutes <= 15 && diffMinutes >= -90;
                      })();

                      return (
                        <div className={`rounded-2xl border p-4 space-y-2 text-xs ${
                          isLiveNow ? "border-red-400 bg-red-50 text-red-950 ring-2 ring-red-300" : "border-purple-300 bg-purple-50"
                        }`}>
                          <div className="flex items-center justify-between">
                            <p className={`font-bold flex items-center gap-1.5 ${isLiveNow ? "text-red-900 font-extrabold" : "text-purple-900"}`}>
                              <Video className={`h-4 w-4 ${isLiveNow ? "text-red-600 animate-bounce" : "text-purple-600"}`} />
                              {isLiveNow ? "🔴 LIVE INTERVIEW NOW — CANDIDATE ON CALL" : "Scheduled Video Call Interview"}
                            </p>
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                              isLiveNow ? "bg-red-600 text-white animate-pulse" : "bg-purple-200 text-purple-900"
                            }`}>
                              {isLiveNow ? "🔴 LIVE NOW" : "Invite Active"}
                            </span>
                          </div>
                          <p><span className="font-bold text-slate-800">📅 Interview Date & Time:</span> <span className="font-black text-purple-900">{detailsObj.interviewDate ? new Date(detailsObj.interviewDate).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" }) : "Scheduled"}</span></p>
                          <p><span className="font-bold text-slate-800">📝 Notes:</span> {detailsObj.interviewNotes || "Technical Assessment"}</p>
                          <p><span className="font-bold text-slate-800">🔗 Meeting URL:</span> <a href={detailsObj.meetingLink || "https://zoom.us"} target="_blank" rel="noreferrer" className="text-purple-700 font-bold underline ml-1">{detailsObj.meetingLink || "https://zoom.us"}</a></p>
                        </div>
                      );
                    })()}

                    {/* Offer details preview */}
                    {hasOfferInfo && (
                      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                            <FileCheck className="h-4 w-4 text-emerald-600" /> Official Offer Letter Extended
                          </p>
                          <span className="rounded-full bg-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-900">Offer Issued</span>
                        </div>
                        <p><span className="font-bold text-slate-800">💰 Offered CTC:</span> <span className="font-black text-emerald-900">{detailsObj.offerCtc}</span></p>
                        <p><span className="font-bold text-slate-800">📅 Joining Date:</span> {detailsObj.joiningDate}</p>
                        <p><span className="font-bold text-slate-800">📜 Offer Terms:</span> {detailsObj.offerNotes}</p>
                      </div>
                    )}

                    {hasResume ? (
                      <button
                        onClick={() => handleDownloadResume(row)}
                        className="w-fit rounded-full border border-purple-200 px-4 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50 transition"
                      >
                        Download resume ({planName === "Recruiter Basic" ? `${100 - viewsCount} views left` : "Unlimited"})
                      </button>
                    ) : null}

                    {/* Pipeline Stage Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      {row.stage === "OFFER" || row.stage === "HIRED" ? (
                        <span className="rounded-full bg-emerald-100 border border-emerald-300 px-4 py-2 text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4 text-emerald-600" /> Candidate Selected & Offer Letter Issued 🎉
                        </span>
                      ) : (
                        <>
                          {RECRUITER_STAGE_ACTIONS.map(({ stage, label }) => (
                            <button
                              key={stage}
                              onClick={() => handleStageClick(row, stage)}
                              className={`rounded-full px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                                row.stage === stage
                                  ? "signature-gradient text-white shadow-md"
                                  : "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-purple-300"
                              }`}
                            >
                              {stage === "INTERVIEW" && <Video className="h-3.5 w-3.5" />}
                              {stage === "OFFER" && <FileCheck className="h-3.5 w-3.5" />}
                              {label}
                            </button>
                          ))}
                          <button
                            onClick={() => handleStageClick(row, "REJECTED")}
                            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                              row.stage === "REJECTED"
                                ? "bg-red-600 text-white"
                                : "border border-red-200 text-red-600 hover:bg-red-50"
                            }`}
                          >
                            Reject Candidate
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Panel>
              );
            })
          )
        ) : null}

        {/* ════════════ INTERVIEW SCHEDULE MODAL ════════════ */}
        {activeModal === "INTERVIEW" && activeApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-purple-100 space-y-4 relative animate-in zoom-in-95 duration-200">
              <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Schedule Live Zoom Interview</h3>
                  <p className="text-xs text-slate-500">Candidate: {activeApp.student?.fullName || "Applicant"}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <label className="block">
                  <span className="font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Interview Date & Time <span className="text-red-500 font-bold">*</span>
                  </span>
                  <input
                    type="datetime-local"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-800 outline-none focus:border-purple-600"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Zoom / Google Meet URL <span className="text-red-500 font-bold">*</span>
                  </span>
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://zoom.us/j/1234567890"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-800 outline-none focus:border-purple-600"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Interviewer Notes & Agenda <span className="text-red-500 font-bold">*</span>
                  </span>
                  <textarea
                    rows={3}
                    value={interviewNotes}
                    onChange={(e) => setInterviewNotes(e.target.value)}
                    placeholder="Topics to prepare, interviewer details, technical assessment notes"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:border-purple-600"
                    required
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button onClick={() => setActiveModal(null)} className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  onClick={submitInterviewModal}
                  disabled={submittingModal}
                  className="signature-gradient rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-lg"
                >
                  {submittingModal ? "Scheduling..." : "📹 Confirm & Send Resend Invite Email"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ OFFER LETTER MODAL ════════════ */}
        {activeModal === "OFFER" && activeApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-emerald-100 space-y-4 relative animate-in zoom-in-95 duration-200">
              <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Issue Official Offer Letter</h3>
                  <p className="text-xs text-slate-500">Candidate: {activeApp.student?.fullName || "Applicant"}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <label className="block">
                  <span className="font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Offered CTC / Compensation <span className="text-red-500 font-bold">*</span>
                  </span>
                  <input
                    type="text"
                    value={offerCtc}
                    onChange={(e) => setOfferCtc(e.target.value)}
                    placeholder="e.g. ₹12,00,000 / annum"
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-800 outline-none focus:border-emerald-600"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Expected Joining Date <span className="text-red-500 font-bold">*</span>
                  </span>
                  <input
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 font-semibold text-slate-800 outline-none focus:border-emerald-600"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                    Offer Terms & Benefits Note <span className="text-red-500 font-bold">*</span>
                  </span>
                  <textarea
                    rows={3}
                    value={offerNotes}
                    onChange={(e) => setOfferNotes(e.target.value)}
                    placeholder="Health insurance, work equipment, probation period & onboarding details"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-800 outline-none focus:border-emerald-600"
                    required
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button onClick={() => setActiveModal(null)} className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button
                  onClick={submitOfferModal}
                  disabled={submittingModal}
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-lg"
                >
                  {submittingModal ? "Issuing..." : "📜 Issue Offer & Send Email"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
