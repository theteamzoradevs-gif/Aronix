import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { IndiaMARTBadge } from "@/components/ui/IndiaMARTBadge";
import { navItems } from "./TopBar";
import { FooterSocialIcons } from "./FooterSocialIcons";

const productLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=container", label: "Shipping Containers" },
  { href: "/products?category=office", label: "Portable Cabins" },
  { href: "/products?category=guard", label: "Guard Cabins" },
];

const topCertifications = [
  "GST Registered",
  "MSME Approved",
  "IndiaMART Trust Seal",
  "Pan-India Delivery",
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="border-b border-white/10 bg-[#141428]">
        <Container className="flex flex-col gap-3 py-3 sm:py-4 md:flex-row md:items-center md:justify-between md:gap-4 md:py-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-x-6 md:flex md:flex-wrap md:items-center md:gap-x-4 md:gap-y-2">
            {topCertifications.map((item) => (
              <span
                key={item}
                className="flex min-w-0 items-start gap-1.5 text-[11px] font-medium leading-snug text-white/80 sm:text-xs"
              >
                <CheckIcon />
                <span>{item}</span>
              </span>
            ))}
          </div>

          <FooterSocialIcons />
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Mobile: logo left, indiamart right — Desktop: logo on top, indiamart below */}
          <div className="mx-auto w-full max-w-[340px] border-b border-white/10 pb-8 sm:max-w-[380px] lg:mx-0 lg:max-w-[200px] lg:shrink-0 lg:border-b-0 lg:pb-0">
            {/* Mobile layout: side-by-side */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 sm:gap-8 lg:hidden">
              <Link
                href="/"
                className="relative mx-auto block h-[48px] w-full max-w-[140px] justify-self-end sm:h-[56px] sm:max-w-[160px]"
              >
                <Image
                  src={site.logo}
                  alt="Aronix Infra"
                  fill
                  className="object-contain object-right"
                  sizes="140px"
                  unoptimized
                />
              </Link>
              <span className="h-10 w-px shrink-0 bg-white/15 sm:h-12" aria-hidden />
              <div className="flex items-center justify-self-start">
                <IndiaMARTBadge
                  size="lg"
                  className="!h-[42px] !w-auto max-w-[130px] object-contain object-left sm:!h-[50px] sm:max-w-[150px]"
                />
              </div>
            </div>

            {/* Desktop layout: stacked */}
            <div className="hidden flex-col gap-2 lg:flex lg:pt-4 ml-5">
              <Link href="/" className="block">
                <Image
                  src={site.logo}
                  alt="Aronix Infra"
                  width={200}
                  height={64}
                  className="h-16 ml-14 w-[200px] object-contain object-left"
                  unoptimized
                />
              </Link>
              <IndiaMARTBadge size="xl" className="!h-auto !w-[200px] mt-1" />
            </div>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4 lg:gap-5">
            <FooterColumn title="Company">
              <ul className="space-y-2.5 text-sm text-gray-300">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block py-0.5 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Products">
              <ul className="space-y-2.5 text-sm text-gray-300">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block py-0.5 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Certification" className="col-span-2 lg:col-span-1">
              <p className="text-sm font-medium text-white">{site.certification.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-300">{site.certification.subtitle}</p>
              <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-300">
                <p>GST: {site.gst}</p>
                <p>MSME Approved</p>
                <p>Employees: {site.footerMeta.employees}</p>
                <p>GST Registration Date: {site.footerMeta.gstRegistrationDate}</p>
              </div>
            </FooterColumn>

            <FooterColumn title="Contact" className="col-span-2 lg:col-span-1">
              <ul className="space-y-4 text-sm leading-relaxed text-gray-300">
                {site.addresses.map((addr) => (
                  <li key={addr.label} className="break-words">
                    <strong className="block text-white">{addr.label}</strong>
                    <span className="mt-1 block">{addr.text}</span>
                  </li>
                ))}
              </ul>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-accent hover:underline"
              >
                Get Direction
              </a>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-400 sm:text-sm lg:text-left">
          <p>Copyright © Aronixinfra all rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/60 sm:text-xs">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
