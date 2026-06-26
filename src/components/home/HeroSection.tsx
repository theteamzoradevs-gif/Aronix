"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";
import { HeroProductShowcase } from "@/components/home/HeroProductShowcase";
import { QuoteButton } from "@/components/products/QuoteButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const heroImage = site.heroImages[0];
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? {} : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />
      </motion.div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-[calc(var(--header-total-offset)+0.5rem)] pb-3 md:pb-4">
        <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-7">
          <div>
            <motion.p className="text-label text-accent" {...fadeUp(0.05)}>
              Greater Noida · Pan-India delivery
            </motion.p>
            <motion.h1 className="mt-2 font-display text-hero text-white" {...fadeUp(0.12)}>
              {site.heroHeadline}
            </motion.h1>
            <motion.p
              className="mt-4 max-w-lg text-hero-sub text-white/90"
              {...fadeUp(0.22)}
            >
              Manufactured at our factory. Delivered site-ready.
            </motion.p>
            <motion.p className="mt-2 hidden max-w-lg text-body-sm text-white/55 sm:block" {...fadeUp(0.3)}>
              {site.heroSubtext}
            </motion.p>

            <motion.div className="mt-6 flex items-center gap-3" {...fadeUp(0.38)}>
              <QuoteButton variant="hero" href="/products">
                View All Cabin/Container
              </QuoteButton>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/15 text-[#25D366] backdrop-blur-sm transition-colors hover:bg-[#25D366]/25"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={`tel:${site.phone}`}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label={`Call ${site.phone}`}
              >
                <PhoneIcon />
              </a>
            </motion.div>

            <motion.ul className="mt-5 hidden gap-x-4 gap-y-1.5 sm:grid sm:grid-cols-2" {...fadeUp(0.46)}>
              {site.heroTrustBadges.slice(0, 4).map((label) => (
                <li key={label} className="flex items-center gap-2 text-body-sm text-white/60">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/25 text-[9px] font-bold text-accent">
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="relative mt-2 lg:mt-0"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <HeroProductShowcase />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
