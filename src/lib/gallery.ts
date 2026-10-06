/** Locally hosted product & project photos (public/assets/gallery) */

export const galleryImages = [
  "/assets/gallery/product-24.jpg",
  "/assets/gallery/product-25.jpg",
  "/assets/gallery/product-26.jpg",
  "/assets/gallery/product-27.jpg",
  "/assets/gallery/product-28.jpg",
  "/assets/gallery/product-29.jpg",
  "/assets/gallery/product-30.jpg",
  "/assets/gallery/product-31.jpg",
  "/assets/gallery/product-32.jpg",
  "/assets/gallery/product-33.jpg",
  "/assets/gallery/product-34.jpg",
  "/assets/gallery/product-35.jpg",
  "/assets/gallery/product-36.jpg",
  "/assets/gallery/product-37.jpg",
  "/assets/gallery/product-38.jpg",
  "/assets/gallery/product-39.jpg",
  "/assets/gallery/product-40.jpg",
  "/assets/gallery/product-41.jpg",
  "/assets/gallery/product-42.jpg",
  "/assets/gallery/product-43.jpg",
  "/assets/gallery/product-44.jpg",
  "/assets/gallery/product-45.jpg",
  "/assets/gallery/product-46.jpg",
  "/assets/gallery/product-02.png",
  "/assets/gallery/product-04.png",
  "/assets/gallery/product-06.png",
  "/assets/gallery/product-08.png",
  "/assets/gallery/product-10.png",
  "/assets/gallery/product-12.png",
  "/assets/gallery/product-14.png",
  "/assets/gallery/product-15.png",
  "/assets/gallery/product-17.png",
  "/assets/gallery/product-19.png",
  "/assets/gallery/product-21.png",
  "/assets/gallery/product-22.png",
] as const;

const LEGACY_KEEP_PREFIXES = [
  "/assets/gallery/",
  "/assets/brand/",
  "/assets/team/",
  "/assets/2025/",
  "https://aronixinfra.com/",
  "http://aronixinfra.com/",
];

export function isLegacyMediaImage(src: string | null | undefined): boolean {
  if (!src) return true;
  return !LEGACY_KEEP_PREFIXES.some((prefix) => src.startsWith(prefix));
}

export function galleryImageForKey(key: string | number): string {
  const str = String(key);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i) * (i + 1)) % galleryImages.length;
  }
  return galleryImages[hash];
}

export function resolveDisplayImage(
  src: string | null | undefined,
  key: string | number
): string {
  if (!isLegacyMediaImage(src)) return src!;
  return galleryImageForKey(key);
}

export type HomeProjectGridItem = {
  id: string;
  title: string;
  kind: "video" | "image";
  src: string;
};

const homeProjectVideoTitles = [
  "Guard cabin — on-truck delivery",
  "Portable office container delivery",
  "Factory delivery footage",
  "Site installation clip",
  "On-truck deployment",
  "Project deployment footage",
];

export function playableVideos(videos: string[]): string[] {
  return videos.filter((src) => src.startsWith("/assets/videos/"));
}

export function buildHomeProjectGridItems(videos: string[]): HomeProjectGridItem[] {
  const videoItems: HomeProjectGridItem[] = playableVideos(videos).map((src, i) => ({
    id: `video-${i}`,
    title: homeProjectVideoTitles[i] ?? `Project video ${i + 1}`,
    kind: "video" as const,
    src,
  }));

  const imageTitles = [
    "Portable office on delivery truck",
    "Finished cabin interior",
  ];

  const imageItems: HomeProjectGridItem[] = galleryImages.slice(0, 2).map((src, i) => ({
    id: `gallery-${i}`,
    title: imageTitles[i] ?? `Delivered project ${i + 1}`,
    kind: "image" as const,
    src,
  }));

  return [...videoItems, ...imageItems];
}

export type HeroShowcaseSlide = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const heroShowcaseSlides: HeroShowcaseSlide[] = [
  {
    id: "portable-office-cabin",
    title: "Portable Office Cabin",
    description: "Portable office cabin for site teams.",
    image: "/assets/2025/10/Portable-Office-Cabin-1.jpg",
    href: "/product/portable-office-cabin-2",
  },
  {
    id: "prefabricated-manager-cabin",
    title: "Prefabricated Manager Cabin",
    description: "Manager cabin, ready for site deployment.",
    image: "/assets/2025/10/Prefabricated-Manager-Cabin-3.jpg",
    href: "/product/prefabricated-manager-cabin",
  },
  {
    id: "portable-workstation-cabin",
    title: "Portable Workstation Cabin",
    description: "Workstation cabin, delivered to your site.",
    image: "/assets/2025/10/Portable-Workstation-Cabin.jpg",
    href: "/product/portable-workstation-cabin",
  },
  {
    id: "mild-steel-guard-cabin",
    title: "Mild Steel Guard Cabin",
    description: "Guard cabin for gates and warehouses.",
    image: "/assets/2025/10/Mild-Steel-Guard-Cabin.jpg",
    href: "/product/mild-steel-guard-cabin",
  },
  {
    id: "white-steel-portable-cabin",
    title: "White Steel Portable Cabin",
    description: "Insulated office cabin, delivered in 7–15 days.",
    image: "/assets/2025/10/White-Steel-Portable-Cabin.jpg",
    href: "/product/white-steel-portable-cabin",
  },
];

export const projectGridImages = galleryImages.slice(0, 8).map((src, i) => ({
  id: `gallery-${i + 1}`,
  src,
  title: [
    "Portable office on delivery truck",
    "Finished cabin interior",
    "Site office with glass doors",
    "Guard cabin — custom colours",
    "Container unit at project site",
    "Crane placement on site",
    "Multi-window office cabin",
    "Factory-built portable unit",
  ][i] ?? `Delivered project ${i + 1}`,
}));

/** Real photos for company album marquee (about page) */
export const companyAlbumImages = [
  "/assets/gallery/product-28.jpg",
  "/assets/gallery/product-30.jpg",
  "/assets/gallery/product-32.jpg",
  "/assets/gallery/product-36.jpg",
  "/assets/gallery/product-39.jpg",
  "/assets/gallery/product-24.jpg",
  "/assets/gallery/product-25.jpg",
  "/assets/gallery/product-27.jpg",
  "/assets/gallery/product-31.jpg",
  "/assets/gallery/product-33.jpg",
  "/assets/gallery/product-35.jpg",
  "/assets/gallery/product-40.jpg",
] as const;

/** Real photos for popular products carousel (9 items, 3 per slide) */
export const featuredProductImages = [
  "/assets/gallery/product-28.jpg",
  "/assets/gallery/product-36.jpg",
  "/assets/gallery/product-39.jpg",
  "/assets/gallery/product-30.jpg",
  "/assets/gallery/product-32.jpg",
  "/assets/gallery/product-34.jpg",
  "/assets/gallery/product-25.jpg",
  "/assets/gallery/product-27.jpg",
  "/assets/gallery/product-41.jpg",
] as const;
