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

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="border-b border-white/10 bg-[#141428]">
        <Container className="flex items-center justify-center gap-3 py-4 md:justify-end md:py-5">
          <a href={`tel:${site.phone}`} className="text-sm font-semibold text-accent hover:text-accent/90">
            {site.phone}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 p-2 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
        </Container>
      </div>

      <Container className="py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Certification
            </h3>
            <p className="text-sm font-medium text-white">{site.certification.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-300">{site.certification.subtitle}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>GST: {site.gst}</p>
              <p>MSME Approved</p>
              <p>Employees: {site.footerMeta.employees}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
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
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 lg:gap-10">
            <Link
              href="/"
              className="relative mx-auto h-28 w-56 shrink-0 md:mx-0 md:h-32 md:w-64 md:justify-self-start"
            >
              <Image
                src={site.logo}
                alt="Aronix Infra"
                fill
                className="object-contain object-center md:object-left"
                sizes="(max-width: 768px) 224px, 256px"
                unoptimized
              />
            </Link>

            <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 md:max-w-md lg:max-w-lg">
              {site.trustBadges.slice(0, 4).map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center justify-center gap-2 text-center text-xs text-white/80 sm:justify-start sm:text-left md:text-sm"
                >
                  <CheckIcon />
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>

            <div className="flex shrink-0 items-center justify-center md:justify-self-end">
              <IndiaMARTBadge size="2xl" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-sm text-gray-400 md:flex-row md:text-left">
          <p>Copyright © Aronix Infra. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <FacebookIcon />
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <LinkedInIcon />
            </a>
            <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
