"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application, Job } from "@/lib/types";
import { stageLabel } from "@/lib/application-stages";
import { getErrorMessage } from "@/lib/api-error";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { PageState } from "@/components/dashboard/PageState";
import { FileText, CheckCircle2 } from "lucide-react";

export default function StudentJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState<string>("");
  const [applyJobId, setApplyJobId] = useState<string>("");
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");
  const [resume, setResume] = useState<{ fileName: string; mimeType: string; data: string } | null>(null);
  const [form, setForm] = useState({
    note: "",
    phone: "",
    college: "",
    degree: "",
    graduationYear: "",
    experience: "",
    portfolioUrl: "",
    linkedinUrl: "",
    expectedSalary: "",
    availability: "",
  });

  useEffect(() => {
    Promise.all([
      api.get<Job[]>("/api/jobs"),
      api.get<Application[]>("/api/applications/student/me"),
    ])
      .then(([jobList, applicationList]) => {
        setJobs(Array.isArray(jobList) ? jobList : []);
        setMyApplications(Array.isArray(applicationList) ? applicationList : []);
      })
      .catch(() => {
        setJobs([]);
        setMyApplications([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const applicationByJobId = Object.fromEntries(myApplications.map((item) => [item.jobId, item]));

  const openApply = (jobId: string) => {
    setApplyJobId(jobId);
    setApplyError("");
    setApplySuccess("");
  };

  const handleResumeChange = (file?: File | null) => {
    if (!file) {
      setResume(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const match = result.match(/^data:(.*?);base64,(.*)$/);
      if (!match) {
        setApplyError("Unable to read resume file. Please upload a PDF or DOCX.");
        setResume(null);
        return;
      }
      setResume({ fileName: file.name, mimeType: match[1] || "application/pdf", data: match[2] });
    };
    reader.readAsDataURL(file);
  };

  const sanitizeUrl = (val?: string) => {
    if (!val || typeof val !== "string" || !val.trim()) return "";
    const trimmed = val.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
    if (trimmed.includes(".")) return `https://${trimmed}`;
    return trimmed;
  };

  const apply = async (jobId: string) => {
    setActiveJob(jobId);
    setApplyError("");
    setApplySuccess("");
    if (!resume?.data) {
      setApplyError("Please upload your resume before applying.");
      setActiveJob("");
      return;
    }
    if (!form.note || form.note.trim().length < 10) {
      setApplyError("Please add a short note (min 10 characters).");
      setActiveJob("");
      return;
    }
    if (!form.phone || form.phone.trim().length < 10) {
      setApplyError("Please add a valid phone number.");
      setActiveJob("");
      return;
    }
    try {
      const created = await api.post<Application>("/api/applications", {
        jobId,
        note: form.note,
        resume: resume,
        details: {
          phone: form.phone,
          college: form.college || "",
          degree: form.degree || "",
          graduationYear: form.graduationYear || "",
          experience: form.experience || "",
          portfolioUrl: sanitizeUrl(form.portfolioUrl),
          linkedinUrl: sanitizeUrl(form.linkedinUrl),
          expectedSalary: form.expectedSalary || "",
          availability: form.availability || "",
        },
      });
      setMyApplications((current) => [...current.filter((item) => item.jobId !== jobId), created]);
      setApplySuccess("Application submitted successfully.");
      setApplyJobId("");
      setResume(null);
    } catch (response) {
      setApplyError(getErrorMessage(response, "Application submission failed"));
    } finally {
      setActiveJob("");
    }
  };

  return (
    <PortalLayout role="STUDENT" title="Browse jobs">
      <div className="space-y-6">
        <PageState loading={loading} error="" />
        {!loading ? (
          <div>
            {jobs.length === 0 ? (
              <Panel title="Browse jobs" subtitle="Available student roles.">
                <p className="text-sm font-semibold text-slate-500 py-8 text-center">
                  No active job postings found. Check back once recruiters post new job openings!
                </p>
              </Panel>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {jobs.map((job) => {
                  const existing = applicationByJobId[job.id];
                  return (
                    <Panel key={job.id} title={job.title} subtitle={`${job.companyName} • ${job.location} • ${job.workMode}`}>
                      <p className="text-sm leading-7 text-slate-600">{job.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{skill}</span>)}</div>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-950">{job.salaryRange}</p>
                        {existing ? (
                          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-green-600" /> Applied • {stageLabel(existing.stage)}
                          </span>
                        ) : (
                          <button onClick={() => openApply(job.id)} className="rounded-full signature-gradient px-5 py-2 text-sm font-bold text-white shadow-md">
                            Apply Now
                          </button>
                        )}
                      </div>

                      {!existing && applyJobId === job.id ? (
                        <div className="mt-6 space-y-4 rounded-3xl border border-purple-100 bg-purple-50/30 p-5 animate-in fade-in duration-200">
                          <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-700">Application Form</p>
                          
                          <div className="space-y-1">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                              Cover Note <span className="text-red-500 font-bold ml-0.5">*</span>
                            </label>
                            <textarea
                              value={form.note}
                              onChange={(e) => setForm((current) => ({ ...current, note: e.target.value }))}
                              rows={3}
                              placeholder="Cover note to recruiter (min 10 characters)"
                              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:border-purple-600"
                            />
                          </div>

                          <div className="grid gap-3 md:grid-cols-2 text-xs">
                            <div className="space-y-1">
                              <label className="block font-bold uppercase tracking-wider text-slate-500">
                                Phone Number <span className="text-red-500 font-bold ml-0.5">*</span>
                              </label>
                              <input
                                value={form.phone}
                                onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value.replace(/\D/g, "") }))}
                                placeholder="10-digit Phone Number"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-800 outline-none focus:border-purple-600"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-bold uppercase tracking-wider text-slate-500">College / University</label>
                              <input
                                value={form.college}
                                onChange={(e) => setForm((current) => ({ ...current, college: e.target.value }))}
                                placeholder="College / University"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-800 outline-none focus:border-purple-600"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-bold uppercase tracking-wider text-slate-500">Degree / Branch</label>
                              <input
                                value={form.degree}
                                onChange={(e) => setForm((current) => ({ ...current, degree: e.target.value }))}
                                placeholder="Degree / Branch"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-800 outline-none focus:border-purple-600"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-bold uppercase tracking-wider text-slate-500">Graduation Year</label>
                              <input
                                value={form.graduationYear}
                                onChange={(e) => setForm((current) => ({ ...current, graduationYear: e.target.value }))}
                                placeholder="Graduation Year (e.g. 2026)"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-800 outline-none focus:border-purple-600"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-bold uppercase tracking-wider text-slate-500">Portfolio URL (Optional)</label>
                              <input
                                value={form.portfolioUrl}
                                onChange={(e) => setForm((current) => ({ ...current, portfolioUrl: e.target.value }))}
                                placeholder="https://yourportfolio.com"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-800 outline-none focus:border-purple-600"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block font-bold uppercase tracking-wider text-slate-500">LinkedIn URL (Optional)</label>
                              <input
                                value={form.linkedinUrl}
                                onChange={(e) => setForm((current) => ({ ...current, linkedinUrl: e.target.value }))}
                                placeholder="https://linkedin.com/in/username"
                                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-800 outline-none focus:border-purple-600"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 rounded-2xl bg-white p-3.5 border border-purple-100">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                              <FileText className="h-4 w-4 text-purple-600" /> Upload Resume (PDF / DOCX) <span className="text-red-500 font-bold ml-0.5">*</span>
                            </label>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => handleResumeChange(e.target.files?.[0])}
                              className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                            />
                            {resume ? (
                              <p className="text-xs font-bold text-green-700 flex items-center gap-1 mt-1">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Uploaded: {resume.fileName}
                              </p>
                            ) : null}
                          </div>

                          {applyError ? <p className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">{applyError}</p> : null}
                          {applySuccess ? <p className="text-xs font-bold text-green-600 bg-green-50 p-3 rounded-xl border border-green-200">{applySuccess}</p> : null}

                          <div className="flex flex-wrap gap-3 pt-1">
                            <button
                              onClick={() => apply(job.id)}
                              className="rounded-full signature-gradient px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md disabled:opacity-60"
                              disabled={activeJob === job.id}
                            >
                              {activeJob === job.id ? "Submitting Application..." : "Submit Application"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setApplyJobId("")}
                              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </Panel>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </PortalLayout>
  );
}
