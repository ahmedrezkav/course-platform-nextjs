import { getCourses } from "@/api/courses";
import { enrollmentSlugs, hasEnrollment } from "@/data/enrollments";
import type { Course } from "@/data/types";
import { getSession } from "@/api/session";

// Reads the session cookie. Callers belong under <Suspense> so a public page
// can still prerender. Rows stay in process memory and are not cached.

export async function getMyCourses(): Promise<Course[]> {
  const session = await getSession();
  if (!session) return [];

  const catalog = await getCourses();
  const bySlug = new Map(catalog.map((course) => [course.slug, course]));

  return enrollmentSlugs(session.id).flatMap((slug) => {
    const course = bySlug.get(slug);
    return course ? [course] : [];
  });
}

export async function getEnrollmentState(slug: string): Promise<"guest" | "enrolled" | "open"> {
  const session = await getSession();
  if (!session) return "guest";
  return hasEnrollment(session.id, slug) ? "enrolled" : "open";
}
