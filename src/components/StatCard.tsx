type StatCardProps = {
  label: string;
  value: number;
  icon: React.ComponentType<any>;
  accent?: string;
};

export default function StatCard({ label, value, icon: Icon, accent = "bg-[var(--accent)]" }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${accent} text-white`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
