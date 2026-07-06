"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { testimonials } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

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

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-light/80 bg-white text-primary shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-all hover:border-primary/20 hover:shadow-[0_4px_12px_rgba(15,23,42,0.12)]",
        disabled && "pointer-events-none cursor-not-allowed opacity-35"
      )}
      aria-label={direction === "prev" ? "Previous review" : "Next review"}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.25}
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

export function TestimonialsCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const hasMultipleSlides = testimonials.length > 1;

  const syncNav = (swiper: SwiperType) => {
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  };

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

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
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          touchRatio={1}
          threshold={8}
          longSwipesRatio={0.35}
          resistance
          resistanceRatio={0.85}
          grabCursor
          breakpoints={{
            768: { slidesPerView: 2, slidesPerGroup: 2, allowTouchMove: false },
            1024: { slidesPerView: 3, slidesPerGroup: 3, allowTouchMove: false },
          }}
          className="testimonials-swiper testimonials-swiper-dark !pb-14 !pt-8 [&_.swiper-slide]:h-auto [&_.swiper-wrapper]:items-stretch"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncNav(swiper);
          }}
          onSlideChange={syncNav}
          onReachBeginning={() => setAtStart(true)}
          onReachEnd={() => setAtEnd(true)}
          onFromEdge={syncNav}
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

        {hasMultipleSlides ? (
          <div className="mt-2 hidden items-center justify-center gap-4 md:flex">
            <NavButton direction="prev" onClick={goPrev} disabled={atStart} />
            <NavButton direction="next" onClick={goNext} disabled={atEnd} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
