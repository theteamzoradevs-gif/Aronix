import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ProductCard } from "@/components/products/ProductCard";
import {
  products,
  getProductBySlug,
  productCategoryLabels,
  site,
} from "@/lib/data";
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

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const categoryLabel = product.category
    ? productCategoryLabels[product.category]
    : null;

  return (
    <>
      <section className="about-cream py-12 md:py-16">
        <Container>
          <SectionBadge className="mb-3">Product</SectionBadge>
          <nav className="mb-2 text-sm text-text-muted">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            {product.category && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/products?category=${product.category}`}
                  className="hover:text-primary"
                >
                  {categoryLabel}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-text">{product.title}</span>
          </nav>
        </Container>
      </section>

      <section className="pb-10 md:pb-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
              <SiteImage
                src={product.image}
                alt={product.title}
                className="aspect-square w-full object-cover"
              />
            </div>
            <div>
              {categoryLabel && (
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {categoryLabel}
                </p>
              )}
              <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-text md:text-[36px]">
                {product.title}
              </h1>
              {product.price && (
                <p className="mt-4 text-2xl font-semibold text-text">
                  {formatPrice(product.price)}
                </p>
              )}
              <p className="mt-6 text-[15px] leading-relaxed text-text-muted">
                {product.description}
              </p>

              {product.specs.length > 0 && (
                <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white">
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={spec.label}
                          className={i % 2 === 0 ? "bg-white" : "bg-[#faf8f5]"}
                        >
                          <td className="border-t border-border px-5 py-3.5 font-medium text-text-muted">
                            {spec.label}
                          </td>
                          <td className="border-t border-border px-5 py-3.5 text-text">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <QuoteButton variant="primary" />
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${product.title}. Please share a quote.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-[#1a9e4a] transition-colors hover:bg-[#25D366]/20"
                >
                  WhatsApp
                </a>
                <Link href="/contact-us" className="btn-accent">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-[#f4f5f7] py-12 md:py-16">
          <Container>
            <h2 className="text-xl font-bold text-text md:text-2xl">Related products</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} showPrice />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
