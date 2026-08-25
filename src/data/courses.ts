import type { Course } from "./types";

const sampleVideo = {
  videoSrc:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  posterSrc:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
};

export const courses: Course[] = [
  {
    slug: "intro-web-development",
    title: {
      en: "Introduction to Web Development",
      ar: "مقدمة في تطوير الويب",
    },
    description: {
      en: "Build your first pages with HTML, CSS, and accessible structure.",
      ar: "ابنِ صفحاتك الأولى باستخدام HTML وCSS وهيكل يراعي إمكانية الوصول.",
    },
    category: { en: "Programming", ar: "البرمجة" },
    level: "beginner",
    price: 0,
    featured: true,
    instructorName: { en: "Lina Farouk", ar: "لينا فاروق" },
    modules: [
      {
        slug: "getting-started",
        title: { en: "Getting started", ar: "البداية" },
        lessons: [
          {
            slug: "welcome",
            title: { en: "Welcome to the web", ar: "مرحباً بك في الويب" },
            type: "video",
            durationMinutes: 8,
            ...sampleVideo,
          },
          {
            slug: "html-foundations",
            title: { en: "HTML foundations", ar: "أساسيات HTML" },
            type: "article",
            durationMinutes: 12,
            body: {
              en: "## HTML foundations\n\nStart with landmarks, headings, and meaningful markup.",
              ar: "## أساسيات HTML\n\nابدأ بالمعالم والعناوين والترميز ذي المعنى.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "arabic-calligraphy-basics",
    title: {
      en: "Arabic Calligraphy Basics",
      ar: "أساسيات الخط العربي",
    },
    description: {
      en: "Learn Naskh proportions, tools, and a first practice sheet.",
      ar: "تعلّم نسب النسخ والأدوات وأول لوحة تدريب.",
    },
    category: { en: "Art", ar: "الفنون" },
    level: "beginner",
    price: 0,
    featured: false,
    instructorName: { en: "Yusuf Al-Hariri", ar: "يوسف الحريري" },
    modules: [
      {
        slug: "tools-and-forms",
        title: { en: "Tools and forms", ar: "الأدوات والأشكال" },
        lessons: [
          {
            slug: "choosing-a-qalam",
            title: { en: "Choosing a qalam", ar: "اختيار القلم" },
            type: "article",
            durationMinutes: 10,
            body: {
              en: "## Choosing a qalam\n\nA reed pen with a sharp nib keeps Naskh strokes consistent.",
              ar: "## اختيار القلم\n\nقلم القصب ذو السن الحاد يحافظ على اتساق ضربات النسخ.",
            },
          },
          {
            slug: "first-alif",
            title: { en: "Your first alif", ar: "ألفك الأولى" },
            type: "video",
            durationMinutes: 14,
            ...sampleVideo,
          },
        ],
      },
    ],
  },
  {
    slug: "data-analysis-with-python",
    title: {
      en: "Data Analysis with Python",
      ar: "تحليل البيانات باستخدام بايثون",
    },
    description: {
      en: "Clean tables, plot trends, and tell a short story with numbers.",
      ar: "نظّف الجداول، ارسم الاتجاهات، واحكِ قصة قصيرة بالأرقام.",
    },
    category: { en: "Data", ar: "البيانات" },
    level: "intermediate",
    price: 49,
    featured: true,
    instructorName: { en: "Mariam Chen", ar: "مريم تشين" },
    modules: [
      {
        slug: "tables-to-charts",
        title: { en: "From tables to charts", ar: "من الجداول إلى الرسوم" },
        lessons: [
          {
            slug: "pandas-warmup",
            title: { en: "Pandas warmup", ar: "تمهيد بانداس" },
            type: "video",
            durationMinutes: 18,
            ...sampleVideo,
          },
          {
            slug: "reading-a-dataset",
            title: { en: "Reading a dataset", ar: "قراءة مجموعة بيانات" },
            type: "article",
            durationMinutes: 15,
            body: {
              en: "## Reading a dataset\n\nLoad a CSV, check missing values, and name your columns clearly.",
              ar: "## قراءة مجموعة بيانات\n\nحمّل ملف CSV، افحص القيم الناقصة، وسمِّ الأعمدة بوضوح.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "product-design-fundamentals",
    title: {
      en: "Product Design Fundamentals",
      ar: "أساسيات تصميم المنتجات",
    },
    description: {
      en: "Turn a messy brief into flows, wireframes, and a testable prototype.",
      ar: "حوّل موجزاً مشوشاً إلى تدفقات وإطارات سلكية ونموذج قابل للاختبار.",
    },
    category: { en: "Design", ar: "التصميم" },
    level: "intermediate",
    price: 79,
    featured: true,
    instructorName: { en: "Noor Haddad", ar: "نور حداد" },
    modules: [
      {
        slug: "from-brief-to-flow",
        title: { en: "From brief to flow", ar: "من الموجز إلى التدفق" },
        lessons: [
          {
            slug: "framing-the-problem",
            title: { en: "Framing the problem", ar: "تأطير المشكلة" },
            type: "article",
            durationMinutes: 11,
            body: {
              en: "## Framing the problem\n\nWrite who it is for, what hurts, and how you will know it worked.",
              ar: "## تأطير المشكلة\n\nاكتب لمن هي، وما الذي يؤلم، وكيف ستعرف أنها نجحت.",
            },
          },
          {
            slug: "first-wireframe",
            title: { en: "Your first wireframe", ar: "أول إطار سلكي" },
            type: "video",
            durationMinutes: 16,
            ...sampleVideo,
          },
        ],
      },
    ],
  },
  {
    slug: "systems-architecture",
    title: {
      en: "Systems Architecture",
      ar: "هندسة الأنظمة",
    },
    description: {
      en: "Model services, data stores, and failure modes for a growing product.",
      ar: "نمذج الخدمات ومخازن البيانات وأنماط الفشل لمنتج آخذ في النمو.",
    },
    category: { en: "Engineering", ar: "الهندسة" },
    level: "advanced",
    price: 129,
    featured: false,
    instructorName: { en: "Karim Nasser", ar: "كريم ناصر" },
    modules: [
      {
        slug: "boundaries",
        title: { en: "Boundaries", ar: "الحدود" },
        lessons: [
          {
            slug: "drawing-the-box",
            title: { en: "Drawing the box", ar: "رسم الصندوق" },
            type: "video",
            durationMinutes: 22,
            ...sampleVideo,
          },
          {
            slug: "failure-modes",
            title: { en: "Failure modes", ar: "أنماط الفشل" },
            type: "article",
            durationMinutes: 20,
            body: {
              en: "## Failure modes\n\nList what breaks first, how users notice, and what you degrade to.",
              ar: "## أنماط الفشل\n\nعدد ما ينكسر أولاً، وكيف يلاحظ المستخدمون ذلك، وإلى ماذا تتراجع.",
            },
          },
        ],
      },
    ],
  },
];
