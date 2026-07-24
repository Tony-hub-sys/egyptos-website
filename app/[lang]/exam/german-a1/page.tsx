import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/dictionaries";
import GermanA1Exam from "@/components/GermanA1Exam";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "ar"
    ? {
        title: "اختبار الألمانية A1 (بتنسيق جوته)",
        description:
          "اختبار تجريبي كامل للغة الألمانية بمستوى A1 بتنسيق شهادة جوته (Start Deutsch 1): استماع وقراءة وكتابة ومحادثة، في مركز إيجيبتوس.",
      }
    : {
        title: "German A1 Exam (Goethe Format)",
        description:
          "A full German A1 practice exam in the Goethe-Zertifikat A1 (Start Deutsch 1) format — Listening, Reading, Writing, and Speaking — at Egyptos Centre.",
      };
}

export default async function GermanA1ExamPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <GermanA1Exam lang={lang} t={dict.exam} />;
}
