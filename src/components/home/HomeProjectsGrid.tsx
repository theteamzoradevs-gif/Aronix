"use client";

import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";
import { buildHomeProjectGridItems } from "@/lib/gallery";

const gridItems = buildHomeProjectGridItems(site.productVideos);
const MOBILE_ROW_COUNT = 2;

export function HomeProjectsGrid() {
  return (
    <section className="section-band-light section-compact border-t border-border-light">
      <Container>
        <MotionReveal>
          <EditorialHeader
            label="Projects"
            title="Delivered across construction & industrial sites"
            subtitle="Real deployments from our Greater Noida facility."
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {gridItems.map((item, index) => (
            <Link
              key={item.id}
              href="/projects"
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border border-border-light bg-ink shadow-[var(--shadow-soft)]",
                index >= MOBILE_ROW_COUNT && "hidden md:block"
              )}
            >
              <div className="relative aspect-[3/4] w-full">
                {item.kind === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                    aria-label={item.title}
                  />
                ) : (
                  <SiteImage
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                {item.kind === "video" && (
                  <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    Video
                  </span>
                )}
                <p className="absolute bottom-0 left-0 right-0 p-3 text-[11px] font-semibold leading-snug text-white md:text-xs">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/projects" className="btn-primary text-sm">
            View all projects
          </Link>
        </div>
      </Container>
    </section>
  );
}
