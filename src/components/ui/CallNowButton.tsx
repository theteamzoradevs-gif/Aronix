import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

type CallNowButtonSize = "sm" | "md";

export function CallNowButton({
  className,
  size = "md",
}: {
  className?: string;
  size?: CallNowButtonSize;
}) {
  return (
    <a
      href={`tel:${site.phone}`}
      className={cn(
        "group inline-flex cursor-pointer items-center rounded-full border border-border/80 bg-[#faf8f5] font-semibold text-text transition-colors hover:border-primary/50 hover:bg-white hover:text-primary",
        size === "sm" && "gap-1.5 px-3 py-1.5 text-xs",
        size === "md" && "gap-3 py-2 pl-5 pr-2 text-[14px] shadow-lg",
        className
      )}
    >
      Call now
      {size === "md" && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
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
