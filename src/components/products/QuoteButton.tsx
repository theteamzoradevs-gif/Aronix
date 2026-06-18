"use client";

import { useQuoteModal } from "@/context/QuoteModalContext";

export function QuoteButton() {
  const { open } = useQuoteModal();

  return (
    <button type="button" onClick={open} className="quote-btn">
      Get a quote
    </button>
  );
}
