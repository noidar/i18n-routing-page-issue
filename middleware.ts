import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

function getCountry(request: NextRequest): string {
  // You can implement country detection based on IP, headers, etc.
  // For now, return default country
  return i18n.defaultCountry;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has country/locale structure
  const segments = pathname.split("/").filter(Boolean);
  
  const hasCountryLocale = segments.length >= 2 && 
    i18n.countries.includes(segments[0] as any) && 
    i18n.locales.includes(segments[1] as any);

  // If already has valid country/locale structure, continue
  if (hasCountryLocale) {
    return;
  }

  // Check if there is any supported locale in the pathname (old format)
  // But make sure it's not a country/locale combination
  const pathnameHasOldLocaleFormat = segments.length === 1 && i18n.locales.includes(segments[0] as any);

  if (pathnameHasOldLocaleFormat) {
    // Redirect old locale format to country/locale format
    const locale = segments[0];
    const country = Object.keys(i18n.countryLocaleMap).find(
      (country) => i18n.countryLocaleMap[country as keyof typeof i18n.countryLocaleMap] === locale
    ) || i18n.defaultCountry;
    
    const newPath = `/${country}/${locale}`;
    
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Check for partial matches that might be old locale format with additional paths
  const startsWithLocale = i18n.locales.some(locale => pathname.startsWith(`/${locale}/`) && !i18n.countries.includes(segments[0] as any));
  
  if (startsWithLocale) {
    // Redirect old locale format with path to country/locale format
    const locale = segments[0];
    const country = Object.keys(i18n.countryLocaleMap).find(
      (country) => i18n.countryLocaleMap[country as keyof typeof i18n.countryLocaleMap] === locale
    ) || i18n.defaultCountry;
    
    const restPath = segments.slice(1).join("/");
    const newPath = `/${country}/${locale}${restPath ? `/${restPath}` : ""}`;
    
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // No country/locale in pathname, redirect to default
  const locale = getLocale(request);
  const country = getCountry(request);

  return NextResponse.redirect(
    new URL(
      `/${country}/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url,
    ),
  );
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
