"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleDot,
  FileText,
  GraduationCap,
  ImagePlus,
  Lock,
  MapPin,
  PencilLine,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
} from "lucide-react";

const competencyTags = ["UI/UX Design", "React.js", "Agile Scrum"];
const suggestedTags = ["TypeScript", "Python", "Visual Design", "SQL"];

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Skills & Projects" },
  { id: 3, label: "Resume" },
];

function StepBadge({
  index,
  active,
  completed,
}: {
  index: number;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
            active || completed
              ? "bg-[#5648f5] text-white shadow-[0_10px_20px_rgba(86,72,245,0.24)]"
              : "bg-slate-100 text-slate-400 ring-1 ring-slate-200"
          }`}
        >
          {completed ? <Check className="h-4 w-4" /> : index}
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-[0.16em] ${
            active || completed ? "text-[#5648f5]" : "text-slate-400"
          }`}
        >
          {steps[index - 1].label}
        </span>
      </div>
    </div>
  );
}

function StepNavigation({
  leftLabel,
  leftIcon,
  onLeftClick,
  stepLabel,
  rightLabel,
  rightIcon,
  onRightClick,
}: {
  leftLabel: string;
  leftIcon?: React.ReactNode;
  onLeftClick?: () => void;
  stepLabel: string;
  rightLabel: string;
  rightIcon?: React.ReactNode;
  onRightClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onLeftClick}
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-slate-600"
      >
        {leftIcon}
        {leftLabel}
      </button>

      <div className="flex items-center gap-4 sm:ml-auto">
        <span className="text-[11px] font-bold text-slate-400">{stepLabel}</span>
        <button
          type="button"
          onClick={onRightClick}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#6152f7,#4a37ea)] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_32px_rgba(91,76,241,0.26)]"
        >
          {rightLabel}
          {rightIcon}
        </button>
      </div>
    </div>
  );
}

function OnboardingFooter() {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300 sm:flex-row sm:items-center sm:justify-between">
      <span>(c) 2024 CareerArchitect Global. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Support</span>
        <span>API</span>
        <span>Status</span>
      </div>
    </div>
  );
}

