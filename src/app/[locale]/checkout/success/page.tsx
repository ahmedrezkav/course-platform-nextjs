import { CheckoutOutcome } from "@/modules/checkout/outcome";
import { getTranslations } from "next-intl/server";

// Static segment so `/checkout/success` is not captured by `[sessionId]`.
export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: { absolute: `${t("brandName")} · ${t("checkout.successTitle")}` },
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ session?: string | string[] }>;
}) {
  return <CheckoutOutcome kind="success" searchParams={searchParams} />;
}
