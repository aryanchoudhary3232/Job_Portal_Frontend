const queue = [
  { name: "Alex Thompson", company: "Open Source Labs", priority: "Primary", state: "Review" },
  { name: "NovaTech Systems", company: "Document Verification", priority: "Secondary", state: "Pending" },
  { name: "Sara Jenkins", company: "Credential Check", priority: "Primary", state: "In Review" },
  { name: "BlueSky Logistics", company: "Employment History", priority: "Secondary", state: "Pending" },
];

const checks = [
  { label: "Face Match", status: "Verified" },
  { label: "Government ID", status: "Checked" },
  { label: "Education", status: "Pending" },
  { label: "Background", status: "Pending" },
];

export default function StaffVerification() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66708f]">Staff Dashboard</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#181b2a] md:text-3xl">Verification Queue</h1>
        <p className="mt-1 text-sm text-[#6a728f]">Review identity and credential submissions from active candidates.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-4 xl:col-span-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1d2235]">Active Requests</h2>
            <span className="rounded-full bg-[#ecebff] px-2.5 py-1 text-xs font-bold text-[#3525cd]">24 open</span>
          </div>

          <div className="space-y-2">
            {queue.map((item, index) => (
              <article
                key={item.name}
                className={`rounded-xl border p-3 ${index === 0 ? "border-[#4f46e5] bg-[#f4f3ff]" : "border-[#edf0f8] bg-[#fbfcff]"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#181b2a]">{item.name}</p>
                    <p className="text-xs text-[#6d7490]">{item.company}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#7780a0]">{item.state}</span>
                </div>
                <p className="mt-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#8188a4]">{item.priority}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#e6e9f4] bg-white p-5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#1a1f33]">Alex Thompson</h2>
              <p className="text-sm text-[#6d7490]">Government ID - Social and Identity</p>
            </div>
            <span className="rounded-full bg-[#fff3e8] px-3 py-1 text-xs font-bold text-[#b45309]">Priority Review</span>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-12">
            <article className="rounded-xl border border-[#edf0f8] bg-[#fbfcff] p-4 lg:col-span-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7a819e]">Primary ID</p>
              <div className="mt-3 flex h-44 items-center justify-center rounded-lg border border-dashed border-[#ced3e5] bg-white text-center text-xs text-[#65708c]">
                Passport / National ID Preview
              </div>
            </article>

            <article className="rounded-xl border border-[#edf0f8] bg-[#fbfcff] p-4 lg:col-span-3">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7a819e]">Employment Proof</p>
              <div className="mt-3 rounded-lg border border-[#dde2f0] bg-white p-3 text-center">
                <span className="material-symbols-outlined text-[26px] text-[#4f46e5]">description</span>
                <p className="mt-2 text-xs font-semibold text-[#4a5371]">Download Document</p>
              </div>
            </article>

            <article className="rounded-xl border border-[#edf0f8] bg-[#fbfcff] p-4 lg:col-span-4">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7a819e]">System Validation</p>
              <div className="mt-3 space-y-2">
                {checks.map((check) => (
                  <div key={check.label} className="flex items-center justify-between rounded-lg border border-[#e6e9f4] bg-white px-3 py-2">
                    <span className="text-xs font-semibold text-[#4d5674]">{check.label}</span>
                    <span className={`text-xs font-bold ${check.status === "Pending" ? "text-[#b45309]" : "text-[#0e7a4b]"}`}>{check.status}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
            <button className="rounded-full bg-[#fde8e8] px-5 py-2 text-sm font-bold text-[#b42323]">Reject Request</button>
            <button className="rounded-full bg-[#4f46e5] px-5 py-2 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.3)]">Approve Verification</button>
          </div>
        </section>
      </div>
    </div>
  );
}
