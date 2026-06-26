import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function HomeAboutSection() {
  return (
    <section className="section-editorial section-white border-t border-border-light">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <MotionReveal>
            <div>
              <EditorialHeader
                label="About us"
                title="Built in Greater Noida. Delivered site-ready."
                subtitle="Portable cabins, containers, and prefab structures — manufactured under one roof since 2023."
                align="left"
                compact
                prominentLabel
              />

              <p className="mt-5 text-body leading-relaxed text-text-muted">
                We started Aronix Infra with a straightforward idea: construction and industrial sites
                need reliable space, fast — without the back-and-forth of multiple vendors. Our factory in
                Greater Noida handles everything from MS porta cabins and guard rooms to used shipping
                containers and FRP toilets.
              </p>
              <p className="mt-4 text-body leading-relaxed text-text-muted">
                Every unit goes through factory QC before dispatch. Whether it&apos;s a 10×8 site office or a
                bulk container order for a highway project, our team stays on the same page from quote to
                handover.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {site.impactStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border-light bg-cream/60 px-4 py-3 text-center lg:text-left"
                  >
                    <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link href="/about-us" className="btn-primary mt-8 inline-flex text-sm">
                Learn more about us
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-elevated)] md:aspect-[5/6]">
                <SiteImage
                  src={site.albumImages[0]}
                  alt="Aronix Infra manufacturing facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border-light bg-white p-4 shadow-[var(--shadow-card)] md:block">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">GST Registered</p>
                <p className="mt-1 font-mono text-sm font-medium text-ink">{site.gst}</p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
