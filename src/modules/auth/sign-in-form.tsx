"use client";

import { signIn } from "@/api/auth";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { AuthField, authFormErrorId, useAuthFormFocus } from "./field";

export function SignInForm({ next }: { next: string | null }) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [state, action, pending] = useActionState(signIn, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useAuthFormFocus(state);

  const errors = {
    email: t("errors.email"),
    password: t("errors.password"),
    credentials: t("errors.credentials"),
  };

  return (
    <>
      <form action={action} aria-labelledby="auth-title" aria-busy={pending} noValidate className="mt-8 grid gap-4">
        <input type="hidden" name="locale" value={locale} />
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {state?.formError ? (
          <p id={authFormErrorId} role="alert" tabIndex={-1} className="text-sm">
            {errors.credentials}
          </p>
        ) : null}
        <AuthField
          name="email"
          type="email"
          label={t("fields.email")}
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={setEmail}
          error={state?.fieldErrors?.email ? errors.email : undefined}
        />
        <AuthField
          name="password"
          type="password"
          label={t("fields.password")}
          autoComplete="current-password"
          dir="ltr"
          value={password}
          onChange={setPassword}
          error={state?.fieldErrors?.password ? errors.password : undefined}
        />
        <p className="sr-only" role="status">
          {pending ? t("signIn.pending") : ""}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="w-fit rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
        >
          {pending ? t("signIn.pending") : t("signIn.submit")}
        </button>
      </form>
      <p className="mt-6 text-sm">
        <Link
          href={next ? { pathname: paths.signUp(), query: { next } } : paths.signUp()}
          className="text-primary underline underline-offset-4"
        >
          {t("signIn.createAccount")}
        </Link>
      </p>
    </>
  );
}
