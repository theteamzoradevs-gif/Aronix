"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveImageSrc, resolveImageFallback } from "@/lib/images";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

export function SiteImage({
  src,
  alt,
  className,
  width = 800,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 800px",
  fill = false,
}: SiteImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveImageSrc(src, width));
  const computedHeight = height || Math.round(width * 0.75);

  const handleError = () => {
    const fallback = resolveImageFallback(src, width);
    if (imgSrc !== fallback) setImgSrc(fallback);
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={computedHeight}
      priority={priority}
      sizes={sizes}
      className={cn("max-w-full h-auto", className)}
      onError={handleError}
    />
  );
}
