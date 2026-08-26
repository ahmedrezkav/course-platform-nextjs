import { courses } from "@/data/courses";
import type { Course } from "@/data/types";
import { cacheLife } from "next/cache";

export async function getCourses(): Promise<Course[]> {
  "use cache";
  // Same catalog for every visitor; Cache Components needs this boundary
  // (or Suspense) so the route can still prerender a static shell.
  cacheLife("hours");
  return courses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  "use cache";
  cacheLife("hours");
  return courses.find((course) => course.slug === slug) ?? null;
}
