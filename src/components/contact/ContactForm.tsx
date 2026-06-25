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
        className="mx-auto mt-10 max-w-xl space-y-4 rounded-3xl border border-border-light bg-white p-6 shadow-[var(--shadow-soft)] md:mt-12 md:p-8"
      >
        <h3 className="text-center font-display text-lg font-semibold text-ink">Send us a message</h3>
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
              className="popup-form-input"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="popup-form-input"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="popup-form-input"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="popup-form-input"
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
