"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function chunkProducts(products: Product[], size: number): Product[][] {
  const faces: Product[][] = [];
  for (let i = 0; i < products.length; i += size) {
    faces.push(products.slice(i, i + size));
  }
  if (faces.length === 0 && products.length > 0) {
    faces.push(products.slice(0, Math.min(3, products.length)));
  }
  return faces;
}

export function ProductCubeCarousel({ products }: { products: Product[] }) {
  const reduced = useReducedMotion();
  const faces = chunkProducts(products, 3);
  const [faceIndex, setFaceIndex] = useState(0);

  useEffect(() => {
    if (faces.length <= 1) return;
    const id = setInterval(() => {
      setFaceIndex((i) => (i + 1) % faces.length);
    }, 5000);
    return () => clearInterval(id);
  }, [faces.length]);

  if (faces.length <= 1) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.slug} product={product} showPrice showCategory compact />
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-6">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={faceIndex}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            initial={reduced ? {} : { opacity: 0, x: 60, rotateY: -12 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={reduced ? {} : { opacity: 0, x: -60, rotateY: 12 }}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {faces[faceIndex].map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                showPrice
                showCategory
                compact
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setFaceIndex((i) => (i - 1 + faces.length) % faces.length)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted hover:border-primary hover:text-primary"
          aria-label="Previous products"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {faces.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFaceIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === faceIndex ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
              aria-label={`Products page ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFaceIndex((i) => (i + 1) % faces.length)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted hover:border-primary hover:text-primary"
          aria-label="Next products"
        >
          ›
        </button>
      </div>
    </div>
  );
}
