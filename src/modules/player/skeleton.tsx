export function PlayerSkeleton({ heading = false }: { heading?: boolean }) {
  return (
    <div aria-hidden>
      {heading ? (
        <>
          <div className="h-4 w-28 animate-pulse rounded-sm bg-border" />
          <div className="mt-6 h-10 w-4/5 max-w-xl animate-pulse rounded-sm bg-border" />
          <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded-sm bg-border" />
        </>
      ) : null}
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="h-4 w-48 animate-pulse rounded-sm bg-border" />
          <div className="mt-6 aspect-video w-full animate-pulse rounded-sm bg-border" />
          <div className="mt-6 h-10 w-36 animate-pulse rounded-sm bg-border" />
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="h-10 w-40 animate-pulse rounded-sm bg-border" />
            <div className="ms-auto h-10 w-40 animate-pulse rounded-sm bg-border" />
          </div>
        </div>
        <div>
          <div className="h-6 w-24 animate-pulse rounded-sm bg-border" />
          <div className="mt-4 h-4 w-32 animate-pulse rounded-sm bg-border" />
          <div className="mt-3 h-10 w-full animate-pulse rounded-sm bg-border" />
          <div className="mt-2 h-10 w-full animate-pulse rounded-sm bg-border" />
        </div>
      </div>
    </div>
  );
}

export function PlayerBodyFallback({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      <PlayerSkeleton />
    </>
  );
}
