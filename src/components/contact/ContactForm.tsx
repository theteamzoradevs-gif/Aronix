"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-xl space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        required
        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <textarea
        placeholder="Your Message"
        rows={5}
        required
        className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <button type="submit" className="quote-btn w-full md:w-auto">
        {sent ? "Sent!" : "Send"}
      </button>
    </form>
  );
}
