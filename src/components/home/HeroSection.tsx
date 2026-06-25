"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { HeroProductShowcase } from "@/components/home/HeroProductShowcase";
import { QuoteButton } from "@/components/products/QuoteButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const heroImage = site.heroImages[0];
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? {} : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <SiteImage
          src={heroImage}
          alt="Aronix Infra portable cabins and containers"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/78 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />
      </motion.div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-28 pb-12 md:pt-32 md:pb-16 lg:pb-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <div>
            <motion.p className="text-label text-accent" {...fadeUp(0.05)}>
              Greater Noida · Pan-India delivery
            </motion.p>
            <motion.h1 className="mt-3 font-display text-hero text-white" {...fadeUp(0.15)}>
              {site.heroHeadline}
            </motion.h1>
            <motion.p
              className="mt-5 max-w-lg text-hero-sub text-white/90"
              {...fadeUp(0.28)}
            >
              Manufactured at our factory. Delivered site-ready.
            </motion.p>
            <motion.p className="mt-3 max-w-lg text-body-sm text-white/55" {...fadeUp(0.38)}>
              {site.heroSubtext}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              {...fadeUp(0.48)}
            >
              <QuoteButton variant="hero" className="w-full justify-center sm:w-auto">
                Get free quote
              </QuoteButton>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-body-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
              >
                WhatsApp us
              </a>
            </motion.div>

            <motion.ul className="mt-8 grid gap-2 sm:grid-cols-2" {...fadeUp(0.58)}>
              {site.heroTrustBadges.slice(0, 4).map((label) => (
                <li key={label} className="flex items-center gap-2.5 text-body-sm text-white/65">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/25 text-[10px] font-bold text-accent">
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="relative hidden lg:block"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeroProductShowcase />
          </motion.div>
        </div>

        <div className="mt-6 lg:hidden">
          <HeroProductShowcase />
        </div>
      </Container>

      <div className="relative z-10 border-t border-white/10 bg-ink/40 backdrop-blur-md">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 md:justify-between">
          {site.heroFeatureItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-body-sm font-medium text-white/75 transition-colors hover:text-accent"
            >
              {item.label} →
            </Link>
          ))}
        </Container>
      </div>
    </section>
  );
}
