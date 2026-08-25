export const paths = {
  home: () => "/",
  catalog: () => "/courses",
  course: (slug: string) => `/courses/${slug}`,
  learn: (courseSlug: string, lessonSlug: string) =>
    `/learn/${courseSlug}/${lessonSlug}`,
  dashboard: () => "/dashboard",
  signIn: () => "/sign-in",
  signUp: () => "/sign-up",
  checkout: (sessionId: string) => `/checkout/${sessionId}`,
  checkoutSuccess: () => "/checkout/success",
  checkoutCancel: () => "/checkout/cancel",
};
