"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

export default function Navbar({ lang, dict }: { lang: string; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/translation`, label: dict.nav.translation },
    { href: `/${lang}/academy`, label: dict.nav.academy },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  // Same page in the other language
  const otherLang = lang === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`) || `/${otherLang}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="Egyptos Centre logo" className="h-9 w-9" />
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-wide text-brand-800">
              EGYPTOS
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-slate-500">
              {lang === "ar" ? "للغات والترجمة" : "Languages & Translation"}
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-brand-700"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={switchHref}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50"
              aria-label={otherLang === "ar" ? "التبديل إلى العربية" : "Switch to English"}
            >
              <Globe className="h-4 w-4" />
              {dict.nav.switchLabel}
            </Link>
          </li>
          <li className="ms-2">
            <Link
              href={`/${lang}/translation#quote`}
              className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-brand-900 shadow-sm transition-colors hover:bg-gold-400"
            >
              {dict.nav.quote}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <Link
            href={switchHref}
            className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-semibold text-brand-600"
          >
            <Globe className="h-4 w-4" />
            {dict.nav.switchLabel}
          </Link>
          <button
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <ul className="space-y-1 px-4 py-3">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === href
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href={`/${lang}/translation#quote`}
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-gold-500 px-4 py-2 text-center text-sm font-semibold text-brand-900"
              >
                {dict.nav.quote}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
