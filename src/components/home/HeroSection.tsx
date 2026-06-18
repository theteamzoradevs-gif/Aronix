"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = site.heroImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-[520px] overflow-hidden md:min-h-[580px]">
      {/* Background image slider */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activeIndex ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/65" />
      </div>

      <Container className="relative z-10 flex min-h-[520px] items-center py-16 md:min-h-[580px] md:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[52px]">
              Aronix Infra
            </h1>
            <p className="mt-4 text-lg italic text-white/85 md:text-xl">
              &ldquo;{site.tagline}.&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#0201cc]"
              >
                <PhoneIcon />
                Call Now
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[#25D366] bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[#25D366]"
              >
                <WhatsAppIcon />
                Whatsapp
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="rounded-xl border border-white/20 bg-white/95 p-6 text-center shadow-2xl backdrop-blur-sm">
              <SiteImage
                src="/assets/2025/10/Untitled-design-2025-10-09T174359.888.png"
                alt="IndiaMART Certification"
                className="mx-auto mb-4 h-20 w-auto"
              />
              <h3 className="text-lg font-semibold text-text">{site.certification.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{site.certification.subtitle}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2 2.22z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
