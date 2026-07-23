import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/dictionaries";
import { placementTests, testLanguageCodes } from "@/lib/placement-data";
import PlacementQuiz from "@/components/PlacementQuiz";

export function generateStaticParams() {
  return testLanguageCodes.map((language) => ({ language }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; language: string }>;
}): Promise<Metadata> {
  const { language } = await params;
  const test = placementTests[language];
  const name = test ? test.name : "Language";
  return {
    title: `${name} Placement Test`,
    description: `Take the ${name} placement test at Egyptos Centre and get your CEFR level.`,
  };
}

export default async function PlacementLanguagePage({
  params,
}: {
  params: Promise<{ lang: string; language: string }>;
}) {
  const { lang, language } = await params;
  if (!isLocale(lang)) notFound();
  const test = placementTests[language];
  if (!test) notFound();

  const dict = await getDictionary(lang);

  return (
    <PlacementQuiz
      lang={lang}
      test={test}
      t={dict.placement.quiz}
    />
  );
}
