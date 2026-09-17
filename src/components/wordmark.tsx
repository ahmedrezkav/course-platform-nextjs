import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";

export async function Wordmark({ className }: { className?: string }) {
  const t = await getTranslations();

  return (
    <Link href={paths.home()} className={cn("text-xl font-semibold tracking-tight", className)}>
      {t("brandName")}
    </Link>
  );
}
