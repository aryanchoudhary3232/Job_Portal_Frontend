"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Application, Job } from "@/lib/types";
import { stageLabel } from "@/lib/application-stages";
import { getErrorMessage } from "@/lib/api-error";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import { PageState } from "@/components/dashboard/PageState";

export default function StudentJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");
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
        setJobs(jobList);
        setMyApplications(applicationList);
      })
      .catch((response) => setError(response instanceof Error ? response.message : "Failed"))
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
      setResume({ fileName: file.name, mimeType: match[1], data: match[2] });
    };
    reader.readAsDataURL(file);
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
          college: form.college,
          degree: form.degree,
          graduationYear: form.graduationYear,
          experience: form.experience,
          portfolioUrl: form.portfolioUrl,
          linkedinUrl: form.linkedinUrl,
          expectedSalary: form.expectedSalary,
          availability: form.availability,
        },
      });
      setMyApplications((current) => [...current.filter((item) => item.jobId !== jobId), created]);
      setApplySuccess("Application submitted successfully.");
      setApplyJobId("");
      setResume(null);
      setForm({
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
    } catch (response) {
      setApplyError(getErrorMessage(response, "Application failed"));
    } finally {
      setActiveJob("");
    }
  };

  return (
    <PortalLayout role="STUDENT" title="Browse jobs">
      <div className="space-y-6">
        <PageState loading={loading} error={error} />
        {!loading && !error ? (
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
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                      Applied • {stageLabel(existing.stage)}
                    </span>
                  ) : (
                    <button onClick={() => openApply(job.id)} className="rounded-full signature-gradient px-4 py-2 text-sm font-semibold text-white">
                      Apply now
                    </button>
                  )}
                </div>

                {!existing && applyJobId === job.id ? (
                  <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Application details</p>
                    <textarea
                      value={form.note}
                      onChange={(e) => setForm((current) => ({ ...current, note: e.target.value }))}
                      rows={3}
                      placeholder="Short note to recruiter"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value.replace(/\D/g, "") }))}
                        placeholder="Phone number"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.college}
                        onChange={(e) => setForm((current) => ({ ...current, college: e.target.value }))}
                        placeholder="College"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.degree}
                        onChange={(e) => setForm((current) => ({ ...current, degree: e.target.value }))}
                        placeholder="Degree"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.graduationYear}
                        onChange={(e) => setForm((current) => ({ ...current, graduationYear: e.target.value }))}
                        placeholder="Graduation year"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.experience}
                        onChange={(e) => setForm((current) => ({ ...current, experience: e.target.value }))}
                        placeholder="Experience summary"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.expectedSalary}
                        onChange={(e) => setForm((current) => ({ ...current, expectedSalary: e.target.value }))}
                        placeholder="Expected salary"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.availability}
                        onChange={(e) => setForm((current) => ({ ...current, availability: e.target.value }))}
                        placeholder="Availability"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.portfolioUrl}
                        onChange={(e) => setForm((current) => ({ ...current, portfolioUrl: e.target.value }))}
                        placeholder="Portfolio URL"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                      <input
                        value={form.linkedinUrl}
                        onChange={(e) => setForm((current) => ({ ...current, linkedinUrl: e.target.value }))}
                        placeholder="LinkedIn URL"
                        className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-slate-500">Upload resume (PDF/DOCX)</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleResumeChange(e.target.files?.[0])}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
                      />
                      {resume ? (
                        <p className="text-xs font-semibold text-slate-600">Uploaded: {resume.fileName}</p>
                      ) : null}
                    </div>
                    {applyError ? <p className="text-xs font-semibold text-red-600">{applyError}</p> : null}
                    {applySuccess ? <p className="text-xs font-semibold text-green-600">{applySuccess}</p> : null}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => apply(job.id)}
                        className="rounded-full signature-gradient px-5 py-2 text-sm font-semibold text-white"
                        disabled={activeJob === job.id}
                      >
                        {activeJob === job.id ? "Submitting..." : "Submit application"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setApplyJobId("")}
                        className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700"
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
        ) : null}
      </div>
    </PortalLayout>
  );
}
