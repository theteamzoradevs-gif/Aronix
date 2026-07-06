"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const socialIconAssets = {
  instagram: "/assets/brand/social/instagram.png",
  linkedin: "/assets/brand/social/linkedin.png",
  twitter: "/assets/brand/social/x.png",
} as const;

/** Shared 32px circle size for every social icon across the site. */
export const SOCIAL_ICON_CLASS = "size-8 min-h-8 min-w-8 max-h-8 max-w-8 shrink-0";

export const brandSocialLinks = [
  { key: "facebook" as const, label: "Facebook" },
  { key: "instagram" as const, label: "Instagram", src: socialIconAssets.instagram },
  { key: "linkedin" as const, label: "LinkedIn", src: socialIconAssets.linkedin },
  { key: "twitter" as const, label: "X (Twitter)", src: socialIconAssets.twitter },
];

function SocialIconShell({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full transition-opacity hover:opacity-85",
        SOCIAL_ICON_CLASS,
        className
      )}
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg className="size-[18px] fill-white" viewBox="0 0 320 512" aria-hidden>
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  );
}

export function FacebookSocialIconLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <SocialIconShell href={href} label="Facebook" className={cn("bg-[#1877F2]", className)}>
      <FacebookIcon />
    </SocialIconShell>
  );
}

export function BrandSocialIconLink({
  href,
  label,
  src,
  className,
}: {
  href: string;
  label: string;
  src: string;
  className?: string;
}) {
  return (
    <SocialIconShell href={href} label={label} className={className}>
      <Image
        src={src}
        alt=""
        width={32}
        height={32}
        className="block size-full object-cover object-center"
        unoptimized
      />
    </SocialIconShell>
  );
}

export function WhatsAppSocialIconLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <SocialIconShell href={href} label="WhatsApp" className={cn("bg-[#25D366]", className)}>
      <WhatsAppIcon className="size-[18px] text-white" />
    </SocialIconShell>
  );
}
