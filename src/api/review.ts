"use server";

import { getCourseBySlug } from "@/api/courses";
import { getSession } from "@/api/session";
import { hasEnrollment } from "@/data/enrollments";
import { saveReview } from "@/data/reviews";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { reviewValues, type ReviewFormState } from "@/lib/review-fields";
import { paths } from "@/paths";
import { hasLocale } from "next-intl";

export type { ReviewFormState };

// Posted with the form. getLocale() reads next/root-params, which a server
// action is not allowed to call.
function localeFromForm(formData: FormData) {
  const value = formData.get("locale");
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

function courseSlugFromForm(formData: FormData) {
  const value = formData.get("slug");
  if (typeof value !== "string") return null;
  if (value.length > 80 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return null;
  return value;
}

export async function submitReview(
  _prev: ReviewFormState | null,
  formData: FormData,
): Promise<ReviewFormState> {
  const locale = localeFromForm(formData);
  const slug = courseSlugFromForm(formData);
  const session = await getSession();

  if (!session) {
    redirect({
      href: slug
        ? { pathname: paths.signIn(), query: { next: paths.course(slug) } }
        : paths.signIn(),
      locale,
    });
    return {};
  }

  const parsed = reviewValues(formData);
  if (!parsed.ok) return parsed.state;
  if (!slug) return {};

  const course = await getCourseBySlug(slug);
  if (!course) return {};
  if (!hasEnrollment(session.id, course.slug)) return { formError: "enrolled" };

  saveReview({
    userId: session.id,
    courseSlug: course.slug,
    authorName: session.name,
    rating: parsed.rating,
    body: parsed.body,
  });
  redirect({ href: `${paths.course(course.slug)}#reviews`, locale });
  return {};
}
