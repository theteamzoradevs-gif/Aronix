import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { IndiaMARTBadge } from "@/components/ui/IndiaMARTBadge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { navItems } from "./TopBar";

const productLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=container", label: "Shipping Containers" },
  { href: "/products?category=office", label: "Portable Cabins" },
  { href: "/products?category=guard", label: "Guard Cabins" },
  { href: "/projects", label: "Projects" },
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
        <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-medium text-white/80 md:justify-start md:text-xs">
            {topCertifications.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/25">|</span>}
                <span className="flex items-center gap-1.5">
                  <CheckIcon />
                  {item}
                </span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:ml-auto md:justify-end">
            <a
              href={`tel:${site.phone}`}
              className="text-sm font-semibold text-accent transition-colors hover:text-accent/90"
            >
              {site.phone}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center justify-center text-[#25D366] transition-transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
            <span className="h-4 w-px bg-white/20" aria-hidden />
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/60 transition-colors hover:text-white"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/60 transition-colors hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-white/60 transition-colors hover:text-white"
            >
              <TwitterIcon />
            </a>
          </div>
        </Container>
      </div>

      <Container className="py-8 md:py-10">
        <div className="flex flex-col gap-8 pb-8 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex w-full max-w-[220px] shrink-0 flex-col items-center gap-4 lg:items-start">
            <Link href="/" className="relative block h-24 w-full max-w-[200px] md:h-28">
              <Image
                src={site.logo}
                alt="Aronix Infra"
                fill
                className="object-contain object-left"
                sizes="200px"
                unoptimized
              />
            </Link>
            <div className="w-full max-w-[200px] [&_a]:block">
              <IndiaMARTBadge size="xl" className="!h-20 !w-full max-w-[200px] !object-contain !object-left md:!h-24" />
            </div>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4 lg:gap-5">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Products
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Certification
              </h3>
              <p className="text-sm font-medium text-white">{site.certification.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-300">{site.certification.subtitle}</p>
              <div className="mt-3 space-y-1.5 text-sm text-gray-300">
                <p>GST: {site.gst}</p>
                <p>MSME Approved</p>
                <p>Employees: {site.footerMeta.employees}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                {site.addresses.map((addr) => (
                  <li key={addr.label}>
                    <strong className="text-white">{addr.label}</strong>
                    <br />
                    {addr.text}
                  </li>
                ))}
              </ul>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-center text-sm text-gray-400 lg:text-left">
          <p>Copyright © Aronix Infra. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
