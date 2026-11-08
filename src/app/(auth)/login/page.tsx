"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useAuth } from "../../../context/AuthContext";
import { useLang } from "../../../context/LangContext";

export default function LoginPage() {
  const [iin, setIin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login, users } = useAuth();
  const { t } = useLang();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = login(iin, password);
    if (message) {
      setError(message);
      return;
    }
    const role = users.find((item) => item.iin === iin)?.role ?? "user";
    router.push(role === "admin" ? "/dashboard/admin" : role === "farmer" ? "/dashboard/farmer" : role === "driver" ? "/dashboard/driver" : "/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-3 py-5 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(11,27,14,0.09)]">
        <div className="flex flex-col gap-5 p-5 sm:gap-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">FarmFlow</p>
            <h1 className="mt-3 max-w-xl text-3xl font-semibold text-[var(--text)] sm:mt-4 sm:text-5xl">Вход в систему мониторинга аграрной логистики</h1>
          </div>
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            <span className="hidden rounded-3xl bg-surface px-4 py-3 text-sm text-slate-600 lg:inline-block">{t.demoHint}</span>
            <LanguageSwitcher />
          </div>
        </div>
        <div className="grid gap-5 bg-[var(--bg)] p-4 sm:gap-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-8">
            <div className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{t.login}</div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                {t.iin}
                <input
                  maxLength={12}
                  inputMode="numeric"
                  value={iin}
                  onChange={(event) => setIin(event.target.value.replace(/\D/g, ""))}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--accent)]"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                {t.password}
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--accent)]"
                />
              </label>
              {error && <div className="rounded-3xl bg-[#ffe3e3] px-4 py-3 text-sm text-[#9b1c1c]">{error}</div>}
              <button type="submit" className="w-full rounded-3xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#163926]">
                {t.login}
              </button>
            </form>
          </div>
          <div className="rounded-3xl bg-[var(--accent)]/10 p-5 text-slate-700 sm:rounded-[2rem] sm:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">{t.demoHint}</div>
            <div className="mt-4 space-y-3 text-sm leading-7">
              <p>Admin: 880512300001</p>
              <p>Farmer: 850315600004</p>
              <p>Driver: 950214900007</p>
              <p className="text-slate-500">Пароль: password123</p>
            </div>
            <div className="mt-8 text-sm text-slate-600">
              <p>Нет аккаунта?</p>
              <Link href="/register" className="text-[var(--primary)] underline">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
