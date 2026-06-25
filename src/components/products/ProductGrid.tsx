import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  showPrice = false,
  showCategory = false,
}: {
  products: Product[];
  showPrice?: boolean;
  showCategory?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showPrice={showPrice}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
}
