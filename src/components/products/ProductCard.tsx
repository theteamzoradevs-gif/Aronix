"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { SiteImage } from "@/components/ui/SiteImage";
import { formatPrice } from "@/lib/utils";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
  layout?: "grid" | "slider";
}

export function ProductCard({ product, showPrice = false, layout = "grid" }: ProductCardProps) {
  const { open } = useQuoteModal();

  return (
    <div className={cn("group card-hover-lift", layout === "slider" && "px-2.5")}>
      <div className="card-surface flex h-full flex-col overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-surface">
            <SiteImage
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="flex flex-1 flex-col p-3 text-center sm:p-4 md:p-5">
          <Link
            href={`/product/${product.slug}`}
            className="text-sm font-semibold text-text transition-colors group-hover:text-primary md:text-[15px]"
          >
            {product.title}
          </Link>
          {showPrice && product.price && (
            <p className="mt-2 text-base font-semibold text-text">{formatPrice(product.price)}</p>
          )}
          <button
            type="button"
            onClick={open}
            className="btn-accent mx-auto mt-4 !px-4 !py-2 text-xs md:text-sm"
          >
            Get a quote
          </button>
        </div>
      </div>
    </div>
  );
}
