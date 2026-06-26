"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { testimonials, site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";

import "swiper/css";
import "swiper/css/pagination";

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="section-compact border-t border-border-light bg-cream md:py-16">
      <Container className="relative">
        <MotionReveal>
          <EditorialHeader
            label="Reviews"
            title="What buyers say on IndiaMART"
            subtitle="Verified ratings from real customers — 4.5/5 across 21 reviews."
            align="center"
            className="mx-auto max-w-xl"
            compact
            prominentLabel
          />
        </MotionReveal>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
            1024: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 24 },
          }}
          className="testimonials-swiper !pb-14 !pt-8 [&_.swiper-slide]:h-auto [&_.swiper-wrapper]:items-stretch"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={`${t.name}-${t.date}`} className="!h-auto">
              <article className="flex h-full min-h-[280px] flex-col rounded-2xl border border-border-light bg-white p-6 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)] md:min-h-[300px]">
                <div className="flex items-start justify-between gap-3">
                  <StarRating rating={t.rating ?? 5} />
                  {t.source === "indiamart" && (
                    <span className="shrink-0 rounded-md bg-[#2e3192]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2e3192]">
                      IndiaMART
                    </span>
                  )}
                </div>

                <p className="mt-4 flex-1 text-left text-sm leading-relaxed text-text-light">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-5 border-t border-border-light pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="truncate text-sm font-semibold text-ink">{t.name}</h4>
                      <p className="text-xs text-text-muted">{t.role}</p>
                    </div>
                  </div>
                  {(t.product || t.date) && (
                    <p className="mt-2.5 text-[11px] text-text-muted">
                      {t.product && <span>{t.product}</span>}
                      {t.product && t.date && <span className="mx-1.5 text-border">·</span>}
                      {t.date && <span>{t.date}</span>}
                    </p>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-2 text-center text-xs text-text-muted">
          Source:{" "}
          <a
            href={`${site.indiamartUrl}testimonial.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            IndiaMART verified reviews
          </a>
        </p>
      </Container>
    </section>
  );
}
