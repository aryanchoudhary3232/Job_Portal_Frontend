import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
} from "lucide-react";

const stats = [
  {
    label: "Active Jobs",
    value: "24",
    delta: "+44%",
    icon: BriefcaseBusiness,
    tone: "bg-[#f1efff] text-[#5648f5]",
  },
  {
    label: "Total Applications",
    value: "1,482",
    delta: "+18%",
    icon: FileText,
    tone: "bg-[#f1efff] text-[#5648f5]",
  },
  {
    label: "Interviews Today",
    value: "03",
    delta: "Today",
    icon: FolderKanban,
    tone: "bg-[#fff2ea] text-[#e67a46]",
  },
];

const applicants = [
  {
    name: "Alex Rivera",
    role: "Senior Product Designer",
    meta: "Applied 2h ago",
    badge: "New",
    avatar: "AR",
  },
  {
    name: "Maya Singh",
    role: "Lead Fullstack Engineer",
    meta: "Applied 5h ago",
    badge: "Pending",
    avatar: "MS",
  },
  {
    name: "James Sterling",
    role: "Marketing Manager",
    meta: "Applied 1d ago",
    badge: "Pending",
    avatar: "JS",
  },
];

export default function RecruiterHomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <section>
        <h1 className="text-[3rem] font-black tracking-[-0.05em] text-slate-900">
          Welcome back, Sarah
        </h1>
        <p className="mt-2 text-base font-semibold text-slate-500">
          You have 12 applications to review and 3 interviews scheduled for
          today.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[26px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.tone}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-500">
                {stat.delta}
              </span>
            </div>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
              {stat.label}
            </p>
            <p className="mt-2 text-[2.4rem] font-black leading-none text-slate-900">
              {stat.value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_360px]">
        <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-[1.5rem] font-black tracking-[-0.03em] text-slate-900">
              Recent Applications Requiring Action
            </h2>
            <Link
              href="/recruiter/applications"
              className="text-sm font-bold text-[#5648f5]"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant.name}
                className="flex items-center gap-4 rounded-[24px] bg-[#fcfcff] px-4 py-4 ring-1 ring-slate-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#334155)] text-sm font-black text-white">
                  {applicant.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-slate-900">
                    {applicant.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {applicant.role} • {applicant.meta}
                  </p>
                </div>
                <span className="rounded-full bg-[#f3f1ff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#5648f5]">
                  {applicant.badge}
                </span>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5648f5] ring-1 ring-slate-100">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.45rem] font-black tracking-[-0.03em] text-slate-900">
              Hiring Performance
            </h2>
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-500">
              -2.1d this month
            </span>
          </div>

          <div className="mt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Time To Hire
            </p>
            <p className="mt-2 text-[2.6rem] font-black leading-none text-slate-900">
              18.4
              <span className="ml-2 text-xl text-slate-400">Days</span>
            </p>
          </div>

          <div className="mt-8 flex items-end justify-between gap-3">
            {[58, 92, 70, 132, 102, 82, 62].map((height, index) => (
              <div key={height} className="flex flex-col items-center gap-3">
                <div
                  className={`w-9 rounded-full ${
                    index === 4 ? "bg-[#5648f5]" : "bg-slate-100"
                  }`}
                  style={{ height }}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-5 text-[11px] font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5648f5]" />
              Offers Sent
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              Avg. Baseline
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-[28px] bg-white px-6 py-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f1efff] text-[#5648f5]">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">
                Talent Insights are ready
              </p>
              <p className="text-xs font-medium text-slate-400">
                Your weekly report on engineering talent market trends is
                available for review.
              </p>
            </div>
          </div>

          <button className="rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700">
            Generate Report
          </button>
        </div>
      </section>
    </div>
  );
}
