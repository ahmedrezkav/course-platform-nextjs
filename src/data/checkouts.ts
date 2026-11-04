// In-memory demo checkouts for this server process. Rows are not sealed
// into the cookie, and they never hold a card number. A restart clears the
// list; a cookie that is still valid still opens.

export type CheckoutStatus = "open" | "paid" | "canceled";

export type CheckoutSession = {
  id: string;
  userId: string;
  courseSlug: string;
  amount: number;
  status: CheckoutStatus;
};

const checkoutIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const checkouts: CheckoutSession[] = [];

export function isCheckoutId(value: string) {
  return checkoutIdPattern.test(value);
}

export function checkoutIdFromQuery(value: unknown) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string" || !isCheckoutId(raw)) return null;
  return raw;
}

export function getCheckout(id: string) {
  return checkouts.find((entry) => entry.id === id) ?? null;
}

// Reuse an open session only when the total still matches the course. A stale
// total is canceled so the student can start again instead of submitting a
// session the complete action will refuse.
export function openCheckout(userId: string, courseSlug: string, amount: number) {
  const existing = checkouts.find(
    (entry) =>
      entry.userId === userId && entry.courseSlug === courseSlug && entry.status === "open",
  );

  if (existing?.amount === amount) return existing.id;
  if (existing) existing.status = "canceled";

  const id = crypto.randomUUID();
  checkouts.push({ id, userId, courseSlug, amount, status: "open" });
  return id;
}

export function markCheckoutPaid(id: string, userId: string) {
  const row = checkouts.find((entry) => entry.id === id && entry.userId === userId);
  if (!row || row.status !== "open") return false;
  row.status = "paid";
  return true;
}

export function markCheckoutCanceled(id: string, userId: string) {
  const row = checkouts.find((entry) => entry.id === id && entry.userId === userId);
  if (!row || row.status !== "open") return false;
  row.status = "canceled";
  return true;
}
