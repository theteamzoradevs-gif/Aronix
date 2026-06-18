import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const actions = [
  { label: "Call Now", href: `tel:${site.phone}`, icon: "📞" },
  { label: "Whatsapp", href: `https://wa.me/${site.whatsapp}`, icon: "💬", external: true },
  { label: "Contact", href: "/contact-us", icon: "✉️" },
  { label: "Direction", href: site.directionsUrl, icon: "📍", external: true },
];

export function QuickActions() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {actions.map((action) => {
            const content = (
              <div className="flex flex-col items-center rounded border border-border bg-white p-6 text-center shadow-[0_4px_14px_rgba(46,43,146,0.06)] transition-colors hover:border-primary">
                <span className="mb-3 text-3xl">{action.icon}</span>
                <h3 className="text-sm font-semibold text-text">{action.label}</h3>
              </div>
            );

            if (action.external) {
              return (
                <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              );
            }

            return (
              <Link key={action.label} href={action.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
