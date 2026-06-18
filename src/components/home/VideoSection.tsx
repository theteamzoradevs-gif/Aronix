"use client";

import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VideoSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading>Product Video</SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {site.productVideos.map((src, i) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
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
