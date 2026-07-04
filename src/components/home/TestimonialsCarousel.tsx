"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { testimonials } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";

import "swiper/css";
import "swiper/css/pagination";

function StarRating() {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">
      {initials}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="section-compact section-white border-t border-border-light md:py-16">
      <Container className="relative">
        <MotionReveal>
          <EditorialHeader
            label="Reviews"
            title="Client's Review"
            align="center"
            className="mx-auto max-w-xl"
            compact
            prominentLabel
          />
        </MotionReveal>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
          className="testimonials-swiper testimonials-swiper-dark !pb-14 !pt-8 [&_.swiper-slide]:h-auto [&_.swiper-wrapper]:items-stretch"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto">
              <div className="flex h-full min-h-[300px] flex-col rounded-2xl border border-ink/15 bg-ink p-6 shadow-[var(--shadow-soft)] md:min-h-[320px] md:p-7">
                <StarRating />
                {t.tag && (
                  <span className="mt-3 inline-block w-fit rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
                    {t.tag}
                  </span>
                )}
                <p className="mt-4 flex-1 text-left text-body-sm leading-relaxed text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <Avatar name={t.name} />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-body-sm text-white/55">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
