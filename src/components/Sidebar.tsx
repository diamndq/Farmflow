"use client";

import Link from "next/link";
import { ClipboardList, Layers, PackageCheck, Package, Truck, Users } from "lucide-react";
import { useLang } from "../context/LangContext";
import { AppRole } from "../lib/mockData";

const navItems: Record<AppRole, Array<{ label: string; href: string; icon: React.ComponentType<any> }>> = {
  admin: [
    { label: "Панель", href: "/dashboard/admin", icon: Layers },
    { label: "Заказы", href: "/dashboard/admin/orders/new", icon: ClipboardList },
  ],
  farmer: [
    { label: "Панель", href: "/dashboard/farmer", icon: Package },
    { label: "Приёмка", href: "/dashboard/farmer/receive", icon: PackageCheck },
    { label: "Использование", href: "/dashboard/farmer/usage", icon: Truck },
    { label: "История", href: "/dashboard/farmer/history", icon: Users },
  ],
  driver: [
    { label: "Панель", href: "/dashboard/driver", icon: Package },
    { label: "Доставка", href: "/dashboard/driver/delivery/order-001", icon: Truck },
  ],
  user: [
    { label: "Мониторинг", href: "/dashboard/user", icon: ClipboardList },
  ],
};

type SidebarProps = {
  role: AppRole | "user" | null;
};

export default function Sidebar({ role }: SidebarProps) {
  const { lang } = useLang();

  if (!role) return null;

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="rounded-3xl bg-[var(--accent)]/10 p-4 text-sm text-[var(--primary)] shadow-sm">
          <div className="font-semibold">AgriTrack SKO</div>
          <div className="mt-2 text-xs text-slate-500">Роль: {role}</div>
        </div>
        <nav className="space-y-1">
          {navItems[role].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-surface hover:text-[var(--primary)]"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
