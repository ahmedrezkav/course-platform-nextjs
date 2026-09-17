import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  // Size-adjusted fallback uses unicode-range U+0–10FFFF and would paint
  // Arabic with Arial before IBM Plex Sans Arabic in the stack.
  adjustFontFallback: false,
});

export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});
