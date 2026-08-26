// Locale-unprefixed helpers. Pair with `@/i18n/navigation` `Link`, which
// adds `/en` or `/ar` from the active locale. Do not hardcode prefixes.
export const paths = {
  home: () => "/",
  catalog: () => "/courses",
  course: (slug: string) => `/courses/${slug}`,
  learn: (courseSlug: string, lessonSlug: string) => `/learn/${courseSlug}/${lessonSlug}`,
  dashboard: () => "/dashboard",
  signIn: () => "/sign-in",
  signUp: () => "/sign-up",
  checkout: (sessionId: string) => `/checkout/${sessionId}`,
  checkoutSuccess: () => "/checkout/success",
  checkoutCancel: () => "/checkout/cancel",
};
