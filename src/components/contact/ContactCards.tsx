import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const cardIcons = [
  <svg key="phone" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>,
  <svg key="email" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>,
  <svg key="map" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export function ContactCards() {
  const cards = [
    {
      title: site.phone,
      subtitle: "Have any questions? Just call",
      href: `tel:${site.phone}`,
    },
    {
      title: site.email,
      subtitle: "Write us an email",
      href: `mailto:${site.email}`,
    },
    {
      title: "Visit anytime",
      subtitle: `Our warehouse & office: ${site.addresses[0].text}`,
      href: site.directionsUrl,
    },
  ];

  return (
    <Container>
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {cards.map((card, i) => (
          <a
            key={card.title}
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="card-premium group flex flex-col items-center p-8 text-center"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-text transition-colors group-hover:bg-accent">
              {cardIcons[i]}
            </span>
            <h3 className="font-display text-base font-semibold text-ink md:text-lg">{card.title}</h3>
            <p className="mt-2 text-description text-text-muted">{card.subtitle}</p>
          </a>
        ))}
      </div>
    </Container>
  );
}
