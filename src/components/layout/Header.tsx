"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SiteImage } from "@/components/ui/SiteImage";
import { navItems } from "./TopBar";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link href="/" className="shrink-0">
          <SiteImage
            src={site.logo}
            alt="Aronix Infra"
            className="h-12 w-auto md:h-14"
            width={200}
            height={70}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] font-medium text-text-muted transition-colors hover:text-primary",
                pathname === item.href && "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded border border-border lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
