"use client";

import { useEffect, useState } from "react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StickyQuoteBar() {
  const { open } = useQuoteModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fab-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 shadow-[var(--shadow-elevated)] backdrop-blur-md transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={open}
          className="flex-1 rounded-full bg-accent py-3 text-sm font-semibold text-ink"
        >
          Get Free Quote
        </button>
        <a
          href={`tel:${site.phone}`}
          className="flex items-center justify-center rounded-full border border-border px-4 py-3 text-sm font-semibold text-primary"
          aria-label="Call"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
