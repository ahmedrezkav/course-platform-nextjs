export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export type ReviewFormState = {
  fieldErrors?: {
    rating?: "rating";
    body?: "body" | "bodyLong";
  };
  formError?: "enrolled";
};

function readRating(value: unknown): { rating: ReviewRating } | { error: "rating" } {
  if (typeof value !== "string" || !/^[1-5]$/.test(value)) return { error: "rating" };
  return { rating: Number(value) as ReviewRating };
}

function readBody(value: unknown): { body: string } | { error: "body" | "bodyLong" } {
  if (typeof value !== "string") return { error: "body" };
  const body = value.replace(/\r\n/g, "\n").trim();
  // Newlines stay. Other control characters are not review text.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(body)) return { error: "body" };
  if (body.length < 10) return { error: "body" };
  if (body.length > 500) return { error: "bodyLong" };
  return { body };
}

export function reviewValues(
  formData: FormData,
): { ok: true; rating: ReviewRating; body: string } | { ok: false; state: ReviewFormState } {
  const rating = readRating(formData.get("rating"));
  const body = readBody(formData.get("body"));
  const fieldErrors: NonNullable<ReviewFormState["fieldErrors"]> = {};

  if ("error" in rating) fieldErrors.rating = rating.error;
  if ("error" in body) fieldErrors.body = body.error;
  if ("error" in rating || "error" in body) return { ok: false, state: { fieldErrors } };

  return { ok: true, rating: rating.rating, body: body.body };
}
