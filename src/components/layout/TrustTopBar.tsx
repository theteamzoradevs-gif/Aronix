import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { IndiaMARTBadge } from "@/components/ui/IndiaMARTBadge";

export function TrustTopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] border-b border-white/10 bg-ink text-white">
      <Container className="flex h-[var(--trust-bar-height)] items-center justify-between gap-3 text-[11px] md:text-xs">
        <div className="flex min-w-0 items-center gap-3 md:gap-5">
          <a
            href={`tel:${site.phone}`}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 font-medium text-white/90 transition-colors hover:text-accent"
            aria-label={`Call ${site.phone}`}
          >
            <PhoneIcon />
            <span className="hidden md:inline text-accent/90">100% response rate</span>
          </a>
          <span className="hidden text-white/35 lg:inline">|</span>
          <span className="hidden truncate text-white/65 lg:inline">GST: {site.gst}</span>
          <span className="hidden text-white/35 xl:inline">|</span>
          <span className="hidden text-white/65 xl:inline">MSME Approved</span>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <IndiaMARTBadge size="sm" />
        </div>
      </Container>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
