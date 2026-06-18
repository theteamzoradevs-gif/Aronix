"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { blogs } from "@/lib/data";
import { SiteImage } from "@/components/ui/SiteImage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function BlogCarousel() {
  const slides = [...blogs, ...blogs];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionHeading>Blogs</SectionHeading>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-12"
        >
          {slides.map((blog, i) => (
            <SwiperSlide key={`${blog.id}-${i}`}>
              <article className="overflow-hidden rounded border border-border bg-white shadow-[0_4px_14px_rgba(46,43,146,0.06)]">
                <Link href={`/${blog.slug}`}>
                  <SiteImage
                    src={blog.image}
                    alt={blog.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Link>
                <div className="p-5">
                  <h3 className="mb-2 text-base font-semibold leading-snug text-text">
                    <Link href={`/${blog.slug}`} className="hover:text-primary">
                      {blog.title}
                    </Link>
                  </h3>
                  <time className="text-xs text-text-muted">{blog.date}</time>
                  <p className="mt-3 line-clamp-3 text-sm text-text-light">{blog.excerpt}</p>
                  <Link
                    href={`/${blog.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    Read More »
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
