"use client";

import { useState } from "react";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  generateAIJobDescription,
  screenResumeWithAI,
  rankCandidatesWithAI,
  generateAIInterviewQuestions,
  getAIHiringAnalytics,
  type AIResumeScreeningResult,
  type CandidateRanking,
  type AIInterviewQuestion,
  type AIHiringAnalytics,
} from "@/lib/ai";
import { Sparkles, Award, FileText, HelpCircle, BarChart2, CheckCircle2, AlertCircle, Copy, Check, Upload, FileCheck, X } from "lucide-react";

export default function RecruiterAISuitePage() {
  const [activeTab, setActiveTab] = useState<"screening" | "ranking" | "jd" | "questions" | "analytics">("screening");

  // 1. Resume Screening State (PDF Upload)
  const [screeningPdfFile, setScreeningPdfFile] = useState<{ name: string; size: number; text: string } | null>(null);
  const [screeningJd, setScreeningJd] = useState("Full Stack Next.js & Node.js Engineer (2-4 years experience)");
  const [screeningLoading, setScreeningLoading] = useState(false);
  const [screeningResult, setScreeningResult] = useState<AIResumeScreeningResult | null>(null);

  // 2. Candidate Ranking State
  const [rankingJobTitle, setRankingJobTitle] = useState("Full Stack Developer (Next.js & Node)");
  const [rankingResults, setRankingResults] = useState<CandidateRanking[] | null>(null);

  // 3. JD Generator State
  const [jdTitle, setJdTitle] = useState("Senior Frontend Engineer");
  const [jdDept, setJdDept] = useState("Engineering");
  const [jdExp, setJdExp] = useState("2-4 Years");
  const [jdMode, setJdMode] = useState("Remote");
  const [jdSkills, setJdSkills] = useState("React, Next.js, TypeScript, Tailwind CSS");
  const [jdOutput, setJdOutput] = useState("");
  const [jdLoading, setJdLoading] = useState(false);
  const [copiedJd, setCopiedJd] = useState(false);

  // 4. Interview Question Generator State
  const [qRole, setQRole] = useState("Full Stack Engineer");
  const [qSeniority, setQSeniority] = useState("Mid-Senior Level");
  const [qLoading, setQLoading] = useState(false);
  const [questions, setQuestions] = useState<AIInterviewQuestion[] | null>(null);

  // 5. Analytics State
  const [analytics, setAnalytics] = useState<AIHiringAnalytics | null>(null);

  // Handlers
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || file.name;
      setScreeningPdfFile({
        name: file.name,
        size: file.size,
        text,
      });
      setScreeningResult(null);
    };
    reader.readAsText(file);
  };

  const handleScreening = async () => {
    if (!screeningPdfFile) return;
    setScreeningLoading(true);
    const res = await screenResumeWithAI(screeningPdfFile.text, screeningJd);
    setScreeningResult(res);
    setScreeningLoading(false);
  };

  const handleRanking = async () => {
    const mockCandidates = [
      { id: "c1", name: "Aarav Sharma", skills: ["React", "Next.js", "TypeScript", "Node.js"], experience: "3 yrs" },
      { id: "c2", name: "Priya Verma", skills: ["React", "JavaScript", "CSS"], experience: "2 yrs" },
      { id: "c3", name: "Rohan Gupta", skills: ["Node.js", "PostgreSQL", "Docker", "React"], experience: "4 yrs" },
      { id: "c4", name: "Ananya Patel", skills: ["Python", "Django", "JavaScript"], experience: "1 yr" },
    ];
    const ranked = await rankCandidatesWithAI(rankingJobTitle, mockCandidates);
    setRankingResults(ranked);
  };

  const handleJdGeneration = async () => {
    setJdLoading(true);
    const output = await generateAIJobDescription({
      title: jdTitle,
      department: jdDept,
      experienceLevel: jdExp,
      workMode: jdMode,
      keySkills: jdSkills,
    });
    setJdOutput(output);
    setJdLoading(false);
  };

  const handleQuestionGeneration = async () => {
    setQLoading(true);
    const res = await generateAIInterviewQuestions(qRole, qSeniority);
    setQuestions(res);
    setQLoading(false);
  };

  const handleLoadAnalytics = async () => {
    const res = await getAIHiringAnalytics();
    setAnalytics(res);
  };

  return (
    <PortalLayout role="RECRUITER" title="AI Suite & Automation">
      <div className="space-y-6">
        {/* Banner */}
        <div className="rounded-[28px] signature-gradient p-7 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> HireVerse AI Intelligence
            </span>
            <h2 className="mt-3 text-3xl font-black font-display tracking-tight">Recruiter AI Operating System</h2>
            <p className="mt-2 text-sm font-medium text-white/90 max-w-2xl">
              Automate PDF resume screening, candidate ranking, JD generation, and interview questions with 10x speed.
            </p>
          </div>
        </div>

        {/* AI Navigation Tabs */}
        <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
          {[
            { id: "screening", label: "🤖 AI PDF Resume Screener", icon: FileText },
            { id: "ranking", label: "🎯 AI Candidate Ranking", icon: Award },
            { id: "jd", label: "📝 AI JD Generator", icon: Sparkles },
            { id: "questions", label: "💬 Interview Questions", icon: HelpCircle },
            { id: "analytics", label: "📊 Hiring Analytics", icon: BarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                if (tab.id === "ranking" && !rankingResults) handleRanking();
                if (tab.id === "analytics" && !analytics) handleLoadAnalytics();
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                activeTab === tab.id
                  ? "signature-gradient text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB 1: AI PDF RESUME SCREENING ─── */}
        {activeTab === "screening" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="AI PDF Resume Screener" subtitle="Upload candidate PDF resume & target JD to get instant AI match scoring.">
              <div className="space-y-4">
                <div>
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Upload Candidate Resume (PDF / DOCX) <span className="text-red-500 font-bold">*</span>
                  </span>

                  {!screeningPdfFile ? (
                    <label className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-purple-200 bg-purple-50/40 p-8 text-center cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition group">
                      <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                        <Upload className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-extrabold text-slate-900">Click to upload candidate PDF resume</p>
                      <p className="text-xs font-semibold text-slate-400 mt-1">Supports PDF, DOCX up to 10MB</p>
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="rounded-3xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 space-y-3 relative shadow-md">
                      <button
                        onClick={() => {
                          setScreeningPdfFile(null);
                          setScreeningResult(null);
                        }}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-600 bg-white rounded-full p-1 shadow"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow">
                          <FileCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{screeningPdfFile.name}</p>
                          <p className="text-xs font-semibold text-purple-700">
                            {(screeningPdfFile.size / 1024).toFixed(1)} KB • PDF Ready for AI Screening
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> PDF loaded successfully!
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Target Job Role / Description</label>
                  <textarea
                    rows={4}
                    value={screeningJd}
                    onChange={(e) => setScreeningJd(e.target.value)}
                    placeholder="Enter target job role requirements..."
                    className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-slate-50/50"
                  />
                </div>

                <button
                  onClick={handleScreening}
                  disabled={screeningLoading || !screeningPdfFile}
                  className="w-full h-12 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-wider shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {screeningLoading ? "Screening Candidate PDF with AI..." : "Run AI PDF Resume Screen"}
                </button>
              </div>
            </Panel>

            <Panel title="AI Screening Report" subtitle="Automated decision recommendation & match metrics.">
              {screeningResult ? (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-purple-700">AI Match Score</p>
                      <p className="text-3xl font-black text-purple-900 font-display">{screeningResult.matchScore}%</p>
                    </div>
                    <span className="rounded-full bg-purple-600 px-4 py-1.5 text-xs font-black text-white shadow-md">
                      {screeningResult.recommendation}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">AI Executive Summary</h4>
                    <p className="text-xs font-medium text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{screeningResult.summary}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Key Strengths
                    </h4>
                    <ul className="space-y-1.5">
                      {screeningResult.keyStrengths.map((st) => (
                        <li key={st} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {st}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> Missing / Gap Skills
                    </h4>
                    <ul className="space-y-1.5">
                      {screeningResult.missingSkills.map((sk) => (
                        <li key={sk} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {sk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-2">
                  <Upload className="h-10 w-10 text-purple-400 opacity-60" />
                  <p className="text-xs font-bold text-slate-600">Upload a candidate PDF resume above and click &quot;Run AI PDF Resume Screen&quot;.</p>
                </div>
              )}
            </Panel>
          </div>
        )}

        {/* ─── TAB 2: AI CANDIDATE RANKING ─── */}
        {activeTab === "ranking" && (
          <Panel title="AI Candidate Ranking & Badging" subtitle="Applicants ranked automatically by relevancy and skill fit.">
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={rankingJobTitle}
                onChange={(e) => setRankingJobTitle(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter job role..."
              />
              <button
                onClick={handleRanking}
                className="h-11 rounded-xl signature-gradient px-6 text-xs font-black text-white uppercase tracking-wider shadow-md"
              >
                Re-Rank Candidates
              </button>
            </div>

            <div className="space-y-3">
              {rankingResults?.map((cand, idx) => (
                <div key={cand.candidateId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-extrabold text-sm">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900">{cand.candidateName}</h4>
                        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-black text-purple-700">
                          {cand.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{cand.aiNotes}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {cand.keySkills.map((sk) => (
                          <span key={sk} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 text-right shrink-0">
                    <div className="text-2xl font-black text-purple-700 font-display">{cand.matchScore}%</div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match Score</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {/* ─── TAB 3: AI JOB DESCRIPTION GENERATOR ─── */}
        {activeTab === "jd" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="AI Job Description Generator" subtitle="Fill in key requirements and let AI generate a polished JD.">
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Job Title</label>
                  <input type="text" value={jdTitle} onChange={(e) => setJdTitle(e.target.value)} className="h-10 w-full rounded-xl border border-slate-200 px-3 font-semibold text-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Department</label>
                    <input type="text" value={jdDept} onChange={(e) => setJdDept(e.target.value)} className="h-10 w-full rounded-xl border border-slate-200 px-3 font-semibold text-slate-800" />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Experience</label>
                    <input type="text" value={jdExp} onChange={(e) => setJdExp(e.target.value)} className="h-10 w-full rounded-xl border border-slate-200 px-3 font-semibold text-slate-800" />
                  </div>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Work Mode</label>
                  <select value={jdMode} onChange={(e) => setJdMode(e.target.value)} className="h-10 w-full rounded-xl border border-slate-200 px-3 font-semibold text-slate-800">
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Required Skills</label>
                  <input type="text" value={jdSkills} onChange={(e) => setJdSkills(e.target.value)} className="h-10 w-full rounded-xl border border-slate-200 px-3 font-semibold text-slate-800" />
                </div>
                <button
                  onClick={handleJdGeneration}
                  disabled={jdLoading}
                  className="w-full h-11 rounded-xl signature-gradient text-white font-extrabold uppercase tracking-wider shadow-md"
                >
                  {jdLoading ? "Generating Description..." : "Generate AI Job Description"}
                </button>
              </div>
            </Panel>

            <Panel title="Generated Job Description" subtitle="Copy & paste directly into your job posting.">
              {jdOutput ? (
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(jdOutput);
                        setCopiedJd(true);
                        setTimeout(() => setCopiedJd(false), 2000);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      {copiedJd ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedJd ? "Copied!" : "Copy Text"}
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono whitespace-pre-wrap leading-relaxed text-slate-800 max-h-[420px] overflow-y-auto">
                    {jdOutput}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400">
                  <Sparkles className="h-8 w-8 mb-2 text-purple-400" />
                  <p className="text-xs font-bold">Click &quot;Generate AI Job Description&quot; to build a structured JD.</p>
                </div>
              )}
            </Panel>
          </div>
        )}

        {/* ─── TAB 4: INTERVIEW QUESTION GENERATOR ─── */}
        {activeTab === "questions" && (
          <Panel title="AI Interview Question Generator" subtitle="Generate targeted technical & behavioral interview questions.">
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={qRole}
                onChange={(e) => setQRole(e.target.value)}
                placeholder="Job Role (e.g. Backend Engineer)"
                className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-800"
              />
              <select
                value={qSeniority}
                onChange={(e) => setQSeniority(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-800"
              >
                <option value="Junior / Entry Level">Junior / Entry Level</option>
                <option value="Mid-Senior Level">Mid-Senior Level</option>
                <option value="Lead / Principal">Lead / Principal</option>
              </select>
              <button
                onClick={handleQuestionGeneration}
                disabled={qLoading}
                className="h-11 rounded-xl signature-gradient px-6 text-xs font-black text-white uppercase tracking-wider shadow-md"
              >
                {qLoading ? "Generating..." : "Generate Questions"}
              </button>
            </div>

            {questions ? (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-black text-purple-700 uppercase tracking-wider">
                        {q.category}
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-900">{q.question}</h4>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-600">
                      <strong className="text-slate-900">Evaluation Rubric:</strong> {q.evalCriteria}
                    </p>
                    <div className="text-[10px] text-slate-500">
                      <strong>Expected Key Points:</strong> {q.expectedAnswerPoints.join(" • ")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs font-bold">
                Click &quot;Generate Questions&quot; to produce interview rubrics.
              </div>
            )}
          </Panel>
        )}

        {/* ─── TAB 5: HIRING ANALYTICS ─── */}
        {activeTab === "analytics" && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Avg Time-to-Hire</p>
                <p className="text-3xl font-black text-purple-700 font-display mt-1">{analytics.timeToHireDays} Days</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Candidate Quality Index</p>
                <p className="text-3xl font-black text-green-600 font-display mt-1">{analytics.candidateQualityIndex}/100</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">AI Screenings Run</p>
                <p className="text-3xl font-black text-indigo-600 font-display mt-1">{analytics.aiScreenedCount}</p>
              </div>
            </div>

            <Panel title="Hiring Conversion Funnel" subtitle="Pipeline volume & conversion through recruitment stages.">
              <div className="space-y-3">
                {analytics.funnelConversion.map((stage) => (
                  <div key={stage.stage} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{stage.stage}</span>
                      <span>{stage.count} candidates</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full signature-gradient rounded-full"
                        style={{ width: `${(stage.count / analytics.funnelConversion[0].count) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
