import { getSession } from "@/api/session";
import { hasEnrollment } from "@/data/enrollments";
import { listReviews } from "@/data/reviews";
import type { ReviewRating } from "@/lib/review-fields";

export type CourseReview = {
  userId: string;
  authorName: string;
  rating: ReviewRating;
  body: string;
  own: boolean;
};

export type ReviewViewer = "guest" | "locked" | "enrolled";

// Reads the session cookie. Callers belong under <Suspense> so the course
// title can still prerender. Rows stay in process memory and are not cached.

export async function getCourseReviews(courseSlug: string): Promise<{
  viewer: ReviewViewer;
  reviews: CourseReview[];
}> {
  const session = await getSession();
  const enrolled = session ? hasEnrollment(session.id, courseSlug) : false;

  return {
    viewer: !session ? "guest" : enrolled ? "enrolled" : "locked",
    reviews: listReviews(courseSlug).map((review) => ({
      userId: review.userId,
      authorName: review.authorName,
      rating: review.rating,
      body: review.body,
      own: session?.id === review.userId,
    })),
  };
}
