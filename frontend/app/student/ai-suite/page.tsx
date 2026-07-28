"use client";

import { useState } from "react";
import { PortalLayout } from "@/components/dashboard/PortalLayout";
import { Panel } from "@/components/dashboard/Panel";
import {
  getAIResumeFeedback,
  analyzeSkillGapWithAI,
  evaluateMockInterviewAnswer,
  type AIResumeFeedbackResult,
  type AISkillGapResult,
  type AIMockInterviewFeedback,
} from "@/lib/ai";
import { Sparkles, FileText, Target, Video, CheckCircle2, AlertCircle, Send, Upload, FileCheck, X } from "lucide-react";

export default function StudentAISuitePage() {
  const [activeTab, setActiveTab] = useState<"resume" | "skillgap" | "mock">("resume");

  // 1. Resume PDF Upload & Feedback State
  const [resumeFile, setResumeFile] = useState<{ name: string; size: number; text: string } | null>(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeFeedback, setResumeFeedback] = useState<AIResumeFeedbackResult | null>(null);

  // 2. Skill Gap State
  const [targetRole, setTargetRole] = useState("Full Stack Next.js Developer");
  const [userSkillsInput, setUserSkillsInput] = useState("React, HTML, CSS, JavaScript");
  const [skillGapLoading, setSkillGapLoading] = useState(false);
  const [skillGapResult, setSkillGapResult] = useState<AISkillGapResult | null>(null);

  // 3. Mock Interview State
  const mockQuestions = [
    "Tell me about a complex project where you optimized frontend state or network calls.",
    "How do you handle debugging when a production issue only occurs on client browsers?",
    "Describe your experience working with TypeScript and REST/GraphQL APIs.",
  ];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evalLoading, setEvalLoading] = useState(false);
  const [mockFeedback, setMockFeedback] = useState<AIMockInterviewFeedback | null>(null);

  // Handlers
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || file.name;
      setResumeFile({
        name: file.name,
        size: file.size,
        text,
      });
      setResumeFeedback(null);
    };
    reader.readAsText(file);
  };

  const handleAnalyzeResume = async () => {
    if (!resumeFile) return;
    setResumeLoading(true);
    const res = await getAIResumeFeedback(resumeFile.text);
    setResumeFeedback(res);
    setResumeLoading(false);
  };

  const handleAnalyzeSkillGap = async () => {
    setSkillGapLoading(true);
    const skillsArray = userSkillsInput.split(",").map((s) => s.trim());
    const res = await analyzeSkillGapWithAI(skillsArray, targetRole);
    setSkillGapResult(res);
    setSkillGapLoading(false);
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer) return;
    setEvalLoading(true);
    const res = await evaluateMockInterviewAnswer(mockQuestions[currentQIndex], userAnswer, targetRole);
    setMockFeedback(res);
    setEvalLoading(false);
  };

  return (
    <PortalLayout role="STUDENT" title="AI Career Suite">
      <div className="space-y-6">
        {/* Hero Banner */}
        <div className="rounded-[28px] signature-gradient p-7 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> AI Candidate Copilot
            </span>
            <h2 className="mt-3 text-3xl font-black font-display tracking-tight">Supercharge Your Job Search with AI</h2>
            <p className="mt-2 text-sm font-medium text-white/90 max-w-2xl">
              Instant PDF ATS resume scanning, skill gap career roadmaps, and real-time AI mock interview practice.
            </p>
          </div>
        </div>

        {/* AI Navigation Tabs */}
        <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
          {[
            { id: "resume", label: "📄 AI Resume PDF & ATS Scanner", icon: FileText },
            { id: "skillgap", label: "🔍 Skill Gap & Roadmap", icon: Target },
            { id: "mock", label: "🎥 AI Mock Interview", icon: Video },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                if (tab.id === "skillgap" && !skillGapResult) handleAnalyzeSkillGap();
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

        {/* ─── TAB 1: AI RESUME PDF & ATS SCANNER ─── */}
        {activeTab === "resume" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Panel title="AI PDF Resume & ATS Scanner" subtitle="Upload your PDF or DOCX resume to calculate ATS score and suggestions.">
              <div className="space-y-5">
                <div>
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                    Upload Resume Document (PDF / DOCX) <span className="text-red-500 font-bold">*</span>
                  </span>

                  {!resumeFile ? (
                    <label className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-purple-200 bg-purple-50/40 p-8 text-center cursor-pointer hover:bg-purple-50 hover:border-purple-400 transition group">
                      <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                        <Upload className="h-7 w-7" />
                      </div>
                      <p className="text-sm font-extrabold text-slate-900">Click to upload or drag & drop PDF resume</p>
                      <p className="text-xs font-semibold text-slate-400 mt-1">Supports PDF, DOCX files up to 10MB</p>
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
                          setResumeFile(null);
                          setResumeFeedback(null);
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
                          <p className="text-sm font-black text-slate-900">{resumeFile.name}</p>
                          <p className="text-xs font-semibold text-purple-700">
                            {(resumeFile.size / 1024).toFixed(1)} KB • PDF Document Ready
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Resume PDF parsed successfully! Click below for AI Scan.
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAnalyzeResume}
                  disabled={resumeLoading || !resumeFile}
                  className="w-full h-12 rounded-2xl signature-gradient text-white font-black text-xs uppercase tracking-wider shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {resumeLoading ? "Scanning PDF with AI ATS Engine..." : "Analyze PDF Resume ATS Score"}
                </button>
              </div>
            </Panel>

            <Panel title="ATS Score & AI Recommendations" subtitle="Optimizations to pass recruiter ATS scanners.">
              {resumeFeedback ? (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-purple-700">ATS Match Rating</p>
                      <p className="text-4xl font-black text-purple-900 font-display">{resumeFeedback.atsScore}/100</p>
                    </div>
                    <span className="rounded-full bg-purple-600 px-4 py-1.5 text-xs font-black text-white shadow-md">
                      {resumeFeedback.overallRating}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400">Formatting</p>
                      <p className="text-base font-extrabold text-slate-900">{resumeFeedback.formattingScore}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400">Content Impact</p>
                      <p className="text-base font-extrabold text-slate-900">{resumeFeedback.contentImpactScore}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400">Action Verbs</p>
                      <p className="text-base font-extrabold text-slate-900">{resumeFeedback.actionVerbScore}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> Top Actionable Improvements
                    </h4>
                    <ul className="space-y-2">
                      {resumeFeedback.improvements.map((imp, idx) => (
                        <li key={idx} className="text-xs font-semibold text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg">
                          <span className="text-purple-600 font-extrabold">{idx + 1}.</span> {imp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Bullet Point Rewrites</h4>
                    <div className="space-y-2.5 text-xs">
                      {resumeFeedback.suggestedBullets.map((bullet, idx) => (
                        <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                          <p className="text-slate-400 line-through">❌ {bullet.original}</p>
                          <p className="text-green-700 font-extrabold">✨ {bullet.improved}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 space-y-2">
                  <Upload className="h-10 w-10 text-purple-400 opacity-60" />
                  <p className="text-xs font-bold text-slate-600">Upload your PDF resume above and click &quot;Analyze PDF Resume ATS Score&quot;.</p>
                </div>
              )}
            </Panel>
          </div>
        )}

        {/* ─── TAB 2: SKILL GAP ANALYSIS ─── */}
        {activeTab === "skillgap" && (
          <Panel title="AI Skill Gap Analysis & Career Roadmap" subtitle="Identify missing skills for your target role and get learning paths.">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Target Job Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Your Current Skills (Comma Separated)</label>
                <input
                  type="text"
                  value={userSkillsInput}
                  onChange={(e) => setUserSkillsInput(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-800"
                />
              </div>
            </div>
            <button
              onClick={handleAnalyzeSkillGap}
              disabled={skillGapLoading}
              className="mb-8 h-11 signature-gradient px-6 rounded-xl text-xs font-black text-white uppercase tracking-wider shadow-md"
            >
              {skillGapLoading ? "Analyzing..." : "Analyze Skill Gap with AI"}
            </button>

            {skillGapResult && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">Target Role Match</span>
                    <h3 className="text-2xl font-black font-display">{skillGapResult.targetRole}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-amber-400 font-display">{skillGapResult.currentMatchPercentage}%</span>
                    <p className="text-[10px] font-bold text-purple-200">Skills Acquired</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-green-700 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Skills You Already Have
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGapResult.acquiredSkills.map((sk) => (
                        <span key={sk} className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" /> Critical Missing Skills to Learn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGapResult.missingCriticalSkills.map((sk) => (
                        <span key={sk} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                          ⚡ {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Recommended Learning Roadmap</h4>
                  <div className="space-y-2.5">
                    {skillGapResult.careerRoadmap.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs font-semibold text-slate-800">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Panel>
        )}

        {/* ─── TAB 3: AI MOCK INTERVIEW ─── */}
        {activeTab === "mock" && (
          <Panel title="AI Interactive Mock Interview" subtitle="Practice real-time technical questions and get AI scoring & feedback.">
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
                <div className="flex items-center justify-between text-xs font-bold text-purple-700 mb-2">
                  <span>Question {currentQIndex + 1} of {mockQuestions.length}</span>
                  <span className="uppercase tracking-wider">Target: {targetRole}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{mockQuestions[currentQIndex]}</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Type Your Answer</label>
                <textarea
                  rows={5}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Explain your approach clearly..."
                  className="w-full rounded-xl border border-slate-200 p-4 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleEvaluateAnswer}
                  disabled={evalLoading || !userAnswer}
                  className="flex-1 h-12 rounded-xl signature-gradient text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> {evalLoading ? "AI Evaluating..." : "Submit Answer to AI"}
                </button>
                {currentQIndex < mockQuestions.length - 1 && (
                  <button
                    onClick={() => {
                      setCurrentQIndex((i) => i + 1);
                      setUserAnswer("");
                      setMockFeedback(null);
                    }}
                    className="h-12 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Next Question
                  </button>
                )}
              </div>

              {mockFeedback && (
                <div className="space-y-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-lg animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">AI Response Score</p>
                      <p className="text-3xl font-black text-purple-700 font-display">{mockFeedback.score}/100</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3.5 py-1 text-xs font-extrabold text-green-800">
                      Clarity: {mockFeedback.clarityRating}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">Key Strengths in Answer</h4>
                    <ul className="space-y-1 text-xs font-semibold text-slate-700">
                      {mockFeedback.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 mb-1">Model Answer Suggestion</h4>
                    <p className="text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {mockFeedback.modelAnswer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        )}
      </div>
    </PortalLayout>
  );
}
