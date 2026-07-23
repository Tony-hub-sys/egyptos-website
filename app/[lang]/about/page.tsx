import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Target, Heart, Award, ArrowRight } from "lucide-react";

// NOTE: English content for now — Arabic dictionary entries can be added the
// same way as Home and Academy (see dictionaries/en.json, ar.json).

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Egyptos Centre for Languages and Translation — serving Matrouh, Egypt with translation services and language education since 2016.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About Egyptos Centre
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Matrouh&apos;s home for languages and translation since 2016.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-brand-800">Our story</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
          <p>
            Egyptos Centre for Languages and Translation opened its doors in
            Matrouh in 2016 with a simple conviction: our city deserved the
            same quality of language education and professional translation
            available in Cairo and Alexandria — without the distance.
          </p>
          <p>
            What began as a small translation office has grown into a
            full-service centre. Today we provide certified document
            translation trusted by embassies and institutions, interpretation
            for businesses and families, corporate writing services, and a
            language academy whose flagship 18-Week English Conversation and
            Writing Program has helped hundreds of students find their voice
            in English.
          </p>
          <p>
            We remain proudly local. Our team knows the community we serve,
            and every student and client works directly with us — in person,
            here in Matrouh.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-brand-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To elevate education and corporate communication in Matrouh through rigorous language teaching and precise, trustworthy translation.",
            },
            {
              icon: Heart,
              title: "Our Values",
              desc: "Accuracy without compromise, confidentiality in everything we handle, and patient, encouraging teaching that meets students where they are.",
            },
            {
              icon: Award,
              title: "Our Promise",
              desc: "Every document delivered on time and embassy-ready. Every student supported from placement test to completion certificate.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-white p-8 shadow-sm">
              <Icon className="h-8 w-8 text-brand-600" />
              <h3 className="mt-4 text-xl font-semibold text-brand-800">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <MapPin className="mx-auto h-10 w-10 text-brand-600" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-800">
          Rooted in Matrouh
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Visit our centre, meet the team, and see why families and businesses
          across the governorate have trusted us for nearly a decade.
        </p>
        <Link
          href={`/${lang}/contact`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Get in Touch <ArrowRight className="h-5 w-5 rtl:rotate-180" />
        </Link>
      </section>
    </>
  );
}
