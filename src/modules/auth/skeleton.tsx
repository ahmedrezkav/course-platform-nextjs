function Fields({ fields }: { fields: number }) {
  return (
    <div className="mt-8 grid gap-4">
      {Array.from({ length: fields }, (_, index) => (
        <div key={index}>
          <div className="h-4 w-24 animate-pulse rounded-sm bg-border" />
          <div className="mt-2 h-10 animate-pulse rounded-sm bg-border" />
        </div>
      ))}
      <div className="h-10 w-36 animate-pulse rounded-sm bg-border" />
    </div>
  );
}

export function AuthSkeleton({ fields, hint = false }: { fields: number; hint?: boolean }) {
  return (
    <div aria-hidden className="max-w-md">
      <div className="h-10 w-48 animate-pulse rounded-sm bg-border" />
      <div className="mt-4 h-5 w-full animate-pulse rounded-sm bg-border" />
      {hint ? (
        <>
          <div className="mt-4 h-4 w-64 animate-pulse rounded-sm bg-border" />
          <div className="mt-2 h-4 w-40 animate-pulse rounded-sm bg-border" />
        </>
      ) : null}
      <Fields fields={fields} />
    </div>
  );
}

export function AuthFieldsFallback({ fields, label }: { fields: number; label: string }) {
  return (
    <>
      <p className="sr-only" role="status">
        {label}
      </p>
      <div aria-hidden>
        <Fields fields={fields} />
      </div>
    </>
  );
}
