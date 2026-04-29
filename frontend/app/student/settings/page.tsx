import Image from "next/image";
import {
  Bell,
  ChevronDown,
  Globe,
  Lock,
  Pencil,
  Shield,
  UserRound,
} from "lucide-react";

const securityItems = [
  {
    title: "Change Password",
    detail: "Last changed 4 months ago",
    action: "Update",
  },
  {
    title: "Two-Factor Authentication",
    detail: "Add an extra layer of security",
    action: "Enable",
  },
];

const notificationItems = [
  {
    title: "Email Notifications",
    detail: "Receive daily updates on new matches and application updates.",
    enabled: true,
  },
  {
    title: "Job Recommendations",
    detail: "Instant alerts when a job matches your skills and profile.",
    enabled: true,
  },
  {
    title: "Learning Opportunities",
    detail: "Weekly suggestions based on courses completed and your activity.",
    enabled: false,
  },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-[#5b4cf1]" : "bg-slate-200"
      }`}
    >
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </div>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-4 w-4 items-center justify-center text-[#5b4cf1]">
        {icon}
      </div>
      <h2 className="text-[15px] font-black text-slate-900">{title}</h2>
    </div>
  );
}

export default function StudentSettings() {
  return (
    <div className="min-h-full">
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-7">
        <section className="px-1 py-3">
          <h1 className="text-[2rem] font-black tracking-[-0.04em] text-slate-900">
            Settings
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage your account preferences, privacy, and security.
          </p>
        </section>

        <section className="space-y-3">
          <SectionTitle
            icon={<UserRound className="h-3.5 w-3.5 fill-current" />}
            title="Profile Settings"
          />

          <div className="rounded-[16px] bg-white p-4 shadow-[0_20px_44px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 sm:p-5">
            <div className="grid gap-5 md:grid-cols-[112px_minmax(0,1fr)] md:items-start">
              <div className="relative w-fit">
                <div className="overflow-hidden rounded-[16px] bg-[#0f1720] p-[3px] shadow-[0_14px_28px_rgba(15,23,42,0.16)]">
                  <div className="overflow-hidden rounded-[13px]">
                    <Image
                      src="/student-avatar.svg"
                      alt="Student avatar"
                      width={106}
                      height={106}
                      className="h-[106px] w-[106px] object-cover"
                    />
                  </div>
                </div>
                <button className="absolute -bottom-3 -right-3 flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#5b4cf1] text-white shadow-[0_10px_20px_rgba(91,76,241,0.24)]">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid gap-3.5">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Full Name
                    </p>
                    <div className="rounded-[10px] bg-[#f6f7fb] px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-100">
                      Alex Rivers
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Email Address
                    </p>
                    <div className="rounded-[10px] bg-[#f6f7fb] px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-100">
                      alex.rivers@design.edu
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Short Bio
                  </p>
                  <div className="rounded-[10px] bg-[#f6f7fb] px-4 py-4 text-sm font-medium leading-7 text-slate-600 ring-1 ring-slate-100">
                  Product Design student passionate about creating frictionless
                  digital experiences. Seeking summer 2024 internships.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle
            icon={<Lock className="h-3.5 w-3.5 fill-current" />}
            title="Account Security"
          />

          <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_20px_44px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
            {securityItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center justify-between gap-4 px-4 py-4 sm:px-5 ${
                  index !== securityItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#f3f1ff] text-[#5b4cf1]">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
                <button className="text-[10px] font-black uppercase tracking-[0.14em] text-[#5b4cf1]">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle
            icon={<Bell className="h-3.5 w-3.5 fill-current" />}
            title="Notification Preferences"
          />

          <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_20px_44px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
            {notificationItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center justify-between gap-4 px-4 py-4 sm:px-5 ${
                  index !== notificationItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="pr-4">
                  <p className="text-sm font-bold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-5 text-slate-400">
                    {item.detail}
                  </p>
                </div>
                <Toggle enabled={item.enabled} />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionTitle
            icon={<Shield className="h-3.5 w-3.5 fill-current" />}
            title="Privacy"
          />

          <div className="rounded-[16px] bg-white p-4 shadow-[0_20px_44px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 sm:p-5">
            <div className="rounded-[12px] bg-[#f7f8fc] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-white text-slate-500 ring-1 ring-slate-200">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">
                    Recruiter Visibility
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-5 text-slate-400">
                    Allow verified recruiters to find your profile even if you
                    haven&apos;t applied to their jobs.
                  </p>

                  <div className="mt-3 flex w-full items-center justify-between rounded-[10px] bg-white px-3 py-2.5 text-[12px] font-semibold text-slate-500 ring-1 ring-slate-100 sm:max-w-[260px]">
                    <span>Visible to all recruiters</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] font-black text-slate-500">
                Public Profile Link
              </p>
              <div className="flex items-center gap-2 rounded-[10px] bg-[#f7f8fc] px-3 py-2 text-[10px] font-semibold text-slate-400 ring-1 ring-slate-100">
                <span>careerarchitect.io/u/alex-rivers</span>
                <div className="h-3.5 w-px bg-slate-200" />
                <span className="text-slate-500">copy</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-end">
          <button className="px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:text-slate-600">
            Discard Changes
          </button>
          <button className="rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(91,76,241,0.26)] transition hover:-translate-y-0.5">
            Save Preferences
          </button>
        </section>
      </div>
    </div>
  );
}
