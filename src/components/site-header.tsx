import { HeaderTools } from "@/components/header-tools";
import { Wordmark } from "@/components/wordmark";
import { Suspense } from "react";

export function SiteHeader() {
  return (
    <header className="bg-canvas border-border sticky top-0 z-40 border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Wordmark />
        {/* usePathname is request-time; Suspense keeps the static shell. */}
        <Suspense fallback={<div className="ms-auto h-8 w-52" aria-hidden />}>
          <HeaderTools />
        </Suspense>
      </div>
    </header>
  );
}
