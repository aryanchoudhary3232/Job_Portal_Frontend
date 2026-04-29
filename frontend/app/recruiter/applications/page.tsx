import {
  CalendarClock,
  Filter,
  MessageSquareMore,
  Plus,
  Share2,
} from "lucide-react";

type PipelineCard = {
  name: string;
  role: string;
  company: string;
  badge: string;
  meta: string;
  avatar: string;
  subMeta?: string;
  featured?: boolean;
};

type PipelineColumn = {
  stage: string;
  count: number;
  cards: PipelineCard[];
};

const pipeline: PipelineColumn[] = [
  {
    stage: "Applied",
    count: 8,
    cards: [
      {
        name: "Elena Rodriguez",
        role: "UI/UX Designer",
        company: "Airbnb",
        badge: "94% Match",
        meta: "Applied 2h ago",
        avatar: "ER",
      },
      {
        name: "Jordan Smith",
        role: "Product Designer",
        company: "Meta",
        badge: "88% Match",
        meta: "Applied 5h ago",
        avatar: "JS",
      },
    ],
  },
  {
    stage: "Shortlisted",
    count: 5,
    cards: [
      {
        name: "Sarah Williams",
        role: "Sr. Designer",
        company: "Google",
        badge: "96% Match",
        meta: "Top Tier",
        avatar: "SW",
      },
    ],
  },
  {
    stage: "Interviewing",
    count: 3,
    cards: [
      {
        name: "David Kim",
        role: "Design Lead",
        company: "Spotify",
        badge: "91% Match",
        meta: "Final Technical Interview",
        subMeta: "Today, 2:00 PM - 3:00 PM",
        avatar: "DK",
        featured: true,
      },
    ],
  },
];

export default function RecruiterApplicationsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#5648f5]">
            Live Pipeline
          </p>
          <h1 className="mt-2 text-[2.7rem] font-black tracking-[-0.05em] text-slate-900">
            Senior Product Designer
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Reviewing 24 active candidates for the Design Team expansion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex -space-x-2">
            {["ER", "DK", "+4"].map((avatar) => (
              <div
                key={avatar}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(135deg,#334155,#94a3b8)] text-[10px] font-black text-white"
              >
                {avatar}
              </div>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200">
            <Share2 className="h-4 w-4" />
            Share Board
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {pipeline.map((column) => (
          <div key={column.stage}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[15px] font-black text-slate-900">
                  {column.stage}
                </h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  {column.count}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {column.cards.map((card) => (
                <article
                  key={card.name}
                  className={`rounded-[26px] bg-white p-5 shadow-[0_22px_55px_rgba(15,23,42,0.06)] ring-1 ${
                    card.featured
                      ? "ring-[#7a6eff] shadow-[0_18px_0_0_#7a6eff_inset]"
                      : "ring-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a,#475569)] text-sm font-black text-white">
                        {card.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {card.name}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-slate-400">
                          {card.role} • {card.company}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#f2efff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#5648f5]">
                      {card.badge}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <MessageSquareMore className="h-4 w-4" />
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <CalendarClock className="h-4 w-4" />
                    </button>
                  </div>

                  {card.subMeta ? (
                    <div className="mt-5 rounded-[18px] bg-[#f7f8fc] px-4 py-4 ring-1 ring-slate-100">
                      <p className="text-[11px] font-black text-slate-700">
                        {card.meta}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        {card.subMeta}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5 flex items-center justify-end text-[11px] font-bold text-slate-300">
                      {card.meta}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.9fr)_360px]">
        <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[1.4rem] font-black tracking-[-0.03em] text-slate-900">
              Hiring Velocity
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              Last 30 Days
            </span>
          </div>

          <div className="mt-10 flex items-end justify-between gap-4">
            {[54, 84, 62, 110, 94, 70, 40].map((height, index) => (
              <div key={height} className="flex w-full flex-col items-center gap-4">
                <div
                  className={`w-full rounded-[14px] ${
                    index === 4 ? "bg-[#5648f5]" : "bg-[#dbd8ff]"
                  }`}
                  style={{ height }}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">
                  {["Sep 15", "Sep 20", "Sep 25", "Sep 30", "Oct 05", "Oct 10", "Today"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[30px] bg-[linear-gradient(180deg,#5c4ef7_0%,#4232e8_100%)] p-6 text-white shadow-[0_30px_70px_rgba(91,76,241,0.28)]">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/60">
            Insights
          </p>
          <h2 className="mt-5 text-[2rem] font-black tracking-[-0.04em]">
            Talent Availability
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-white/76">
            UX Design candidates from top-tier firms are 14% more active this
            week.
          </p>
          <div className="mt-10 flex items-center justify-between gap-3">
            <button className="rounded-full bg-white/16 px-5 py-3 text-sm font-bold text-white backdrop-blur">
              View Detailed Report
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6d61ff] shadow-[0_16px_30px_rgba(34,20,170,0.34)]">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
