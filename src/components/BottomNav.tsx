"use client";

import Link from "next/link";
import { Home, Package, Scan, Truck, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import type { AppRole } from "../lib/mockData";

const navMap: Record<AppRole, Array<{ id: string; href: string; label: string; icon: typeof Home }>> = {
  admin: [
    { id: "home", href: "/dashboard/admin", label: "Панель", icon: Home },
    { id: "orders", href: "/dashboard/admin/orders", label: "Заказы", icon: ClipboardList },
    { id: "new", href: "/dashboard/admin/orders/new", label: "Новый", icon: Package },
  ],
  farmer: [
    { id: "home", href: "/dashboard/farmer", label: "Панель", icon: Home },
    { id: "receive", href: "/dashboard/farmer/receive", label: "Приёмка", icon: Scan },
    { id: "usage", href: "/dashboard/farmer/usage", label: "Использ.", icon: Package },
    { id: "history", href: "/dashboard/farmer/history", label: "История", icon: Truck },
  ],
  driver: [
    { id: "home", href: "/dashboard/driver", label: "Панель", icon: Home },
  ],
  user: [
    { id: "monitor", href: "/dashboard/user", label: "Мониторинг", icon: ClipboardList },
  ],
};

type BottomNavProps = {
  role: AppRole | null;
};

export default function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();
  if (!role || !navMap[role]) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-[calc(4rem+env(safe-area-inset-bottom))] border-t border-slate-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 shadow-[0_-6px_20px_rgba(15,23,42,0.08)] md:hidden">
      <nav className="flex h-14 gap-1">
        {navMap[role].map((item) => {
          const active = pathname === item.href;
          return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1 text-center text-xs font-medium transition ${active ? "bg-[var(--accent)]/15 text-[var(--primary)]" : "text-slate-500 hover:bg-slate-100"}`}>
            <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="max-w-full truncate">{item.label}</span>
          </Link>;
        })}
      </nav>
    </div>
  );
}
