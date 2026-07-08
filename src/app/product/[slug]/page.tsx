import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { ContactCta } from "@/components/home/ContactCta";
import { MotionReveal } from "@/components/motion/MotionReveal";
import {
  products,
  getProductBySlug,
  getProductImages,
  productCategoryLabels,
  site,
} from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";
import { QuoteButton } from "@/components/products/QuoteButton";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

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
    .slice(0, 2);

  const categoryLabel = product.category
    ? productCategoryLabels[product.category]
    : null;
  const galleryImages = getProductImages(product);

  return (
    <>
      <PageHero containerClassName="max-w-[1200px]">
        <MotionReveal>
          <nav className="flex flex-wrap items-center gap-y-1 text-sm text-text-muted break-words">
            <Link href="/products" className="transition-colors hover:text-primary">
              Products
            </Link>
            {product.category && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/products?category=${product.category}`}
                  className="transition-colors hover:text-primary"
                >
                  {categoryLabel}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="min-w-0 text-ink">{product.title}</span>
          </nav>
        </MotionReveal>
      </PageHero>

      <section className="section-white section-editorial pt-6 md:pt-12">
        <Container>
          <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-16">
            <MotionReveal direction="up" className="min-w-0">
              <ProductImageGallery
                title={product.title}
                slug={product.slug}
                images={galleryImages}
              />
            </MotionReveal>

            <MotionReveal direction="up" delay={0.1} className="min-w-0">
              <div className="min-w-0 max-w-full">
                {categoryLabel && (
                  <p className="text-[10px] text-label text-primary sm:text-[11px]">{categoryLabel}</p>
                )}
                <h1 className="mt-2 break-words font-display text-xl font-bold leading-tight text-ink sm:mt-3 sm:text-2xl md:text-section-title">
                  {product.title}
                </h1>
                {product.price && (
                  <p className="mt-3 text-lg font-semibold text-ink sm:mt-4 sm:text-2xl">
                    {formatPrice(product.price)}
                  </p>
                )}
                <p className="mt-4 break-words text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-subheading">
                  {product.description}
                </p>

                {product.specs.length > 0 && (
                  <div className="mt-6 divide-y divide-border-light overflow-hidden rounded-xl border border-border-light bg-white shadow-[var(--shadow-soft)] sm:mt-8 sm:rounded-2xl">
                    {product.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={cn(
                          "px-3 py-3 sm:px-4 sm:py-3.5",
                          i % 2 === 0 ? "bg-white" : "bg-cream/50"
                        )}
                      >
                        <p className="text-xs font-medium text-text-muted sm:text-sm">{spec.label}</p>
                        <p className="mt-1 break-words text-sm text-ink">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex min-w-0 items-stretch gap-2 sm:mt-8 sm:gap-3">
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${product.title}. Please share a quote.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center self-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#1a9e4a] transition-colors hover:bg-[#25D366]/20 sm:h-11 sm:w-11"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </a>
                  <QuoteButton
                    variant="primary"
                    className="min-w-0 flex-1 justify-center px-3 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Get a Quote
                  </QuoteButton>
                  <Link
                    href="/contact-us"
                    className="btn-accent min-w-0 flex-1 justify-center px-3 py-2.5 text-center text-xs sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="section-band-light section-editorial border-t border-border-light">
          <Container>
            <MotionReveal>
              <div className="md:text-center">
                <p className="text-label text-primary">Related products</p>
                <h2 className="mt-3 font-display text-section-title text-ink">
                  You may also like
                </h2>
              </div>
            </MotionReveal>
            <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} showPrice />
              ))}
            </div>

            <div className="mt-8 text-center md:mt-10">
              <Link href="/products" className="btn-primary text-sm">
                View all products
              </Link>
            </div>
          </Container>
        </section>
      )}

      <ContactCta />
    </>
  );
}
