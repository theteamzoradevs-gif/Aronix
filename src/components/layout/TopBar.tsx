import Link from "next/link";
import { site } from "@/lib/data";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/about-us", label: "About Us" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
];

export function formatPhoneDisplay(phone: string) {
  if (phone.length === 10) {
    return `${phone.slice(0, 5)} ${phone.slice(5)}`;
  }
  return phone;
}

export function TopBar() {
  return null;
}
