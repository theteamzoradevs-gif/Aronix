"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type IconProps = { className?: string };

export function FacebookBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return <FaFacebook className={className} style={{ color: "#1877F2" }} />;
}

export function InstagramBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return <FaInstagram className={className} style={{ color: "#E1306C" }} />;
}

export function LinkedInBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return <FaLinkedin className={className} style={{ color: "#0A66C2" }} />;
}

export function XBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return <FaXTwitter className={className} style={{ color: "#000000" }} />;
}

export const brandSocialLinks = [
  { key: "facebook" as const, label: "Facebook", icon: FacebookBrandIcon },
  { key: "instagram" as const, label: "Instagram", icon: InstagramBrandIcon },
  { key: "linkedin" as const, label: "LinkedIn", icon: LinkedInBrandIcon },
  { key: "twitter" as const, label: "X (Twitter)", icon: XBrandIcon },
];

export function BrandSocialIconLink({
  href,
  label,
  icon: Icon,
  className,
  iconClassName = "h-5 w-5",
}: {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center justify-center transition-opacity hover:opacity-80",
        className
      )}
    >
      <Icon className={iconClassName} />
    </a>
  );
}
