"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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
        className="pointer-events-auto fixed bottom-[3.5rem] right-3 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-accent text-ink shadow-[0_4px_20px_rgba(244,193,0,0.45)] ring-2 ring-white/20 transition-all hover:scale-105 hover:bg-accent/90 hover:shadow-[0_6px_24px_rgba(244,193,0,0.55)] md:bottom-6 md:right-6 md:h-14 md:w-14"
        aria-label={open ? "Close chat" : "Open FAQ chat"}
      >
        {open ? (
          <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <>
          <div className="fixed inset-0 z-30 bg-black/35 md:hidden" onClick={() => setOpen(false)} aria-hidden />
          <div className="pointer-events-auto fixed inset-x-4 bottom-[7.25rem] z-40 mx-auto flex max-h-[min(52dvh,22rem)] w-full max-w-[17.5rem] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-2xl sm:inset-x-auto sm:right-4 sm:max-w-sm sm:w-[calc(100vw-2rem)] md:bottom-24 md:right-6 md:max-h-none md:max-w-sm md:rounded-2xl">
          <div className="flex items-start justify-between bg-dark px-3 py-2 md:px-4 md:py-3">
            <div>
            <p className="text-xs font-semibold text-white md:text-sm">Aronix FAQ Assistant</p>
            <p className="text-[10px] text-white/70 md:text-xs">Delivery, pricing, products & more</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-2 rounded-full p-0.5 text-white/80 hover:bg-white/10 hover:text-white md:ml-3 md:p-1"
              aria-label="Close chat panel"
            >
              <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex max-h-36 flex-col gap-2 overflow-y-auto p-2.5 md:max-h-64 md:gap-3 md:p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[90%] rounded-lg px-2.5 py-1.5 text-xs leading-relaxed md:rounded-xl md:px-3 md:py-2 md:text-sm",
                  msg.role === "bot"
                    ? "self-start bg-[#f4f5f7] text-text"
                    : "self-end bg-primary text-white"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex max-h-14 flex-wrap gap-1 overflow-y-auto border-t border-border px-2 py-1.5 md:max-h-20 md:gap-1.5 md:px-3 md:py-2">
            {site.chatbotIntents.map((intent) => (
              <button
                key={intent.id}
                type="button"
                onClick={() => handleChip(intent.id)}
                className="cursor-pointer rounded-full border border-border bg-white px-2 py-0.5 text-[10px] font-medium text-text-muted hover:border-primary hover:text-primary md:px-2.5 md:py-1 md:text-[11px]"
              >
                {intent.label}
              </button>
            ))}
          </div>

          <form
            className="flex gap-1.5 border-t border-border p-2 md:gap-2 md:p-3"
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
              className="flex-1 rounded-md border border-border px-2 py-1.5 text-xs outline-none focus:border-primary md:rounded-lg md:px-3 md:py-2 md:text-sm"
            />
            <button type="submit" className="cursor-pointer rounded-md bg-accent px-2.5 py-1.5 text-xs font-semibold text-text md:rounded-lg md:px-3 md:py-2 md:text-sm">
              Send
            </button>
          </form>

          <div className="flex gap-1.5 border-t border-border bg-[#faf8f5] p-2 md:gap-2 md:p-3">
            <button
              type="button"
              onClick={() => {
                openWithMessage("I'd like to request a quote.");
                setOpen(false);
              }}
              className="flex-1 cursor-pointer rounded-md bg-primary py-1.5 text-[11px] font-semibold text-white md:rounded-lg md:py-2 md:text-xs"
            >
              Get a Quote
            </button>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 cursor-pointer items-center justify-center rounded-md border border-[#25D366] py-1.5 text-[#1a9e4a] md:rounded-lg md:py-2"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        </div>
        </>
      )}
    </>
  );
}
