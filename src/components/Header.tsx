"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import NotificationBell from "./NotificationBell";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { user, logout } = useAuth();
  const { t } = useLang();

  return (
    <div className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Link href={user?.role === "farmer" ? "/dashboard/farmer" : user?.role === "driver" ? "/dashboard/driver" : "/dashboard/admin"} className="text-base font-semibold tracking-tight text-[var(--text)] sm:text-lg">
            AgriTrack SKO
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <NotificationBell />
          <div className="hidden sm:flex items-center gap-3 rounded-3xl border border-slate-200 bg-surface px-4 py-2 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--primary)]">{user?.name?.[0] ?? "A"}</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">{user?.name ?? "Гость"}</div>
              <div className="truncate text-xs text-slate-500">{user?.role?.toUpperCase()}</div>
            </div>
          </div>
          <button onClick={logout} className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex">
            {t.logout}
          </button>
        </div>
      </div>
    </div>
  );
}
