"use client";

import { useEffect, useState } from "react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { site } from "@/lib/data";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LeadForm } from "@/components/forms/LeadForm";

export function QuoteModal() {
  const { isOpen, close, initialMessage } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) setSubmitted(false);
  }, [isOpen, initialMessage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="bg-dark px-6 py-5 md:px-8">
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 text-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
          <SectionBadge variant="dark" className="mb-3">
            Get a quote
          </SectionBadge>
          <h2 className="pr-10 text-xl font-bold text-white md:text-2xl">
            Tell us what you need
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Fill the form and our team will call you back within 24 hours.
          </p>
        </div>

        <div className="px-6 py-5 md:px-8 md:py-6">
          {!submitted && (
            <div className="mb-5 flex flex-wrap gap-3">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-[#faf8f5] px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              <PhoneIcon />
              Call now
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 p-2.5 text-[#1a9e4a] transition-colors hover:bg-[#25D366]/20"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            </div>
          )}

          <LeadForm
            key={initialMessage}
            variant="modal"
            source="quote-modal"
            initialMessage={initialMessage}
            showProductSelect
            onSuccess={() => setSubmitted(true)}
          />
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
