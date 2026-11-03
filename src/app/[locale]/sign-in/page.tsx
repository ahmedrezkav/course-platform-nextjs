import { SignIn } from "@/modules/auth";
import type { AuthSearchParams } from "@/modules/auth/sign-in";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: { absolute: `${t("brandName")} · ${t("auth.signIn.title")}` },
  };
}

export default function Page({ searchParams }: { searchParams: Promise<AuthSearchParams> }) {
  return <SignIn searchParams={searchParams} />;
}
