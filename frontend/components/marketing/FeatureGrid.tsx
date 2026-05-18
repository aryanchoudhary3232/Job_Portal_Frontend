const features = [
  ["NCR-first rollout", "Start with verified NCR hiring lanes and expand region coverage over time."],
  ["Shortlist to selection pipeline", "Recruiters move candidates through interview, offer, and final selection in one flow."],
  ["Settlement tracking", "Staff can confirm selection outcomes and monitor first-salary settlement status."],
];

export function FeatureGrid() {
  return (
    <section className="glass-effect rounded-[40px] px-6 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-[var(--outline-variant)] md:px-10">
      <div className="mb-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--primary)]">Capabilities</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-900 md:text-5xl font-display">Everything you need to run the NCR hiring flow well.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {features.map(([title, text], index) => (
          <article key={title} className="enter-fade-up rounded-[30px] border border-[var(--outline-variant)] bg-white px-6 py-7" style={{ animationDelay: `${index * 140}ms` }}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Feature</p>
            <h3 className="mt-4 text-xl font-black text-slate-900 font-display">{title}</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-500">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
