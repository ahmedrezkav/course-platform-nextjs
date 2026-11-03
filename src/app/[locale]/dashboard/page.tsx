import Learning from "@/modules/learning";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: { absolute: `${t("brandName")} · ${t("learning.title")}` },
  };
}

export default function Page() {
  return <Learning />;
}
