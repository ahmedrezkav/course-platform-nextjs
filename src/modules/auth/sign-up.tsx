import { safeNextPath } from "@/lib/auth-routes";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import type { AuthSearchParams } from "./sign-in";
import { AuthFieldsFallback } from "./skeleton";
import { SignUpForm } from "./sign-up-form";

export default async function SignUp({
  searchParams,
}: {
  searchParams: Promise<AuthSearchParams>;
}) {
  const t = await getTranslations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-md">
        <h1 id="auth-title" className="text-4xl font-semibold tracking-tight">
          {t("auth.signUp.title")}
        </h1>
        <p className="mt-3 text-muted">{t("auth.signUp.description")}</p>
        <Suspense fallback={<AuthFieldsFallback fields={4} label={t("loading.label")} />}>
          <SignUpBody searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SignUpBody({ searchParams }: { searchParams: Promise<AuthSearchParams> }) {
  const params = await searchParams;
  return <SignUpForm next={safeNextPath(params.next)} />;
}
