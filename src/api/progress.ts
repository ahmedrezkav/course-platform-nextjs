import { getCourseBySlug } from "@/api/courses";
import { getSession } from "@/api/session";
import { completedLessonSlugs } from "@/data/progress";
import type { Course } from "@/data/types";
import { courseLessons } from "@/lib/lessons";

export type CourseProgress = {
  completed: number;
  total: number;
  resumeSlug: string | null;
  completedSlugs: string[];
};

// Reads the session cookie. Callers belong under <Suspense> so a public page
// can still prerender. Rows stay in process memory and are not cached.

export async function getProgressForCourses(courses: Course[]) {
  const session = await getSession();
  const map = new Map<string, CourseProgress>();

  for (const course of courses) {
    const lessons = courseLessons(course);
    const done = new Set(session ? completedLessonSlugs(session.id, course.slug) : []);
    const completedSlugs = lessons
      .filter((entry) => done.has(entry.lesson.slug))
      .map((entry) => entry.lesson.slug);
    const next = lessons.find((entry) => !done.has(entry.lesson.slug));

    map.set(course.slug, {
      completed: completedSlugs.length,
      total: lessons.length,
      // The first unfinished lesson. When every lesson is done, the first
      // lesson — there is no separate review URL.
      resumeSlug: lessons.length === 0 ? null : (next ?? lessons[0]).lesson.slug,
      completedSlugs,
    });
  }

  return map;
}

export async function getResumeLesson(courseSlug: string) {
  const course = await getCourseBySlug(courseSlug);
  if (!course) return null;

  const progress = await getProgressForCourses([course]);
  return progress.get(course.slug)?.resumeSlug ?? null;
}
