import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CTA_PILL_PAIR_CLASS, CTA_PILL_ICON_CLASS, CTA_PILL_TEXT_CLASS } from "@/components/ui/cta-pill-styles";

type CallNowButtonSize = "sm" | "md";

export function CallNowButton({
  className,
  size = "md",
  paired = false,
}: {
  className?: string;
  size?: CallNowButtonSize;
  paired?: boolean;
}) {
  return (
    <a
      href={`tel:${site.phone}`}
      className={cn(
        "group inline-flex cursor-pointer items-center font-semibold text-text transition-colors",
        size === "sm" &&
          "gap-1.5 rounded-full border border-border/80 bg-[#faf8f5] px-3 py-1.5 text-xs hover:border-primary/50 hover:bg-white hover:text-primary",
        size === "md" &&
          !paired &&
          "gap-2.5 rounded-full bg-white py-2 pl-5 pr-2 text-[14px] shadow-lg hover:bg-white/95",
        size === "md" &&
          paired &&
          cn(CTA_PILL_PAIR_CLASS, "bg-white text-[16px] shadow-lg hover:bg-white/95"),
        className
      )}
    >
      <span className={cn(size === "md" && paired && CTA_PILL_TEXT_CLASS)}>
        Call now
      </span>
      {size === "md" && (
        <span
          className={cn(
            CTA_PILL_ICON_CLASS,
            "bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
          )}
        >
          <PhoneIcon />
        </span>
      )}
      {size === "sm" && <PhoneIcon />}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
