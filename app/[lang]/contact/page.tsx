import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getDictionary, isLocale } from "@/lib/dictionaries";
import { CENTRE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "ar"
    ? {
        title: "اتصل بنا",
        description:
          "تواصل مع مركز إيجيبتوس للغات والترجمة في مطروح، مصر — زرنا، اتصل بنا، راسلنا عبر واتساب، أو أرسل لنا رسالة عبر الإنترنت.",
      }
    : {
        title: "Contact Us",
        description:
          "Contact Egyptos Centre for Languages and Translation in Matrouh, Egypt — visit us, call, message on WhatsApp, or send us a message online.",
      };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contactPage;
  const waMessage = dict.whatsapp.message;

  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t.hero.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        {/* Info column */}
        <div>
          <h2 className="text-2xl font-bold text-brand-800">{t.reachTitle}</h2>
          <ul className="mt-6 space-y-5">
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">{t.address}</p>
                <p className="text-slate-600">{t.addressValue}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">{t.phone}</p>
                <a href={`tel:${CENTRE.phoneRaw}`} className="text-slate-600 hover:text-brand-600" dir="ltr">
                  {CENTRE.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">{t.email}</p>
                <a href={`mailto:${CENTRE.email}`} className="text-slate-600 hover:text-brand-600">
                  {CENTRE.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">{t.hours}</p>
                <p className="text-slate-600">{t.hoursValue}</p>
              </div>
            </li>
          </ul>

          <a
            href={`https://wa.me/${CENTRE.whatsapp}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#1fb757]"
          >
            <MessageCircle className="h-5 w-5" />
            {t.whatsapp}
          </a>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title={t.mapTitle}
              src="https://www.google.com/maps?q=Marsa+Matrouh,+Egypt&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Form column */}
        <div>
          <h2 className="text-2xl font-bold text-brand-800">{t.formTitle}</h2>
          <p className="mt-2 text-slate-600">{t.formSubtitle}</p>
          <div className="mt-6">
            <ContactForm t={dict.forms.contact} />
          </div>
        </div>
      </section>
    </>
  );
}
