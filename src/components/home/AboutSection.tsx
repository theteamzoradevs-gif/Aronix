import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SiteImage } from "@/components/ui/SiteImage";
import { QuoteButton } from "@/components/products/QuoteButton";

export function AboutSection() {
  const shortAbout =
    site.aboutText.length > 380
      ? `${site.aboutText.slice(0, 380).trim()}…`
      : site.aboutText;

  return (
    <section className="section-padding bg-dark">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative min-h-[280px] overflow-hidden rounded-[24px] md:min-h-[400px] lg:min-h-[480px]">
            <SiteImage
              src={site.albumImages[1]}
              alt="About Aronix Infra"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center rounded-[24px] bg-white p-6 shadow-xl md:p-8 lg:p-10">
            <SectionBadge>About us</SectionBadge>
            <h2 className="text-[26px] font-bold leading-tight tracking-tight text-text md:text-[32px] lg:text-[36px]">
              Trust and reliable service since 2023
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-text-muted">{shortAbout}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <QuoteButton variant="dark" href="/contact-us">
                Contact our experts
              </QuoteButton>
              <Link
                href="/about-us"
                className="inline-flex items-center text-sm font-semibold text-text-muted hover:text-primary"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
