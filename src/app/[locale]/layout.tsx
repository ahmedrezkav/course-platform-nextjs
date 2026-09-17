import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { ibmPlexSans, ibmPlexSansArabic } from "@/lib/fonts";
import "@/styles/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
