import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  accent?: string;
};

export default function StatCard({ label, value, icon: Icon, accent = "bg-[var(--accent)]" }: StatCardProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-3xl sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900 sm:mt-2 sm:text-3xl">{value}</p>
        </div>
        <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${accent} text-white sm:h-12 sm:w-12 sm:rounded-3xl`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>
    </div>
  );
}
