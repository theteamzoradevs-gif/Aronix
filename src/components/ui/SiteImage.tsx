"use client";

import { useState } from "react";
import { resolveImageSrc, resolveImageFallback } from "@/lib/images";
import { cn } from "@/lib/utils";

export function SiteImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const imgWidth = width || 800;
  const [imgSrc, setImgSrc] = useState(() => resolveImageSrc(src, imgWidth));

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn("max-w-full", className)}
      loading="lazy"
      onError={() => {
        const fallback = resolveImageFallback(src, imgWidth);
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
