export function StatGrid({
  items,
}: {
  items: Array<{ label: string; value: string | number; accent?: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="rounded-[26px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
          <p className={`mt-3 text-[2.4rem] font-black leading-none text-slate-900 ${item.accent || ""}`}>{item.value}</p>
        </article>
      ))}
    </div>
  );
}
