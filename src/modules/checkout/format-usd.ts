import { getFormatter } from "next-intl/server";

// Latin USD, same as the course page. Callers set dir="ltr" so the symbol
// does not swap under Arabic.
export async function formatUsd(amount: number) {
  const formatPrice = await getFormatter({ locale: "en" });
  return formatPrice.number(amount, { style: "currency", currency: "USD" });
}
