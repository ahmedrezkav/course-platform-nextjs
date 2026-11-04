import { getResumeLesson } from "@/api/progress";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { getTranslations } from "next-intl/server";

export async function EnrolledActions({ slug }: { slug: string }) {
  const [t, resume] = await Promise.all([getTranslations("learning"), getResumeLesson(slug)]);

  return (
    <div className="mt-6">
      <p className="font-medium">{t("enrolled")}</p>
      {resume ? (
        <Link
          href={paths.learn(slug, resume)}
          className="mt-3 inline-block rounded-sm bg-primary px-4 py-2 text-canvas"
        >
          {t("continue")}
        </Link>
      ) : null}
      <div>
        <Link href={paths.dashboard()} className="mt-2 inline-block text-sm text-primary">
          {t("dashboard")}
        </Link>
      </div>
    </div>
  );
}
