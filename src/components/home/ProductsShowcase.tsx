"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

function getExcerpt(description: string, max = 120) {
  if (description.length <= max) return description;
  return `${description.slice(0, max).trim()}…`;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const desktopOffsets = [-2, -1, 0, 1, 2] as const;

const desktopHeight: Record<number, string> = {
  0: "h-full",
  [-1]: "h-[86%]",
  1: "h-[86%]",
  [-2]: "h-[70%]",
  2: "h-[70%]",
};

const desktopWidth: Record<number, string> = {
  0: "w-[38%] max-w-[520px]",
  [-1]: "w-[15%] min-w-[110px] max-w-[170px]",
  1: "w-[15%] min-w-[110px] max-w-[170px]",
  [-2]: "w-[12%] min-w-[90px] max-w-[140px]",
  2: "w-[12%] min-w-[90px] max-w-[140px]",
};

export function ProductsShowcase({ products }: { products: Product[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = products.length;

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 3000);
    return () => clearInterval(timer);
  }, [count]);

  if (count === 0) return null;

  const mobileSlots = [-1, 0, 1].map((offset) => ({
    offset,
    product: products[mod(activeIndex + offset, count)],
    isActive: offset === 0,
  }));

  const desktopSlots = desktopOffsets.map((offset) => ({
    offset,
    product: products[mod(activeIndex + offset, count)],
    isActive: offset === 0,
  }));

  return (
    <>
      {/* Mobile / tablet: 3-card carousel */}
      <div className="flex h-[400px] w-full items-end justify-between gap-4 sm:h-[440px] sm:gap-6 lg:hidden">
        {mobileSlots.map(({ offset, product, isActive }) => (
          <ShowcaseCard
            key={`m-${offset}`}
            product={product}
            isActive={isActive}
            offset={offset}
            excerpt={getExcerpt(product.description, isActive ? 150 : 70)}
          />
        ))}
      </div>

      {/* Desktop: 5-card staggered layout */}
      <div className="hidden h-[480px] w-full items-end justify-between gap-3 lg:flex xl:h-[520px] xl:gap-4">
        {desktopSlots.map(({ offset, product, isActive }) => (
          <ShowcaseCard
            key={`d-${offset}`}
            product={product}
            isActive={isActive}
            offset={offset}
            excerpt={getExcerpt(product.description, isActive ? 130 : 60)}
            desktop
          />
        ))}
      </div>
    </>
  );
}

function ShowcaseCard({
  product,
  isActive,
  offset,
  excerpt,
  desktop = false,
}: {
  product: Product;
  isActive: boolean;
  offset: number;
  excerpt: string;
  desktop?: boolean;
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-[24px] transition-all duration-700 ease-in-out",
        desktop
          ? cn(
              "z-10",
              desktopHeight[offset],
              desktopWidth[offset],
              isActive && "z-20 shadow-2xl"
            )
          : cn(
              isActive
                ? "z-20 h-full w-full max-w-[680px] flex-[1.5] shadow-2xl sm:w-[48%]"
                : cn(
                    "z-10 hidden h-[80%] w-[22%] min-w-[140px] max-w-[220px] flex-[0.65] opacity-90 sm:block",
                    offset === -1 && "origin-bottom-right",
                    offset === 1 && "origin-bottom-left"
                  )
            )
      )}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <SiteImage
        key={product.slug}
        src={product.image}
        alt={product.title}
        fill
        sizes={isActive ? "(max-width: 768px) 100vw, 420px" : "180px"}
        className="object-cover transition-opacity duration-500"
      />

      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          isActive ? "bg-gradient-to-t from-black/55 via-black/15 to-transparent" : "bg-black/45"
        )}
      />

      {isActive ? (
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl md:bottom-5 md:left-5 md:right-5 md:p-5">
          <h3 className="text-base font-bold text-white md:text-xl">{product.title}</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-white/85 md:text-[14px]">{excerpt}</p>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2.5 md:p-3">
          <p className="line-clamp-2 text-[10px] font-semibold leading-snug text-white md:text-xs">
            {product.title}
          </p>
        </div>
      )}
    </Link>
  );
}
