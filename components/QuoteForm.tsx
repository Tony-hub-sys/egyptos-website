"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const inputCls =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const { error } = await supabase.from("quote_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      source_language: data.source_language || null,
      target_language: data.target_language || null,
      details: data.details || null,
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
        <h3 className="mt-4 text-xl font-semibold text-green-800">
          Quote request received!
        </h3>
        <p className="mt-2 text-green-700">
          We&apos;ll get back to you within one business day. For urgent
          requests, message us on WhatsApp.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-green-700 underline hover:text-green-800"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Full name *
          </label>
          <input id="name" name="name" required className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" className={inputCls} placeholder="+20 1X XXX XXXX" />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-slate-700">
            Service *
          </label>
          <select id="service" name="service" required className={inputCls} defaultValue="">
            <option value="" disabled>Select a service</option>
            <option>Document Translation</option>
            <option>Interpretation</option>
            <option>Corporate Writing</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="source_language" className="mb-1.5 block text-sm font-medium text-slate-700">
            From (language)
          </label>
          <select id="source_language" name="source_language" className={inputCls} defaultValue="Arabic">
            <option>Arabic</option>
            <option>English</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="target_language" className="mb-1.5 block text-sm font-medium text-slate-700">
            To (language)
          </label>
          <select id="target_language" name="target_language" className={inputCls} defaultValue="English">
            <option>English</option>
            <option>Arabic</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium text-slate-700">
          Project details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className={inputCls}
          placeholder="Document type, page count, deadline…"
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again or contact us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Sending…" : "Request Free Quote"}
      </button>
    </form>
  );
}
