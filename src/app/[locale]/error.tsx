"use client";

import { useTranslations } from "next-intl";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{t("error.title")}</h1>
      <p className="mt-3 text-muted">{t("error.description")}</p>
      <p className="mt-2 text-sm text-muted">{t("brandName")}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 rounded-sm bg-primary px-4 py-2 text-canvas"
      >
        {t("error.retry")}
      </button>
      {error.digest ? <p className="mt-4 text-xs text-muted">{error.digest}</p> : null}
    </div>
  );
}
