import { site } from "@/lib/data";

const contactItems = [
  {
    title: "Call us",
    value: site.phone,
    subtitle: "Have any questions? Just call",
    href: `tel:${site.phone}`,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Email us",
    value: site.email,
    subtitle: "Write us an email anytime",
    href: `mailto:${site.email}`,
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
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function ContactSidebar() {
  return (
    <div className="h-full rounded-3xl bg-ink p-6 text-white shadow-[var(--shadow-elevated)] md:p-8">
      <h2 className="font-display text-xl font-semibold md:text-2xl">Get in touch</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/65">
        Call, email, or visit our Greater Noida facility. We respond quickly on all channels.
      </p>

      <div className="mt-6 space-y-3">
        {contactItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-accent/40 hover:bg-white/10"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.title}</p>
              <p className="mt-1 font-display text-base font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{item.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ContactMapPanel({ className }: { className?: string }) {
  return (
    <div className={`flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl border border-border-light bg-white shadow-[var(--shadow-soft)] ${className ?? ""}`}>
      <iframe
        src={site.mapUrl}
        title="Aronix Infra location"
        className="min-h-0 flex-1 w-full"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-border-light px-4 py-3 text-center">
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
