import { galleryImageForKey } from "@/lib/gallery";

/**
 * Files under public/assets/2025/10 that are real images.
 * The other downloads in that folder are HTML error pages (~6KB), not photos.
 */
const REAL_UPLOADS = new Set([
  "20-ft-dry-shipping-container-1000x1000-1.jpg",
  "Untitled-design-2025-10-08T155217.885.png",
  "Untitled-design-2025-10-09T113233.303.png",
  "Untitled-design-2025-10-09T173820.053.png",
  "Untitled-design-2025-10-09T174055.467.png",
  "Untitled-design-2025-10-09T174139.419.png",
  "Untitled-design-2025-10-09T174216.396.png",
  "Untitled-design-2025-10-09T174257.865.png",
  "Untitled-design-2025-10-09T174359.888.png",
  "sonalika.jpg",
  "npcl.png",
  "newholland.png",
  "blinkit.png",
  "eldeco.png",
]);

const LOCAL_DIRS = ["/assets/gallery/", "/assets/team/", "/assets/about/", "/assets/brand/"];

function filenameOf(src: string): string {
  return src.split("?")[0].split("/").pop() || "";
}

/** Map a WordPress upload URL or /assets path to a public file path. */
export function toLocalAssetPath(src: string): string | null {
  const clean = src.split("?")[0];
  if (clean.startsWith("/assets/")) return clean;

  const marker = "/wp-content/uploads/";
  const idx = clean.indexOf(marker);
  if (idx >= 0) return `/assets/${clean.slice(idx + marker.length)}`;

  return null;
}

export function hasRealImage(src: string | null | undefined): boolean {
  if (!src) return false;
  const local = toLocalAssetPath(src);
  if (!local) return false;
  if (LOCAL_DIRS.some((prefix) => local.startsWith(prefix))) return true;
  return REAL_UPLOADS.has(filenameOf(local));
}

/**
 * Always return a file that exists in /public.
 * Missing WordPress uploads used to be proxied through wsrv.nl, which 404s
 * because those files are no longer on aronixinfra.com.
 */
export function resolveImageSrc(src: string | null | undefined, _width = 800): string {
  if (hasRealImage(src)) return toLocalAssetPath(src!)!;
  return galleryImageForKey(src || "aronix");
}

export function resolveImageFallback(src: string | null | undefined, _width = 800): string {
  if (
    src?.startsWith("/assets/team/") ||
    src?.startsWith("/assets/gallery/") ||
    src?.startsWith("/assets/about/") ||
    src?.startsWith("/assets/brand/")
  ) {
    return src.split("?")[0];
  }
  return galleryImageForKey(`${src || "aronix"}-fallback`);
}
