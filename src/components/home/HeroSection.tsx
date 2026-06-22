import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { QuoteButton } from "@/components/products/QuoteButton";

const featureIcons = [
  <svg key="0" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  <svg key="1" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>,
  <svg key="2" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

export function HeroSection() {
  const heroImage = site.heroImages[0];

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <SiteImage
          src={heroImage}
          alt="Aronix Infra portable cabins and containers"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="max-w-xl">
            <h1 className="text-[32px] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[52px]">
              {site.heroHeadline}
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/75 md:text-[17px] md:leading-7">
              {site.heroSubtext}
            </p>
            <div className="mt-8">
              <QuoteButton variant="hero">Request a quote</QuoteButton>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 lg:ml-auto lg:w-fit lg:items-end">
            {site.heroTrustBadges.map((label, i) => (
              <TrustBadge key={label} label={label} index={i} />
            ))}
          </div>
        </div>
      </Container>

      <div className="relative z-10 hero-feature-bar">
        <Container className="grid grid-cols-3 gap-2 py-3 md:flex md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4 md:py-5">
          {site.heroFeatureItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 text-center text-[10px] font-medium leading-tight text-white/85 transition-colors hover:text-white sm:text-[11px] md:flex-row md:gap-2.5 md:text-[14px] md:leading-normal lg:justify-start"
            >
              <span className="shrink-0 text-accent [&>svg]:h-4 [&>svg]:w-4 md:[&>svg]:h-5 md:[&>svg]:w-5">
                {featureIcons[i]}
              </span>
              <span className="line-clamp-2">{item.label}</span>
            </Link>
          ))}
        </Container>
      </div>
    </section>
  );
}
