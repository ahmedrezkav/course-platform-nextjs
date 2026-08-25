import { notFound } from "next/navigation";

// Unmatched paths skip [locale]/not-found unless a page calls notFound().
export default function CatchAllPage() {
  notFound();
}
