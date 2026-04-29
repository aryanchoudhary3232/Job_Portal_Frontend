import { Download, Filter, MoreHorizontal } from "lucide-react";

const jobs = [
  {
    code: "SR",
    title: "Senior Product Designer",
    meta: "Posted 2 days ago",
    dept: "Product & Design",
    applicants: "24",
    status: "Active",
    tone: "text-emerald-500",
    codeTone: "bg-[#efeefe] text-[#5648f5]",
  },
  {
    code: "FE",
    title: "Fullstack Engineer",
    meta: "Posted 1 week ago",
    dept: "Engineering",
    applicants: "18",
    status: "Active",
    tone: "text-emerald-500",
    codeTone: "bg-[#ebfff5] text-[#10b981]",
  },
  {
    code: "MM",
    title: "Marketing Manager",
    meta: "Posted 3 weeks ago",
    dept: "Growth & Marketing",
    applicants: "12",
    status: "Paused",
    tone: "text-slate-400",
    codeTone: "bg-[#fff2ea] text-[#e67a46]",
  },
];

export default function RecruiterJobsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-[2.9rem] font-black tracking-[-0.05em] text-slate-900">
            Jobs Management
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
            Oversee your current recruitment pipelines, manage active listings,
            and optimize your hiring velocity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {[
          ["Active Postings", "24", "+12%"],
          ["Total Applicants", "1,482", "+9%"],
          ["Avg. Time To Hire", "18 Days", "-2d"],
        ].map(([label, value, delta], index) => (
          <article
            key={label}
            className="rounded-[26px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  index === 2
                    ? "bg-[#fff2ea] text-[#e67a46]"
                    : "bg-[#f1efff] text-[#5648f5]"
                }`}
              >
                <span className="text-lg font-black">{index + 1}</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-500">
                {delta}
              </span>
            </div>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-[2.4rem] font-black leading-none text-slate-900">
              {value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[30px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
            Active Job Postings
          </h2>
          <button className="text-slate-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <th className="pb-4">Job Title</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Applicants</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.title} className="border-b border-slate-50">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-black ${job.codeTone}`}
                      >
                        {job.code}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {job.title}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400">
                          {job.meta}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-500">
                      {job.dept}
                    </span>
                  </td>
                  <td className="py-5 text-sm font-black text-slate-700">
                    {job.applicants}
                  </td>
                  <td className={`py-5 text-sm font-black ${job.tone}`}>
                    {job.status}
                  </td>
                  <td className="py-5 text-right text-sm font-bold text-[#5648f5]">
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm font-medium text-slate-400">
          <span>Showing 1-3 of 24 active jobs</span>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              ‹
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5648f5] font-black text-white">
              1
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              2
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              3
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_320px]">
        <article className="rounded-[28px] bg-[linear-gradient(180deg,#4334d8_0%,#3a2ec6_100%)] p-6 text-white shadow-[0_30px_70px_rgba(58,46,198,0.26)]">
          <h2 className="text-[1.6rem] font-black tracking-[-0.03em]">
            Upgrade Your Sourcing
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-7 text-white/76">
            Unlock AI-powered candidate matching and unlimited job board
            syndication.
          </p>
          <button className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#4334d8]">
            Go Premium
          </button>
        </article>

        <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
            Quick Tip
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
            Jobs with clear salary ranges see a 30% increase in qualified
            applicants within the first 48 hours.
          </p>
          <button className="mt-5 text-sm font-bold text-[#5648f5]">
            Read more insights →
          </button>
        </article>
      </section>
    </div>
  );
}
