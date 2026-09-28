export function CatalogSkeleton({ heading = false }: { heading?: boolean }) {
  return (
    <div aria-hidden>
      {heading ? (
        <>
          <div className="h-10 w-40 animate-pulse rounded-sm bg-border" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-sm bg-border" />
        </>
      ) : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["level", "category", "price"].map((group) => (
          <div key={group}>
            <div className="h-4 w-16 animate-pulse rounded-sm bg-border" />
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="h-8 w-14 animate-pulse rounded-sm bg-border" />
              <div className="h-8 w-20 animate-pulse rounded-sm bg-border" />
              <div className="h-8 w-24 animate-pulse rounded-sm bg-border" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 h-8 w-32 animate-pulse rounded-sm bg-border" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-52 animate-pulse rounded-sm bg-border" />
        <div className="h-52 animate-pulse rounded-sm bg-border" />
        <div className="h-52 animate-pulse rounded-sm bg-border" />
      </div>
    </div>
  );
}

export function CatalogResultsFallback({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      <CatalogSkeleton />
    </>
  );
}
