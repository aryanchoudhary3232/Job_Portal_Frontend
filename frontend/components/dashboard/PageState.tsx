export function PageState({
  loading,
  error,
}: {
  loading: boolean;
  error: string;
}) {
  if (loading) {
    return <div className="rounded-[28px] bg-white p-10 text-sm font-medium text-slate-500 shadow-[0_24px_60px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">Loading portal data...</div>;
  }
  if (error) {
    return <div className="rounded-[28px] border border-red-200 bg-red-50 p-10 text-sm font-medium text-red-700">{error}</div>;
  }
  return null;
}
