import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

type IndiaMARTTrustSealProps = {
  className?: string;
};

export function IndiaMARTTrustSeal({ className }: IndiaMARTTrustSealProps) {
  return (
    <svg
      className={cn("w-auto", className)}
      viewBox="0 0 100 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="im-seal-gold" x1="50" y1="6" x2="50" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE27A" />
          <stop offset="1" stopColor="#E8A317" />
        </linearGradient>
        <linearGradient id="im-bar-gold" x1="50" y1="58" x2="50" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4C84A" />
          <stop offset="1" stopColor="#D89410" />
        </linearGradient>
      </defs>

      <circle cx="50" cy="30" r="24" fill="url(#im-seal-gold)" stroke="#C98D0D" strokeWidth="0.8" />
      <path
        d="M38 30.5L46 38.5L63 19.5"
        stroke="#C62828"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="50"
        y="40"
        textAnchor="middle"
        fill="#B71C1C"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="0.5"
      >
        TRUST
      </text>
      <text
        x="50"
        y="49"
        textAnchor="middle"
        fill="#B71C1C"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="0.5"
      >
        SEAL
      </text>

      <rect x="14" y="58" width="72" height="16" rx="2" fill="url(#im-bar-gold)" stroke="#C98D0D" strokeWidth="0.8" />
      <text
        x="50"
        y="69.5"
        textAnchor="middle"
        fill="#1A237E"
        fontSize="10.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        indiamart
      </text>
    </svg>
  );
}

type IndiaMARTBadgeProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
};

const sizes = {
  sm: "h-8",
  md: "h-10",
  lg: "h-[52px]",
  xl: "h-[72px] md:h-20",
  "2xl": "h-24 md:h-28",
};

export function IndiaMARTBadge({ size = "md", className }: IndiaMARTBadgeProps) {
  const content = <IndiaMARTTrustSeal className={cn(sizes[size], className)} />;

  if (site.indiamartUrl) {
    return (
      <a
        href={site.indiamartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex cursor-pointer items-center transition-opacity hover:opacity-90"
        aria-label="IndiaMART Trust Seal verified supplier"
      >
        {content}
      </a>
    );
  }

  return content;
}
