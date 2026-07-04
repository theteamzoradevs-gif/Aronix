const REMOTE_UPLOADS = "aronixinfra.com/wp-content/uploads/2025/10";

/** Locally cached files that downloaded successfully (>10KB) */
const VALID_LOCAL = new Set([
  "20-ft-dry-shipping-container-1000x1000-1.jpg",
  "Untitled-design-2025-10-08T155217.885.png",
  "Untitled-design-2025-10-09T113233.303.png",
  "Untitled-design-2025-10-09T173820.053.png",
  "Untitled-design-2025-10-09T174055.467.png",
  "Untitled-design-2025-10-09T174139.419.png",
  "Untitled-design-2025-10-09T174216.396.png",
  "Untitled-design-2025-10-09T174257.865.png",
  "Untitled-design-2025-10-09T174359.888.png",
]);

const DEFAULT_IMAGE = `${REMOTE_UPLOADS}/Untitled-design-2025-10-09T113233.303.png`;

function proxyUrl(pathWithoutProtocol: string, width = 800): string {
  return `https://wsrv.nl/?url=${encodeURIComponent(pathWithoutProtocol)}&w=${width}&q=85&output=webp`;
}

function toRemotePath(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src.replace(/^https?:\/\//, "");
  }
  if (src.startsWith("/assets/")) {
    return src.replace("/assets/", "aronixinfra.com/wp-content/uploads/");
  }
  return src;
}

export function resolveImageSrc(src: string | null | undefined, width = 800): string {
  if (!src) return proxyUrl(DEFAULT_IMAGE, width);

  const filename = src.split("/").pop() || "";

  if (
    src.startsWith("/assets/") &&
    (VALID_LOCAL.has(filename) ||
      src.startsWith("/assets/team/") ||
      src.startsWith("/assets/gallery/") ||
      src.startsWith("/assets/about/") ||
      src.startsWith("/assets/brand/") ||
      filename === "logo.png")
  ) {
    return src;
  }

  return proxyUrl(toRemotePath(src), width);
}

export function resolveImageFallback(src: string | null | undefined, width = 800): string {
  if (
    src?.startsWith("/assets/team/") ||
    src?.startsWith("/assets/gallery/") ||
    src?.startsWith("/assets/about/") ||
    src?.startsWith("/assets/brand/")
  ) {
    return src;
  }
  return proxyUrl(src ? toRemotePath(src) : DEFAULT_IMAGE, width);
}
