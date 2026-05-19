const insights = [
  { role: "Frontend Intern", range: "10k-20k / month", level: 65 },
  { role: "Data Analyst", range: "4-6 LPA", level: 80 },
  { role: "Marketing Associate", range: "3-4.5 LPA", level: 55 },
  { role: "UI/UX Intern", range: "12k-22k / month", level: 70 },
];

export function SalaryInsights() {
  return (
    <section id="insights" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Salary insights</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--on-surface)] font-display">Know your market value</h2>
        <p className="mt-4 text-sm leading-7 text-[var(--on-surface-variant)]">
          Explore typical stipend and entry-level salary ranges for popular student roles in NCR. Use this to set expectations before you apply.
        </p>
        <div className="mt-6 grid gap-4">
          {insights.map((item) => (
            <div key={item.role} className="rounded-2xl border border-[var(--outline-variant)] bg-white px-4 py-4">
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--on-surface)]">
                <span>{item.role}</span>
                <span className="text-[var(--primary)]">{item.range}</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-[var(--surface-container)]">
                <div className="h-2 rounded-full bg-[var(--primary)]" style={{ width: `${item.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-surface rounded-[28px] p-6">
        <p className="text-sm font-bold text-[var(--on-surface)]">Top in-demand skills</p>
        <div className="mt-5 grid gap-4">
          {[
            { skill: "React", demand: 85 },
            { skill: "SQL", demand: 78 },
            { skill: "Figma", demand: 66 },
            { skill: "Marketing", demand: 60 },
          ].map((item) => (
            <div key={item.skill}>
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--on-surface-variant)]">
                <span>{item.skill}</span>
                <span>{item.demand}% hiring</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-[var(--surface-container)]">
                <div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${item.demand}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
