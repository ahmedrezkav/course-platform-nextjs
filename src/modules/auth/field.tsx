"use client";

import { cn } from "@/lib/cn";
import { useEffect } from "react";

const fieldOrder = ["name", "email", "password", "confirmPassword"] as const;

export function authFieldId(name: string) {
  return `auth-${name}`;
}

export const authFormErrorId = "auth-form-error";

export function useAuthFormFocus(
  state: {
    fieldErrors?: Partial<Record<string, string>>;
    formError?: string;
  } | null,
) {
  useEffect(() => {
    if (!state) return;

    const first = fieldOrder.find((field) => state.fieldErrors?.[field]);
    if (first) {
      document.getElementById(authFieldId(first))?.focus();
      return;
    }

    if (state.formError) {
      document.getElementById(authFormErrorId)?.focus();
    }
  }, [state]);
}

export function AuthField({
  name,
  type,
  label,
  autoComplete,
  dir,
  error,
  value,
  onChange,
}: {
  name: "name" | "email" | "password" | "confirmPassword";
  type: "text" | "email" | "password";
  label: string;
  autoComplete: string;
  dir: "ltr" | "auto";
  error?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = authFieldId(name);
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        dir={dir}
        autoComplete={autoComplete}
        autoCapitalize={type === "email" ? "none" : undefined}
        spellCheck={type === "email" ? false : undefined}
        aria-required="true"
        // Controlled so a finished action cannot clear what was typed.
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-1 w-full rounded-sm border bg-canvas px-3 py-2",
          error ? "border-foreground" : "border-border",
        )}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
