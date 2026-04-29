const topCandidates = [
  { name: "Alexander Vance", role: "CS, Stanford", score: 92, status: "Ready" },
  { name: "Maya Rodriguez", role: "Data Science, Georgia Tech", score: 88, status: "Matched" },
  { name: "Jordan Smith", role: "UX, Berkeley", score: 79, status: "Review" },
];

const openRoles = [
  { title: "Senior Frontend Engineer", team: "Nexus Product", location: "San Francisco", seats: 2 },
  { title: "Product Designer", team: "NovaTech Systems", location: "Remote", seats: 1 },
  { title: "Data Analyst", team: "BlueSky Logistics", location: "New York", seats: 1 },
];

const activity = [
  { text: "NovaTech confirmed interview for Maya R.", time: "10 mins ago", icon: "event_available" },
  { text: "Alexander profile flagged as high fit.", time: "30 mins ago", icon: "stars" },
  { text: "BlueSky opened a new analyst role.", time: "1 hour ago", icon: "work" },
  { text: "Jordan completed portfolio upload.", time: "2 hours ago", icon: "upload" },
];

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66708f]">Staff Dashboard</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#181b2a] md:text-3xl">Matching and Operations</h1>
          <p className="mt-1 text-sm text-[#6a728f]">Coordinate candidate-job matching and live queue updates.</p>
        </div>
        <button className="rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)] transition hover:bg-[#4338ca]">
          + Post New Job
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-5 lg:col-span-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1d2235]">Top Candidates</h2>
            <a href="/staff/candidates" className="text-xs font-bold text-[#4f46e5]">View all</a>
          </div>

          <div className="space-y-3">
            {topCandidates.map((candidate) => (
              <div key={candidate.name} className="rounded-xl border border-[#edf0f8] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#181b2a]">{candidate.name}</p>
                    <p className="text-xs text-[#6d7490]">{candidate.role}</p>
                  </div>
                  <span className="rounded-full bg-[#ecebff] px-2.5 py-1 text-[11px] font-bold text-[#3525cd]">{candidate.score}%</span>
                </div>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-[#7a819e]">{candidate.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-5 lg:col-span-5">
          <h2 className="mb-4 text-sm font-bold text-[#1d2235]">Open Job Positions</h2>
          <div className="space-y-3">
            {openRoles.map((role) => (
              <div key={role.title} className="rounded-xl border border-[#edf0f8] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#181b2a]">{role.title}</p>
                    <p className="text-xs text-[#6d7490]">{role.team} - {role.location}</p>
                  </div>
                  <span className="rounded-full bg-[#f2f4fb] px-2.5 py-1 text-[11px] font-semibold text-[#5c6482]">{role.seats} seats</span>
                </div>
                <button className="mt-3 w-full rounded-lg border border-dashed border-[#ced3e5] px-3 py-2 text-xs font-semibold text-[#5f6785] transition hover:border-[#4f46e5] hover:text-[#3525cd]">
                  Assign Candidate
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-5 lg:col-span-3">
          <h2 className="mb-4 text-sm font-bold text-[#1d2235]">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.text} className="flex gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#eeedff]">
                  <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">{item.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold leading-5 text-[#242a41]">{item.text}</p>
                  <p className="text-[11px] text-[#7a819e]">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-[#4f46e5] p-3 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.14em]">SLA Health</p>
            <p className="mt-1 text-lg font-black">99.98% Uptime</p>
            <p className="text-[11px] text-white/80">Queue latency under 2 mins</p>
          </div>
        </section>
      </div>
    </div>
  );
}
