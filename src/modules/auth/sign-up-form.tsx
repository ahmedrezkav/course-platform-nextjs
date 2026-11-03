"use client";

import { signUp } from "@/api/auth";
import { Link } from "@/i18n/navigation";
import { paths } from "@/paths";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { AuthField, authFormErrorId, useAuthFormFocus } from "./field";

export function SignUpForm({ next }: { next: string | null }) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [state, action, pending] = useActionState(signUp, null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useAuthFormFocus(state);

  const errors = {
    name: t("errors.name"),
    email: t("errors.email"),
    password: t("errors.password"),
    confirm: t("errors.confirm"),
    taken: t("errors.taken"),
  };

  return (
    <>
      <form action={action} aria-labelledby="auth-title" aria-busy={pending} noValidate className="mt-8 grid gap-4">
        <input type="hidden" name="locale" value={locale} />
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {state?.formError ? (
          <p id={authFormErrorId} role="alert" tabIndex={-1} className="text-sm">
            {errors.taken}
          </p>
        ) : null}
        <AuthField
          name="name"
          type="text"
          label={t("fields.name")}
          autoComplete="name"
          dir="auto"
          value={name}
          onChange={setName}
          error={state?.fieldErrors?.name ? errors.name : undefined}
        />
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
          autoComplete="new-password"
          dir="ltr"
          value={password}
          onChange={setPassword}
          error={state?.fieldErrors?.password ? errors.password : undefined}
        />
        <AuthField
          name="confirmPassword"
          type="password"
          label={t("fields.confirmPassword")}
          autoComplete="new-password"
          dir="ltr"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={state?.fieldErrors?.confirmPassword ? errors.confirm : undefined}
        />
        <p className="sr-only" role="status">
          {pending ? t("signUp.pending") : ""}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="w-fit rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
        >
          {pending ? t("signUp.pending") : t("signUp.submit")}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        {t("signUp.hasAccount")}{" "}
        <Link
          href={next ? { pathname: paths.signIn(), query: { next } } : paths.signIn()}
          className="text-primary"
        >
          {t("signUp.signIn")}
        </Link>
      </p>
    </>
  );
}
