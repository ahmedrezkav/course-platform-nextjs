"use client";

import { cancelCheckout, completeCheckout } from "@/api/checkout";
import { useLocale, useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

// Separate forms so only the clicked action goes pending. Each form posts
// the session id. Card data is never collected.
export function CheckoutActions({ sessionId }: { sessionId: string }) {
  const locale = useLocale();

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <form action={completeCheckout}>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="sessionId" value={sessionId} />
        <PayButton />
      </form>
      <form action={cancelCheckout}>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="sessionId" value={sessionId} />
        <CancelButton />
      </form>
    </div>
  );
}

function PayButton() {
  const t = useTranslations("checkout");
  const { pending } = useFormStatus();

  return (
    <>
      <p className="sr-only" role="status">
        {pending ? t("payPending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
      >
        {pending ? t("payPending") : t("pay")}
      </button>
    </>
  );
}

function CancelButton() {
  const t = useTranslations("checkout");
  const { pending } = useFormStatus();

  return (
    <>
      <p className="sr-only" role="status">
        {pending ? t("cancelPending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="rounded-sm border border-border px-4 py-2 disabled:opacity-70"
      >
        {pending ? t("cancelPending") : t("cancel")}
      </button>
    </>
  );
}
