"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { SiteImage } from "@/components/ui/SiteImage";
import { formatPrice } from "@/lib/utils";
import { useQuoteModal } from "@/context/QuoteModalContext";

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
  layout?: "grid" | "slider";
}

export function ProductCard({ product, showPrice = false, layout = "grid" }: ProductCardProps) {
  const { open } = useQuoteModal();

  return (
    <div className={`wpsf-product group ${layout === "slider" ? "px-2.5" : ""}`}>
      <div className="overflow-hidden border border-border bg-white transition-colors group-hover:border-border">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <SiteImage
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <div className="p-4 text-center">
          <Link href={`/product/${product.slug}`} className="product-card-title block">
            {product.title}
          </Link>
          {showPrice && product.price && (
            <p className="mt-2 text-base font-semibold text-text">{formatPrice(product.price)}</p>
          )}
          <div className="mt-3">
            <button type="button" onClick={open} className="quote-btn text-sm">
              Get a quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
