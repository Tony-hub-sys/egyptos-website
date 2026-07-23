import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

// NOTE: English content for now — Arabic dictionary entries can be added the
// same way as Home and Academy (see dictionaries/en.json, ar.json).

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Egyptos Centre for Languages and Translation in Matrouh, Egypt — visit us, call, message on WhatsApp, or send us a message online.",
};

// Replace with the centre's real WhatsApp number (international format, no +)
const WHATSAPP_NUMBER = "20000000000";

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Questions about courses, the placement test, or a translation
            project? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        {/* Info column */}
        <div>
          <h2 className="text-2xl font-bold text-brand-800">Visit or reach us</h2>
          <ul className="mt-6 space-y-5">
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">Address</p>
                <p className="text-slate-600">Marsa Matrouh, Matrouh Governorate, Egypt</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">Phone</p>
                <a href="tel:+20000000000" className="text-slate-600 hover:text-brand-600" dir="ltr">
                  +20 000 000 0000
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">Email</p>
                <a
                  href="mailto:info@egyptoscentre.com"
                  className="text-slate-600 hover:text-brand-600"
                >
                  info@egyptoscentre.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-800">Hours</p>
                <p className="text-slate-600">Saturday – Thursday, 10:00 AM – 10:00 PM</p>
              </div>
            </li>
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello Egyptos Centre! I'd like to ask about your services."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#1fb757]"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>

          {/* Google Map placeholder — replace src with your real embed URL:
              Google Maps → your location → Share → Embed a map → copy the iframe src */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Egyptos Centre location — Marsa Matrouh"
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
          <h2 className="text-2xl font-bold text-brand-800">Send us a message</h2>
          <p className="mt-2 text-slate-600">
            Fill in the form and we&apos;ll get back to you within one business day.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
