"use client";

import Link from "next/link";
import { LogOut, MapPinned, Menu, X, ClipboardList, Layers, PackageCheck, Package, Truck, Users } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import type { AppRole } from "../lib/mockData";
import NotificationBell from "./NotificationBell";
import LanguageSwitcher from "./LanguageSwitcher";

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Открыть меню"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link href={user?.role === "farmer" ? "/dashboard/farmer" : user?.role === "driver" ? "/dashboard/driver" : "/dashboard/admin"} className="truncate text-base font-semibold tracking-tight text-[var(--text)] sm:text-lg">
              FarmFlow
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</h1>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Link href="/dashboard/map" className="hidden rounded-2xl px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-slate-100 md:inline-flex md:items-center md:gap-2">
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              Карта
            </Link>
            <LanguageSwitcher />
            <NotificationBell />
            <div className="hidden items-center gap-3 rounded-3xl border border-slate-200 bg-surface px-4 py-2 shadow-sm sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--primary)]">{user?.name?.[0] ?? "A"}</div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{user?.name ?? "Гость"}</div>
                <div className="truncate text-xs text-slate-500">{user?.role?.toUpperCase()}</div>
              </div>
            </div>
            <button onClick={logout} aria-label={t.logout} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:text-sm sm:font-medium">
              <LogOut className="h-4 w-4 sm:hidden" aria-hidden="true" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Закрыть меню" className="absolute inset-0 z-0 h-full w-full bg-black/50" onClick={closeDrawer} />
          <div className="absolute left-0 top-0 z-10 flex h-dvh w-[min(20rem,85vw)] flex-col overflow-y-auto bg-white pb-[env(safe-area-inset-bottom)] shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <Link href="/" className="text-lg font-semibold text-[var(--primary)]" onClick={closeDrawer}>
                FarmFlow
              </Link>
              <button type="button" onClick={closeDrawer} aria-label="Закрыть меню" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl hover:bg-slate-100">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 p-4">
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
                {navItems[user?.role ?? "user"].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-surface hover:text-[var(--primary)]"
                  >
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-slate-200 p-4 text-xs text-slate-500">
              {user?.name ?? "Гость"} · {user?.role?.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
