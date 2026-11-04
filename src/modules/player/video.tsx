import type { Locale, VideoLesson } from "@/data/types";

export function LessonVideo({
  lesson,
  locale,
  label,
  captionsLabel,
  unsupported,
}: {
  lesson: VideoLesson;
  locale: Locale;
  label: string;
  captionsLabel: string;
  unsupported: string;
}) {
  const captionSrc = locale === "ar" ? lesson.captionSrcAr : lesson.captionSrcEn;

  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={lesson.posterSrc}
      aria-label={label}
      className="mt-6 aspect-video w-full rounded-sm bg-border"
    >
      <source src={lesson.videoSrc} type="video/mp4" />
      {captionSrc ? (
        <track kind="captions" srcLang={locale} src={captionSrc} label={captionsLabel} default />
      ) : null}
      {unsupported}
    </video>
  );
}
