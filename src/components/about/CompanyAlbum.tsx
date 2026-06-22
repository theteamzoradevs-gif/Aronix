"use client";

import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";

/** Same height, varied widths for a natural album strip */
const albumWidths = [200, 280, 220, 260, 180, 300, 240, 210, 270];

export function CompanyAlbum() {
  const items = [...site.albumImages, ...site.albumImages].map((img, i) => ({
    src: img,
    width: albumWidths[i % albumWidths.length],
  }));

  return (
    <section className="about-cream overflow-hidden py-16 md:py-24">
      <Container>
        <SectionHeader
          badge="Photos"
          title="Company Album"
          subtitle="Explore moments from our manufacturing facility, product deliveries, and projects built on quality portable infrastructure across India."
          align="center"
        />
      </Container>

      <div className="relative mt-10 md:mt-12">
        <div className="flex animate-marquee-ltr items-center gap-4 md:gap-6">
          {items.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative h-[260px] shrink-0 overflow-hidden rounded-[24px] shadow-md sm:h-[300px] md:h-[340px]"
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
