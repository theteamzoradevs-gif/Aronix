"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { formatPhoneDisplay, navItems } from "./TopBar";
import { MobileMenu } from "./MobileMenu";
import { IndiaMARTBadge } from "@/components/ui/IndiaMARTBadge";

function BrandLogo() {
  return (
    <Link href="/" className="relative block h-14 w-40 shrink-0 md:h-16 md:w-48">
      <Image
        src={site.logo}
        alt="Aronix Infra"
        fill
        className="object-contain object-left"
        sizes="(max-width: 768px) 160px, 192px"
        priority
        unoptimized
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useQuoteModal();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navClass = isHome
    ? scrolled
      ? "nav-scrolled"
      : "nav-glass"
    : "nav-solid";

  return (
    <>
      <header className={cn("fixed left-0 right-0 top-[var(--trust-bar-height)] z-50 transition-all duration-300", navClass)}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-3.5">
          <BrandLogo />

          <div className="hidden items-center gap-6 xl:flex xl:gap-8">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[14px] font-medium text-white/75 transition-colors hover:text-white",
                    isActive(item.href) && "text-white"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="shrink-0 border-l border-white/15 pl-6">
              <IndiaMARTBadge size="lg" />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden flex-col items-end lg:flex">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 text-[14px] font-semibold text-white transition-colors hover:text-accent"
              >
                <PhoneIcon />
                <span>{formatPhoneDisplay(site.phone)}</span>
              </a>
              <span className="mt-0.5 text-[11px] font-medium text-white/65">
                100% response rate
              </span>
            </div>

            <button
              type="button"
              onClick={open}
              className="hidden cursor-pointer rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-accent/90 md:inline-flex"
            >
              Get Quote
            </button>

            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 xl:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="h-0.5 w-5 rounded-full bg-white" />
              <span className="h-0.5 w-5 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
