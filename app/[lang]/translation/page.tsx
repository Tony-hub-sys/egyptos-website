import type { Metadata } from "next";
import { FileText, Mic, PenLine, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

// NOTE: English content for now — Arabic dictionary entries can be added the
// same way as Home and Academy (see dictionaries/en.json, ar.json).

export const metadata: Metadata = {
  title: "Translation & Corporate Services",
  description:
    "Certified document translation, professional interpretation, and corporate writing services in Matrouh, Egypt. Request a free quote from Egyptos Centre.",
};

const services = [
  {
    icon: FileText,
    title: "Document Translation",
    desc: "Certified Arabic ↔ English translation of legal contracts, court documents, medical reports, academic transcripts, certificates, and personal papers. Formatted to match the original and accepted by embassies, universities, and government offices.",
    points: ["Certified & stamped", "Embassy-ready formatting", "Strict confidentiality"],
  },
  {
    icon: Mic,
    title: "Interpretation",
    desc: "Professional consecutive interpretation for business negotiations, medical consultations, legal proceedings, and official appointments — on-site anywhere in Matrouh or remotely by phone and video call.",
    points: ["Business & legal settings", "On-site or remote", "Experienced interpreters"],
  },
  {
    icon: PenLine,
    title: "Corporate Writing",
    desc: "Clear, persuasive business communication in Arabic and English: proposals, official correspondence, company profiles, reports, and marketing copy that elevate how your organization is perceived.",
    points: ["Proposals & reports", "Official correspondence", "Bilingual marketing copy"],
  },
];

export default function TranslationPage() {
  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Translation &amp; Corporate Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Nearly a decade of certified translation and professional
            communication services in Matrouh. Precise. Confidential. On time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        {services.map(({ icon: Icon, title, desc, points }) => (
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
        ))}
      </section>

      <section className="border-y border-slate-200 bg-brand-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Confidential", desc: "Your documents are handled with complete discretion." },
            { icon: Clock, title: "Fast Turnaround", desc: "Standard documents often delivered within 24–48 hours." },
            { icon: BadgeCheck, title: "Certified Since 2016", desc: "Trusted by institutions across Matrouh." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="h-8 w-8 shrink-0 text-brand-600" />
              <div>
                <h3 className="font-semibold text-brand-800">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-800">
          Request a Free Quote
        </h2>
        <p className="mt-3 text-slate-600">
          Tell us about your project and we&apos;ll reply within one business
          day with pricing and timeline.
        </p>
        <div className="mt-8">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
