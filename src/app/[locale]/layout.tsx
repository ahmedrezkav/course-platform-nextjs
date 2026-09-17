import { LanguageSwitcher } from "@/components/language-switcher";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { ibmPlexSans, ibmPlexSansArabic } from "@/lib/fonts";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        ibmPlexSans.variable,
        ibmPlexSansArabic.variable,
        "h-full font-sans antialiased",
      )}
    >
      <body className="min-h-full">
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
