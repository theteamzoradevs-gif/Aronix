"use client";

import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { MotionReveal } from "@/components/motion/MotionReveal";

/** Same height, varied widths for a natural album strip */
const albumWidths = [200, 280, 220, 260, 180, 300, 240, 210, 270];

export function CompanyAlbum() {
  const items = [...site.albumImages, ...site.albumImages].map((img, i) => ({
    src: img,
    width: albumWidths[i % albumWidths.length],
  }));

  return (
    <section className="section-band-light overflow-hidden section-editorial border-t border-border-light">
      <Container>
        <MotionReveal>
          <SectionHeader
            badge="Photos"
            title="Company album"
            subtitle="Moments from our manufacturing facility, product deliveries, and projects across India."
            align="center"
            className="mx-auto max-w-2xl"
          />
        </MotionReveal>
      </Container>

      <div className="relative mt-10 md:mt-12">
        <div className="flex animate-marquee-ltr items-center gap-4 md:gap-6">
          {items.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative h-[260px] shrink-0 overflow-hidden rounded-3xl shadow-[var(--shadow-card)] sm:h-[300px] md:h-[340px]"
              style={{ width: item.width }}
            >
              <SiteImage
                src={item.src}
                alt={`Aronix Infra album ${(i % site.albumImages.length) + 1}`}
                fill
                sizes={`${item.width}px`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
