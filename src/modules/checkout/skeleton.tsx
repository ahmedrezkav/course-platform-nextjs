export function CheckoutSkeleton({ heading = false }: { heading?: boolean }) {
  return (
    <div aria-hidden className="max-w-3xl">
      {heading ? (
        <>
          <div className="h-10 w-48 animate-pulse rounded-sm bg-border" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-sm bg-border" />
        </>
      ) : null}
      <div className="mt-8 h-8 w-2/3 animate-pulse rounded-sm bg-border" />
      <div className="mt-3 h-4 w-16 animate-pulse rounded-sm bg-border" />
      <div className="mt-2 h-6 w-24 animate-pulse rounded-sm bg-border" />
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="h-10 w-48 animate-pulse rounded-sm bg-border" />
        <div className="h-10 w-36 animate-pulse rounded-sm bg-border" />
      </div>
    </div>
  );
}

export function CheckoutBodyFallback({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      <CheckoutSkeleton />
    </>
  );
}

export function OutcomeSkeleton() {
  return (
    <div aria-hidden className="max-w-3xl">
      <div className="h-10 w-64 animate-pulse rounded-sm bg-border" />
      <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-sm bg-border" />
      <div className="mt-6 h-8 w-2/3 animate-pulse rounded-sm bg-border" />
      <div className="mt-6 h-10 w-40 animate-pulse rounded-sm bg-border" />
    </div>
  );
}

export function OutcomeFallback({ label }: { label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      <OutcomeSkeleton />
    </>
  );
}
