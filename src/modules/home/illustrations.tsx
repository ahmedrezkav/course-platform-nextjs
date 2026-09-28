export function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className="shrink-0 text-primary">
      <path
        fill="currentColor"
        d="M8 1.2 9.7 5.6 14.4 6l-3.5 3 1 4.6L8 11.4 4.1 13.6l1-4.6L1.6 6l4.7-.4L8 1.2Z"
      />
    </svg>
  );
}

export function ForwardIcon() {
  return (
    // Points to the inline end. Scale flips it under dir="rtl".
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 rtl:-scale-x-100"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 280 220"
      aria-hidden
      className="mx-auto h-auto w-full max-w-xs text-foreground lg:max-w-none"
    >
      <rect
        x="1"
        y="1"
        width="278"
        height="218"
        rx="12"
        className="fill-primary/10 stroke-border"
        strokeWidth="1"
      />
      <circle cx="52" cy="44" r="3" className="fill-primary" />
      <circle cx="78" cy="30" r="1.6" className="fill-muted" />
      <circle cx="214" cy="38" r="2.4" className="fill-primary" />
      <circle cx="236" cy="58" r="1.5" className="fill-muted" />
      <path d="M48 46 76 32" className="stroke-muted" strokeWidth="1" />
      <path d="M216 40 234 56" className="stroke-muted" strokeWidth="1" />
      <path d="M140 168V62" className="stroke-foreground" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M140 70 208 156H140Z"
        className="fill-primary/25 stroke-primary"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M140 88 84 156h56Z"
        className="fill-primary/45 stroke-primary"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M72 168h136" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M86 168c18 22 90 22 108 0"
        className="stroke-primary"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
