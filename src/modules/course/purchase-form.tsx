"use client";

import { startCheckout } from "@/api/checkout";
import { useLocale, useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

// Posts the course slug only. Card data is never collected.
export function PurchaseForm({ slug }: { slug: string }) {
  const locale = useLocale();

  return (
    <form action={startCheckout} className="mt-3">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={slug} />
      <BuyButton />
    </form>
  );
}

function BuyButton() {
  const t = useTranslations("checkout");
  const { pending } = useFormStatus();

  return (
    <>
      <p className="sr-only" role="status">
        {pending ? t("buyPending") : ""}
      </p>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className="rounded-sm bg-primary px-4 py-2 text-canvas disabled:opacity-70"
      >
        {pending ? t("buyPending") : t("buy")}
      </button>
    </>
  );
}
