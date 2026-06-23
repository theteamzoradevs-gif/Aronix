"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface QuoteModalContextValue {
  isOpen: boolean;
  initialMessage: string;
  open: () => void;
  openWithMessage: (message: string) => void;
  close: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const open = useCallback(() => {
    setInitialMessage("");
    setIsOpen(true);
  }, []);

  const openWithMessage = useCallback((message: string) => {
    setInitialMessage(message);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setInitialMessage("");
  }, []);

  return (
    <QuoteModalContext.Provider value={{ isOpen, initialMessage, open, openWithMessage, close }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}
