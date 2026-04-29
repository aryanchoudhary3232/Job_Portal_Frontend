"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe2,
  ImagePlus,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";

const steps = [
  { id: 1, label: "Company Profile" },
  { id: 2, label: "Hiring Preferences" },
  { id: 3, label: "Team Access" },
];

function StepMarker({
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

function SharedFooter({
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
    <div className="border-t border-slate-100 px-6 py-5 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
    </div>
  );
}

export default function RecruiterOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const footerConfig = {
    1: {
      leftLabel: "Back",
      leftIcon: <ArrowLeft className="h-4 w-4" />,
      onLeftClick: () => router.push("/login"),
      stepLabel: "Step 1 of 3",
      rightLabel: "Save and Continue",
      rightIcon: <ArrowRight className="h-4 w-4" />,
      onRightClick: () => setStep(2),
    },
    2: {
      leftLabel: "Back",
      leftIcon: <ArrowLeft className="h-4 w-4" />,
      onLeftClick: () => setStep(1),
      stepLabel: "Step 2 of 3",
      rightLabel: "Continue",
      rightIcon: <ArrowRight className="h-4 w-4" />,
      onRightClick: () => setStep(3),
    },
    3: {
      leftLabel: "Back",
      leftIcon: <ArrowLeft className="h-4 w-4" />,
      onLeftClick: () => setStep(2),
      stepLabel: "Step 3 of 3",
      rightLabel: "Launch Workspace",
      rightIcon: <Sparkles className="h-4 w-4" />,
      onRightClick: () => router.push("/recruiter/dashboard"),
    },
  } as const;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.1),_transparent_26%),linear-gradient(180deg,#fbfbfe_0%,#f5f7fb_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1380px] flex-col px-4 py-5 sm:px-6">
        <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <Link
                href="/recruiter"
                className="text-lg font-black tracking-[-0.04em] text-[#4f46e5]"
              >
                Nexus Talent
              </Link>

              <div className="flex items-center justify-center gap-4">
                {steps.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <StepMarker
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
                Recruiter Workspace
              </div>
            </div>
          </div>

          <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
            {step === 1 ? (
              <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                <section className="pt-4">
                  <p className="text-[3rem] font-black leading-[0.94] tracking-[-0.05em] text-slate-900">
                    Build your
                    <br />
                    <span className="text-[#5648f5]">hiring foundation.</span>
                  </p>
                  <p className="mt-5 max-w-[240px] text-sm font-medium leading-7 text-slate-500">
                    Let&apos;s set up your organization profile so candidates trust
                    your brand from the first impression.
                  </p>

                  <div className="mt-8 space-y-5">
                    {steps.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
                            item.id === 1
                              ? "bg-[#5648f5] text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {item.id}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">
                            {item.label}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400">
                            {item.id === 1
                              ? "Create your public employer profile"
                              : item.id === 2
                                ? "Define roles, locations, and hiring priorities"
                                : "Invite your team and assign permissions"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[26px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-[#f8f9fd]">
                        <ImagePlus className="h-7 w-7 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          Company Branding
                        </p>
                        <p className="mt-1 max-w-md text-[12px] font-medium leading-6 text-slate-400">
                          Upload a square SVG, PNG, or JPG. Recommended size is
                          400x400px. Maximum size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Company Name
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                          e.g. Acme Corp
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Industry
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                          Select industry
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Website URL
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                          https://www.yourcompany.com
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                          Company Bio
                        </p>
                        <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-4 text-sm font-medium leading-7 text-slate-400 ring-1 ring-slate-100">
                          Briefly describe your company&apos;s mission and culture...
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
                <section className="pt-4">
                  <p className="text-[3rem] font-black leading-[0.94] tracking-[-0.05em] text-slate-900">
                    Define your
                    <br />
                    <span className="text-[#5648f5]">hiring orbit.</span>
                  </p>
                  <p className="mt-5 max-w-[220px] text-sm font-medium leading-7 text-slate-500">
                    Set your preferences so we can recommend your best-fit
                    talent pools by role, location, and specialty.
                  </p>

                  <div className="mt-8 grid gap-4">
                    <div className="rounded-[18px] bg-[#f8f8ff] p-4 ring-1 ring-[#ece9ff]">
                      <p className="text-sm font-black text-slate-900">
                        Smart Matching
                      </p>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-slate-500">
                        We surface candidates based on role seniority, location,
                        and response probability.
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-[#f8f8ff] p-4 ring-1 ring-[#ece9ff]">
                      <p className="text-sm font-black text-slate-900">
                        Global Compliance
                      </p>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-slate-500">
                        Configure regional visibility and consent-aware
                        communication defaults.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[26px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
                  <h2 className="text-[1.9rem] font-black tracking-[-0.04em] text-slate-900">
                    Hiring Preferences
                  </h2>

                  <div className="mt-6 space-y-6">
                    <div>
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Primary Hiring Needs
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {["Engineering", "Design", "Marketing", "Product", "Sales", "Finance"].map(
                          (tag, index) => (
                            <button
                              key={tag}
                              className={`rounded-[12px] px-4 py-3 text-sm font-bold ring-1 ${
                                index < 3
                                  ? "bg-[#f1efff] text-[#5648f5] ring-[#e2deff]"
                                  : "bg-[#f7f8fc] text-slate-500 ring-slate-100"
                              }`}
                            >
                              {tag}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Global Locations
                      </p>
                      <div className="flex items-center gap-2 rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                        <Search className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-400">
                          Search cities or regions...
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["San Francisco, CA", "London, UK", "Remote (Global)"].map((place) => (
                          <span
                            key={place}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-500"
                          >
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[20px] bg-[linear-gradient(180deg,#eef2f7_0%,#dbe3eb_100%)] p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-black text-slate-700">
                            Marketplace Preview
                          </p>
                          <p className="mt-1 text-[11px] font-medium text-slate-500">
                            Candidates will see this region visibility map.
                          </p>
                        </div>
                        <Globe2 className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="mt-6 h-40 rounded-[16px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8),_rgba(201,210,221,0.55))]" />
                    </div>
                  </div>
                </section>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                <section className="pt-4">
                  <p className="text-[3rem] font-black leading-[0.94] tracking-[-0.05em] text-slate-900">
                    Assemble your
                    <br />
                    <span className="text-[#5648f5]">hiring team.</span>
                  </p>
                  <p className="mt-5 max-w-[240px] text-sm font-medium leading-7 text-slate-500">
                    Invite recruiters and hiring managers so they can start
                    collaborating the moment your workspace goes live.
                  </p>
                </section>

                <section className="rounded-[26px] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1efff] text-[#5648f5]">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-[1.8rem] font-black tracking-[-0.04em] text-slate-900">
                        Workspace Access
                      </h2>
                      <p className="text-sm font-medium text-slate-500">
                        Add your first collaborators and assign permissions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    {[
                      ["Sarah Chen", "Hiring Manager", "sarah@nexus.ai"],
                      ["Marcus Chen", "Senior Recruiter", "marcus@nexus.ai"],
                    ].map(([name, role, email]) => (
                      <div
                        key={name}
                        className="grid gap-4 rounded-[18px] bg-[#fbfbfe] px-4 py-4 ring-1 ring-slate-100 sm:grid-cols-[minmax(0,1fr)_180px]"
                      >
                        <div>
                          <p className="text-sm font-black text-slate-900">{name}</p>
                          <p className="mt-1 text-[11px] font-medium text-slate-400">
                            {email}
                          </p>
                        </div>
                        <div className="rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-slate-500 ring-1 ring-slate-100">
                          {role}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600">
                    <Plus className="h-4 w-4" />
                    Add Another Invite
                  </button>

                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[18px] bg-[#f8f8ff] p-4 ring-1 ring-[#ece9ff]">
                      <p className="text-sm font-black text-slate-900">
                        Role-based controls
                      </p>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-slate-500">
                        Admins manage billing, recruiters review pipeline, and
                        hiring managers collaborate on feedback only.
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-[#f8f8ff] p-4 ring-1 ring-[#ece9ff]">
                      <p className="text-sm font-black text-slate-900">
                        Ready to launch
                      </p>
                      <p className="mt-2 text-[11px] font-medium leading-5 text-slate-500">
                        Once you launch, your branded workspace and candidate
                        pipeline will be live immediately.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}
          </div>

          <SharedFooter
            leftLabel={footerConfig[step as 1 | 2 | 3].leftLabel}
            leftIcon={footerConfig[step as 1 | 2 | 3].leftIcon}
            onLeftClick={footerConfig[step as 1 | 2 | 3].onLeftClick}
            stepLabel={footerConfig[step as 1 | 2 | 3].stepLabel}
            rightLabel={footerConfig[step as 1 | 2 | 3].rightLabel}
            rightIcon={footerConfig[step as 1 | 2 | 3].rightIcon}
            onRightClick={footerConfig[step as 1 | 2 | 3].onRightClick}
          />

          <div className="border-t border-slate-100 px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Workspace</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" />
                <span>Company Branding Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>Global Hiring Support</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300 sm:flex-row sm:items-center sm:justify-between">
            <span>(c) 2024 Nexus Talent. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Help Center</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
