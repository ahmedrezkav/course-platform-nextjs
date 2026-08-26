import { LanguageSwitcher } from "@/components/language-switcher";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

// Prerender /en and /ar so Cache Components has a static locale shell.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("brandName"),
    description: t("metadata.description"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  // `[locale]` matches any segment; reject unknown codes like `/xx`.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="h-full antialiased">
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexSansArabic.variable} min-h-full font-sans`}
      >
        {/* Client provider is required for the switcher and error.tsx. */}
        <NextIntlClientProvider>
          <div className="flex p-4">
            <div className="ms-auto">
              {/* usePathname is request-time; Suspense keeps the static shell. */}
              <Suspense fallback={<div className="h-8 w-36" aria-hidden />}>
                <LanguageSwitcher />
              </Suspense>
            </div>
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
