"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { heroShowcaseSlides } from "@/lib/gallery";
import { SiteImage } from "@/components/ui/SiteImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const AUTO_PLAY_MS = 5500;
const items = heroShowcaseSlides;

export function HeroProductShowcase() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    setActive((index + items.length) % items.length);
  }, []);

  useEffect(() => {
    if (reduced || items.length <= 1) return;
    const timer = setInterval(() => goTo(active + 1), AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [active, goTo, reduced]);

  const current = items[active];

  return (
    <div className="w-full" role="region" aria-label="Featured products and projects">
      <div className="relative px-5 md:px-6">
        <NavButton direction="prev" onClick={() => goTo(active - 1)} />

        <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-[var(--shadow-elevated)] backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[4/3] w-full max-h-[min(230px,32vh)] lg:max-h-[min(250px,36vh)]">
                <SiteImage
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <h3 className="absolute bottom-0 left-0 right-0 px-4 pb-3 font-display text-base font-semibold leading-snug text-white md:text-[17px]">
                  {current.title}
                </h3>
              </div>

              <div className="border-t border-white/10 bg-ink/75 px-4 py-3 md:px-4 md:py-3.5">
                <ul className="space-y-1.5">
                  {current.lines.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-[11px] leading-relaxed text-white/75 md:text-xs"
                    >
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={current.href}
                  className="mt-3 inline-flex cursor-pointer items-center gap-1 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-accent/90"
                >
                  View details →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-1.5 border-t border-white/10 py-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "h-1 cursor-pointer rounded-full transition-all",
                  i === active ? "w-5 bg-accent" : "w-1.5 bg-white/35"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <NavButton direction="next" onClick={() => goTo(active + 1)} />
      </div>
    </div>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-[38%] z-10 -translate-y-1/2 cursor-pointer text-xl font-light leading-none text-white/75 transition-colors hover:text-accent md:text-2xl",
        direction === "prev" ? "left-0" : "right-0"
      )}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      {direction === "prev" ? "<" : ">"}
    </button>
  );
}
