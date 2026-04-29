export default function RecruiterUsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-[2.8rem] font-black tracking-[-0.05em] text-slate-900">
            Team Management
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Control roles, access, and workload across your workspace.
          </p>
        </div>
        <button className="rounded-full bg-[linear-gradient(135deg,#6556ff,#4c3df0)] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_28px_rgba(91,76,241,0.24)]">
          Invite Team Member
        </button>
      </section>

      <section className="grid gap-6 xl:grid-cols-[280px_minmax(0,1.3fr)]">
        <div className="space-y-6">
          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
              Total Members
            </p>
            <p className="mt-3 text-[2.7rem] font-black leading-none text-slate-900">
              24
            </p>
            <div className="mt-5 flex -space-x-2">
              {["JS", "SC", "MT", "+18"].map((avatar) => (
                <div
                  key={avatar}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[linear-gradient(135deg,#334155,#94a3b8)] text-[10px] font-black text-white"
                >
                  {avatar}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <h2 className="text-[1.3rem] font-black tracking-[-0.03em] text-slate-900">
              Permission Roles
            </h2>
            <div className="mt-5 space-y-3">
              {[
                ["Admin", "4 Users"],
                ["Recruiter", "12 Users"],
                ["Hiring Manager", "8 Users"],
              ].map(([role, count]) => (
                <div
                  key={role}
                  className="flex items-center justify-between rounded-[16px] bg-[#fbfbfe] px-4 py-4 ring-1 ring-slate-100"
                >
                  <span className="text-sm font-black text-slate-900">{role}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="space-y-6">
          <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[1.35rem] font-black tracking-[-0.03em] text-slate-900">
                Active Members
              </h2>
              <button className="text-sm font-bold text-[#5648f5]">
                View History →
              </button>
            </div>

            <div className="space-y-4">
              {[
                ["Jordan Smith", "Recruiter", "32", "JS"],
                ["Sarah Chen", "Manager", "28", "SC"],
                ["Marcus Thorne", "Admin", "24", "MT"],
                ["Elena Rodriguez", "Recruiter", "18", "ER"],
              ].map(([name, role, jobs, avatar]) => (
                <div
                  key={name}
                  className="grid items-center gap-4 rounded-[18px] bg-[#fcfcff] px-4 py-4 ring-1 ring-slate-100 md:grid-cols-[minmax(0,1fr)_110px_140px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a,#475569)] text-[11px] font-black text-white">
                      {avatar}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{name}</p>
                      <p className="text-[11px] font-medium text-slate-400">
                        {jobs} active jobs
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#f3f1ff] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#5648f5]">
                    {role}
                  </span>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">
                      <span>Workload</span>
                      <span>{jobs}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#6556ff,#4c3df0)]"
                        style={{ width: `${jobs}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-full bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600">
              Load 10 More Members
            </button>
          </article>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_280px]">
            <article className="rounded-[28px] bg-[linear-gradient(180deg,#4334d8_0%,#3a2ec6_100%)] p-6 text-white shadow-[0_30px_70px_rgba(58,46,198,0.26)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/56">
                Management Tip
              </p>
              <h2 className="mt-5 text-[1.85rem] font-black leading-tight tracking-[-0.04em]">
                Optimizing Team Permissions for Better Collaboration
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-white/76">
                Ensure your hiring managers have &quot;View Only&quot; access to salary
                data while keeping recruitment workflows open.
              </p>
              <div className="mt-7 flex items-center gap-3">
                <button className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#4334d8]">
                  Configure Roles
                </button>
                <button className="rounded-full bg-white/16 px-5 py-3 text-sm font-bold text-white">
                  Learn More
                </button>
              </div>
            </article>

            <article className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-[#6d61ff]">
              <h2 className="text-[1.3rem] font-black tracking-[-0.03em] text-slate-900">
                Quick Invite
              </h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
                Send a direct invite to new hires to let them set up their
                workspace profile instantly.
              </p>
              <div className="mt-5 rounded-[16px] bg-[#f7f8fc] px-4 py-4 text-sm font-medium text-slate-400 ring-1 ring-slate-100">
                recruit@nexus.ai / jeri.team-34b
              </div>
              <div className="mt-5 flex items-center gap-2 text-[11px] font-bold text-[#5648f5]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#5648f5]" />
                SSO Authentication Enabled
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
