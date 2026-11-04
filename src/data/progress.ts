// In-memory lesson completion for this server process. Rows are not sealed
// into the cookie. A restart clears them together with enrollments. A row
// does not enroll the student; the player checks enrollment before writing.

type LessonProgress = {
  userId: string;
  courseSlug: string;
  lessonSlug: string;
};

const progress: LessonProgress[] = [];

export function markLessonComplete(userId: string, courseSlug: string, lessonSlug: string) {
  const already = progress.some(
    (entry) =>
      entry.userId === userId &&
      entry.courseSlug === courseSlug &&
      entry.lessonSlug === lessonSlug,
  );
  if (already) return;

  progress.push({ userId, courseSlug, lessonSlug });
}

export function completedLessonSlugs(userId: string, courseSlug: string) {
  return progress
    .filter((entry) => entry.userId === userId && entry.courseSlug === courseSlug)
    .map((entry) => entry.lessonSlug);
}
