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
    return <div className="rounded-2xl border border-dashed border-[#ced3e5] px-4 py-10 text-center text-sm text-slate-500">{emptyText}</div>;
  }
  return (
    <div className="overflow-hidden rounded-[24px] ring-1 ring-slate-100">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] bg-[#fcfcff] px-4 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
        {columns.map((column) => <div key={column.key}>{column.label}</div>)}
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3 bg-white px-4 py-4 text-sm text-slate-700">
            {columns.map((column) => <div key={column.key}>{column.render(row)}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}
