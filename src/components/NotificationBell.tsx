"use client";

import { Bell, CheckCircle2, Mail, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLang } from "../context/LangContext";
import { useOrders } from "../context/OrdersContext";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { lang, t } = useLang();
  const { notifications, markAllNotificationsRead, markNotificationRead } = useOrders();

  const unreadCount = useMemo(() => notifications.filter((item) => !item.isRead).length, [notifications]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--danger)] text-[10px] text-white">{unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
          <div className="flex items-center justify-between gap-3 pb-3">
            <div className="text-sm font-semibold text-slate-900">{t.notifications}</div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="rounded-3xl bg-surface p-4 text-sm text-slate-500">{t.noNotifications}</div>
            ) : (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markNotificationRead(item.id)}
                  className="flex w-full items-start gap-3 rounded-3xl border border-slate-200 p-3 text-left transition hover:bg-slate-50"
                >
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--primary)]">
                    {item.isRead ? <CheckCircle2 className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-slate-800">{item.message[lang]}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.createdAt}</div>
                  </div>
                </button>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="mt-4 w-full rounded-2xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]"
            >
              {t.markAllRead}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
