// In-memory free enrollments for this server process. Rows are not sealed
// into the cookie. A restart clears the list; a cookie that is still valid
// still opens, so My learning is empty until that student enrolls again.
// The id is the one in the cookie, not a lookup in the student list.

type Enrollment = {
  userId: string;
  courseSlug: string;
};

const enrollments: Enrollment[] = [];

export function addEnrollment(userId: string, courseSlug: string) {
  const already = enrollments.some(
    (entry) => entry.userId === userId && entry.courseSlug === courseSlug,
  );
  if (already) return;

  enrollments.push({ userId, courseSlug });
}

export function enrollmentSlugs(userId: string) {
  return enrollments.filter((entry) => entry.userId === userId).map((entry) => entry.courseSlug);
}

export function hasEnrollment(userId: string, courseSlug: string) {
  return enrollments.some((entry) => entry.userId === userId && entry.courseSlug === courseSlug);
}
