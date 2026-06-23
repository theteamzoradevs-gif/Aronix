"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { VideoSection } from "@/components/home/VideoSection";
import { ProductGrid } from "@/components/products/ProductGrid";
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

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <VideoSection />

      <section className="about-cream py-12 md:py-16">
        <Container>
          <SectionHeader
            badge="Products"
            title="Our Products"
            subtitle="Portable cabins, shipping containers, guard sheds, and prefabricated structures — manufactured for industrial and commercial sites across India."
            align="center"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "all" ? "/products" : `/products?category=${cat}`}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-text-muted hover:border-primary hover:text-primary"
                )}
              >
                {cat === "all" ? "All Products" : productCategoryLabels[cat]}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <ProductGrid products={filtered} showPrice />
        </Container>
      </section>
    </>
  );
}
