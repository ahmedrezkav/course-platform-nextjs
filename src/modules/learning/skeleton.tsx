export function LearningSkeleton({ heading = false }: { heading?: boolean }) {
  return (
    <div aria-hidden>
      {heading ? (
        <>
          <div className="h-10 w-48 animate-pulse rounded-sm bg-border" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-sm bg-border" />
        </>
      ) : null}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-52 animate-pulse rounded-sm bg-border" />
        <div className="h-52 animate-pulse rounded-sm bg-border" />
        <div className="h-52 animate-pulse rounded-sm bg-border" />
      </div>
    </div>
  );
}

export function LearningListFallback({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      <LearningSkeleton />
    </>
  );
}
