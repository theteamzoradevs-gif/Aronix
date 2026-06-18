"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductSliderProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export function ProductSlider({ products, title, showViewAll }: ProductSliderProps) {
  if (!products.length) return null;

  return (
    <section className="wps-slider-section py-12 md:py-16">
      <Container>
        {title && <SectionHeading>{title}</SectionHeading>}
        {showViewAll && (
          <div className="mb-6 text-center">
            <a href="/products" className="text-sm font-medium text-primary hover:underline">
              View All
            </a>
          </div>
        )}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="!pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} layout="slider" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
