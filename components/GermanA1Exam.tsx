"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Volume2,
  ChevronRight,
  ChevronLeft,
  Headphones,
  BookOpen,
  PenLine,
  Mic,
  Award,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import {
  hoeren,
  lesen,
  schreiben,
  sprechen,
  OBJECTIVE_TOTAL,
} from "@/lib/exam-german-a1";

type ExamDict = Dictionary["exam"];

const optBase =
  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-start transition-colors";
const optIdle = "border-slate-200 hover:border-brand-300 hover:bg-slate-50";
const optOn = "border-brand-500 bg-brand-50 text-brand-800";

export default function GermanA1Exam({ lang, t }: { lang: string; t: ExamDict }) {
  const [step, setStep] = useState(0); // 0 intro · 1-4 modules · 5 result
  const [mc, setMc] = useState<Record<string, number>>({});
  const [tf, setTf] = useState<Record<string, boolean>>({});
  const [ab, setAb] = useState<Record<string, "a" | "b">>({});
  const [showScripts, setShowScripts] = useState(false);
  const [showModel1, setShowModel1] = useState(false);
  const [showModel2, setShowModel2] = useState(false);
  const [showSpeaking, setShowSpeaking] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  function play(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  const correct =
    [...hoeren.teil1, ...hoeren.teil3].reduce<number>(
      (a, i) => a + (mc[i.id] === i.answer ? 1 : 0),
      0
    ) +
    hoeren.teil2.reduce<number>((a, i) => a + (tf[i.id] === i.answer ? 1 : 0), 0) +
    lesen.teil1.items.reduce<number>((a, i) => a + (tf[i.id] === i.answer ? 1 : 0), 0) +
    lesen.teil2.reduce<number>((a, i) => a + (ab[i.id] === i.answer ? 1 : 0), 0) +
    lesen.teil3.reduce<number>((a, i) => a + (tf[i.id] === i.answer ? 1 : 0), 0);

  const percent = Math.round((correct / OBJECTIVE_TOTAL) * 100);

  // ── shared bits ───────────────────────────────────────────────
  const PlayBtn = ({ text }: { text: string }) => (
    <button
      type="button"
      onClick={() => play(text)}
      className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
    >
      <Volume2 className="h-4 w-4" /> {t.playAudio}
    </button>
  );

  const McBlock = ({ item }: { item: (typeof hoeren.teil1)[number] }) => (
    <div className="rounded-2xl border border-slate-200 p-5">
      {item.script && (
        <div className="mb-3">
          <PlayBtn text={item.script} />
        </div>
      )}
      <p className="font-medium text-slate-800">{item.prompt}</p>
      <div className="mt-3 space-y-2">
        {item.options.map((o, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setMc((p) => ({ ...p, [item.id]: i }))}
            className={`${optBase} ${mc[item.id] === i ? optOn : optIdle}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold">
              {String.fromCharCode(97 + i)}
            </span>
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  const TfRow = ({
    item,
    withAudio,
  }: {
    item: { id: string; statement: string; script?: string };
    withAudio?: boolean;
  }) => (
    <div className="rounded-2xl border border-slate-200 p-5">
      {withAudio && item.script && (
        <div className="mb-3">
          <PlayBtn text={item.script} />
        </div>
      )}
      <p className="font-medium text-slate-800">{item.statement}</p>
      <div className="mt-3 flex gap-3">
        {([true, false] as const).map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setTf((p) => ({ ...p, [item.id]: v }))}
            className={`${optBase} justify-center ${tf[item.id] === v ? optOn : optIdle}`}
          >
            {v ? t.richtig : t.falsch}
          </button>
        ))}
      </div>
    </div>
  );

  // ── INTRO ─────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <section dir="ltr" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="rounded-3xl bg-brand-800 px-6 py-10 text-white sm:px-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-300">
            {t.badge}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-slate-300">{t.subtitle}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Headphones, label: t.modules.hoeren, n: "15" },
            { icon: BookOpen, label: t.modules.lesen, n: "15" },
            { icon: PenLine, label: t.modules.schreiben, n: "2" },
            { icon: Mic, label: t.modules.sprechen, n: "3" },
          ].map(({ icon: Icon, label, n }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-5">
              <Icon className="h-7 w-7 text-brand-600" />
              <div>
                <p className="font-semibold text-brand-800">{label}</p>
                <p className="text-sm text-slate-500">{n}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStep(1)}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-4 font-semibold text-brand-900 transition-colors hover:bg-gold-400"
        >
          {t.start} <ChevronRight className="h-5 w-5" />
        </button>
      </section>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────
  if (step === 5) {
    return (
      <section dir="ltr" className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="rounded-3xl bg-brand-800 px-6 py-10 text-center text-white sm:px-10">
          <Award className="mx-auto h-12 w-12 text-gold-400" />
          <p className="mt-4 text-sm font-medium uppercase tracking-widest text-gold-300">
            {t.result.title}
          </p>
          <p className="mt-3 text-5xl font-bold text-gold-400">
            {t.result.percent.replace("{percent}", String(percent))}
          </p>
          <p className="mt-2 text-slate-300">
            {t.result.scoredNote} —{" "}
            {t.result.score
              .replace("{correct}", String(correct))
              .replace("{total}", String(OBJECTIVE_TOTAL))}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">{t.result.passHint}</p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => {
              setMc({}); setTf({}); setAb({}); setForm({}); setStep(0);
            }}
            className="rounded-lg border border-brand-600 px-6 py-3 font-semibold text-brand-600 transition-colors hover:bg-brand-50"
          >
            {t.result.retake}
          </button>
          <Link
            href={`/${lang}/academy`}
            className="rounded-lg bg-brand-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t.result.ctaCourses}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="rounded-lg bg-gold-500 px-6 py-3 text-center font-semibold text-brand-900 transition-colors hover:bg-gold-400"
          >
            {t.result.ctaContact}
          </Link>
        </div>
      </section>
    );
  }

  // ── MODULE SHELL ──────────────────────────────────────────────
  const moduleTitles = [t.modules.hoeren, t.modules.lesen, t.modules.schreiben, t.modules.sprechen];

  return (
    <section dir="ltr" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-brand-700">{moduleTitles[step - 1]}</span>
        <span className="text-slate-500">{t.moduleOf.replace("{n}", String(step))}</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gold-500 transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="mt-8 space-y-8">
        {/* ── HÖREN ── */}
        {step === 1 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-800">Hören</h2>
              <button
                onClick={() => setShowScripts((s) => !s)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {showScripts ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showScripts ? t.hideTranscript : t.audioHelp}
              </button>
            </div>

            <p className="text-sm font-semibold text-slate-500">Teil 1</p>
            {hoeren.teil1.map((i) => <McBlock key={i.id} item={i} />)}

            <p className="text-sm font-semibold text-slate-500">Teil 2 — richtig oder falsch?</p>
            {hoeren.teil2.map((i) => <TfRow key={i.id} item={i} withAudio />)}

            <p className="text-sm font-semibold text-slate-500">Teil 3</p>
            {hoeren.teil3.map((i) => <McBlock key={i.id} item={i} />)}

            {showScripts && (
              <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
                <p className="mb-2 font-semibold text-slate-700">{t.transcript}</p>
                <ul className="space-y-1">
                  {[...hoeren.teil1, ...hoeren.teil2, ...hoeren.teil3].map((i) => (
                    <li key={i.id}>• {i.script}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* ── LESEN ── */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-brand-800">Lesen</h2>

            <p className="text-sm font-semibold text-slate-500">Teil 1 — richtig oder falsch?</p>
            <div className="whitespace-pre-line rounded-2xl bg-slate-50 p-5 text-slate-700">
              {lesen.teil1.context}
            </div>
            {lesen.teil1.items.map((i) => <TfRow key={i.id} item={i} />)}

            <p className="text-sm font-semibold text-slate-500">Teil 2 — a oder b?</p>
            {lesen.teil2.map((i) => (
              <div key={i.id} className="rounded-2xl border border-slate-200 p-5">
                <p className="font-medium text-slate-800">{i.situation}</p>
                <div className="mt-3 space-y-2">
                  {(["a", "b"] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setAb((p) => ({ ...p, [i.id]: k }))}
                      className={`${optBase} ${ab[i.id] === k ? optOn : optIdle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold uppercase">
                        {k}
                      </span>
                      {i[k]}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-sm font-semibold text-slate-500">Teil 3 — Schilder: richtig oder falsch?</p>
            {lesen.teil3.map((i) => (
              <div key={i.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-3 inline-block rounded-lg border-2 border-slate-300 bg-slate-100 px-4 py-2 font-semibold text-slate-700">
                  {i.sign}
                </div>
                <p className="font-medium text-slate-800">{i.statement}</p>
                <div className="mt-3 flex gap-3">
                  {([true, false] as const).map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      onClick={() => setTf((p) => ({ ...p, [i.id]: v }))}
                      className={`${optBase} justify-center ${tf[i.id] === v ? optOn : optIdle}`}
                    >
                      {v ? t.richtig : t.falsch}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── SCHREIBEN ── */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-brand-800">Schreiben</h2>

            <p className="text-sm font-semibold text-slate-500">Teil 1 — Formular</p>
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-700">{schreiben.teil1.intro}</p>
              <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                {schreiben.teil1.infoText}
              </p>
              <div className="mt-4 space-y-3">
                {schreiben.teil1.fields.map((f) => (
                  <div key={f.label} className="grid gap-1 sm:grid-cols-[160px_1fr] sm:items-center">
                    <label className="text-sm font-medium text-slate-700">{f.label}</label>
                    <input
                      value={form[f.label] ?? ""}
                      onChange={(e) => setForm((p) => ({ ...p, [f.label]: e.target.value }))}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModel1((s) => !s)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {showModel1 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showModel1 ? t.hideModel : t.showModel}
              </button>
              {showModel1 && (
                <ul className="mt-3 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                  {schreiben.teil1.fields.map((f) => (
                    <li key={f.label}>{f.label}: <strong>{f.model}</strong></li>
                  ))}
                </ul>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-500">Teil 2 — E-Mail</p>
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-700">{schreiben.teil2.prompt}</p>
              <ul className="mt-2 list-disc space-y-1 ps-6 text-sm text-slate-600">
                {schreiben.teil2.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <textarea
                rows={6}
                value={form.__email ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, __email: e.target.value }))}
                className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                placeholder="Liebe Frau Wagner, …"
              />
              <button
                onClick={() => setShowModel2((s) => !s)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {showModel2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showModel2 ? t.hideModel : t.showModel}
              </button>
              {showModel2 && (
                <p className="mt-3 whitespace-pre-line rounded-lg bg-green-50 p-4 text-sm text-green-800">
                  {schreiben.teil2.model}
                </p>
              )}
            </div>
          </>
        )}

        {/* ── SPRECHEN ── */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-bold text-brand-800">Sprechen</h2>
            <p className="rounded-lg bg-brand-50 p-3 text-sm text-brand-700">{t.speakingNote}</p>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-700">{sprechen.teil1.instruction}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sprechen.teil1.keywords.map((k) => (
                  <span key={k} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{k}</span>
                ))}
              </div>
              <ul className="mt-3 list-disc space-y-1 ps-6 text-sm text-slate-600">
                {sprechen.teil1.extra.map((e) => <li key={e}>{e}</li>)}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-700">{sprechen.teil2.instruction}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {sprechen.teil2.cards.map((c) => (
                  <div key={c.thema} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">{c.thema}</p>
                    <p className="text-lg font-semibold text-brand-800">{c.wort}</p>
                    {showSpeaking && <p className="mt-1 text-sm text-green-700">→ {c.model}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-700">{sprechen.teil3.instruction}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {sprechen.teil3.cards.map((c) => (
                  <div key={c.wort} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-lg font-semibold text-brand-800">{c.wort}</p>
                    {showSpeaking && <p className="mt-1 text-sm text-green-700">→ {c.model}</p>}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowSpeaking((s) => !s)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              {showSpeaking ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showSpeaking ? t.hideModel : t.showModel} ({t.example})
            </button>
          </>
        )}
      </div>

      {/* nav */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => s - 1)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          <ChevronLeft className="h-4 w-4" /> {t.previous}
        </button>
        <button
          onClick={() => setStep((s) => s + 1)}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {step === 4 ? t.seeResult : t.next}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
