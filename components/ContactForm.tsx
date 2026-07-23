"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

const inputCls =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function ContactForm({ t }: { t: Dictionary["forms"]["contact"] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      form.reset();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-xl font-semibold text-green-800">{t.successTitle}</h3>
        <p className="mt-2 text-green-700">{t.successBody}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-green-700 underline hover:text-green-800"
        >
          {t.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.name} *
          </label>
          <input id="name" name="name" required className={inputCls} placeholder={t.namePlaceholder} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.email} *
          </label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700">
          {t.subject}
        </label>
        <input id="subject" name="subject" className={inputCls} placeholder={t.subjectPlaceholder} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
          {t.message} *
        </label>
        <textarea id="message" name="message" rows={5} required className={inputCls} placeholder={t.messagePlaceholder} />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "loading" ? t.sending : t.submit}
      </button>
    </form>
  );
}
