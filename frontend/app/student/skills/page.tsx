import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Flame,
  Lock,
  Orbit,
  PenTool,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";

const courses: Array<{
  title: string;
  description: string;
  modules: string;
  progress: number;
  icon: LucideIcon;
  accent: string;
  iconTone: string;
}> = [
  {
    title: "Advanced Prototyping in Figma",
    description:
      "Master complex auto-layout and variables for production-ready handoffs.",
    modules: "4/12 Modules",
    progress: 35,
    icon: PenTool,
    accent: "bg-[#f2ecff]",
    iconTone: "text-[#5b4cf1]",
  },
  {
    title: "UX Research Analytics",
    description:
      "Bridge qualitative findings with quantitative data using Hotjar and GA4.",
    modules: "8/10 Modules",
    progress: 80,
    icon: Orbit,
    accent: "bg-[#fff0e8]",
    iconTone: "text-[#ed7a43]",
  },
];

const skillGapItems: Array<{
  title: string;
  detail: string;
  action: string;
  mastered?: boolean;
}> = [
  {
    title: "Visual Design Systems",
    detail: "Strong alignment with current product design benchmarks.",
    action: "Mastered",
    mastered: true,
  },
  {
    title: "Interaction Design (Motion)",
    detail: "Required by 90% of your saved roles.",
    action: "Explore Course",
  },
  {
    title: "Business Strategy for Designers",
    detail: "A growing gap for senior-level portfolio reviews.",
    action: "Explore Course",
  },
];

const certifications = [
  {
    title: "Google UX Professional",
    meta: "Completed Nov 2024",
  },
  {
    title: "Interaction Design Foundation",
    meta: "Completed Jan 2024",
  },
];

const upcoming = [
  {
    title: "Baymard E-commerce UX",
    meta: "Expires in 2 more weeks",
  },
];

export default function StudentSkills() {
  return (
    <div className="min-h-full">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6">
        <section className="px-2 py-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#5b4cf1]">
                Upskilling Engine
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-900 sm:text-[3.05rem]">
                Master your craft.
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-[15px]">
                We&apos;ve analyzed your dream job roles at Google and Stripe.
                Here are the precise skills you need to bridge the gap and land
                the interview.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_248px]">
          <div className="space-y-6">
            <section>
              <div className="mb-4 flex items-center justify-between gap-4 px-2">
                <h2 className="text-[1.34rem] font-black tracking-[-0.03em] text-slate-900">
                  In-Progress Courses
                </h2>
                <button className="text-sm font-bold text-[#5b4cf1] transition hover:text-[#4737e5]">
                  View All Schedule
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {courses.map((course) => (
                  <article
                    key={course.title}
                    className="flex min-h-[248px] flex-col rounded-[20px] bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 transition hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${course.accent}`}
                      >
                        <course.icon className={`h-5 w-5 ${course.iconTone}`} />
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ring-1 ring-slate-100">
                        {course.modules}
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-[220px] text-[17px] font-black leading-6 tracking-[-0.03em] text-slate-900">
                      {course.title}
                    </h3>
                    <p className="mt-3 max-w-[240px] text-[13px] font-medium leading-5 text-slate-500">
                      {course.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="mb-2 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                        <span>Progress</span>
                        <span className="text-slate-500">{course.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200/70">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#6556ff,#4c3df0)]"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[22px] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-[1.3rem] font-black tracking-[-0.03em] text-slate-900">
                    Skill Gap Analysis
                  </h2>
                  <p className="mt-1.5 text-[13px] font-medium text-slate-500">
                    Based on &quot;Product Designer&quot; roles at top tech
                    companies.
                  </p>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f2efff] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#5b4cf1]">
                  <Sparkles className="h-3.5 w-3.5" />
                  82% Match
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {skillGapItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-[18px] bg-[#fbfbfe] p-4 ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                          item.mastered ? "bg-[#ebfff1]" : "bg-[#f2efff]"
                        }`}
                      >
                        {item.mastered ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-[#5b4cf1]" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-slate-900 sm:text-[15px]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                    </div>

                    <button
                      className={`inline-flex w-fit shrink-0 items-center justify-center rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] ${
                        item.mastered
                          ? "bg-slate-100 text-slate-400"
                          : "bg-[linear-gradient(135deg,#6556ff,#4c3df0)] text-white shadow-[0_14px_24px_rgba(91,76,241,0.22)]"
                      }`}
                    >
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#6354ff_0%,#4232e8_100%)] p-5 text-white shadow-[0_24px_50px_rgba(91,76,241,0.3)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-black tracking-[-0.03em]">
                  Learning Streak
                </h2>
                <Flame className="h-4 w-4 text-white/90" />
              </div>

              <div className="mt-8">
                <div className="flex items-end gap-1">
                  <span className="text-[58px] font-black leading-none">12</span>
                  <span className="pb-1 text-[14px] font-medium text-white/78">
                    Days
                  </span>
                </div>
                <p className="mt-4 max-w-[126px] text-[10px] font-medium leading-4 text-white/65">
                  You&apos;re in the top 5% of active learners this month. Keep
                  it up!
                </p>
              </div>

              <div className="mt-12 flex items-end justify-center gap-2">
                {[28, 40, 32, 52, 36].map((height, index) => (
                  <div
                    key={height}
                    className={`rounded-[8px] ${
                      index === 3 ? "bg-white" : "bg-white/22"
                    }`}
                    style={{ height, width: index === 3 ? 18 : 16 }}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-[14px] bg-white p-4 shadow-[0_20px_48px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-black tracking-[-0.03em] text-slate-900">
                  Certifications
                </h2>
                <Settings className="h-3.5 w-3.5 text-slate-400" />
              </div>

              <div className="mt-4 space-y-3">
                {certifications.map((certificate) => (
                  <div
                    key={certificate.title}
                    className="flex items-start gap-3 rounded-[12px] bg-[#fcfcff] p-3 ring-1 ring-slate-100"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#f4f1ff]">
                      <BadgeCheck className="h-4 w-4 text-[#5b4cf1]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[11px] font-black leading-4 text-slate-900">
                        {certificate.title}
                      </h3>
                      <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500">
                        {certificate.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-dashed border-slate-200 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Upcoming
                </p>
                <div className="mt-3 space-y-3">
                  {upcoming.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-[12px] bg-[#fafafa] p-3 ring-1 ring-slate-100"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-slate-100">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black leading-4 text-slate-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500">
                          {item.meta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#20303d_0%,#111a21_100%)] p-4 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
              <div className="absolute inset-x-4 top-5 h-24 rounded-[16px] bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.04))] p-3">
                <div className="flex h-full items-center justify-center rounded-[14px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))]">
                  <div className="rounded-md bg-white/84 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-700">
                    Design Deck
                  </div>
                </div>
              </div>

              <div className="pt-28">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#5b4cf1] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em]">
                  New Guide
                </div>
                <h2 className="mt-4 text-[12px] font-black leading-5 tracking-[-0.02em]">
                  Portfolio Storytelling for Senior Roles
                </h2>
                <button className="mt-2 inline-flex items-center gap-2 text-[10px] font-bold text-white/82 transition hover:text-white">
                  Read now
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
