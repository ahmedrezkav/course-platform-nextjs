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
