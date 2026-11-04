"use server";

import { getCourseBySlug } from "@/api/courses";
import { getSession } from "@/api/session";
import {
  getCheckout,
  isCheckoutId,
  markCheckoutCanceled,
  markCheckoutPaid,
  openCheckout,
} from "@/data/checkouts";
import { addEnrollment, hasEnrollment } from "@/data/enrollments";
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

function checkoutIdFromForm(formData: FormData) {
  const value = formData.get("sessionId");
  if (typeof value !== "string" || !isCheckoutId(value)) return null;
  return value;
}

function successHref(id: string) {
  return { pathname: paths.checkoutSuccess(), query: { session: id } };
}

function cancelHref(id: string) {
  return { pathname: paths.checkoutCancel(), query: { session: id } };
}

// Demo checkout. The form posts a course slug or a session id.
// There is no card field, and this action never charges anyone.
export async function startCheckout(formData: FormData) {
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
  if (!course || course.price <= 0) return;

  if (hasEnrollment(session.id, course.slug)) {
    redirect({ href: paths.dashboard(), locale });
    return;
  }

  const id = openCheckout(session.id, course.slug, course.price);
  redirect({ href: paths.checkout(id), locale });
}

export async function completeCheckout(formData: FormData) {
  const locale = localeFromForm(formData);
  const id = checkoutIdFromForm(formData);
  const session = await getSession();

  if (!session) {
    redirect({
      href: id
        ? { pathname: paths.signIn(), query: { next: paths.checkout(id) } }
        : paths.signIn(),
      locale,
    });
    return;
  }

  if (!id) return;

  const row = getCheckout(id);
  if (!row || row.userId !== session.id) return;

  if (row.status === "paid") {
    redirect({ href: successHref(id), locale });
    return;
  }

  if (row.status !== "open") return;

  const course = await getCourseBySlug(row.courseSlug);
  if (!course || course.price <= 0 || course.price !== row.amount) return;

  addEnrollment(session.id, course.slug);
  markCheckoutPaid(id, session.id);
  redirect({ href: successHref(id), locale });
}

export async function cancelCheckout(formData: FormData) {
  const locale = localeFromForm(formData);
  const id = checkoutIdFromForm(formData);
  const session = await getSession();

  if (!session) {
    redirect({
      href: id
        ? { pathname: paths.signIn(), query: { next: paths.checkout(id) } }
        : paths.signIn(),
      locale,
    });
    return;
  }

  if (!id) return;

  const row = getCheckout(id);
  if (!row || row.userId !== session.id) return;

  if (row.status === "paid") {
    redirect({ href: successHref(id), locale });
    return;
  }

  if (row.status === "open") markCheckoutCanceled(id, session.id);
  redirect({ href: cancelHref(id), locale });
}
