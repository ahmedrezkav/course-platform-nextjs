export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12" aria-hidden>
      <div className="h-10 w-28 animate-pulse rounded-sm bg-border" />
      <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded-sm bg-border" />
      <div className="mt-6 h-5 w-48 animate-pulse rounded-sm bg-border" />
    </main>
  );
}
