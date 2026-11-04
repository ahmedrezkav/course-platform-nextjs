import { getCourseReviews } from "@/api/reviews";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";
import { ReviewForm } from "./review-form";

export async function ReviewsSlot({ slug }: { slug: string }) {
  const [t, { viewer, reviews }] = await Promise.all([
    getTranslations("reviews"),
    getCourseReviews(slug),
  ]);
  const own = reviews.some((review) => review.own);
  const sum = reviews.reduce((total, review) => total + review.rating, 0);

  return (
    <>
      {reviews.length === 0 ? (
        <p className="mt-4 text-muted">{t("empty")}</p>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted">
            <span>
              {t("average", {
                rating: Math.round((sum / reviews.length) * 10) / 10,
                scale: 5,
              })}
            </span>
            <span aria-hidden className="px-1">
              ·
            </span>
            <span>{t("count", { count: reviews.length })}</span>
          </p>
          <ul className="mt-6">
            {reviews.map((review) => (
              <li key={review.userId} className="border-t border-border py-4">
                <p className="text-sm font-medium">
                  <span dir="auto">{review.authorName}</span>
                  {review.own ? (
                    <>
                      <span aria-hidden className="px-1">
                        ·
                      </span>
                      <span className="font-normal text-muted">{t("yours")}</span>
                    </>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-muted">{t("stars", { count: review.rating })}</p>
                {/* The body is the student's text, not HTML. */}
                <p dir="auto" className="mt-2 wrap-break-word whitespace-pre-wrap">
                  {review.body}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
      {viewer === "enrolled" && own ? null : (
        <div className="mt-8">
          <h3 id="write-review" className="text-lg font-semibold">
            {t("write")}
          </h3>
          {viewer === "guest" ? (
            <Link
              href={{ pathname: paths.signIn(), query: { next: paths.course(slug) } }}
              className="mt-4 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
            >
              {t("signIn")}
            </Link>
          ) : viewer === "locked" ? (
            <p className="mt-4 text-muted">{t("enroll")}</p>
          ) : (
            <ReviewForm slug={slug} />
          )}
        </div>
      )}
    </>
  );
}

export function ReviewsFallback({ label }: { label: string }) {
  return (
    <div className="mt-4">
      <p className="sr-only" role="status">
        {label}
      </p>
      <div aria-hidden>
        <div className="h-4 w-56 animate-pulse rounded-sm bg-border" />
        <div className="mt-6 h-20 w-full animate-pulse rounded-sm bg-border" />
        <div className="mt-4 h-20 w-full animate-pulse rounded-sm bg-border" />
        <div className="mt-8 h-6 w-36 animate-pulse rounded-sm bg-border" />
        <div className="mt-4 h-10 w-full animate-pulse rounded-sm bg-border" />
        <div className="mt-3 h-24 w-full animate-pulse rounded-sm bg-border" />
        <div className="mt-3 h-10 w-36 animate-pulse rounded-sm bg-border" />
      </div>
    </div>
  );
}
