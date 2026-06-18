import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";

export function AboutSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading>About Us</SectionHeading>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[15px] leading-relaxed text-text-light">{site.aboutText}</p>
            <Link
              href="/about-us"
              className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Read More
            </Link>
          </div>
          <div className="overflow-hidden rounded border border-border">
            <SiteImage
              src={site.ceo.image}
              alt="About Aronix Infra"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
