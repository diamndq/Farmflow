"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { t } from "../lib/translations";

type Lang = "ru" | "kz";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof t["ru"];
  toggleLang: () => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem("agritrack-lang");
    if (stored === "kz" || stored === "ru") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agritrack-lang", lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: setLangState,
      t: t[lang],
      toggleLang: () => setLangState(lang === "ru" ? "kz" : "ru"),
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within LangProvider");
  }
  return context;
}
