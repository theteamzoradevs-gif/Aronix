import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  showPrice = false,
}: {
  products: Product[];
  showPrice?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showPrice={showPrice} />
      ))}
    </div>
  );
}
