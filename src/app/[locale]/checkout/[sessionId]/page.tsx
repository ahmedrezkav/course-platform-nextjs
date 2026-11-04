import Checkout from "@/modules/checkout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: { absolute: `${t("brandName")} · ${t("checkout.title")}` },
  };
}

export default function Page({ params }: PageProps<"/[locale]/checkout/[sessionId]">) {
  return <Checkout params={params} />;
}
