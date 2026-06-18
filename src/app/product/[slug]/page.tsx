import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { products, getProductBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { QuoteButton } from "@/components/products/QuoteButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.title} - aronixinfra.com` : "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded border border-border">
            <SiteImage
              src={product.image}
              alt={product.title}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-text-muted">Uncategorized</p>
            <h1 className="mt-2 text-3xl font-bold text-text">{product.title}</h1>
            {product.price && (
              <p className="mt-4 text-2xl font-semibold text-text">
                {formatPrice(product.price)}
              </p>
            )}
            {product.specs.length > 0 && (
              <table className="mt-6 w-full border-collapse text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-t border-border">
                      <td className="py-3 pr-4 font-medium text-text-muted">{spec.label}</td>
                      <td className="py-3 text-text">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="mt-6 text-[15px] leading-relaxed text-text-light">
              {product.description}
            </p>
            <div className="mt-8">
              <QuoteButton />
            </div>
            <p className="mt-4 text-sm text-text-muted">
              Category: <span>Uncategorized</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
