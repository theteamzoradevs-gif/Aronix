"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clients } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

export function ClientsMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const doubled = [...clients, ...clients];

  const scrollBy = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.6, 400);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let frame: number;
    const tick = () => {
      if (!paused && el) {
        el.scrollLeft += 0.6;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return (
    <section className="border-y border-border-light bg-surface/50 py-6 md:py-8">
      <div className="mb-5 flex items-center justify-center gap-4 px-4 md:mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          Our clients
        </p>
      </div>

      <div
        className="group relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f4f5f7] to-transparent md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f4f5f7] to-transparent md:w-16" />

        <button
          type="button"
          onClick={() => scrollBy("left")}
          className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white/90 text-primary shadow-sm transition-all hover:bg-white md:flex"
          aria-label="Scroll clients left"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white/90 text-primary shadow-sm transition-all hover:bg-white md:flex"
          aria-label="Scroll clients right"
        >
          <ChevronIcon direction="right" />
        </button>

        <div
          ref={scrollRef}
          className={cn(
            "flex w-full items-center gap-10 overflow-x-auto px-4 pb-1 md:gap-14 md:px-8",
            "scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {doubled.map((client, i) => (
            <SiteImage
              key={`${client.id}-${i}`}
              src={client.image}
              alt={client.alt}
              width={240}
              height={96}
              className="inline-block h-14 w-auto max-w-[180px] shrink-0 object-contain md:h-[72px] md:max-w-[220px] lg:h-20 lg:max-w-[260px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className={cn("h-4 w-4", direction === "left" && "rotate-180")}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
