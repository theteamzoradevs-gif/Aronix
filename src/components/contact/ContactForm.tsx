"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

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
        className="mx-auto mt-12 max-w-xl space-y-4 rounded-[24px] border border-border bg-white p-6 shadow-sm md:mt-14 md:p-8"
      >
        <h3 className="text-center text-lg font-bold text-text">Send us a message</h3>
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
          {sent ? "Sent!" : "Send message"}
        </button>
      </form>
    </Container>
  );
}
