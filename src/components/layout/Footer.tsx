import Link from "next/link";
import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about-us" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Product & Service
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{site.certification.title}</h3>
            <p className="text-sm text-gray-300">{site.certification.subtitle}</p>
            <div className="mt-6 space-y-2 text-sm text-gray-300">
              <p>
                <span className="font-medium text-white">GST Number</span>
                <br />
                {site.gst}
              </p>
              <p>
                <span className="font-medium text-white">Number of Employees</span>
                <br />
                {site.footerMeta.employees}
              </p>
              <p>
                <span className="font-medium text-white">GST Registration Date</span>
                <br />
                {site.footerMeta.gstRegistrationDate}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Reach Out</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {site.addresses.map((addr) => (
                <li key={addr.label}>
                  <strong className="text-white">{addr.label}:</strong> {addr.text}
                </li>
              ))}
            </ul>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Get Direction
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          Copyright © Aronixinfra all rights reserved.
        </div>
      </Container>
    </footer>
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
