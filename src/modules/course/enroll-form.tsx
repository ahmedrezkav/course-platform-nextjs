"use client";

import { enrollFree } from "@/api/enroll";
import { useLocale, useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export function EnrollForm({ slug }: { slug: string }) {
  const locale = useLocale();

  return (
    <form action={enrollFree} className="mt-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={slug} />
      <EnrollButton />
    </form>
  );
}

function EnrollButton() {
  const t = useTranslations("learning");
  const { pending } = useFormStatus();

  return (
    <>
      <p className="sr-only" role="status">
        {pending ? t("enrollPending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
      >
        {pending ? t("enrollPending") : t("enroll")}
      </button>
    </>
  );
}
