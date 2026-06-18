"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { testimonials } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import "swiper/css";
import "swiper/css/pagination";

function StarRating() {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-5 w-5 text-star" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  return (
    <section className="bg-[#f8f9ff] py-12 md:py-16">
      <Container>
        <SectionHeading>Client&apos;s Review</SectionHeading>
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
          className="testimonials-swiper !pb-14 !pt-2"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-white p-6 text-center shadow-[0_4px_20px_rgba(46,43,146,0.07)] transition-shadow hover:shadow-[0_8px_28px_rgba(46,43,146,0.12)] md:p-8">
                <p className="flex-1 text-[14px] leading-relaxed text-text-light md:text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5">
                  <StarRating />
                  <h4 className="mt-4 text-base font-bold text-text md:text-lg">{t.name}</h4>
                  <p className="mt-1 text-sm text-text-muted">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
