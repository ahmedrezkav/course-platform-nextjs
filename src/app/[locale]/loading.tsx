import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="sr-only" role="status">
        {t("label")}
      </p>
      <div aria-hidden>
        <div className="h-12 w-full max-w-xl animate-pulse rounded-sm bg-border" />
        <div className="mt-4 h-6 w-full max-w-lg animate-pulse rounded-sm bg-border" />
        <div className="mt-8 h-10 w-36 animate-pulse rounded-sm bg-border" />
        <div className="mt-16 h-8 w-48 animate-pulse rounded-sm bg-border" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-52 animate-pulse rounded-sm bg-border" />
          <div className="h-52 animate-pulse rounded-sm bg-border" />
          <div className="h-52 animate-pulse rounded-sm bg-border" />
        </div>
      </div>
    </div>
  );
}
