import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText, Mic, PenLine, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { getDictionary, isLocale } from "@/lib/dictionaries";

const serviceIcons = [FileText, Mic, PenLine];
const trustIcons = [ShieldCheck, Clock, BadgeCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "ar"
    ? {
        title: "خدمات الترجمة والخدمات المؤسسية",
        description:
          "ترجمة معتمدة للوثائق، وترجمة فورية احترافية، وخدمات كتابة مؤسسية في مطروح، مصر. اطلب عرض سعر مجانيًا من مركز إيجيبتوس.",
      }
    : {
        title: "Translation & Corporate Services",
        description:
          "Certified document translation, professional interpretation, and corporate writing services in Matrouh, Egypt. Request a free quote from Egyptos Centre.",
      };
}

export default async function TranslationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.translationPage;

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.hero.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        {t.services.map(({ title, desc, points }, i) => {
          const Icon = serviceIcons[i];
          return (
            <div
              key={title}
              className="grid gap-6 rounded-2xl border border-slate-200 p-8 shadow-sm md:grid-cols-[auto_1fr_auto] md:items-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-brand-800">{title}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{desc}</p>
              </div>
              <ul className="space-y-2 md:min-w-52">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                    <BadgeCheck className="h-4 w-4 shrink-0 text-gold-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="border-y border-slate-200 bg-brand-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
          {t.trust.map(({ title, desc }, i) => {
            const Icon = trustIcons[i];
            return (
              <div key={title} className="flex items-start gap-4">
                <Icon className="h-8 w-8 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-semibold text-brand-800">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-800">{t.quote.title}</h2>
        <p className="mt-3 text-slate-600">{t.quote.subtitle}</p>
        <div className="mt-8">
          <QuoteForm t={dict.forms.quote} />
        </div>
      </section>
    </>
  );
}
