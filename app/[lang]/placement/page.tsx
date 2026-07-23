import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck, ArrowRight, Clock } from "lucide-react";
import { getDictionary, isLocale } from "@/lib/dictionaries";
import { placementTests } from "@/lib/placement-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "ar"
    ? {
        title: "اختبار تحديد المستوى",
        description:
          "أجرِ اختبار تحديد المستوى المجاني في الإنجليزية والألمانية والفرنسية والإيطالية والصينية واحصل على مستواك وفق الإطار الأوروبي المرجعي للغات.",
      }
    : {
        title: "Language Placement Test",
        description:
          "Take a free placement test in English, German, French, Italian, or Chinese and get your CEFR level instantly at Egyptos Centre.",
      };
}

export default async function PlacementHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.placement.hub;
  const tests = Object.values(placementTests);

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-300">
            <ClipboardCheck className="h-4 w-4" /> {t.badge}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-brand-800">{t.choose}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Link
              key={test.code}
              href={`/${lang}/placement/${test.code}`}
              className="group flex flex-col rounded-2xl border border-slate-200 p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-4xl" aria-hidden>{test.flag}</span>
              <h3 className="mt-4 text-xl font-semibold text-brand-800">
                {test.name}
              </h3>
              <p className="text-sm text-slate-500">{test.nativeName}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <span>{test.questions.length} {t.questionsLabel}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {t.minutes}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600 group-hover:text-brand-700">
                {t.start} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
