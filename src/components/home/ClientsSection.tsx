import { clients } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";

export function ClientsSection() {
  const featured = clients.slice(0, 7);

  return (
    <section className="bg-[#f5f5f7] py-14 md:py-20">
      <Container>
        <h2 className="text-center text-[26px] font-bold tracking-tight text-text md:text-[32px]">
          Our Clients
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4">
          {featured.map((client) => (
            <div
              key={client.id}
              className="flex h-[72px] w-[100px] items-center justify-center rounded-lg bg-white p-3 shadow-sm sm:h-[80px] sm:w-[120px] md:h-[88px] md:w-[140px] md:rounded-xl md:p-4"
            >
              <SiteImage
                src={client.image}
                alt={client.alt}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain md:max-h-14"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
