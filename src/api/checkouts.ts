import { getCourseBySlug } from "@/api/courses";
import { getSession } from "@/api/session";
import {
  checkoutIdFromQuery,
  getCheckout,
  isCheckoutId,
  type CheckoutStatus,
} from "@/data/checkouts";
import type { Course } from "@/data/types";

export { checkoutIdFromQuery, isCheckoutId };

export type CheckoutView = {
  id: string;
  status: CheckoutStatus;
  amount: number;
  course: Course;
};

// Reads the session cookie. Callers belong under <Suspense>. Rows stay in
// process memory and are not cached. A bad id, another student, or a missing
// course all look the same so the page can 404 without confirming the id.
export async function getCheckoutForViewer(id: string): Promise<CheckoutView | null> {
  if (!isCheckoutId(id)) return null;

  const session = await getSession();
  if (!session) return null;

  const row = getCheckout(id);
  if (!row || row.userId !== session.id) return null;

  const course = await getCourseBySlug(row.courseSlug);
  if (!course) return null;

  return { id: row.id, status: row.status, amount: row.amount, course };
}
