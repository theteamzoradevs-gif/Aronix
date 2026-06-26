import { site } from "@/lib/data";
import { formatPhoneDisplay } from "@/components/layout/TopBar";
import { cn } from "@/lib/utils";

const contactItems = [
  {
    title: "Call us",
    value: formatPhoneDisplay(site.phone),
    subtitle: "Have any questions? Just call",
    href: `tel:${site.phone}`,
    compact: true,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Email us",
    value: site.email,
    subtitle: "Write email",
    href: `mailto:${site.email}`,
    compact: true,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Visit anytime",
    value: site.addresses[0].label,
    subtitle: site.addresses[0].text,
    href: site.directionsUrl,
    compact: false,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

function ContactCard({
  item,
}: {
  item: (typeof contactItems)[number];
}) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-accent/40 hover:bg-white/10 md:gap-4 md:p-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent group-hover:text-ink md:h-11 md:w-11">
        {item.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-accent md:text-xs">{item.title}</p>
        <p
          className={cn(
            "mt-0.5 font-display font-semibold text-white",
            item.compact ? "text-sm md:text-base" : "text-sm md:text-base",
            item.title === "Email us" && "break-all"
          )}
        >
          {item.value}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/60 md:text-sm">{item.subtitle}</p>
      </div>
    </a>
  );
}

export function ContactSidebar() {
  const [callItem, emailItem, visitItem] = contactItems;

  return (
    <div className="h-full rounded-2xl bg-ink p-4 text-white shadow-[var(--shadow-elevated)] md:rounded-3xl md:p-8">
      <h2 className="font-display text-lg font-semibold md:text-2xl">Get in touch</h2>
      <p className="mt-1.5 hidden text-sm leading-relaxed text-white/65 md:block">
        Call, email, or visit our Greater Noida facility. We respond quickly on all channels.
      </p>

      <div className="mt-4 grid gap-2.5 md:mt-6 md:gap-3">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1 md:gap-3">
          <ContactCard item={callItem} />
          <ContactCard item={emailItem} />
        </div>
        <ContactCard item={visitItem} />
      </div>
    </div>
  );
}

export function ContactMapPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-soft)] md:min-h-[320px] md:rounded-3xl",
        className
      )}
    >
      <iframe
        src={site.mapUrl}
        title="Aronix Infra location"
        className="min-h-0 flex-1 w-full"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-border-light px-3 py-2.5 text-center md:px-4 md:py-3">
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-primary hover:underline md:text-sm"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
