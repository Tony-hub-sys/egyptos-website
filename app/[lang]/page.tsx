import Link from "next/link";
import {
  Award,
  FileText,
  Mic,
  PenLine,
  GraduationCap,
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getDictionary, isLocale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

const serviceIcons = [FileText, Mic, PenLine];
const featureIcons = [Clock, Users, PenLine, Award];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.home;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #e8b94f 0, transparent 40%), radial-gradient(circle at 80% 70%, #1a5f7a 0, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-sm font-medium text-gold-300">
            <Award className="h-4 w-4" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t.hero.title} <span className="text-gold-400">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${lang}/academy`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-8 py-4 text-base font-semibold text-brand-900 shadow-lg transition-colors hover:bg-gold-400"
            >
              <GraduationCap className="h-5 w-5" />
              {t.hero.ctaCourses}
            </Link>
            <Link
              href={`/${lang}/translation#quote`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              <FileText className="h-5 w-5" />
              {t.hero.ctaQuote}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust stats ──────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-brand-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
          {t.stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-brand-700">{value}</p>
              <p className="mt-1 text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-brand-800 sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{t.services.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {t.services.cards.map(({ title, desc }, i) => {
            const Icon = serviceIcons[i];
            return (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-brand-800">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href={`/${lang}/translation`}
            className="inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
          >
            {t.services.viewAll} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* ── Academy highlight ────────────────────────────────── */}
      <section className="bg-brand-800 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-300">
              <GraduationCap className="h-4 w-4" /> {t.academy.badge}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {t.academy.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t.academy.subtitle}
            </p>
            <ul className="mt-6 space-y-3">
              {t.academy.points.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${lang}/academy`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 font-semibold text-brand-900 transition-colors hover:bg-gold-400"
              >
                {t.academy.ctaDiscover}
              </Link>
              <Link
                href={`/${lang}/academy#placement`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.academy.ctaPlacement}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.academy.features.map(({ title, desc }, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={title} className="rounded-2xl bg-brand-700/60 p-6">
                  <Icon className="h-7 w-7 text-gold-400" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-800 sm:text-4xl">
          {t.cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">{t.cta.subtitle}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/${lang}/translation#quote`}
            className="rounded-lg bg-brand-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t.cta.quote}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="rounded-lg border border-brand-600 px-8 py-4 font-semibold text-brand-600 transition-colors hover:bg-brand-50"
          >
            {t.cta.contact}
          </Link>
        </div>
      </section>
    </>
  );
}
