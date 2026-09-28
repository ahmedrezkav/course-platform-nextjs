import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("course.notFound");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("description")}</p>
      <Link href={paths.catalog()} className="mt-6 inline-block text-primary">
        {t("catalog")}
      </Link>
    </div>
  );
}
