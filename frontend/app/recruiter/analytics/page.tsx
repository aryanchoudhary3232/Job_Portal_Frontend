import { Download, Share2 } from "lucide-react";

export default function RecruiterAnalyticsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#5648f5]">
            Executive Overview
          </p>
          <h1 className="mt-2 text-[2.8rem] font-black tracking-[-0.05em] text-slate-900">
            Analytics Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Comprehensive insights into your hiring funnel efficiency and talent
            acquisition diversity metrics for Q1 2024.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
            <Download className="h-4 w-4" />
            Export Report
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-4 py-2.5 text-sm font-bold text-white shadow-[0_18px_28px_rgba(91,76,241,0.24)]">
            <Share2 className="h-4 w-4" />
            Share View
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        {[
          ["Active Applications", "2,842", "+12.5%", "#5648f5"],
          ["Avg. Time To Hire", "18 Days", "-2 days", "#f59e0b"],
          ["Offer Acceptance Rate", "88.2%", "+4%", "#10b981"],
          ["Cost Per Hire", "$4,250", "Steady", "#a855f7"],
        ].map(([label, value, delta, tone]) => (
          <article
            key={label}
            className="rounded-[24px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                {label}
              </p>
              <span className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: tone }}>
                {delta}
              </span>
            </div>
            <p className="mt-4 text-[2rem] font-black leading-none text-slate-900">
              {value}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_320px]">
        <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
                Candidate Pipeline Volume
              </h2>
              <p className="text-[11px] font-medium text-slate-400">
                Weekly applicant flow across all departments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#f2efff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#5648f5]">
                Week
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                Month
              </span>
            </div>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4">
            {[70, 84, 120, 86, 96, 32, 26].map((height, index) => (
              <div key={height} className="flex w-full flex-col items-center gap-4">
                <div
                  className={`w-full rounded-[14px] ${
                    index === 2 ? "bg-[#5648f5]" : "bg-[#dbd8ff]"
                  }`}
                  style={{ height }}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
            Top Referral Sources
          </h2>
          <div className="mt-6 space-y-4">
            {[
              ["LinkedIn Ads", "42%"],
              ["Employee Referrals", "28%"],
              ["Direct Search", "18%"],
              ["Job Boards", "12%"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-600">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#6556ff,#4c3df0)]"
                    style={{ width: value }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 text-sm font-bold text-[#5648f5]">
            View Source Analysis →
          </button>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <article className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
              Diversity & Inclusion
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
              Real-time breakdown of pipeline demographics based on voluntary
              disclosure data.
            </p>
            <p className="mt-6 text-[3rem] font-black leading-none text-[#5648f5]">
              34%
            </p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
              Current Diversity Mix Score
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
              Ethnicity Mix
            </h2>
            <div className="mt-6 space-y-4">
              {[
                ["Women", "52%", "bg-[#5648f5]"],
                ["Men", "31%", "bg-[#8b7eff]"],
                ["Other", "17%", "bg-slate-200"],
              ].map(([label, value, tone]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-600">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[28px] bg-[linear-gradient(180deg,#272055_0%,#342d75_100%)] p-6 text-white shadow-[0_30px_70px_rgba(39,32,85,0.28)]">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/56">
            Optimization Alert
          </p>
          <h2 className="mt-5 text-[2rem] font-black tracking-[-0.04em]">
            Hiring velocity is slowing for &apos;DevOps&apos; roles.
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-white/76">
            Consider increasing referral bonuses or sponsoring LinkedIn job ads
            to boost candidate volume in this bottleneck area.
          </p>
          <button className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#342d75]">
            Review DevOps Pipeline →
          </button>
        </article>
      </section>
    </div>
  );
}