export default function StudentOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const stepNavigation = {
    1: {
      leftLabel: "Save & Continue Later",
      leftIcon: undefined,
      onLeftClick: undefined,
      stepLabel: "Step 1 of 3",
      rightLabel: "Next Step",
      rightIcon: <ArrowRight className="h-4 w-4" />,
      onRightClick: () => setStep(2),
    },
    2: {
      leftLabel: "Previous Step",
      leftIcon: <ArrowLeft className="h-4 w-4" />,
      onLeftClick: () => setStep(1),
      stepLabel: "Step 2 of 3",
      rightLabel: "Next Step",
      rightIcon: <ArrowRight className="h-4 w-4" />,
      onRightClick: () => setStep(3),
    },
    3: {
      leftLabel: "Back to Experience",
      leftIcon: <ArrowLeft className="h-4 w-4" />,
      onLeftClick: () => setStep(2),
      stepLabel: "Step 3 of 3",
      rightLabel: "Finish Profile",
      rightIcon: <Sparkles className="h-4 w-4" />,
      onRightClick: () => router.push("/student"),
    },
  } as const;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.1),_transparent_24%),linear-gradient(180deg,#fbfbfe_0%,#f5f7fb_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1380px] flex-col px-4 py-5 sm:px-6">
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/student"
                  className="text-lg font-black tracking-[-0.04em] text-[#4f46e5]"
                >
                  CareerArchitect
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4">
                {steps.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <StepBadge
                      index={item.id}
                      active={step === item.id}
                      completed={step > item.id}
                    />
                    {item.id !== steps.length ? (
                      <div className="mb-7 hidden h-px w-10 bg-slate-200 sm:block" />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                Onboarding 2024
              </div>
            </div>
          </div>

          <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
            {step === 1 ? (
              <div className="mx-auto max-w-[760px] rounded-[26px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
                <h1 className="text-[2rem] font-black tracking-[-0.04em] text-slate-900">
                  Build your digital atelier
                </h1>
                <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
                  Let&apos;s start with the foundations. Your basic information helps
                  us architect the right career opportunities for you.
                </p>

                <div className="mt-7 flex flex-col gap-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,#4d8097_0%,#5f95ab_100%)] p-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                      <div className="flex h-full w-full items-center justify-center rounded-[17px] border border-[#3e6b80] bg-[#5f95ab]">
                        <ImagePlus className="h-7 w-7 text-white/80" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Avatar</p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        Recommended size: 400x400px
                      </p>
                      <button className="mt-2 text-[12px] font-bold text-[#5648f5]">
                        Upload photo
                      </button>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Full Name
                      </p>
                      <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                        <span className="text-sm font-medium text-slate-400">
                          e.g. Julian Vester
                        </span>
                        <UserRound className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          University / College
                        </p>
                        <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                          <span className="text-sm font-medium text-slate-400">
                            e.g. Stanford University
                          </span>
                          <GraduationCap className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Location
                        </p>
                        <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                          <span className="text-sm font-medium text-slate-400">
                            e.g. San Francisco, CA
                          </span>
                          <MapPin className="h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Major Of Study
                      </p>
                      <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                        <span className="text-sm font-medium text-slate-600">
                          Architecture &amp; Digital Design
                        </span>
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5648f5] text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      </div>
                      <p className="mt-2 text-[10px] font-semibold text-[#5648f5]">
                        Verified and synced with college database
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mx-auto max-w-[980px]">
                <div className="text-center">
                  <h1 className="text-[2.2rem] font-black tracking-[-0.04em] text-slate-900">
                    Curate Your Experience
                  </h1>
                  <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-500">
                    Build your professional profile by highlighting the skills
                    you&apos;ve mastered and the work you&apos;ve delivered.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
                  <div className="space-y-4">
                    <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#f1efff] text-[#5648f5]">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <h2 className="text-[15px] font-black text-slate-900">
                          Core Competencies
                        </h2>
                      </div>

                      <p className="mt-4 text-[11px] font-medium leading-5 text-slate-400">
                        Search for technical skills, tools, or soft skills you
                        excel at.
                      </p>

                      <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-[#f6f7fb] px-3 py-3 ring-1 ring-slate-100">
                        <Search className="h-4 w-4 text-slate-400" />
                        <span className="text-[12px] font-medium text-slate-400">
                          e.g. Figma, Python, Data Analysis...
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {competencyTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f1efff] px-3 py-1.5 text-[11px] font-bold text-[#5648f5]"
                          >
                            {tag} x
                          </span>
                        ))}
                      </div>

                      <div className="mt-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Suggested For You
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {suggestedTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="rounded-[18px] bg-[#f7f8fe] p-4 ring-1 ring-[#ece9ff]">
                      <div className="flex items-center gap-2 text-[#5648f5]">
                        <CircleDot className="h-4 w-4 fill-current" />
                        <p className="text-[12px] font-black">Pro Tip</p>
                      </div>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-[#7168c3]">
                        Students with 5+ listed skills are 3x more likely to be
                        contacted by campus recruiters.
                      </p>
                    </section>
                  </div>

                  <section className="rounded-[22px] bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#f1efff] text-[#5648f5]">
                          <BriefcaseBusiness className="h-4 w-4" />
                        </div>
                        <h2 className="text-[15px] font-black text-slate-900">
                          Key Projects
                        </h2>
                      </div>

                      <button className="inline-flex items-center gap-2 text-[12px] font-bold text-[#5648f5]">
                        <Plus className="h-4 w-4" />
                        Add Another
                      </button>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Project Title
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-500 ring-1 ring-slate-100">
                          CareerArchitect Platform
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Role / Contribution
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                          e.g. Lead Designer
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Project Overview
                      </p>
                      <div className="rounded-[14px] bg-[#f6f7fb] px-4 py-4 text-sm font-medium leading-6 text-slate-600 ring-1 ring-slate-100">
                        Architecting a modern UI system for student-to-employer
                        networking using React and Tailwind CSS. Focused on
                        accessible patterns and high-performance layouts.
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Links / Github / Behance
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                          https://...
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Image / Thumbnail
                        </p>
                        <div className="flex items-center justify-center rounded-[12px] border border-dashed border-[#d8d4ff] bg-[#faf9ff] px-4 py-3.5 text-sm font-medium text-slate-400">
                          Upload preview
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-[16px] border border-dashed border-slate-200 bg-[#fafafa] px-5 py-8 text-center">
                      <p className="text-sm font-black text-slate-500">
                        Add your internships or freelancing
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        Sharing professional experience or academic projects
                        builds higher trust.
                      </p>
                      <button className="mt-3 text-[12px] font-black uppercase tracking-[0.12em] text-[#5648f5]">
                        Add Experience +
                      </button>
                    </div>
                  </section>
                </div>

              </div>
            ) : null}

            {step === 3 ? (
              <div className="mx-auto grid max-w-[980px] gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
                <section className="pt-4">
                  <div className="inline-flex rounded-full bg-[#f1efff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#5648f5]">
                    Onboarding
                  </div>
                  <h1 className="mt-4 text-[3rem] font-black leading-[0.96] tracking-[-0.05em] text-[#3f35d8]">
                    Final Step:
                    <br />
                    Your Career
                    <br />
                    Blueprint.
                  </h1>
                  <p className="mt-5 max-w-[220px] text-sm font-medium leading-7 text-slate-500">
                    Our AI engine parses your resume to build a high-performance
                    profile. Let&apos;s make you discoverable to the top 1% of
                    recruiters.
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    {[1, 2, 3, 4].map((dot, index) => (
                      <div key={dot} className="flex items-center gap-3">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${
                            index < 3
                              ? "bg-[#5648f5] text-white"
                              : "bg-[#5648f5] text-white ring-4 ring-[#efeefe]"
                          }`}
                        >
                          {index < 3 ? <Check className="h-3.5 w-3.5" /> : "4"}
                        </div>
                        {index !== 3 ? (
                          <div className="h-px w-7 bg-[#5648f5]" />
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[0, 1, 2].map((item) => (
                        <div
                          key={item}
                          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(135deg,#cfd8e3,#8999b0)] text-[10px] font-black text-slate-700"
                        >
                          {["AR", "SJ", "+9"][item]}
                        </div>
                      ))}
                    </div>
                    <p className="max-w-[170px] text-[11px] font-medium leading-5 text-slate-500">
                      &quot;Nexus helped me land a Senior Designer role within 7
                      weeks of finishing my profile.&quot;
                    </p>
                  </div>
                </section>

                <section className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
                  <h2 className="text-[1.8rem] font-black tracking-[-0.04em] text-slate-900">
                    Upload Document
                  </h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    Drag and drop your professional CV in PDF or DOCX format.
                  </p>

                  <div className="mt-6 rounded-[20px] border border-dashed border-[#d7d4ff] bg-[#fcfbff] p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#f1efff] text-[#5648f5]">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-lg font-black text-slate-700">
                      Drop your resume here
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-400">
                      or browse files
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 ring-1 ring-slate-100">
                        PDF
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 ring-1 ring-slate-100">
                        DOCX
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-[16px] bg-[#f7f8fc] px-4 py-4 ring-1 ring-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-[#5648f5] ring-1 ring-slate-100">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          resume_alex_chan_v2.pdf
                        </p>
                        <p className="text-[11px] font-medium text-slate-400">
                          2.4 MB - Ready to process
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-300">x</button>
                  </div>

                  <div className="mt-4 rounded-[16px] bg-[#fff6f1] px-4 py-4 text-sm font-medium leading-6 text-[#bc6b36] ring-1 ring-[#ffe4d2]">
                    Our system scans for keywords related to Software
                    Engineering and System Design based on your previous steps.
                    Ensure these are highlighted in your document.
                  </div>

                </section>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-100 px-6 py-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1180px]">
              <StepNavigation
                leftLabel={stepNavigation[step as 1 | 2 | 3].leftLabel}
                leftIcon={stepNavigation[step as 1 | 2 | 3].leftIcon}
                onLeftClick={stepNavigation[step as 1 | 2 | 3].onLeftClick}
                stepLabel={stepNavigation[step as 1 | 2 | 3].stepLabel}
                rightLabel={stepNavigation[step as 1 | 2 | 3].rightLabel}
                rightIcon={stepNavigation[step as 1 | 2 | 3].rightIcon}
                onRightClick={stepNavigation[step as 1 | 2 | 3].onRightClick}
              />
            </div>
          </div>

          <div className="border-t border-slate-100 px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" />
                <span>Encrypted Data</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Privacy Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <PencilLine className="h-3.5 w-3.5" />
                <span>Get Help</span>
              </div>
            </div>
          </div>

          <OnboardingFooter />
        </div>
      </div>
    </div>
  );
}
