import type en from "../content/en.json";
import { routing } from "../i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    // Narrows useLocale() / routing to "en" | "ar".
    Locale: (typeof routing.locales)[number];
    // Types t("…") keys from the English file; ar.json must keep the same shape.
    Messages: typeof en;
  }
}
