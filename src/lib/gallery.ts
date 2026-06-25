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

const LEGACY_KEEP_PREFIXES = ["/assets/gallery/", "/assets/brand/", "/assets/team/"];

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

export function buildHomeProjectGridItems(videos: string[]): HomeProjectGridItem[] {
  const items: HomeProjectGridItem[] = videos.slice(0, 3).map((src, i) => ({
    id: `video-${i}`,
    title: ["Factory delivery footage", "Site installation clip", "On-truck deployment"][i] ?? `Project video ${i + 1}`,
    kind: "video" as const,
    src,
  }));

  const imageTitles = [
    "Portable office on delivery truck",
    "Finished cabin interior",
    "Site office with glass doors",
    "Guard cabin — custom colours",
    "Container unit at project site",
  ];

  galleryImages.slice(0, 5).forEach((src, i) => {
    items.push({
      id: `gallery-${i}`,
      title: imageTitles[i] ?? `Delivered project ${i + 1}`,
      kind: "image",
      src,
    });
  });

  return items.slice(0, 8);
}

export type HeroShowcaseSlide = {
  id: string;
  title: string;
  lines: [string, string, string];
  image: string;
  href: string;
};

export const heroShowcaseSlides: HeroShowcaseSlide[] = [
  {
    id: "office-cabin",
    title: "Portable Office Cabin",
    lines: [
      "Factory-built corrugated steel with secure windows & doors.",
      "Ready for site offices, manager cabins & workstations.",
      "Delivered pan-India from our Greater Noida facility.",
    ],
    image: "/assets/gallery/product-28.jpg",
    href: "/products?category=office",
  },
  {
    id: "interior-finish",
    title: "Finished Interior — Site Ready",
    lines: [
      "Clean modular panels, lighting, fans & electrical fittings.",
      "Wood-grain flooring with partition options available.",
      "Move-in ready within days of delivery.",
    ],
    image: "/assets/gallery/product-36.jpg",
    href: "/products?category=office",
  },
  {
    id: "truck-delivery",
    title: "On-Truck Site Delivery",
    lines: [
      "Heavy-duty flatbed transport to your project location.",
      "Crane-assisted placement at construction & industrial sites.",
      "Trusted by contractors across North India.",
    ],
    image: "/assets/gallery/product-30.jpg",
    href: "/projects",
  },
  {
    id: "guard-cabin",
    title: "Security Guard Cabin",
    lines: [
      "Compact, weather-resistant unit with secure door & window.",
      "Custom colour bands — orange, white & yellow options.",
      "Ideal for gates, warehouses & factory entrances.",
    ],
    image: "/assets/gallery/product-39.jpg",
    href: "/products?category=guard",
  },
  {
    id: "large-deployment",
    title: "Large-Scale Deployment",
    lines: [
      "Multi-unit portable structures for major infrastructure projects.",
      "Double-door glass fronts with professional exterior finish.",
      "7–15 day committed delivery timeline.",
    ],
    image: "/assets/gallery/product-32.jpg",
    href: "/projects",
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
