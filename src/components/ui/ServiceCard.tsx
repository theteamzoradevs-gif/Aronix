import Link from "next/link";
import type { Product } from "@/types";
import { SiteImage } from "@/components/ui/SiteImage";
import { cn } from "@/lib/utils";

export function ServiceCard({ product, className }: { product: Product; className?: string }) {
  const excerpt =
    product.description.length > 100
      ? `${product.description.slice(0, 100).trim()}…`
      : product.description;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn("card-surface group flex flex-col overflow-hidden", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <SiteImage
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-text transition-colors group-hover:text-primary">
          {product.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{excerpt}</p>
        <span className="mt-4 text-sm font-semibold text-primary">Learn more →</span>
      </div>
    </Link>
  );
}
