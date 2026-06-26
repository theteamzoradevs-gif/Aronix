import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { IndiaMARTBadge } from "@/components/ui/IndiaMARTBadge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { formatPhoneDisplay, navItems } from "./TopBar";

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

const socialLinks = [
  { href: site.social.facebook, label: "Facebook", icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: site.social.twitter, label: "X (Twitter)", icon: TwitterIcon },
] as const;

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

          <div className="flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto max-md:py-0.5 sm:gap-2 md:ml-auto md:justify-end">
            <a
              href={`tel:${site.phone}`}
              className="shrink-0 rounded-lg px-1.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:text-accent/90 sm:px-2 sm:text-sm"
            >
              {formatPhoneDisplay(site.phone)}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#25D366] transition-transform hover:scale-110 sm:h-10 sm:w-10"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <span className="mx-0.5 h-4 w-px shrink-0 bg-white/20" aria-hidden />
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white sm:h-10 sm:w-10"
              >
                <Icon />
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex w-full items-center justify-center gap-4 border-b border-white/10 pb-8 sm:gap-5 lg:max-w-[300px] lg:shrink-0 lg:justify-start lg:border-b-0 lg:pb-0">
            <Link
              href="/"
              className="relative block h-[48px] w-[118px] shrink-0 sm:h-[56px] sm:w-[138px]"
            >
              <Image
                src={site.logo}
                alt="Aronix Infra"
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 118px, 138px"
                unoptimized
              />
            </Link>

            <span className="h-10 w-px shrink-0 bg-white/15 sm:h-12" aria-hidden />

            <div className="flex shrink-0 items-center">
              <IndiaMARTBadge
                size="lg"
                className="!h-[42px] !w-auto max-w-[120px] object-contain object-left sm:!h-[50px] sm:max-w-[140px]"
              />
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

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
