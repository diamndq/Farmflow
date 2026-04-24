"use client";

import { useLang } from "../context/LangContext";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
    >
      {lang.toUpperCase()}
    </button>
  );
}
