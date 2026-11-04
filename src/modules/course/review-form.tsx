"use client";

import { submitReview } from "@/api/review";
import { cn } from "@/lib/cn";
import type { ReviewFormState } from "@/lib/review-fields";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";

const ratings = [1, 2, 3, 4, 5] as const;

function useReviewFormFocus(state: ReviewFormState | null, rating: string) {
  useEffect(() => {
    if (!state) return;

    // A finished action resets native radio state. The hidden input still
    // posts `rating`; put the visible selection back.
    if (rating) {
      const selected = document.querySelector<HTMLInputElement>(
        `input[type="radio"][value="${rating}"]`,
      );
      if (selected) selected.checked = true;
    }

    if (state.fieldErrors?.rating) {
      document.getElementById("review-rating-1")?.focus();
      return;
    }

    if (state.fieldErrors?.body) {
      document.getElementById("review-body")?.focus();
      return;
    }

    if (state.formError) {
      document.getElementById("review-form-error")?.focus();
    }
  }, [state, rating]);
}

export function ReviewForm({ slug }: { slug: string }) {
  const t = useTranslations("reviews");
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitReview, null);
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");
  useReviewFormFocus(state, rating);

  const errors = {
    rating: t("errors.rating"),
    body: t("errors.body"),
    bodyLong: t("errors.bodyLong"),
    enrolled: t("errors.enrolled"),
  };
  const ratingError = state?.fieldErrors?.rating ? errors[state.fieldErrors.rating] : undefined;
  const bodyError = state?.fieldErrors?.body ? errors[state.fieldErrors.body] : undefined;

  return (
    <form
      action={action}
      aria-labelledby="write-review"
      aria-busy={pending}
      noValidate
      className="mt-4 grid gap-4"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="rating" value={rating} />
      {state?.formError ? (
        <p id="review-form-error" role="alert" tabIndex={-1} className="text-sm">
          {errors[state.formError]}
        </p>
      ) : null}
      <div>
        <fieldset
          aria-required="true"
          aria-invalid={ratingError ? true : undefined}
          aria-describedby={ratingError ? "review-rating-error" : undefined}
        >
          <legend className="text-sm font-medium">{t("ratingLabel")}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ratings.map((value) => (
              <label
                key={value}
                className={cn(
                  "inline-flex items-center gap-2 rounded-sm border px-3 py-2",
                  rating === String(value) ? "border-primary" : "border-border",
                )}
              >
                <input
                  id={value === 1 ? "review-rating-1" : undefined}
                  type="radio"
                  name="rating"
                  value={value}
                  // Controlled so a finished action cannot clear what was chosen.
                  checked={rating === String(value)}
                  onChange={() => setRating(String(value))}
                  className="scroll-mt-24"
                />
                {t("stars", { count: value })}
              </label>
            ))}
          </div>
        </fieldset>
        {ratingError ? (
          <p id="review-rating-error" role="alert" className="mt-1 text-sm">
            {ratingError}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="review-body" className="block text-sm font-medium">
          {t("bodyLabel")}
        </label>
        <textarea
          id="review-body"
          name="body"
          dir="auto"
          rows={4}
          aria-required="true"
          // Controlled so a finished action cannot clear what was typed.
          value={body}
          onChange={(event) => setBody(event.target.value)}
          aria-invalid={bodyError ? true : undefined}
          aria-describedby={bodyError ? "review-body-error" : undefined}
          className={cn(
            "mt-1 w-full scroll-mt-24 rounded-sm border bg-canvas px-3 py-2",
            bodyError ? "border-foreground" : "border-border",
          )}
        />
        {bodyError ? (
          <p id="review-body-error" role="alert" className="mt-1 text-sm">
            {bodyError}
          </p>
        ) : null}
      </div>
      <p className="sr-only" role="status">
        {pending ? t("pending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="w-fit rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
      >
        {pending ? t("pending") : t("submit")}
      </button>
    </form>
  );
}
