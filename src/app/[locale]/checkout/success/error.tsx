"use client";

import { CheckoutError } from "@/modules/checkout/error-state";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <CheckoutError error={error} retry={retry} />;
}
