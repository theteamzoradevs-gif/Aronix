"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatPhoneDisplay, navItems } from "./TopBar";
import { MobileMenu } from "./MobileMenu";

function BrandLogo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5 text-white">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent shadow-sm">
        <svg className="h-5 w-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-tight">Aronix Infra</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return isHome;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 nav-glass",
          !isHome && "shadow-lg"
        )}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3.5 md:px-6 md:py-4">
          <BrandLogo />

          <nav className="hidden items-center gap-7 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[14px] font-medium text-white/80 transition-colors hover:text-white",
                  isActive(item.href) && "text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={`tel:${site.phone}`}
              className="hidden items-center gap-2 text-[14px] font-medium text-white/85 transition-colors hover:text-white lg:flex"
            >
              <PhoneIcon />
              <span>{formatPhoneDisplay(site.phone)}</span>
            </a>

            <Link
              href="/contact-us"
              className="hidden rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-text transition-colors hover:bg-white/90 md:inline-flex"
            >
              Contact us
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 xl:hidden"
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
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
