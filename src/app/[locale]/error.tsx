"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("error");
  const brandName = useTranslations()("brandName");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("description")}</p>
      <p className="mt-2 text-sm text-muted">{brandName}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 rounded-sm bg-primary px-4 py-2 text-canvas"
      >
        {t("retry")}
      </button>
      {error.digest ? (
        <p className="mt-4 text-xs text-muted">{error.digest}</p>
      ) : null}
    </main>
  );
}
