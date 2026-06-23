"use client";

import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { SiteImage } from "@/components/ui/SiteImage";
import { QuoteButton } from "@/components/products/QuoteButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatPrice } from "@/lib/utils";

export function ProductCategories() {
  return (
    <section className="section-padding section-white">
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge="Product Range"
            title="Portable infrastructure for every site need"
            subtitle="Browse by category — offices, guard cabins, containers, labour camps, and custom prefab structures manufactured in Greater Noida."
            align="center"
          />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {site.productCategories.map((cat) => (
            <article
              key={cat.id}
              className="card-surface industrial-card card-hover-lift group flex flex-col overflow-hidden"
            >
              <Link href={cat.href} className="relative block aspect-[16/10] overflow-hidden">
                <SiteImage
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {cat.priceFrom && (
                  <span className="absolute left-3 top-3 rounded-full bg-dark/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    From {formatPrice(cat.priceFrom)}
                  </span>
                )}
              </Link>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-lg font-bold text-text">{cat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{cat.description}</p>
                {cat.specSummary && (
                  <p className="mt-2 text-xs font-medium text-primary">{cat.specSummary}</p>
                )}
                <p className="mt-1 text-xs text-text-muted">Ideal for: {cat.useCase}</p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Link href={cat.href} className="btn-accent w-full text-center !px-4 !py-2 text-xs sm:w-auto">
                    View products
                  </Link>
                  <QuoteButton className="w-full !px-4 !py-2 text-xs sm:w-auto" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
