import type { ReactNode } from "react";

const iconProps = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  "aria-hidden": true,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function WebIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 8 4 12l4 4M16 8l4 4-4 4" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 4.5 19.5 10 9 20.5H4V15.5L14 4.5z" />
      <path d="M12 6.5 17.5 12" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 19h16" />
      <path d="M7 19V11M12 19V6M17 19v-5" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg {...iconProps}>
      <rect x="4" y="4" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="10" height="10" rx="1.5" />
    </svg>
  );
}

function NodesIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="6" cy="12" r="2.25" />
      <circle cx="18" cy="6.5" r="2.25" />
      <circle cx="18" cy="17.5" r="2.25" />
      <path d="M8.2 12h5.2M14.2 8.2 16.2 7.4M14.2 15.8l2 1.2" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H19v13H7.5A2.5 2.5 0 0 0 5 19.5Z" />
      <path d="M5 16.5A2.5 2.5 0 0 1 7.5 14H19" />
    </svg>
  );
}

const courseIcons: Record<string, ReactNode> = {
  "intro-web-development": <WebIcon />,
  "arabic-calligraphy-basics": <PenIcon />,
  "data-analysis-with-python": <ChartIcon />,
  "product-design-fundamentals": <LayoutIcon />,
  "systems-architecture": <NodesIcon />,
};

export function CourseIcon({ slug }: { slug: string }) {
  return courseIcons[slug] ?? <BookIcon />;
}

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
