import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Target, Heart, Award, ArrowRight } from "lucide-react";
import { getDictionary, isLocale } from "@/lib/dictionaries";

const cardIcons = [Target, Heart, Award];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "ar"
    ? {
        title: "من نحن",
        description:
          "قصة مركز إيجيبتوس للغات والترجمة — نخدم مطروح، مصر بخدمات الترجمة وتعليم اللغات منذ عام 2016.",
      }
    : {
        title: "About Us",
        description:
          "The story of Egyptos Centre for Languages and Translation — serving Matrouh, Egypt with translation services and language education since 2016.",
      };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.aboutPage;

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.hero.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-800">{t.storyTitle}</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
          {t.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-brand-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {t.cards.map(({ title, desc }, i) => {
            const Icon = cardIcons[i];
            return (
              <div key={title} className="rounded-2xl bg-white p-8 shadow-sm">
                <Icon className="h-8 w-8 text-brand-600" />
                <h3 className="mt-4 text-xl font-semibold text-brand-800">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <MapPin className="mx-auto h-10 w-10 text-brand-600" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-800">{t.rootedTitle}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">{t.rootedBody}</p>
        <Link
          href={`/${lang}/contact`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {t.rootedCta} <ArrowRight className="h-5 w-5 rtl:rotate-180" />
        </Link>
      </section>
    </>
  );
}
