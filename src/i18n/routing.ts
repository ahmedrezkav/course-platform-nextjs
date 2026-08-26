import { defineRouting } from "next-intl/routing";

// Shared locale config for proxy, navigation, and request loading.
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Always emit /en and /ar so both languages stay visible in the URL.
  // `/` is not a locale-less page; the proxy redirects it.
  localePrefix: "always",
});
