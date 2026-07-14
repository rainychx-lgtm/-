const numberedImages = (directory, count, extension) =>
  Array.from({ length: count }, (_, index) => `/assets/${directory}/${index + 1}.${extension}`);

const aiCompanionImages = Array.from(
  { length: 39 },
  (_, index) => `/assets/ai-companion-detail/AIGC分享01 3.${String(index + 1).padStart(3, "0")}.jpeg`,
);

export const caseStudies = [
  {
    slug: "online-class-interaction",
    title: "在线教育课中互动体系搭建",
    kicker: "Interactive System Design",
    category: "C端产品设计",
    thumbnail: "/assets/case-online-class-interaction.png",
    thumbnailSize: [752, 539],
    images: numberedImages("online-class-interaction-detail", 24, "png"),
  },
  {
    slug: "teacher-pc",
    title: "教师 PC 授课端",
    kicker: "B-End Product Design",
    category: "B端产品设计",
    thumbnail: "/assets/case-teacher-pc.png",
    thumbnailSize: [756, 542],
    images: numberedImages("teacher-pc-detail", 19, "png"),
  },
  {
    slug: "zhixue-redesign",
    title: "智学网改版设计",
    kicker: "C-End Product Design",
    category: "C端产品设计",
    thumbnail: "/assets/case-zhixue-redesign.png",
    thumbnailSize: [752, 539],
    images: numberedImages("zhixue-redesign-detail", 6, "jpg"),
  },
  {
    slug: "ai-companion",
    title: "AI 学伴设计",
    kicker: "AIGC Product Design",
    category: "C端产品设计",
    thumbnail: "/assets/case-ai-companion.png",
    thumbnailSize: [752, 539],
    images: aiCompanionImages,
  },
  {
    slug: "ux-upgrade",
    title: "用户体验专项",
    kicker: "Product Experience Upgrade",
    category: "产品体验升级（C端）",
    thumbnail: "/assets/case-ux-upgrade.png",
    thumbnailSize: [752, 539],
    images: [
      ...numberedImages("ux-upgrade-detail", 20, "jpg"),
      "/assets/ux-upgrade-detail/21.png",
    ],
  },
];

export const caseBySlug = Object.fromEntries(caseStudies.map((item) => [item.slug, item]));
