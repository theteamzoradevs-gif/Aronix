"use client";

import Link from "next/link";
import { useQuoteModal } from "@/context/QuoteModalContext";
import { cn } from "@/lib/utils";

function ArrowUpRight() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  );
}

type VoltBtnVariant = "hero" | "white" | "dark" | "outline" | "primary";

export function QuoteButton({
  className,
  children = "Get a Quote",
  variant = "outline",
  href,
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: VoltBtnVariant;
  href?: string;
}) {
  const { open } = useQuoteModal();

  if (variant === "hero" || variant === "white" || variant === "dark") {
    const isDark = variant === "dark";
    const inner = (
      <>
        <span>{children}</span>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-text transition-colors group-hover:bg-accent/90",
            isDark && "bg-accent"
          )}
        >
          <ArrowUpRight />
        </span>
      </>
    );

    const classes = cn(
      "group inline-flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-[14px] font-semibold transition-all",
      variant === "hero" && "bg-white text-text shadow-lg hover:bg-white/95",
      variant === "white" && "bg-white text-text hover:bg-white/95",
      variant === "dark" && "bg-dark text-white hover:bg-dark/90",
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      );
    }

    return (
      <button type="button" onClick={open} className={cn(classes, "cursor-pointer")}>
        {inner}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={cn(variant === "primary" ? "btn-primary" : "quote-btn", "cursor-pointer", className)}
    >
      {children}
    </button>
  );
}
