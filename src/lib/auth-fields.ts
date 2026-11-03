export type AuthFormState = {
  fieldErrors?: {
    name?: "name";
    email?: "email";
    password?: "password";
    confirmPassword?: "confirm";
  };
  formError?: "credentials" | "taken";
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readName(value: unknown) {
  if (typeof value !== "string") return { error: "name" as const };
  const name = value.trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 80 || /[\u0000-\u001F]/.test(name)) {
    return { error: "name" as const };
  }
  return { name };
}

function readEmail(value: unknown) {
  if (typeof value !== "string") return { error: "email" as const };
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !emailPattern.test(email)) return { error: "email" as const };
  return { email };
}

function readPassword(value: unknown) {
  if (typeof value !== "string" || value.length < 8 || value.length > 72) {
    return { error: "password" as const };
  }
  return { password: value };
}

export function signInValues(
  formData: FormData,
): { ok: true; email: string; password: string } | { ok: false; state: AuthFormState } {
  const email = readEmail(formData.get("email"));
  const password = readPassword(formData.get("password"));
  const fieldErrors: NonNullable<AuthFormState["fieldErrors"]> = {};

  if ("error" in email) fieldErrors.email = email.error;
  if ("error" in password) fieldErrors.password = password.error;
  if ("error" in email || "error" in password) return { ok: false, state: { fieldErrors } };

  return { ok: true, email: email.email, password: password.password };
}

export function signUpValues(
  formData: FormData,
):
  | { ok: true; name: string; email: string; password: string }
  | { ok: false; state: AuthFormState } {
  const name = readName(formData.get("name"));
  const email = readEmail(formData.get("email"));
  const passwordRaw = formData.get("password");
  const password = readPassword(passwordRaw);
  const confirm = formData.get("confirmPassword");
  const fieldErrors: NonNullable<AuthFormState["fieldErrors"]> = {};

  if ("error" in name) fieldErrors.name = name.error;
  if ("error" in email) fieldErrors.email = email.error;
  if ("error" in password) fieldErrors.password = password.error;
  // Quiet when both are empty so the password message covers that submit.
  // A typed password that differs from confirm is its own error.
  if (typeof passwordRaw === "string" && passwordRaw.length > 0 && passwordRaw !== confirm) {
    fieldErrors.confirmPassword = "confirm";
  }

  if ("error" in name || "error" in email || "error" in password || fieldErrors.confirmPassword) {
    return { ok: false, state: { fieldErrors } };
  }

  return { ok: true, name: name.name, email: email.email, password: password.password };
}
