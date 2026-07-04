"use client";

import { useEffect, useState } from "react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { site } from "@/lib/data";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { CallNowButton } from "@/components/ui/CallNowButton";
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
        <div className="bg-dark px-5 pb-5 pt-4 md:px-7 md:pb-6">
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 text-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
          <SectionBadge variant="dark" className="mb-2.5">
            Get a Quote
          </SectionBadge>
          <h2 className="pr-10 text-lg font-bold text-white md:text-xl">
            Tell us what you need
          </h2>
          <p className="mt-1.5 text-xs text-white/70 md:text-sm">
            Fill the form and our team will call you back within 24 hours.
          </p>
        </div>

        <div className="px-5 py-5 md:px-7 md:py-6">
          {!submitted && (
            <div className="mb-4 flex flex-wrap gap-2">
            <CallNowButton size="sm" />
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 p-2 text-[#1a9e4a] transition-colors hover:bg-[#25D366]/20"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" />
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
