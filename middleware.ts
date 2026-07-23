import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar"];

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  // Arabic browsers get Arabic by default; everyone else gets English
  return acceptLanguage.toLowerCase().includes("ar") ? "ar" : "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and static files (anything with a dot)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
