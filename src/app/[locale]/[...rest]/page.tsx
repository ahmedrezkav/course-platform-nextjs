import { notFound } from "next/navigation";

// Nested not-found.tsx is not a fallback route. It only renders when a page
// that already matched calls notFound(). `/en/missing` does not match
// [locale]/page.tsx, so Next never enters this layout (lang, dir, fonts,
// switcher) and uses app/not-found.tsx or the default 404 instead. This
// catch-all matches leftover segments so notFound() runs inside [locale].
export default function CatchAllPage() {
  notFound();
}
