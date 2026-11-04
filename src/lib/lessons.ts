import type { Course } from "@/data/types";

export type LessonRef = {
  lesson: Course["modules"][number]["lessons"][number];
  index: number;
};

// Catalog order: each module, then the lessons inside it. The index is 1-based
// across the whole course so "lesson 2 of 4" matches the syllabus.
export function courseLessons(course: Course): LessonRef[] {
  const refs: LessonRef[] = [];

  for (const courseModule of course.modules) {
    for (const lesson of courseModule.lessons) {
      refs.push({ lesson, index: refs.length + 1 });
    }
  }

  return refs;
}

export function findLesson(course: Course, lessonSlug: string) {
  return courseLessons(course).find((entry) => entry.lesson.slug === lessonSlug) ?? null;
}
