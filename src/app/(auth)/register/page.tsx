"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useAuth } from "../../../context/AuthContext";
import { useLang } from "../../../context/LangContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { register } = useAuth();
  const { t } = useLang();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = register(name, iin, phone, password);
    if (message) {
      setError(message);
      return;
    }
    router.push("/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(11,27,14,0.09)]">
        <div className="flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">FarmFlow</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold text-[var(--text)] sm:text-5xl">Регистрация публичного пользователя</h1>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="bg-[var(--bg)] p-8 sm:p-10">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                {t.name}
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-surface px-4 py-3 text-slate-900 outline-none transition focus:border-[var(--accent)]"
                />
              </label>
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
                {t.phone}
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
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
                Зарегистрироваться
              </button>
            </form>
            <div className="mt-6 text-sm text-slate-600">
              Уже есть аккаунт? <Link href="/login" className="font-semibold text-[var(--primary)]">Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
