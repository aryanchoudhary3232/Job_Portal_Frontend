const candidates = [
  { name: "Alex Rivera", role: "Computer Science", location: "Stanford", score: 92, verification: "Verified", status: "In Review" },
  { name: "Maya Chen", role: "Data Analyst", location: "MIT", score: 88, verification: "Pending", status: "Matching" },
  { name: "Jordan Smith", role: "UX Research", location: "NYU", score: 79, verification: "Verified", status: "Shortlisted" },
  { name: "Elena Rodriguez", role: "Business Ops", location: "UCLA", score: 82, verification: "Pending", status: "In Review" },
];

const summary = [
  { label: "Growth", value: "+12%", note: "New signups in this week" },
  { label: "Quality", value: "82.4", note: "Average skill score" },
  { label: "Pending", value: "42", note: "Manual verifications required" },
];

export default function StaffCandidates() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66708f]">Staff Dashboard</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#181b2a] md:text-3xl">Candidate Management</h1>
          <p className="mt-1 text-sm text-[#6a728f]">Overview of all candidate activity and verification status.</p>
        </div>
        <button className="rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)] transition hover:bg-[#4338ca]">
          + Add Candidate
        </button>
      </div>

      <section className="rounded-2xl border border-[#e6e9f4] bg-white p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-[250px] flex-1 items-center gap-2 rounded-full border border-[#e3e7f2] bg-[#f8f9fd] px-4 py-2 text-sm text-[#65708c]">
            <span className="material-symbols-outlined text-[18px]">search</span>
            <input className="w-full bg-transparent outline-none placeholder:text-[#9ca3bd]" placeholder="Search by name, role, skills or university" />
          </div>
          <button className="rounded-full border border-[#dce1ef] bg-white px-4 py-2 text-sm font-semibold text-[#525a75]">Filter</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-[11px] font-black uppercase tracking-[0.12em] text-[#7a819e]">
                <th className="px-3 py-2">Candidate</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Verification</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.name} className="rounded-xl bg-[#fbfcff] text-sm text-[#2a314a]">
                  <td className="rounded-l-xl px-3 py-3 font-semibold">{candidate.name}</td>
                  <td className="px-3 py-3">{candidate.role} - {candidate.location}</td>
                  <td className="px-3 py-3 font-bold text-[#3525cd]">{candidate.score}%</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${candidate.verification === "Verified" ? "bg-[#e7f8ee] text-[#0e7a4b]" : "bg-[#fff3e8] text-[#b45309]"}`}>
                      {candidate.verification}
                    </span>
                  </td>
                  <td className="rounded-r-xl px-3 py-3">
                    <span className="rounded-full bg-[#ecebff] px-2.5 py-1 text-xs font-bold text-[#3525cd]">{candidate.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summary.map((item) => (
          <article key={item.label} className={`rounded-2xl border border-[#e6e9f4] p-5 ${item.label === "Pending" ? "bg-[#4f46e5] text-white" : "bg-white"}`}>
            <p className={`text-[11px] font-black uppercase tracking-[0.12em] ${item.label === "Pending" ? "text-white/70" : "text-[#7a819e]"}`}>{item.label}</p>
            <p className="mt-1 text-3xl font-black">{item.value}</p>
            <p className={`mt-2 text-xs ${item.label === "Pending" ? "text-white/80" : "text-[#67718e]"}`}>{item.note}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
