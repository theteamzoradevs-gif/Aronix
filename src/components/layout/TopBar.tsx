import Link from "next/link";
import { site } from "@/lib/data";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/products", label: "Products" },
  { href: "/contact-us", label: "Contact Us" },
];

export function TopBar() {
  return (
    <div className="bg-[#1a1a2e] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs md:px-6 md:text-sm">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-primary">
            <PhoneIcon />
            <span>Call Now</span>
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-primary">
            <MailIcon />
            <span>Email Us</span>
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <span className="rounded bg-primary/20 px-2 py-0.5 text-[11px] font-medium md:text-xs">
            MSME Approved
          </span>
          <span className="text-[11px] md:text-xs">GST NO - {site.gst}</span>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01l-2.2 2.22z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export { navItems };
