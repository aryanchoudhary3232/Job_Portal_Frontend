"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleDot,
  FileText,
  Globe,
  ImagePlus,
  Lock,
  MapPin,
  PencilLine,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Briefcase,
  X,
  Star,
  BadgeCheck,
  FileCheck2,
  AlertTriangle,
  Info,
} from "lucide-react";

/* ───────────────────── Constants ───────────────────── */

const steps = [
  { id: 1, label: "Company Profile" },
  { id: 2, label: "Hiring Preferences" },
  { id: 3, label: "Documents" },
];

const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Education",
  "Manufacturing",
  "Retail & E-commerce",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Logistics & Supply Chain",
];

const departmentTags = [
  "Engineering",
  "Design",
  "Marketing",
  "Product",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Data Science",
  "Legal",
];

const roleTypeTags = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Contract",
  "Freelance",
];

const companySizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

/* ───────────────────── Shared Components ───────────────────── */

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
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
            active || completed
              ? "bg-[#5648f5] text-white shadow-[0_10px_20px_rgba(86,72,245,0.24)]"
              : "bg-slate-100 text-slate-400 ring-1 ring-slate-200"
          }`}
        >
          {completed ? <Check className="h-4 w-4" /> : index}
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-[0.16em] transition-colors duration-300 ${
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
        <span className="text-[11px] font-bold text-slate-400">
          {stepLabel}
        </span>
        <button
          type="button"
          onClick={onRightClick}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#6152f7,#4a37ea)] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_32px_rgba(91,76,241,0.26)] hover:shadow-[0_20px_40px_rgba(91,76,241,0.35)] hover:-translate-y-0.5 transition-all"
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
      <span>© 2026 Nexus Talent. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <span className="hover:text-slate-500 transition-colors cursor-pointer">Privacy</span>
        <span className="hover:text-slate-500 transition-colors cursor-pointer">Terms</span>
        <span className="hover:text-slate-500 transition-colors cursor-pointer">Support</span>
        <span className="hover:text-slate-500 transition-colors cursor-pointer">Help Center</span>
      </div>
    </div>
  );
}

/* ────────────────── Toggle Tag Chip ────────────────── */

function ToggleChip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold transition-all duration-200 ${
        selected
          ? "bg-[#5648f5] text-white shadow-[0_6px_16px_rgba(86,72,245,0.24)]"
          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
      }`}
    >
      {selected && <Check className="h-3 w-3" />}
      {label}
    </button>
  );
}

/* ───────────────────── STEP 1: Company Profile ───────────────────── */

