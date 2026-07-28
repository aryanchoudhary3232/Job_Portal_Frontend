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
import { Sparkles, Award, FileText, HelpCircle, BarChart2, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";

export default function RecruiterAISuitePage() {
  const [activeTab, setActiveTab] = useState<"screening" | "ranking" | "jd" | "questions" | "analytics">("screening");

  // 1. Resume Screening State
  const [screeningResume, setScreeningResume] = useState("");
  const [screeningJd, setScreeningJd] = useState("");
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
  const handleScreening = async () => {
    if (!screeningResume) return;
    setScreeningLoading(true);
    const res = await screenResumeWithAI(screeningResume, screeningJd);
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
              Automate resume screening, candidate ranking, JD generation, and interview questions with 10x speed.
            </p>
          </div>
        </div>

        {/* AI Navigation Tabs */}
        <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
          {[
            { id: "screening", label: "🤖 AI Resume Screening", icon: FileText },
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

        {/* ─── TAB 1: AI RESUME SCREENING ─── */}
        {activeTab === "screening" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="AI Resume Screener" subtitle="Paste a resume and job description to get instant AI match scoring.">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Paste Resume Content</label>
                  <textarea
                    rows={6}
                    value={screeningResume}
                    onChange={(e) => setScreeningResume(e.target.value)}
                    placeholder="Paste candidate resume text here (e.g. John Doe, Full Stack Engineer with 3 yrs React, Node.js, PostgreSQL...)"
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Job Description (Optional)</label>
                  <textarea
                    rows={4}
                    value={screeningJd}
                    onChange={(e) => setScreeningJd(e.target.value)}
                    placeholder="Paste target job description to screen against..."
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-slate-50/50"
                  />
                </div>
                <button
                  onClick={handleScreening}
                  disabled={screeningLoading || !screeningResume}
                  className="w-full h-12 rounded-xl signature-gradient text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {screeningLoading ? "Screening Candidate with AI..." : "Run AI Resume Screen"}
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
                <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400">
                  <Sparkles className="h-10 w-10 mb-3 text-purple-400 opacity-60" />
                  <p className="text-xs font-bold">Paste a resume and click &quot;Run AI Resume Screen&quot; to see detailed analysis.</p>
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
