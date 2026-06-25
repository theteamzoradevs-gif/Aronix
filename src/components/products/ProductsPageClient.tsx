"use client";

import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { VideoSection } from "@/components/home/VideoSection";
import { ContactCta } from "@/components/home/ContactCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { products, productCategoryLabels } from "@/lib/data";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: (ProductCategory | "all")[] = [
  "all",
  "office",
  "guard",
  "container",
  "bunk",
  "toilet",
  "custom",
];

export function ProductsPageClient() {
  const searchParams = useSearchParams();
  const activeCategory = (searchParams.get("category") as ProductCategory | null) ?? "all";
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <PageHero>
        <MotionReveal>
          <EditorialHeader
            label="Our products"
            title="Site-ready cabins, containers & prefab structures"
            subtitle="Portable offices, guard cabins, shipping containers, and custom prefab units."
            description="Factory-built in Greater Noida and delivered across India."
            align="center"
            className="mx-auto max-w-3xl"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <div
        ref={filterRef}
        className="sticky top-[var(--header-total-offset)] z-30 border-b border-border-light bg-white/95 backdrop-blur-md"
      >
        <Container className="py-3">
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap md:justify-center">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <Link
                    key={cat}
                    href={cat === "all" ? "/products" : `/products?category=${cat}`}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-white" : "bg-cream text-text-muted hover:text-primary"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="product-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {cat === "all" ? "All Products" : productCategoryLabels[cat]}
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <section className="section-editorial section-white">
        <Container>
          <ProductGrid products={filtered} showPrice showCategory />
        </Container>
      </section>

      <section className="border-y border-border-light bg-cream py-5">
        <Container>
          <p className="text-center text-description font-medium text-text-muted">
            GST invoicing · HSN codes available · Factory direct from Greater Noida · Pan-India delivery
          </p>
        </Container>
      </section>

      <VideoSection />
      <ContactCta />
    </>
  );
}
