"use client";

import { site } from "@/lib/data";
import { playableVideos } from "@/lib/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function VideoSection() {
  return (
    <section className="section-white section-editorial border-t border-border-light">
      <Container>
        <MotionReveal>
          <SectionHeader
            badge="Videos"
            title="Product video"
            subtitle="A quick look at our portable cabins, containers, and prefab interiors."
            align="center"
            className="mx-auto max-w-2xl"
          />
        </MotionReveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-5">
          {playableVideos(site.productVideos).map((src, i) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-3xl border border-border-light bg-black shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <LazyVideo
                src={src}
                label={`Product video ${i + 1}`}
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
