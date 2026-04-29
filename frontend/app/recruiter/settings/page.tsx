const notificationSettings = [
  { label: "New Applications", enabled: true },
  { label: "Weekly Summary", enabled: false },
  { label: "Candidate Messaging", enabled: true },
];

export default function RecruiterSettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-[2.8rem] font-black tracking-[-0.05em] text-slate-900">
            Workspace Settings
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Manage your team&apos;s configuration, branding, and connectivity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600">
            Discard
          </button>
          <button className="rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_18px_28px_rgba(91,76,241,0.24)]">
            Save Changes
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_330px]">
        <div className="space-y-6">
          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.3rem] font-black tracking-[-0.03em] text-slate-900">
              Company Information
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Legal Entity Name
                </p>
                <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-100">
                  Nexus Talent Solutions Ltd.
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Headquarters
                </p>
                <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-100">
                  London, United Kingdom
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Website URL
                </p>
                <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-100">
                  https://nexustalent.io
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Company Bio
                </p>
                <div className="rounded-[12px] bg-[#f6f7fb] px-4 py-4 text-sm font-medium leading-7 text-slate-600 ring-1 ring-slate-100">
                  Nexus Talent is an industry-leading recruitment accelerator
                  focused on high-growth tech ecosystems.
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.3rem] font-black tracking-[-0.03em] text-slate-900">
              Brand Identity
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
              <div className="rounded-[18px] border border-dashed border-slate-200 bg-[#fafafa] p-4 text-center">
                <div className="flex h-28 items-center justify-center rounded-[14px] bg-slate-100 text-sm font-bold text-slate-400">
                  Click to upload
                </div>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Company Logo
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Primary Accent Color
                  </p>
                  <div className="flex items-center justify-between rounded-[12px] bg-[#f6f7fb] px-4 py-3.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 rounded-full bg-[#3525cd]" />
                      #3525CD
                    </div>
                    <button className="text-sm font-bold text-[#5648f5]">
                      Change
                    </button>
                  </div>
                </div>
                <div className="rounded-[18px] bg-[linear-gradient(180deg,#353db7_0%,#25317d_100%)] px-5 py-7 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/56">
                    Email Header
                  </p>
                  <p className="mt-3 text-lg font-black">
                    Branded recruiter outreach preview
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="space-y-6">
          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.25rem] font-black tracking-[-0.03em] text-slate-900">
              Notifications
            </h2>
            <div className="mt-5 space-y-4">
              {notificationSettings.map(({ label, enabled }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900">{label}</p>
                    <p className="text-[11px] font-medium text-slate-400">
                      Receive alerts about this workspace activity
                    </p>
                  </div>
                  <div
                    className={`relative h-6 w-11 rounded-full ${
                      enabled ? "bg-[#5648f5]" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm ${
                        enabled ? "left-6" : "left-1"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.25rem] font-black tracking-[-0.03em] text-slate-900">
              Integrations
            </h2>
            <div className="mt-5 space-y-3">
              {[
                ["Slack", "Connected"],
                ["Google Calendar", "Connected"],
                ["Zoom Video", "Available"],
              ].map(([tool, state]) => (
                <div
                  key={tool}
                  className="flex items-center justify-between rounded-[16px] bg-[#fbfbfe] px-4 py-4 ring-1 ring-slate-100"
                >
                  <span className="text-sm font-black text-slate-900">{tool}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#5648f5]">
                    {state}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-[linear-gradient(180deg,#1f2937_0%,#111827_100%)] p-6 text-white shadow-[0_30px_70px_rgba(17,24,39,0.28)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/56">
              Need Help?
            </p>
            <h2 className="mt-4 text-[1.6rem] font-black tracking-[-0.03em]">
              Struggling with workspace configuration or branding?
            </h2>
            <button className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900">
              Ask AI Assistant
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
