import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const trustItems = [
  { label: "GST Registered", icon: GstIcon },
  { label: "MSME Approved", icon: MsmeIcon },
  { label: "Pan-India Delivery", icon: DeliveryIcon },
];

export function TrustTopBar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] border-b border-white/10 bg-ink text-white">
      <Container className="flex h-[var(--trust-bar-height)] items-center justify-center gap-4 md:justify-start md:gap-6">
        {trustItems.map((item, i) => (
          <span key={item.label} className="flex items-center gap-4">
            {i > 0 && <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />}
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-white md:text-xs">
              <item.icon />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(" ")[0]}</span>
            </span>
          </span>
        ))}
        <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
        <span className="truncate font-medium text-white text-[11px] md:text-xs">
          GST No: {site.gst}
        </span>
      </Container>
    </div>
  );
}

function GstIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function MsmeIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0h4m-4 0a2 2 0 104 0m6 0a2 2 0 104 0M5 16h14" />
    </svg>
  );
}
