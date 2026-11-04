"use server";

import { getCourseBySlug } from "@/api/courses";
import { getSession } from "@/api/session";
import { hasEnrollment } from "@/data/enrollments";
import { markLessonComplete as saveLessonComplete } from "@/data/progress";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { findLesson } from "@/lib/lessons";
import { paths } from "@/paths";
import { hasLocale } from "next-intl";

// Posted with the form. getLocale() reads next/root-params, which a server
// action is not allowed to call.
function localeFromForm(formData: FormData) {
  const value = formData.get("locale");
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}

function slugFromForm(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  if (value.length > 80 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return null;
  return value;
}

export async function markLessonComplete(formData: FormData) {
  const locale = localeFromForm(formData);
  const courseSlug = slugFromForm(formData, "courseSlug");
  const lessonSlug = slugFromForm(formData, "lessonSlug");
  const session = await getSession();

  if (!session) {
    redirect({
      href:
        courseSlug && lessonSlug
          ? {
              pathname: paths.signIn(),
              query: { next: paths.learn(courseSlug, lessonSlug) },
            }
          : paths.signIn(),
      locale,
    });
    return;
  }

  if (!courseSlug || !lessonSlug) return;

  const course = await getCourseBySlug(courseSlug);
  const entry = course ? findLesson(course, lessonSlug) : null;
  if (!course || !entry || !hasEnrollment(session.id, course.slug)) return;

  saveLessonComplete(session.id, course.slug, entry.lesson.slug);
  redirect({ href: paths.learn(course.slug, entry.lesson.slug), locale });
}
