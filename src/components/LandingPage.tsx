"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  ClipboardList,
  Eye,
  Leaf,
  MapPin,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sprout,
  Truck,
  type LucideIcon,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "../context/LangContext";

const journeyIcons: LucideIcon[] = [ClipboardList, Truck, ScanLine, Sprout];
const problemIcons: LucideIcon[] = [Truck, PackageCheck, Sprout];
const roleIcons: LucideIcon[] = [ClipboardList, Truck, Sprout, Eye];

export default function LandingPage() {
  const { t } = useLang();
  const copy = t.landing;

  return (
    <main id="main" className="overflow-hidden bg-[#fbfaf6] text-[#173c2e]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:shadow-lg"
      >
        {copy.skipToContent}
      </a>

      <header className="relative z-10 border-b border-[#e7e9df] bg-[#fbfaf6]/95">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" aria-label={`${copy.home} — FarmFlow`} className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1b553e] text-[#d9efbf] sm:h-10 sm:w-10">
              <Leaf className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xl font-bold tracking-tight text-[#183f30] sm:text-2xl">FarmFlow</span>
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-8 md:flex">
            <a href="#process" className="text-sm font-medium text-[#57675c] transition hover:text-[#173c2e]">
              {copy.processLink}
            </a>
            <a href="#roles" className="text-sm font-medium text-[#57675c] transition hover:text-[#173c2e]">
              {copy.rolesLink}
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#1b553e] px-4 text-sm font-semibold text-white transition hover:bg-[#123e2d] sm:px-5"
            >
              <span className="sm:hidden">{copy.signIn}</span>
              <span className="hidden sm:inline">{copy.signInLong}</span>
              <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <div id="content">
        <section
          className="relative isolate flex min-h-[650px] items-center overflow-hidden bg-cover bg-center px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[680px] lg:px-8"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(10, 31, 20, 0.9) 0%, rgba(10, 31, 20, 0.76) 48%, rgba(10, 31, 20, 0.22) 100%), linear-gradient(0deg, rgba(10, 31, 20, 0.42), transparent 55%), url("/farmflow-field.jpg")',
          }}
        >
          <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-sm sm:text-sm">
              <MapPin className="h-4 w-4 text-[#c5e3a1]" aria-hidden="true" />
              {copy.pilot}
            </p>
            <h1 className="mt-6 max-w-xl text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:mt-7 sm:text-5xl lg:text-[4rem]">
              {copy.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8">
              {copy.heroDescription}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#173c2e] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#eef4e9]"
              >
                {copy.signInLong}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#process"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {copy.howItWorks}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-9 flex items-start gap-3 border-t border-white/30 pt-5 sm:mt-11 sm:pt-6">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#c5e3a1]" aria-hidden="true" />
              <p className="max-w-md text-sm leading-6 text-white/75">{copy.journeyNote}</p>
            </div>
          </div>
          </div>
        </section>

        <section aria-labelledby="why-heading" className="border-y border-[#e8e9df] bg-white/75">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#55805a]">{copy.problemEyebrow}</p>
              <h2 id="why-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#183f30] sm:text-4xl">
                {copy.problemTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#647167]">{copy.problemDescription}</p>
            </div>
            <div className="mt-9 grid gap-3 sm:mt-11 sm:grid-cols-3 sm:gap-4">
              {copy.problemCards.map((card, index) => {
                const Icon = problemIcons[index];

                return (
                  <article key={card.title} className="rounded-2xl border border-[#e7e9e1] bg-[#fbfaf6] p-5 sm:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8efe2] text-[#386747]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-semibold text-[#244b36]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#68756b]">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" aria-labelledby="process-heading" className="scroll-mt-8">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#55805a]">{copy.processEyebrow}</p>
              <h2 id="process-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#183f30] sm:text-4xl">
                {copy.processTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#647167]">{copy.processDescription}</p>
            </div>

            <div className="mt-9 grid gap-3 sm:mt-11 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {copy.steps.map((step, index) => {
                const Icon = journeyIcons[index];

                return (
                  <article key={step.title} className="relative rounded-2xl border border-[#e5e8df] bg-white p-5 shadow-[0_8px_30px_rgba(33,63,42,0.035)] sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold tabular-nums text-[#82927f]">0{index + 1}</span>
                      <Icon className="h-5 w-5 text-[#548159]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[#244b36]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#68756b]">{step.text}</p>
                    {index < copy.steps.length - 1 && (
                      <ArrowRight className="absolute -right-[13px] top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-[#fbfaf6] p-1 text-[#739172] lg:block" aria-hidden="true" />
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="roles" aria-labelledby="roles-heading" className="scroll-mt-8 bg-[#f0f3e9]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#55805a]">{copy.rolesEyebrow}</p>
              <h2 id="roles-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#183f30] sm:text-4xl">
                {copy.rolesTitle}
              </h2>
            </div>
            <div className="mt-9 grid gap-3 sm:mt-11 sm:grid-cols-2 sm:gap-4">
              {copy.roles.map((role, index) => {
                const Icon = roleIcons[index];

                return (
                  <article key={role.title} className="flex items-start gap-4 rounded-2xl border border-[#e2e8dc] bg-white p-5 sm:p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf1e4] text-[#366b49]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#244b36]">{role.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#68756b]">{role.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section aria-labelledby="closing-heading" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#194d38] px-6 py-9 text-white sm:rounded-[2rem] sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14">
            <div className="max-w-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#d6e8b6]">
                <Boxes className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 id="closing-heading" className="mt-5 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {copy.closingTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">{copy.closingText}</p>
            </div>
            <Link
              href="/login"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#e5efce] px-6 text-sm font-semibold text-[#1d4b36] transition hover:bg-white sm:w-auto lg:mt-0"
            >
              {copy.signInLong}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mx-auto mt-5 max-w-7xl px-1 text-xs leading-5 text-[#788177] sm:mt-6 sm:text-sm">
            {copy.demoNote}
          </p>
        </section>
      </div>

      <footer className="border-t border-[#e7e9df] bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-[#68756b] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-[#244b36]">
            <Leaf className="h-4 w-4" aria-hidden="true" />
            FarmFlow
          </Link>
          <p>{copy.footer}</p>
        </div>
      </footer>
    </main>
  );
}
