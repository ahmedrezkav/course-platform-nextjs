"use client";

import { markLessonComplete } from "@/api/learn";
import { useLocale, useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export function CompleteForm({
  courseSlug,
  lessonSlug,
}: {
  courseSlug: string;
  lessonSlug: string;
}) {
  const locale = useLocale();

  return (
    <form action={markLessonComplete} className="mt-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="courseSlug" value={courseSlug} />
      <input type="hidden" name="lessonSlug" value={lessonSlug} />
      <CompleteButton />
    </form>
  );
}

function CompleteButton() {
  const t = useTranslations("player");
  const { pending } = useFormStatus();

  return (
    <>
      <p className="sr-only" role="status">
        {pending ? t("completePending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
      >
        {pending ? t("completePending") : t("complete")}
      </button>
    </>
  );
}
