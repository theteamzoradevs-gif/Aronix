import Image from "next/image";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/assets/brand/indiamart-trust-seal.png";

type IndiaMARTBadgeProps = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  style?: React.CSSProperties;
};

const sizes = {
  sm: { h: 32, w: 28 },
  md: { h: 42, w: 36 },
  lg: { h: 56, w: 48 },
  xl: { h: 76, w: 64 },
  "2xl": { h: 100, w: 86 },
};

export function IndiaMARTBadge({ size = "md", className, style }: IndiaMARTBadgeProps) {
  const dim = sizes[size];

  const img = (
    <Image
      src={LOGO_SRC}
      alt="IndiaMART Trust Seal"
      width={dim.w * 3}
      height={dim.h * 3}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ maxHeight: dim.h, ...style }}
      unoptimized
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
        {img}
      </a>
    );
  }

  return img;
}
