export default function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="h-5 w-2/5 rounded-full bg-slate-200 skeleton" />
        <div className="h-4 w-full rounded-full bg-slate-200 skeleton" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 rounded-3xl bg-slate-200 skeleton" />
          <div className="h-20 rounded-3xl bg-slate-200 skeleton" />
        </div>
      </div>
    </div>
  );
}
