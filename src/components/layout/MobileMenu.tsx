"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";
import { formatPhoneDisplay, navItems } from "./TopBar";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!open) return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href;
  };

  return (
    <div className="fixed inset-0 z-[60] xl:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col border-l border-white/10 bg-black/85 p-6 shadow-2xl backdrop-blur-2xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-8 ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
          aria-label="Close menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                isActive(item.href) && "bg-white/10 text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <PhoneIcon />
            {formatPhoneDisplay(site.phone)}
          </a>
          <Link
            href="/contact-us"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full bg-white py-3 text-sm font-semibold text-text hover:bg-white/90"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
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
