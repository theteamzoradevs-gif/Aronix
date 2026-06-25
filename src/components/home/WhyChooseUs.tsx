import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { QuoteButton } from "@/components/products/QuoteButton";

const advantageIcons = [
  <svg key="0" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
  <svg key="3" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

export function WhyChooseUs() {
  const { whyChooseUs } = site;
  const factoryImage = "/assets/2025/10/20-ft-dry-shipping-container-1000x1000-1.jpg";

  return (
    <section className="section-compact relative overflow-hidden bg-ink text-white md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <MotionReveal>
            <EditorialHeader
              label="Why Aronix"
              title="Factory-direct portable infrastructure"
              subtitle={whyChooseUs.title}
              description={whyChooseUs.intro}
              dark
              prominentLabel
            />
            <StaggerChildren className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyChooseUs.advantages.map((item, i) => (
                <StaggerItem key={item.title}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-white/8">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      {advantageIcons[i]}
                    </div>
                    <h3 className="font-display text-card-title font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-white/55">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <div className="mt-8">
              <QuoteButton variant="hero" />
            </div>
          </MotionReveal>

          <MotionReveal direction="left">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[4/3] w-full lg:aspect-square">
                <SiteImage
                  src={factoryImage}
                  alt="Aronix Infra shipping container manufacturing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-label text-accent">Factory direct</p>
                  <p className="mt-1 font-display text-card-title font-bold text-white">
                    Greater Noida manufacturing unit
                  </p>
                  <p className="mt-1 text-body-sm text-white/60">
                    MS steel frames · QC before dispatch · Pan-India logistics
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
