import Catalog from "@/modules/catalog";
import type { CatalogSearchParams } from "@/modules/catalog/filters";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: { absolute: `${t("brandName")} · ${t("catalog.title")}` },
  };
}

export default function Page({ searchParams }: { searchParams: Promise<CatalogSearchParams> }) {
  return <Catalog searchParams={searchParams} />;
}
