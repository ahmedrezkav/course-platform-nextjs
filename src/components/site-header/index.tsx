import { getSession } from "@/api/session";
import { Suspense } from "react";
import { HeaderTools } from "./header-tools";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="bg-canvas border-border sticky top-0 z-40 border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Wordmark />
        {/* usePathname and the session cookie are request-time. Suspense keeps the static shell. */}
        <Suspense fallback={<div className="ms-auto h-8 w-40 md:w-80" aria-hidden />}>
          <HeaderBar />
        </Suspense>
      </div>
    </header>
  );
}

async function HeaderBar() {
  const session = await getSession();
  return <HeaderTools session={session} />;
}
