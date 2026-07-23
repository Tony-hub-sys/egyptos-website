import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  MessageSquare,
  PenLine,
  Users,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { getDictionary, isLocale } from "@/lib/dictionaries";

const whyIcons = [MessageSquare, PenLine, Users];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "ar"
    ? {
        title: "أكاديمية اللغات — برنامج الإنجليزية في 18 أسبوعًا",
        description:
          "انضم إلى برنامجنا الرئيسي للمحادثة والكتابة بالإنجليزية في 18 أسبوعًا بمركز إيجيبتوس في مطروح. مجموعات صغيرة، مدرّسون خبراء، واختبار تحديد مستوى مجاني.",
      }
    : {
        title: "Language Academy — 18-Week English Program",
        description:
          "Join the flagship 18-Week English Conversation and Writing Program at Egyptos Centre in Matrouh. Small groups, expert instructors, free placement test.",
      };
}

export default async function AcademyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.academy;

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-300">
            <GraduationCap className="h-4 w-4" /> {t.hero.badge}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${lang}/placement`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-8 py-4 font-semibold text-brand-900 transition-colors hover:bg-gold-400"
            >
              <ClipboardCheck className="h-5 w-5" />
              {t.hero.ctaPlacement}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.hero.ctaEnroll}
            </Link>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-800">{t.why.title}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {t.why.cards.map(({ title, desc }, i) => {
            const Icon = whyIcons[i];
            return (
              <div key={title} className="rounded-2xl border border-slate-200 p-8 shadow-sm">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-brand-800">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum timeline */}
      <section className="border-y border-slate-200 bg-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-brand-800">
            {t.journey.title}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {t.journey.phases.map(({ weeks, title, desc }, i) => (
              <div key={title} className="relative rounded-2xl bg-white p-8 shadow-sm">
                <span className="absolute -top-4 start-8 rounded-full bg-gold-500 px-4 py-1 text-sm font-bold text-brand-900">
                  {weeks}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-brand-800">
                  {i + 1}. {title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {t.journey.includes.map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Placement test CTA */}
      <section id="placement" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-brand-800 px-8 py-12 text-center text-white sm:px-12">
          <ClipboardCheck className="mx-auto h-12 w-12 text-gold-400" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{t.placement.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">{t.placement.subtitle}</p>
          <Link
            href={`/${lang}/placement`}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-4 font-semibold text-brand-900 transition-colors hover:bg-gold-400"
          >
            {t.placement.cta} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
          </Link>
          <p className="mt-4 text-xs text-slate-400">{t.placement.note}</p>
        </div>
      </section>
    </>
  );
}
