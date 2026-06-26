"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

function matchIntent(input: string): string | null {
  const normalized = input.toLowerCase().trim();
  for (const intent of site.chatbotIntents) {
    if (intent.keywords.some((kw) => normalized.includes(kw))) {
      return intent.answer;
    }
  }
  return null;
}

export function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: site.chatbotGreeting },
  ]);
  const [input, setInput] = useState("");
  const { openWithMessage } = useQuoteModal();

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const answer = matchIntent(text) ?? site.chatbotFallback;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: text.trim() },
      { role: "bot", text: answer },
    ]);
    setInput("");
  };

  const handleChip = (intentId: string) => {
    const intent = site.chatbotIntents.find((i) => i.id === intentId);
    if (intent) sendMessage(intent.label);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto fixed bottom-20 right-4 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent text-ink shadow-[0_4px_20px_rgba(244,193,0,0.45)] ring-2 ring-white/20 transition-all hover:scale-105 hover:bg-accent/90 hover:shadow-[0_6px_24px_rgba(244,193,0,0.55)] md:bottom-6 md:right-6"
        aria-label={open ? "Close chat" : "Open FAQ chat"}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="pointer-events-auto fixed bottom-[8.5rem] right-4 z-40 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-white shadow-2xl md:bottom-24 md:right-6">
          <div className="bg-dark px-4 py-3">
            <p className="text-sm font-semibold text-white">Aronix FAQ Assistant</p>
            <p className="text-xs text-white/70">Delivery, pricing, products & more</p>
          </div>

          <div className="flex max-h-64 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                  msg.role === "bot"
                    ? "self-start bg-[#f4f5f7] text-text"
                    : "self-end bg-primary text-white"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border px-3 py-2">
            {site.chatbotIntents.map((intent) => (
              <button
                key={intent.id}
                type="button"
                onClick={() => handleChip(intent.id)}
                className="cursor-pointer rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-text-muted hover:border-primary hover:text-primary"
              >
                {intent.label}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button type="submit" className="cursor-pointer rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-text">
              Send
            </button>
          </form>

          <div className="flex gap-2 border-t border-border bg-[#faf8f5] p-3">
            <button
              type="button"
              onClick={() => {
                openWithMessage("I'd like to request a quote.");
                setOpen(false);
              }}
              className="flex-1 cursor-pointer rounded-lg bg-primary py-2 text-xs font-semibold text-white"
            >
              Get Quote
            </button>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#25D366] py-2 text-[#1a9e4a]"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
