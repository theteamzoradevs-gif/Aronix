"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CarouselItem = {
  product: Product;
  image: string;
};

function chunkItems(items: CarouselItem[], size: number): CarouselItem[][] {
  const faces: CarouselItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    faces.push(items.slice(i, i + size));
  }
  return faces;
}

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-light/80 bg-white text-primary shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-all hover:border-primary/20 hover:shadow-[0_4px_12px_rgba(15,23,42,0.12)]"
      aria-label={direction === "prev" ? "Previous products" : "Next products"}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.25}
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

function ViewAllCta({
  href,
  onPrev,
  onNext,
  showArrows,
}: {
  href: string;
  onPrev?: () => void;
  onNext?: () => void;
  showArrows?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {showArrows && onPrev ? <NavButton direction="prev" onClick={onPrev} /> : null}
      <Link
        href={href}
        className="inline-flex min-w-[220px] cursor-pointer items-center justify-center rounded-full bg-primary px-10 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_4px_14px_rgba(30,58,95,0.25)] transition-colors hover:bg-[#16304f]"
      >
        View all products
      </Link>
      {showArrows && onNext ? <NavButton direction="next" onClick={onNext} /> : null}
    </div>
  );
}

export function ProductCubeCarousel({
  items,
  viewAllHref = "/products",
}: {
  items: CarouselItem[];
  viewAllHref?: string;
}) {
  const reduced = useReducedMotion();
  const faces = chunkItems(items, 3);
  const [faceIndex, setFaceIndex] = useState(0);

  useEffect(() => {
    if (faces.length <= 1) return;
    const id = setInterval(() => {
      setFaceIndex((i) => (i + 1) % faces.length);
    }, 5000);
    return () => clearInterval(id);
  }, [faces.length]);

  if (!items.length) return null;

  const goPrev = () => setFaceIndex((i) => (i - 1 + faces.length) % faces.length);
  const goNext = () => setFaceIndex((i) => (i + 1) % faces.length);
  const hasMultipleFaces = faces.length > 1;

  if (!hasMultipleFaces) {
    return (
      <div className="mt-6 md:mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 [&>*]:h-full">
          {items.slice(0, 3).map(({ product, image }) => (
            <ProductCard
              key={product.slug}
              product={product}
              imageOverride={image}
              showPrice
              compact
            />
          ))}
        </div>
        <ViewAllCta href={viewAllHref} />
      </div>
    );
  }

  return (
    <div className="mt-6 md:mt-8">
      <div className="overflow-hidden px-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={faceIndex}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 [&>*]:h-full"
            initial={reduced ? {} : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? {} : { opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {faces[faceIndex].map(({ product, image }) => (
              <ProductCard
                key={product.slug}
                product={product}
                imageOverride={image}
                showPrice
                compact
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ViewAllCta href={viewAllHref} showArrows onPrev={goPrev} onNext={goNext} />
    </div>
  );
}
