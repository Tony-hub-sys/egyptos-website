"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { estimateLevel, type LanguageTest, type CEFR } from "@/lib/placement-data";
import type { Dictionary } from "@/lib/dictionaries";
import {
  ArrowRight,
  ArrowLeft,
  Award,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type QuizDict = Dictionary["placement"]["quiz"];

const inputCls =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function PlacementQuiz({
  lang,
  test,
  t,
}: {
  lang: string;
  test: LanguageTest;
  t: QuizDict;
}) {
  const questions = test.questions;
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(total).fill(null)
  );
  const [phase, setPhase] = useState<"quiz" | "result">("quiz");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const correct = answers.reduce(
    (acc, a, i) => acc + (a === questions[i].answer ? 1 : 0),
    0
  );
  const level: CEFR = estimateLevel(correct, total);

  function select(optionIdx: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIdx;
      return next;
    });
  }

  function goNext() {
    if (current < total - 1) setCurrent((c) => c + 1);
    else setPhase("result");
  }

  function goBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  function retake() {
    setAnswers(Array(total).fill(null));
    setCurrent(0);
    setPhase("quiz");
    setLeadStatus("idle");
  }

  async function handleLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const { error } = await supabase.from("placement_results").insert({
      name: data.name,
      phone: data.phone,
      language_tested: test.code,
      score: correct,
      level,
    });

    setLeadStatus(error ? "error" : "success");
  }

  // ── Quiz phase ────────────────────────────────────────────────
  if (phase === "quiz") {
    const q = questions[current];
    const progress = Math.round(((current + (answers[current] !== null ? 1 : 0)) / total) * 100);

    return (
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="font-medium text-brand-700">
            {test.flag} {test.name} · {t.testLabel}
          </span>
          <span>
            {t.question} {current + 1} {t.of} {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
            {q.level}
          </span>
          <h2 className="mt-4 text-xl font-semibold text-brand-800 sm:text-2xl">
            {q.prompt}
          </h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-start transition-colors ${
                    selected
                      ? "border-brand-500 bg-brand-50 text-brand-800"
                      : "border-slate-200 hover:border-brand-300 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      selected
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-base">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={current === 0}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={answers[current] === null}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {current === total - 1 ? t.finish : t.next}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </section>
    );
  }

  // ── Result + lead phase ───────────────────────────────────────
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="rounded-3xl bg-brand-800 px-6 py-10 text-center text-white sm:px-10">
        <Award className="mx-auto h-12 w-12 text-gold-400" />
        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-gold-300">
          {t.resultBadge}
        </p>
        <p className="mt-2 text-lg text-slate-300">{t.yourLevelIs}</p>
        <p className="mt-1 text-4xl font-bold text-gold-400">{t.levelNames[level]}</p>
        <p className="mt-4 text-slate-300">
          {t.scoreLabel
            .replace("{correct}", String(correct))
            .replace("{total}", String(total))}
        </p>
      </div>

      {leadStatus === "success" ? (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
          <h3 className="mt-4 text-xl font-semibold text-green-800">{t.successTitle}</h3>
          <p className="mt-2 text-green-700">{t.successBody}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={retake}
              className="text-sm font-semibold text-green-700 underline hover:text-green-800"
            >
              {t.retake}
            </button>
            <Link
              href={`/${lang}/placement`}
              className="text-sm font-semibold text-green-700 underline hover:text-green-800"
            >
              {t.backToHub}
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-slate-200 p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-semibold text-brand-800">{t.leadTitle}</h3>
          <p className="mt-2 text-slate-600">{t.leadSubtitle}</p>
          <form onSubmit={handleLead} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t.name} *
              </label>
              <input id="name" name="name" required className={inputCls} placeholder={t.namePlaceholder} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t.phone} *
              </label>
              <input id="phone" name="phone" type="tel" required className={inputCls} placeholder="+20 1X XXX XXXX" dir="ltr" />
            </div>

            {leadStatus === "error" && (
              <p className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {t.error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={leadStatus === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
              >
                {leadStatus === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {leadStatus === "loading" ? t.sending : t.submit}
              </button>
              <button
                type="button"
                onClick={retake}
                className="text-sm font-semibold text-slate-600 hover:text-brand-700"
              >
                {t.retake}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
