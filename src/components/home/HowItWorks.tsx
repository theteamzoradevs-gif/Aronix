"use client";

import { useState } from "react";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SiteImage } from "@/components/ui/SiteImage";
import { QuoteButton } from "@/components/products/QuoteButton";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step = site.howItWorks[activeStep];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <Container>
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <SectionBadge>How it works</SectionBadge>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-text md:text-[36px] lg:text-[40px]">
              Simple steps to fast, reliable delivery
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-text-muted md:text-base lg:pb-1">
            Our streamlined process ensures fast response, clear communication, and quality
            portable cabins and containers from start to finish.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-8 md:border-b md:border-border md:pb-4">
          {site.howItWorks.map((item, index) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(index)}
              className={cn(
                "w-fit text-left text-[14px] font-medium transition-colors md:text-[15px]",
                activeStep === index
                  ? "border-b-2 border-accent pb-1 text-text"
                  : "text-text-muted hover:text-text"
              )}
            >
              [{item.step}] {item.navLabel}
            </button>
          ))}
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="flex flex-col rounded-[24px] bg-[#f4f5f7] p-6 md:p-8 lg:col-span-2">
            <span className="text-4xl font-bold text-accent md:text-5xl">[{step.step}]</span>
            <h3 className="mt-4 text-xl font-bold text-text md:text-2xl">{step.headline}</h3>
            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-muted">{step.desc}</p>
            <div className="mt-8">
              <QuoteButton variant="dark">Request a quote</QuoteButton>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[24px] sm:min-h-[380px] lg:col-span-3 lg:min-h-[460px]">
            <SiteImage
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
