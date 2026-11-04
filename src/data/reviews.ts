// In-memory course reviews for this server process. Rows are not sealed
// into the cookie. A restart clears them together with enrollments. A row
// does not enroll the student; submitReview checks enrollment before writing.

type Review = {
  userId: string;
  courseSlug: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
};

const reviews: Review[] = [];

export function saveReview(review: Review) {
  const existing = reviews.find(
    (entry) => entry.userId === review.userId && entry.courseSlug === review.courseSlug,
  );
  // One row per student and course. A repeated submit updates it.
  if (existing) {
    existing.authorName = review.authorName;
    existing.rating = review.rating;
    existing.body = review.body;
    return;
  }

  reviews.push(review);
}

export function listReviews(courseSlug: string) {
  return reviews.filter((entry) => entry.courseSlug === courseSlug).slice().reverse();
}
