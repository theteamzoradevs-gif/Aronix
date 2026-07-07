"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

type CarouselItem = {
  product: Product;
  image: string;
};

function chunkItems(items: CarouselItem[], size: number): CarouselItem[][] {
  const faces: CarouselItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    faces.push(items.slice(i, i + size));
  }
  return faces;
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
        disabled && "cursor-not-allowed opacity-35 pointer-events-none"
      )}
      aria-label={direction === "prev" ? "Previous products" : "Next products"}
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

function ViewAllCta({
  href,
  onPrev,
  onNext,
  showArrows,
  prevDisabled,
  nextDisabled,
}: {
  href: string;
  onPrev?: () => void;
  onNext?: () => void;
  showArrows?: boolean;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {showArrows && onPrev ? (
        <NavButton direction="prev" onClick={onPrev} disabled={prevDisabled} />
      ) : null}
      <Link
        href={href}
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_4px_14px_rgba(30,58,95,0.25)] transition-colors hover:bg-[#16304f] sm:w-auto sm:min-w-[220px] sm:px-10"
      >
        View all products
      </Link>
      {showArrows && onNext ? (
        <NavButton direction="next" onClick={onNext} disabled={nextDisabled} />
      ) : null}
    </div>
  );
}

export function ProductCubeCarousel({
  items,
  viewAllHref = "/products",
}: {
  items: CarouselItem[];
  viewAllHref?: string;
}) {
  const reduced = useReducedMotion();
  const faces = chunkItems(items, 3);
  const [faceIndex, setFaceIndex] = useState(0);
  const mobileSwiperRef = useRef<SwiperType | null>(null);
  const [mobileAtStart, setMobileAtStart] = useState(true);
  const [mobileAtEnd, setMobileAtEnd] = useState(false);

  const syncMobileNav = (swiper: SwiperType) => {
    setMobileAtStart(swiper.isBeginning);
    setMobileAtEnd(swiper.isEnd);
  };

  useEffect(() => {
    if (faces.length <= 1) return;
    const id = setInterval(() => {
      setFaceIndex((i) => (i + 1) % faces.length);
    }, 5000);
    return () => clearInterval(id);
  }, [faces.length]);

  if (!items.length) return null;

  const goPrev = () => setFaceIndex((i) => (i - 1 + faces.length) % faces.length);
  const goNext = () => setFaceIndex((i) => (i + 1) % faces.length);
  const goMobilePrev = () => mobileSwiperRef.current?.slidePrev();
  const goMobileNext = () => mobileSwiperRef.current?.slideNext();
  const hasMultipleFaces = faces.length > 1;
  const hasMultipleMobileSlides = items.length > 1;

  const desktopCarousel = !hasMultipleFaces ? (
    <div className="grid grid-cols-3 gap-5 [&>*]:h-full">
      {items.slice(0, 3).map(({ product, image }) => (
        <ProductCard
          key={product.slug}
          product={product}
          imageOverride={image}
          showPrice
          compact
        />
      ))}
    </div>
  ) : (
    <>
      <div className="overflow-hidden px-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={faceIndex}
            className="grid grid-cols-3 gap-5 [&>*]:h-full"
            initial={reduced ? {} : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? {} : { opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {faces[faceIndex].map(({ product, image }) => (
              <ProductCard
                key={product.slug}
                product={product}
                imageOverride={image}
                showPrice
                compact
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <ViewAllCta href={viewAllHref} showArrows onPrev={goPrev} onNext={goNext} />
    </>
  );

  return (
    <>
      <div className="mt-6 md:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="product-mobile-carousel !pb-10"
          onSwiper={(swiper) => {
            mobileSwiperRef.current = swiper;
            syncMobileNav(swiper);
          }}
          onSlideChange={syncMobileNav}
          onReachBeginning={() => setMobileAtStart(true)}
          onReachEnd={() => setMobileAtEnd(true)}
          onFromEdge={(swiper) => syncMobileNav(swiper)}
        >
          {items.map(({ product, image }) => (
            <SwiperSlide key={product.slug}>
              <ProductCard
                product={product}
                imageOverride={image}
                showPrice
                compact
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <ViewAllCta
          href={viewAllHref}
          showArrows={hasMultipleMobileSlides}
          onPrev={goMobilePrev}
          onNext={goMobileNext}
          prevDisabled={mobileAtStart}
          nextDisabled={mobileAtEnd}
        />
      </div>

      <div className="mt-6 hidden md:mt-8 md:block">
        {desktopCarousel}
        {!hasMultipleFaces ? <ViewAllCta href={viewAllHref} /> : null}
      </div>
    </>
  );
}
