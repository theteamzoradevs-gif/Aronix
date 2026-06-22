import Link from "next/link";
import { site } from "@/lib/data";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/about-us", label: "About" },
  { href: "/blogs", label: "Blog" },
  { href: "/#faqs", label: "FAQs" },
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
