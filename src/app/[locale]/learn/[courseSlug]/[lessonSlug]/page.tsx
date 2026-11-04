import { getCourseBySlug, getCourses } from "@/api/courses";
import { courseLessons, findLesson } from "@/lib/lessons";
import Player from "@/modules/player";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// Every catalog lesson is known at build time, so this page can await `params`
// and prerender the title. A pair that is not in the catalog still matches
// these segments; notFound() renders this segment's not-found inside the shell.
export async function generateStaticParams() {
  const courses = await getCourses();

  return courses.flatMap((course) =>
    courseLessons(course).map((entry) => ({
      courseSlug: course.slug,
      lessonSlug: entry.lesson.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/learn/[courseSlug]/[lessonSlug]">) {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  const entry = course ? findLesson(course, lessonSlug) : null;

  if (!course || !entry) {
    notFound();
  }

  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);

  return {
    title: { absolute: `${t("brandName")} · ${entry.lesson.title[locale]}` },
    description: course.description[locale],
  };
}

export default async function Page({
  params,
}: PageProps<"/[locale]/learn/[courseSlug]/[lessonSlug]">) {
  const { courseSlug, lessonSlug } = await params;
  const course = await getCourseBySlug(courseSlug);
  const entry = course ? findLesson(course, lessonSlug) : null;

  if (!course || !entry) {
    notFound();
  }

  return <Player course={course} entry={entry} />;
}
