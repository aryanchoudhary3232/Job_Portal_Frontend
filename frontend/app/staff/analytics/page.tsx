const metrics = [
  { label: "Total Active", value: "1,482", trend: "+6.5%" },
  { label: "New Applications", value: "248", trend: "+11.2%" },
  { label: "Pending Matches", value: "893", trend: "+4.1%" },
  { label: "Alerts", value: "42", trend: "-2.0%" },
];

const monthly = [42, 35, 58, 74, 49, 62, 44];
const maxBar = Math.max(...monthly);

const updates = [
  { type: "New Candidate Verified", detail: "Marcus Torres was added to AI track.", tone: "bg-[#ecebff] text-[#3525cd]" },
  { type: "Match Successful", detail: "Misha K accepted role at NovaTech.", tone: "bg-[#e8f8ef] text-[#117a4d]" },
  { type: "Verification Warning", detail: "4 profiles need missing transcripts.", tone: "bg-[#fff1ed] text-[#b45309]" },
];

export default function StaffAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66708f]">Staff Dashboard</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#181b2a] md:text-3xl">Analytics Overview</h1>
          <p className="mt-1 text-sm text-[#6a728f]">Monitoring real-time operational health and matching performance.</p>
        </div>
        <button className="rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)] transition hover:bg-[#4338ca]">
          Refresh Data
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <article key={item.label} className="rounded-2xl border border-[#e6e9f4] bg-white p-5">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#7a819e]">{item.label}</p>
            <p className="mt-2 text-3xl font-black text-[#181b2a]">{item.value}</p>
            <p className={`mt-2 text-xs font-bold ${item.trend.startsWith("-") ? "text-[#b45309]" : "text-[#3525cd]"}`}>{item.trend} from yesterday</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-5 lg:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1d2235]">Matching Efficiency</h2>
            <span className="rounded-full bg-[#f2f4fb] px-3 py-1 text-[11px] font-semibold text-[#65708c]">Last 7 days</span>
          </div>
          <div className="flex h-44 items-end gap-3">
            {monthly.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-[#dfe3f4]" style={{ height: `${(value / maxBar) * 100}%` }} />
                <span className="text-[11px] font-semibold text-[#7a819e]">D{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-[#f7f8fd] p-3">
              <p className="font-bold text-[#181b2a]">Avg Time to Match</p>
              <p className="mt-1 text-lg font-black text-[#3525cd]">12.4 Days</p>
            </div>
            <div className="rounded-xl bg-[#f7f8fd] p-3">
              <p className="font-bold text-[#181b2a]">Match Rate</p>
              <p className="mt-1 text-lg font-black text-[#3525cd]">94.2%</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-5 lg:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1d2235]">Recent Activity</h2>
            <a href="/staff/verification" className="text-xs font-bold text-[#4f46e5]">View all</a>
          </div>

          <div className="space-y-3">
            {updates.map((item) => (
              <div key={item.type} className="rounded-xl border border-[#edf0f8] p-3">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${item.tone}`}>
                  {item.type}
                </span>
                <p className="mt-2 text-xs font-medium text-[#303852]">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
