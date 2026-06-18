"use client";

import { useState } from "react";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { site } from "@/lib/data";

export function QuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      close();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative w-full max-w-md rounded bg-white p-6 shadow-xl md:p-8">
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 text-2xl text-text-muted hover:text-text"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="mb-2 text-xl font-bold text-text">Fill the form to get a call from us</h2>
        <div className="mb-6 flex flex-wrap gap-4 text-sm">
          <a href={`tel:${site.phone}`} className="font-medium text-primary hover:underline">
            Call Now For Enquiry
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#25D366] hover:underline"
          >
            Whatsapp Us
          </a>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <textarea
            placeholder="Message"
            rows={3}
            className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button type="submit" className="quote-btn w-full">
            {submitted ? "Sent!" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
