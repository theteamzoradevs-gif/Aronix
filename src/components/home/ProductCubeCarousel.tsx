"use client";

import { useEffect, useState } from "react";
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

export function ProductCubeCarousel({ items }: { items: CarouselItem[] }) {
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

  if (faces.length <= 1) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 [&>*]:h-full md:mt-8">
        {items.slice(0, 3).map(({ product, image }) => (
          <ProductCard
            key={product.slug}
            product={product}
            imageOverride={image}
            showPrice
            showCategory
            compact
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-6 md:mt-8">
      <div className="overflow-hidden px-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={faceIndex}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 [&>*]:h-full"
            initial={reduced ? {} : { opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? {} : { opacity: 0, x: -48 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            {faces[faceIndex].map(({ product, image }) => (
              <ProductCard
                key={product.slug}
                product={product}
                imageOverride={image}
                showPrice
                showCategory
                compact
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 md:mt-6">
        <button
          type="button"
          onClick={() => setFaceIndex((i) => (i - 1 + faces.length) % faces.length)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-lg text-text-muted shadow-sm transition-colors hover:border-primary hover:text-primary"
          aria-label="Previous products"
        >
          ‹
        </button>
        <div className="flex items-center gap-1.5">
          {faces.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFaceIndex(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${
                i === faceIndex ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
              aria-label={`Products page ${i + 1}`}
              aria-current={i === faceIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFaceIndex((i) => (i + 1) % faces.length)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-light bg-white text-lg text-text-muted shadow-sm transition-colors hover:border-primary hover:text-primary"
          aria-label="Next products"
        >
          ›
        </button>
      </div>
    </div>
  );
}