function Step1CompanyProfile() {
  const [selectedIndustry, setSelectedIndustry] = useState("");

  return (
    <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Left Panel */}
      <section className="pt-4">
        <div className="inline-flex rounded-full bg-[#f1efff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#5648f5]">
          Step 1
        </div>
        <h1 className="mt-4 text-[2.8rem] font-black leading-[0.96] tracking-[-0.05em] text-[#3f35d8]">
          Build your
          <br />
          hiring
          <br />
          foundation.
        </h1>
        <p className="mt-5 max-w-[240px] text-sm font-medium leading-7 text-slate-500">
          Let&apos;s set up your organization profile. This information will be
          visible to potential candidates on your job postings.
        </p>

        {/* Left sidebar step indicator */}
        <div className="mt-8 space-y-4">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${
                  i === 0
                    ? "bg-[#5648f5] text-white ring-4 ring-[#efeefe]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {i === 0 ? s.id : s.id}
              </div>
              <span
                className={`text-[11px] font-bold ${
                  i === 0 ? "text-[#5648f5]" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-10 rounded-[18px] bg-[#f7f8fe] p-4 ring-1 ring-[#ece9ff]">
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-[11px] font-medium leading-5 text-[#7168c3]">
            &quot;The onboarding process was seamless. We had our first
            high-quality job posting live in under 5 minutes.&quot;
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#cfd8e3,#8999b0)] text-[9px] font-black text-slate-700">
              SC
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-700">
                Sarah Chen
              </p>
              <p className="text-[9px] font-medium text-slate-400">
                Head of HR, Acme Corp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel – Company Profile Form */}
      <section className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
        {/* Company Branding Upload */}
        <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#d7d4ff] bg-[#fcfbff] p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#5648f5,#4a37ea)] shadow-[0_16px_32px_rgba(86,72,245,0.2)]">
            <ImagePlus className="h-8 w-8 text-white/80" />
          </div>
          <p className="mt-4 text-sm font-black text-slate-700">
            Company Branding
          </p>
          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Upload a square SVG, PNG or JPG. Recommended size is 400×400px.
            Maximum size 2MB.
          </p>
          <button className="mt-3 text-[12px] font-bold text-[#5648f5] hover:underline">
            Upload Logo
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {/* Company Name + Industry */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Company Name
              </p>
              <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                <span className="text-sm font-medium text-slate-400">
                  e.g. Acme Corp
                </span>
                <Building2 className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Industry
              </p>
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full appearance-none rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-500 ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5648f5]/30"
                >
                  <option value="" disabled>
                    Select Industry
                  </option>
                  {industryOptions.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                <Briefcase className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Website URL */}
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Website URL
            </p>
            <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
              <span className="text-sm font-medium text-slate-400">
                https://www.yourcompany.com
              </span>
              <Globe className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Company Size + Headquarters */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Company Size
              </p>
              <select className="w-full appearance-none rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-500 ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5648f5]/30">
                <option value="" disabled selected>
                  Select size
                </option>
                {companySizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Headquarters
              </p>
              <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
                <span className="text-sm font-medium text-slate-400">
                  e.g. San Francisco, CA
                </span>
                <MapPin className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Company Bio */}
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Company Bio
            </p>
            <div className="rounded-[14px] bg-[#f6f7fb] px-4 py-4 ring-1 ring-slate-100 min-h-[120px]">
              <span className="text-sm font-medium text-slate-400">
                Briefly describe your company&apos;s mission and culture...
              </span>
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              LinkedIn Company Page
            </p>
            <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
              <span className="text-sm font-medium text-slate-400">
                https://linkedin.com/company/...
              </span>
              <Globe className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────── STEP 2: Hiring Preferences ───────────────────── */

function Step2HiringPreferences() {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([
    "Engineering",
    "Design",
    "Marketing",
  ]);
  const [selectedRoleTypes, setSelectedRoleTypes] = useState<string[]>([
    "Full-Time",
    "Internship",
  ]);
  const [locations, setLocations] = useState<string[]>([
    "San Francisco, CA",
    "London, UK",
    "Remote (GMT±3)",
  ]);

  const toggleDepartment = (dep: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dep) ? prev.filter((d) => d !== dep) : [...prev, dep]
    );
  };

  const toggleRoleType = (role: string) => {
    setSelectedRoleTypes((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const removeLocation = (loc: string) => {
    setLocations((prev) => prev.filter((l) => l !== loc));
  };

  return (
    <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Left Panel */}
      <section className="pt-4">
        <div className="inline-flex rounded-full bg-[#f1efff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#5648f5]">
          Step 2
        </div>
        <h1 className="mt-4 text-[2.8rem] font-black leading-[0.96] tracking-[-0.05em] text-[#3f35d8]">
          Define your
          <br />
          hiring
          <br />
          orbit.
        </h1>
        <p className="mt-5 max-w-[240px] text-sm font-medium leading-7 text-slate-500">
          Setting your preferences helps us curate the highest-quality talent
          matches for your specific industry and geographic needs.
        </p>

        {/* Progress dots */}
        <div className="mt-8 flex items-center gap-2">
          <div className="h-2 w-8 rounded-full bg-[#5648f5]" />
          <div className="h-2 w-8 rounded-full bg-[#5648f5]" />
          <div className="h-2 w-8 rounded-full bg-slate-200" />
        </div>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Step 02 of 03
        </p>

        {/* Smart Matching & Compliance */}
        <div className="mt-10 grid grid-cols-2 gap-3">
          <div className="rounded-[16px] bg-[#f7f8fe] p-4 ring-1 ring-[#ece9ff]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#efeefe] text-[#5648f5] mb-2">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-black text-slate-700">
              Smart Matching
            </p>
            <p className="mt-1 text-[10px] font-medium leading-4 text-slate-400">
              Based on your hiring focus, we&apos;ve found 2,500+ vetted
              candidates ready for interview.
            </p>
          </div>
          <div className="rounded-[16px] bg-[#f7f8fe] p-4 ring-1 ring-[#ece9ff]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#efeefe] text-[#5648f5] mb-2">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-black text-slate-700">
              Global Compliance
            </p>
            <p className="mt-1 text-[10px] font-medium leading-4 text-slate-400">
              Your selected regions are covered by our Employer of Record (EOR)
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Right Panel – Preferences Form */}
      <section className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
        {/* Primary Hiring Needs */}
        <div>
          <h2 className="text-lg font-black text-slate-900">
            Primary Hiring Needs
          </h2>
          <p className="mt-1 text-[12px] font-medium text-slate-400">
            Select the departments you are currently scaling.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {departmentTags.map((dep) => (
              <ToggleChip
                key={dep}
                label={dep}
                selected={selectedDepartments.includes(dep)}
                onToggle={() => toggleDepartment(dep)}
              />
            ))}
          </div>
        </div>

        {/* Role Types */}
        <div className="mt-8">
          <h2 className="text-lg font-black text-slate-900">
            Preferred Role Types
          </h2>
          <p className="mt-1 text-[12px] font-medium text-slate-400">
            What kind of positions are you looking to fill?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {roleTypeTags.map((role) => (
              <ToggleChip
                key={role}
                label={role}
                selected={selectedRoleTypes.includes(role)}
                onToggle={() => toggleRoleType(role)}
              />
            ))}
          </div>
        </div>

        {/* Global Locations */}
        <div className="mt-8">
          <h2 className="text-lg font-black text-slate-900">
            Global Locations
          </h2>
          <p className="mt-1 text-[12px] font-medium text-slate-400">
            Where are these roles based? You can select multiple regions.
          </p>

          {/* Search input */}
          <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 ring-1 ring-slate-100">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-400">
              Search cities or regions...
            </span>
          </div>

          {/* Location chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {locations.map((loc) => (
              <div
                key={loc}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f1efff] px-3 py-1.5 text-[11px] font-bold text-[#5648f5]"
              >
                {loc}
                <button
                  onClick={() => removeLocation(loc)}
                  className="text-[#5648f5]/60 hover:text-[#5648f5]"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="mt-8">
          <h2 className="text-lg font-black text-slate-900">
            Expected Salary Range
          </h2>
          <p className="mt-1 text-[12px] font-medium text-slate-400">
            Set a range to help candidates understand the compensation level.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Minimum (Annual)
              </p>
              <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                e.g. ₹5,00,000
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                Maximum (Annual)
              </p>
              <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                e.g. ₹25,00,000
              </div>
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="mt-8">
          <h2 className="text-lg font-black text-slate-900">
            Experience Level
          </h2>
          <p className="mt-1 text-[12px] font-medium text-slate-400">
            What level of candidates are you targeting?
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Entry Level", "Mid Level", "Senior", "Lead / Manager", "Executive"].map(
              (level) => (
                <ToggleChip
                  key={level}
                  label={level}
                  selected={level === "Mid Level" || level === "Senior"}
                  onToggle={() => {}}
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────── STEP 3: Documents ───────────────────── */

function Step3Documents() {
  return (
    <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Left Panel */}
      <section className="pt-4">
        <div className="inline-flex rounded-full bg-[#f1efff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#5648f5]">
          Final Step
        </div>
        <h1 className="mt-4 text-[2.8rem] font-black leading-[0.96] tracking-[-0.05em] text-[#3f35d8]">
          Verify your
          <br />
          company
          <br />
          identity.
        </h1>
        <p className="mt-5 max-w-[240px] text-sm font-medium leading-7 text-slate-500">
          Upload documents to verify your company. This builds trust with
          candidates and unlocks premium recruiter features.
        </p>

        {/* Step dots completed */}
        <div className="mt-8 flex items-center gap-3">
          {[1, 2, 3].map((dot, index) => (
            <div key={dot} className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black ${
                  index < 2
                    ? "bg-[#5648f5] text-white"
                    : "bg-[#5648f5] text-white ring-4 ring-[#efeefe]"
                }`}
              >
                {index < 2 ? <Check className="h-3.5 w-3.5" /> : "3"}
              </div>
              {index !== 2 ? (
                <div className="h-px w-7 bg-[#5648f5]" />
              ) : null}
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-10 space-y-3">
          <div className="flex items-center gap-3 rounded-[14px] bg-[#f7f8fe] p-3 ring-1 ring-[#ece9ff]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-emerald-50 text-emerald-500">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-700">
                256-bit SSL Encryption
              </p>
              <p className="text-[9px] font-medium text-slate-400">
                All documents are stored securely
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[14px] bg-[#f7f8fe] p-3 ring-1 ring-[#ece9ff]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-500">
              <BadgeCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-700">
                Verified Badge
              </p>
              <p className="text-[9px] font-medium text-slate-400">
                Verified companies get 3x more applicants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel – Documents Upload */}
      <section className="rounded-[24px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 sm:p-8">
        <h2 className="text-[1.6rem] font-black tracking-[-0.04em] text-slate-900">
          Upload Verification Documents
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Provide official documents to complete the verification of your company
          on Nexus Talent.
        </p>

        {/* Document 1: Business Registration */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1efff] text-[#5648f5]">
              <span className="text-[10px] font-black">1</span>
            </div>
            <p className="text-[13px] font-black text-slate-700">
              Business Registration Certificate
            </p>
            <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-red-500">
              Required
            </span>
          </div>
          <div className="rounded-[16px] border border-dashed border-[#d7d4ff] bg-[#fcfbff] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#f1efff] text-[#5648f5]">
              <Upload className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-700">
              Drag & drop your registration certificate
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-400">
              PDF, JPG, or PNG • Max 5MB
            </p>
          </div>
        </div>

        {/* Document 2: GST / Tax ID */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1efff] text-[#5648f5]">
              <span className="text-[10px] font-black">2</span>
            </div>
            <p className="text-[13px] font-black text-slate-700">
              GST Certificate / Tax ID
            </p>
            <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-red-500">
              Required
            </span>
          </div>

          {/* Uploaded file preview */}
          <div className="flex items-center justify-between rounded-[16px] bg-[#f7f8fc] px-4 py-4 ring-1 ring-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white text-[#5648f5] ring-1 ring-slate-100">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">
                  gst_certificate_acme.pdf
                </p>
                <p className="text-[11px] font-medium text-slate-400">
                  1.2 MB • Uploaded
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <Check className="h-3.5 w-3.5" />
              </div>
              <button className="text-slate-300 hover:text-slate-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Document 3: PAN Card */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1efff] text-[#5648f5]">
              <span className="text-[10px] font-black">3</span>
            </div>
            <p className="text-[13px] font-black text-slate-700">
              Company PAN Card
            </p>
            <span className="ml-auto rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
              Optional
            </span>
          </div>
          <div className="rounded-[16px] border border-dashed border-slate-200 bg-[#fafafa] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-slate-100 text-slate-400">
              <Upload className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">
              Upload PAN Card
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-400">
              PDF, JPG, or PNG • Max 5MB
            </p>
          </div>
        </div>

        {/* Document 4: Authorization Letter */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1efff] text-[#5648f5]">
              <span className="text-[10px] font-black">4</span>
            </div>
            <p className="text-[13px] font-black text-slate-700">
              Authorized Signatory Letter
            </p>
            <span className="ml-auto rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
              Optional
            </span>
          </div>
          <div className="rounded-[16px] border border-dashed border-slate-200 bg-[#fafafa] p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-slate-100 text-slate-400">
              <Upload className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">
              Upload Authorization Letter
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-400">
              A letter on company letterhead authorizing you to hire
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 rounded-[16px] bg-[#fff8f1] px-4 py-4 text-sm font-medium leading-6 text-[#bc6b36] ring-1 ring-[#ffe4d2]">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              Verification typically takes 24-48 hours. You can start posting
              jobs immediately, but a verified badge will be added once the
              review is complete.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────── Main Page ───────────────────── */

export default function RecruiterOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const stepNavigation = {
    1: {
      leftLabel: "Save & Continue Later",
      leftIcon: undefined,
      onLeftClick: undefined,
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
      rightLabel: "Complete Setup",
      rightIcon: <Sparkles className="h-4 w-4" />,
      onRightClick: () => router.push("/recruiter"),
    },
  } as const;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(91,76,241,0.1),_transparent_24%),linear-gradient(180deg,#fbfbfe_0%,#f5f7fb_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1380px] flex-col px-4 py-5 sm:px-6">
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
          {/* Header */}
          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/recruiter"
                  className="text-lg font-black tracking-[-0.04em] text-[#4f46e5]"
                >
                  Nexus Talent
                </Link>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                  Recruiter Onboarding
                </span>
              </div>

              {/* Step badges */}
              <div className="flex items-center justify-center gap-4">
                {steps.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <StepBadge
                      index={item.id}
                      active={step === item.id}
                      completed={step > item.id}
                    />
                    {item.id !== steps.length ? (
                      <div
                        className={`mb-7 hidden h-px w-10 sm:block transition-colors duration-300 ${
                          step > item.id ? "bg-[#5648f5]" : "bg-slate-200"
                        }`}
                      />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#5648f5] hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-10">
            {step === 1 && <Step1CompanyProfile />}
            {step === 2 && <Step2HiringPreferences />}
            {step === 3 && <Step3Documents />}
          </div>

          {/* Navigation Footer */}
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

          {/* Security Bar */}
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
