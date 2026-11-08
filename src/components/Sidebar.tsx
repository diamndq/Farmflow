"use client";

import Link from "next/link";
import { ClipboardList, Layers, MapPinned, PackageCheck, Package, Truck, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import type { AppRole } from "../lib/mockData";

const navItems: Record<AppRole, Array<{ label: string; href: string; icon: typeof Layers }>> = {
  admin: [
    { label: "Панель", href: "/dashboard/admin", icon: Layers },
    { label: "Заказы", href: "/dashboard/admin/orders", icon: ClipboardList },
    { label: "Новый заказ", href: "/dashboard/admin/orders/new", icon: Package },
    { label: "Карта", href: "/dashboard/map", icon: MapPinned },
  ],
  farmer: [
    { label: "Панель", href: "/dashboard/farmer", icon: Package },
    { label: "Приёмка", href: "/dashboard/farmer/receive", icon: PackageCheck },
    { label: "Использование", href: "/dashboard/farmer/usage", icon: Truck },
    { label: "История", href: "/dashboard/farmer/history", icon: Users },
    { label: "Карта", href: "/dashboard/map", icon: MapPinned },
  ],
  driver: [
    { label: "Панель", href: "/dashboard/driver", icon: Package },
    { label: "Карта", href: "/dashboard/map", icon: MapPinned },
  ],
  user: [
    { label: "Мониторинг", href: "/dashboard/user", icon: ClipboardList },
    { label: "Карта", href: "/dashboard/map", icon: MapPinned },
  ],
};

type SidebarProps = {
  role: AppRole | "user" | null;
  user: { name: string } | null;
};

export default function Sidebar({ role, user }: SidebarProps) {
  const pathname = usePathname();

  if (!role) return null;

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="rounded-3xl bg-[var(--accent)]/10 p-4 text-sm text-[var(--primary)] shadow-sm">
          <div className="font-semibold">FarmFlow</div>
          <div className="mt-2 text-xs text-slate-500">Роль: {role}</div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems[role].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  active ? "bg-[var(--primary)] text-white" : "text-slate-700 hover:bg-surface hover:text-[var(--primary)]"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-3xl border border-slate-200 bg-surface p-4">
          <div className="text-xs text-slate-500">Пользователь</div>
          <div className="mt-1 font-semibold text-slate-900">{user?.name ?? "Гость"}</div>
          <div className="text-xs text-slate-500">{role?.toUpperCase()}</div>
        </div>
      </div>
    </aside>
  );
}
