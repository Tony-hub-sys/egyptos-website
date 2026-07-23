import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

export default function Footer({ lang, dict }: { lang: string; dict: Dictionary }) {
  const f = dict.footer;
  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark.svg" alt="Egyptos Centre logo" className="h-9 w-9" />
            <span className="text-lg font-bold text-white">
              {lang === "ar" ? "مركز إيجيبتوس" : "EGYPTOS Centre"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{f.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {f.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`/${lang}/translation`} className="hover:text-white">{f.linkTranslation}</Link></li>
            <li><Link href={`/${lang}/academy`} className="hover:text-white">{f.linkAcademy}</Link></li>
            <li><Link href={`/${lang}/academy#placement`} className="hover:text-white">{f.linkPlacement}</Link></li>
            <li><Link href={`/${lang}/translation#quote`} className="hover:text-white">{f.linkQuote}</Link></li>
            <li><Link href={`/${lang}/about`} className="hover:text-white">{f.linkAbout}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {f.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{f.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              <a href="tel:+20000000000" className="hover:text-white" dir="ltr">
                +20 000 000 0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              <a href="mailto:info@egyptoscentre.com" className="hover:text-white">
                info@egyptoscentre.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
          © {new Date().getFullYear()} {f.rights}
        </p>
      </div>
    </footer>
  );
}
