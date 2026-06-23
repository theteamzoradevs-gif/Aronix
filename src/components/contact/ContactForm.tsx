"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/data";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 max-w-xl space-y-4 rounded-xl border border-border bg-white p-6 shadow-sm md:mt-14 md:p-8"
      >
        <h3 className="text-center text-lg font-bold text-text">Send us a message</h3>
        {sent ? (
          <div className="space-y-4 text-center">
            <p className="text-sm leading-relaxed text-text-muted">
              Thank you. We&apos;ll respond within 24 hours on business days. For urgent
              enquiries:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone}`} className="btn-accent text-sm">
                Call {site.phone}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#1a9e4a] hover:underline"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
            />
            <button type="submit" className="btn-accent w-full md:w-auto">
              Send message
            </button>
          </>
        )}
      </form>
    </Container>
  );
}
