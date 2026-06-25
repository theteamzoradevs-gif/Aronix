"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const cards = [
  {
    src: site.heroImages[1],
    label: "Site office",
    href: "/products?category=office",
  },
  {
    src: "/assets/2025/10/20-ft-dry-shipping-container-1000x1000-1.jpg",
    label: "Container",
    href: "/products?category=container",
  },
  {
    src: site.heroImages[2],
    label: "Guard cabin",
    href: "/products?category=guard",
  },
];

export function HeroProductShowcase() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(1);

  return (
    <div className="w-full" role="region" aria-label="Product categories">
      <div className="hidden gap-4 sm:grid sm:grid-cols-3">
        {cards.map((card, i) => (
          <HeroCard
            key={card.label}
            card={card}
            isActive={active === i}
            onFocus={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            reduced={reduced}
            delay={i * 0.12}
          />
        ))}
      </div>

      <div className="sm:hidden">
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
          {cards.map((card, i) => (
            <div key={card.label} className="w-[72vw] shrink-0 snap-center">
              <HeroCard card={card} isActive reduced={reduced} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroCard({
  card,
  isActive = true,
  onFocus,
  onMouseEnter,
  reduced,
  delay,
}: {
  card: (typeof cards)[0];
  isActive?: boolean;
  onFocus?: () => void;
  onMouseEnter?: () => void;
  reduced: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={card.href}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        className={cn(
          "group block overflow-hidden rounded-2xl border-2 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          isActive
            ? "scale-[1.03] border-accent/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
            : "border-white/20 hover:border-white/40 hover:scale-[1.02]"
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <SiteImage
            src={card.src}
            alt={card.label}
            fill
            sizes="(max-width: 640px) 72vw, 200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </div>
        <div className="flex items-center justify-between border-t border-white/15 bg-ink/70 px-3 py-2.5">
          <span className="text-xs font-bold text-white md:text-sm">{card.label}</span>
          <span className="text-xs text-accent transition-transform group-hover:translate-x-0.5">
            View →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
