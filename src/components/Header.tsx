"use client";

import Link from "next/link";
import { Menu, X, ClipboardList, Layers, PackageCheck, Package, Truck, Users } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import NotificationBell from "./NotificationBell";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems: Record<string, Array<{ label: string; href: string; icon: React.ComponentType<any> }>> = {
  admin: [
    { label: "Панель", href: "/dashboard/admin", icon: Layers },
    { label: "Заказы", href: "/dashboard/admin/orders", icon: ClipboardList },
    { label: "Новый заказ", href: "/dashboard/admin/orders/new", icon: Package },
  ],
  farmer: [
    { label: "Панель", href: "/dashboard/farmer", icon: Package },
    { label: "Приёмка", href: "/dashboard/farmer/receive", icon: PackageCheck },
    { label: "Использование", href: "/dashboard/farmer/usage", icon: Truck },
    { label: "История", href: "/dashboard/farmer/history", icon: Users },
  ],
  driver: [
    { label: "Панель", href: "/dashboard/driver", icon: Package },
  ],
  user: [
    { label: "Мониторинг", href: "/dashboard/user", icon: ClipboardList },
  ],
};

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { user, logout } = useAuth();
  const { t } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href={user?.role === "farmer" ? "/dashboard/farmer" : user?.role === "driver" ? "/dashboard/driver" : "/dashboard/admin"} className="text-base font-semibold tracking-tight text-[var(--text)] sm:text-lg">
              FarmFlow
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href={"/dashboard/map"} className="text-base font-semibold tracking-tight text-[var(--text)] sm:text-lg">
              Map
            </Link>
            <LanguageSwitcher />
            <NotificationBell />
            <div className="hidden sm:flex items-center gap-3 rounded-3xl border border-slate-200 bg-surface px-4 py-2 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--primary)]">{user?.name?.[0] ?? "A"}</div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{user?.name ?? "Гость"}</div>
                <div className="truncate text-xs text-slate-500">{user?.role?.toUpperCase()}</div>
              </div>
            </div>
            <button onClick={logout} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeDrawer} />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <Link href="/" className="text-lg font-semibold text-[var(--primary)]" onClick={closeDrawer}>
                FarmFlow
              </Link>
              <button onClick={closeDrawer} className="p-2 rounded-2xl hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--primary)] text-lg font-semibold">
                  {user?.name?.[0] ?? "A"}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{user?.name ?? "Гость"}</div>
                  <div className="text-sm text-slate-500">{user?.role?.toUpperCase()}</div>
                </div>
              </div>
              <nav className="space-y-2">
                {navItems[user?.role || "user"]?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-surface hover:text-[var(--primary)]"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
