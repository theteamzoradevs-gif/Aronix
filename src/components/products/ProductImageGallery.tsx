"use client";

import { useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { resolveDisplayImage } from "@/lib/gallery";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  title: string;
  slug: string;
  images: string[];
}

export function ProductImageGallery({ title, slug, images }: ProductImageGalleryProps) {
  const gallery = images.length ? images : [];
  const [active, setActive] = useState(0);
  const activeSrc = gallery[active] ?? gallery[0];

  if (!activeSrc) return null;

  return (
    <div className="min-w-0 max-w-full space-y-3 sm:space-y-4">
      <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] sm:rounded-3xl">
        <SiteImage
          key={activeSrc}
          src={resolveDisplayImage(activeSrc, `${slug}-${active}`)}
          alt={`${title} - image ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-contain p-2 sm:p-3"
        />
      </div>

      {gallery.length > 1 && (
        <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-16 md:h-20 md:w-20 md:rounded-xl",
                i === active
                  ? "border-primary shadow-[0_0_0_2px_rgba(30,58,95,0.15)]"
                  : "border-border-light opacity-80 hover:opacity-100"
              )}
              aria-label={`View ${title} image ${i + 1}`}
              aria-pressed={i === active}
            >
              <SiteImage
                src={resolveDisplayImage(src, `${slug}-thumb-${i}`)}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
