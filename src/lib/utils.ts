export function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-slate-100 text-slate-800";
    case "accepted":
      return "bg-blue-100 text-blue-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-emerald-100 text-emerald-800";
    case "receiving":
      return "bg-amber-100 text-amber-800";
    case "in_use":
      return "bg-orange-100 text-orange-800";
    case "completed":
      return "bg-emerald-950 text-white";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export function getStatusLabel(status: string, locale: "ru" | "kz", translations: Record<string, any>) {
  return translations[locale]?.status?.[status] ?? status;
}
