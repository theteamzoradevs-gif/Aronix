"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ContactCta } from "@/components/home/ContactCta";
import { ProductGrid } from "@/components/products/ProductGrid";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { products, productCategoryLabels } from "@/lib/data";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "office", label: productCategoryLabels.office },
  { value: "guard", label: productCategoryLabels.guard },
  { value: "container", label: productCategoryLabels.container },
  { value: "bunk", label: productCategoryLabels.bunk },
  { value: "toilet", label: productCategoryLabels.toilet },
  { value: "custom", label: productCategoryLabels.custom },
];

export function ProductsPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const activeLabel = categories.find((c) => c.value === category)?.label ?? "All Products";

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
            className="mx-auto max-w-3xl px-4"
            labelClassName="text-3xl font-extrabold leading-tight tracking-[-0.02em] text-ink md:text-4xl"
            titleClassName="mx-auto mt-4 max-w-2xl text-base font-semibold leading-relaxed tracking-normal text-text md:text-[20px]"
            subtitleClassName="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed tracking-normal text-text-muted md:text-base"
            descriptionClassName="mx-auto mt-4 max-w-xl text-sm font-semibold leading-relaxed tracking-normal text-primary md:text-[15px]"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <div className="border-b border-gray-100 bg-white">
        <Container className="py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cabins, containers, toilets..."
                className="w-full rounded-xl border border-border-light bg-cream/50 py-3 pl-11 pr-4 text-sm text-ink outline-none transition-all placeholder:text-text-muted/70 focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(30,58,95,0.08)]"
              />
            </div>

            <div ref={dropdownRef} className="relative shrink-0 sm:w-56">
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-border-light bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm transition-colors hover:border-primary/30"
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
              >
                <span className="flex items-center gap-2 truncate">
                  <FilterIcon />
                  {activeLabel}
                </span>
                <svg
                  className={cn("h-4 w-4 shrink-0 text-text-muted transition-transform", dropdownOpen && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 left-0 z-40 mt-2 max-h-64 overflow-auto rounded-xl border border-border-light bg-white py-1.5 shadow-[var(--shadow-elevated)] sm:left-auto sm:w-full"
                >
                  {categories.map((cat) => (
                    <li key={cat.value} role="option" aria-selected={category === cat.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setCategory(cat.value);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream",
                          category === cat.value ? "font-semibold text-primary" : "text-text-muted"
                        )}
                      >
                        {cat.label}
                        {category === cat.value && (
                          <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Container>
      </div>

      <section className="section-editorial section-white">
        <Container>
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} showPrice />
          ) : (
            <div className="rounded-2xl border border-dashed border-border-light bg-cream/40 px-6 py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">No products found</p>
              <p className="mt-2 text-sm text-text-muted">Try a different search term or category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="btn-primary mt-6 cursor-pointer text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>

      <section className="border-y border-border-light bg-cream py-5">
        <Container>
          <p className="text-center text-description font-medium text-text-muted">
            GST invoicing · HSN codes available · Factory direct from Greater Noida · Pan-India delivery
          </p>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}

function FilterIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}
