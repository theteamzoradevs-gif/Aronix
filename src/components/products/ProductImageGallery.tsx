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
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-card)]">
        <SiteImage
          key={activeSrc}
          src={resolveDisplayImage(activeSrc, `${slug}-${active}`)}
          alt={`${title} - image ${active + 1}`}
          className="aspect-square w-full object-cover"
        />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gallery.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all md:h-20 md:w-20",
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
