import { AuthSkeleton } from "@/modules/auth/skeleton";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="sr-only" role="status">
        {t("label")}
      </p>
      <AuthSkeleton fields={4} />
    </div>
  );
}
