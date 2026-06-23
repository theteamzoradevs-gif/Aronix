"use client";

import { useState } from "react";
import { QuoteButton } from "@/components/products/QuoteButton";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-border bg-[#f4f5f7] transition-colors"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6"
            >
              <span className="text-[15px] font-semibold text-text md:text-base">{item.q}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-sm transition-transform",
                  isOpen && "rotate-45"
                )}
                aria-hidden
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-200",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted md:px-6 md:pb-6 md:text-[15px]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqAskButton() {
  return (
    <div className="mt-10 text-center">
      <QuoteButton variant="dark">Ask a question</QuoteButton>
    </div>
  );
}
