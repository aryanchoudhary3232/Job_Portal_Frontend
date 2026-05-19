import type { ReactNode } from "react";

type Column<T> = {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
};

export function DataTable<T>({
  columns,
  rows,
  emptyText,
}: {
  columns: Array<Column<T>>;
  rows: T[];
  emptyText: string;
}) {
  if (!rows.length) {
    return <div className="rounded-2xl border border-dashed border-[var(--outline-variant)] px-4 py-10 text-center text-sm text-[var(--on-surface-variant)]">{emptyText}</div>;
  }
  return (
    <div className="card-surface overflow-hidden rounded-[24px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] bg-[var(--surface-container-low)] px-4 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--on-surface-variant)]">
        {columns.map((column) => <div key={column.key}>{column.label}</div>)}
      </div>
      <div className="divide-y divide-[var(--outline-variant)]">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 bg-white/90 px-4 py-4 text-sm text-[var(--on-surface-variant)]">
            {columns.map((column) => <div key={column.key}>{column.render(row)}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}
