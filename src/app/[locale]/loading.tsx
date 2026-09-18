import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="sr-only" role="status">
        {t("label")}
      </p>
      <div aria-hidden>
        <div className="h-10 w-28 animate-pulse rounded-sm bg-border" />
        <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-sm bg-border" />
        <div className="mt-6 h-5 w-48 animate-pulse rounded-sm bg-border" />
      </div>
    </div>
  );
}
