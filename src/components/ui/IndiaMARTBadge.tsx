import Image from "next/image";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

type IndiaMARTBadgeProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
};

const LOGO_SRC = "/assets/brand/indiamart-trust-seal.png";

const sizes = {
  sm: { height: 28, className: "h-7" },
  md: { height: 36, className: "h-9" },
  lg: { height: 52, className: "h-[52px]" },
  xl: { height: 72, className: "h-[72px] md:h-20" },
  "2xl": { height: 96, className: "h-24 md:h-28" },
};

export function IndiaMARTBadge({ size = "md", className }: IndiaMARTBadgeProps) {
  const dim = sizes[size];

  const content = (
    <Image
      src={LOGO_SRC}
      alt="IndiaMART Trust Seal verified supplier"
      width={Math.round(dim.height * 2.8)}
      height={dim.height}
      className={cn("w-auto object-contain", dim.className, className)}
    />
  );

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
