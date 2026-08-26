import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { routing } from "./routing";

// next-intl calls this per request (wired from next.config.ts).
// `locale` is sometimes omitted under Cache Components; then we read
// the `[locale]` segment via next/root-params (Next 16.3).
export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  return {
    locale,
    // UI chrome only. Course titles/bodies live on records in src/data.
    messages: (await import(`../content/${locale}.json`)).default,
  };
});
