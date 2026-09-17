import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("shell");

  return (
    <a
      // In-page jump; next-intl `Link` would locale-prefix the hash href.
      href="#main"
      className="bg-canvas text-foreground absolute start-4 top-4 z-50 -translate-y-[200%] rounded-sm px-3 py-2 focus-visible:translate-y-0"
    >
      {t("skipToContent")}
    </a>
  );
}
