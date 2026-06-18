import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function ContactCards() {
  const cards = [
    {
      title: site.phone,
      subtitle: "Have any Questions ? just call",
      href: `tel:${site.phone}`,
      icon: "📞",
    },
    {
      title: site.email,
      subtitle: "Write Email",
      href: `mailto:${site.email}`,
      icon: "✉️",
    },
    {
      title: "Visit Anytime",
      subtitle: `Our Warehouse & office : ${site.addresses[0].text}`,
      href: site.directionsUrl,
      icon: "📍",
    },
  ];

  return (
    <Container>
      <h2 className="section-heading mb-10">Lets Get In Touch</h2>
      <span className="section-heading-underline mx-auto -mt-8 mb-10 block" />
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded border border-border bg-white p-8 text-center shadow-[0_4px_14px_rgba(46,43,146,0.06)] transition-colors hover:border-primary"
          >
            <span className="mb-4 block text-4xl">{card.icon}</span>
            <h3 className="text-lg font-bold text-text">{card.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{card.subtitle}</p>
          </a>
        ))}
      </div>
    </Container>
  );
}
