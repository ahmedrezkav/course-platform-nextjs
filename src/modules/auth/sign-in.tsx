import { getDemoStudent } from "@/api/students";
import { safeNextPath } from "@/lib/auth-routes";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { AuthFieldsFallback } from "./skeleton";
import { SignInForm } from "./sign-in-form";

export type AuthSearchParams = {
  next?: string | string[];
};

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<AuthSearchParams>;
}) {
  const t = await getTranslations();
  const demo = getDemoStudent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-md">
        <h1 id="auth-title" className="text-4xl font-semibold tracking-tight">
          {t("auth.signIn.title")}
        </h1>
        <p className="mt-3 text-muted">{t("auth.signIn.description")}</p>
        <p className="mt-4 text-sm text-muted">
          {t("auth.signIn.demo")} <span dir="ltr">{demo.email}</span>
        </p>
        <p className="mt-1 text-sm text-muted">
          {t("auth.signIn.demoPassword")} <span dir="ltr">{demo.password}</span>
        </p>
        <Suspense fallback={<AuthFieldsFallback fields={2} label={t("loading.label")} />}>
          <SignInBody searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SignInBody({ searchParams }: { searchParams: Promise<AuthSearchParams> }) {
  const params = await searchParams;
  return <SignInForm next={safeNextPath(params.next)} />;
}
