"use client";

import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";

export function VideoSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <SectionHeader
          badge="Videos"
          title="Product Video"
          subtitle="A quick look at our portable cabins, containers, and prefab interiors."
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-5">
          {site.productVideos.map((src, i) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-[20px] border border-border/60 bg-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
            >
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="aspect-[3/4] h-full w-full object-cover"
                aria-label={`Product video ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
