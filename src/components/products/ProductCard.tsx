"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { SiteImage } from "@/components/ui/SiteImage";
import { formatPrice } from "@/lib/utils";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { productCategoryLabels } from "@/lib/data";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  showPrice?: boolean;
  showCategory?: boolean;
  layout?: "grid" | "slider";
  compact?: boolean;
}

export function ProductCard({
  product,
  showPrice = false,
  showCategory = false,
  layout = "grid",
  compact = false,
}: ProductCardProps) {
  const { open } = useQuoteModal();

  return (
    <div className={cn("group", layout === "slider" && "px-2.5")}>
      <div className="card-premium flex h-full flex-col overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block">
          <div
            className={cn(
              "relative overflow-hidden bg-surface",
              compact ? "aspect-[5/4]" : "aspect-[4/5]"
            )}
          >
            <SiteImage
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {showCategory && product.category && (
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary backdrop-blur-sm">
                {productCategoryLabels[product.category]}
              </span>
            )}
          </div>
        </Link>
        <div className={cn("flex flex-1 flex-col", compact ? "p-3" : "p-4 md:p-5")}>
          <Link
            href={`/product/${product.slug}`}
            className={cn(
              "font-display font-semibold text-ink transition-colors group-hover:text-primary",
              compact ? "text-sm line-clamp-2" : "text-base md:text-lg"
            )}
          >
            {product.title}
          </Link>
          {showPrice && product.price && (
            <p className={cn("mt-1 text-text-muted", compact ? "text-xs" : "text-sm")}>
              From <span className="font-semibold text-ink">{formatPrice(product.price)}</span>
            </p>
          )}
          <div className={cn("mt-auto flex gap-2", compact ? "pt-2" : "pt-4")}>
            <button
              type="button"
              onClick={open}
              className={cn(
                "btn-accent flex-1 !px-3",
                compact ? "!py-2 text-[11px]" : "!py-2.5 text-xs md:text-sm"
              )}
            >
              Get quote
            </button>
            <a
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${product.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:border-[#25D366] hover:bg-[#25D366]/5",
                compact ? "h-8 w-8" : "h-10 w-10"
              )}
              aria-label="WhatsApp"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
