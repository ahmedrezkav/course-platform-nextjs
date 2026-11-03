"use server";

import { getCourseBySlug } from "@/api/courses";
import { getSession } from "@/api/session";
import { addEnrollment } from "@/data/enrollments";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { paths } from "@/paths";
import { hasLocale } from "next-intl";

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

export async function enrollFree(formData: FormData) {
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
    return;
  }

  if (!slug) return;

  const course = await getCourseBySlug(slug);
  // Paid courses are not free enrollments. Checkout is a later phase.
  if (!course || course.price !== 0) return;

  addEnrollment(session.id, course.slug);
  redirect({ href: paths.dashboard(), locale });
}
