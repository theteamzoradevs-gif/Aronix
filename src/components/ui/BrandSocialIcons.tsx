"use client";

import { useId, type ComponentType } from "react";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

export function FacebookBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#FFFFFF"
        d="M13.5 12.5h2.2l.3-2.4h-2.5V8.6c0-.7.2-1.2 1.2-1.2h1.3V5.2c-.2 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2h-2v2.4h2v5.8h2.5v-5.8z"
      />
    </svg>
  );
}

export function InstagramBrandIcon({ className = "h-5 w-5" }: IconProps) {
  const gradientId = useId();

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
      <path
        fill="#FFFFFF"
        d="M12 7.2c1.66 0 1.86.01 2.52.04.61.03.94.14 1.16.23.29.12.5.26.72.48.22.22.36.43.48.72.09.22.2.55.23 1.16.03.66.04.86.04 2.52s-.01 1.86-.04 2.52c-.03.61-.14.94-.23 1.16a1.86 1.86 0 01-.48.72 1.86 1.86 0 01-.72.48c-.22.09-.55.2-1.16.23-.66.03-.86.04-2.52.04s-1.86-.01-2.52-.04c-.61-.03-.94-.14-1.16-.23a1.86 1.86 0 01-.72-.48 1.86 1.86 0 01-.48-.72c-.09-.22-.2-.55-.23-1.16-.03-.66-.04-.86-.04-2.52s.01-1.86.04-2.52c.03-.61.14-.94.23-1.16.12-.29.26-.5.48-.72.22-.22.43-.36.72-.48.22-.09.55-.2 1.16-.23.66-.03.86-.04 2.52-.04zm0-1.2c-1.69 0-1.9.01-2.56.04-.66.03-1.12.14-1.52.3-.41.17-.76.4-1.1.74-.34.34-.57.69-.74 1.1-.16.4-.27.86-.3 1.52-.03.66-.04.87-.04 2.56s.01 1.9.04 2.56c.03.66.14 1.12.3 1.52.17.41.4.76.74 1.1.34.34.69.57 1.1.74.4.16.86.27 1.52.3.66.03.87.04 2.56.04s1.9-.01 2.56-.04c.66-.03 1.12-.14 1.52-.3.41-.17.76-.4 1.1-.74.34-.34.57-.69.74-1.1.16-.4.27-.86.3-1.52.03-.66.04-.87.04-2.56s-.01-1.9-.04-2.56c-.03-.66-.14-1.12-.3-1.52a2.97 2.97 0 00-.74-1.1 2.97 2.97 0 00-1.1-.74c-.4-.16-.86-.27-1.52-.3-.66-.03-.87-.04-2.56-.04zM12 9.52a2.48 2.48 0 100 4.96 2.48 2.48 0 000-4.96zm0 4.08a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zm3.14-4.34a.58.58 0 100-1.16.58.58 0 000 1.16z"
      />
    </svg>
  );
}

export function LinkedInBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M8.2 9.5h2.1v9.6H8.2V9.5zm1.05-3.4c.68 0 1.23.55 1.23 1.23s-.55 1.23-1.23 1.23-1.23-.55-1.23-1.23.55-1.23 1.23-1.23zm3.35 3.4h2v1.3h.03c.28-.53 1.08-1.08 2.22-1.08 2.37 0 2.81 1.56 2.81 3.59v5.75h-2.2v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.68v5.2h-2.2V9.5z"
      />
    </svg>
  );
}

export function XBrandIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="5" fill="#000000" />
      <path
        fill="#FFFFFF"
        d="M13.3 11.2l4.2-4.9h-1l-3.7 4.3-3-4.3h-3.4l4.4 6.5-4.4 5.1h1l3.9-4.5 3.1 4.5h3.4l-4.6-6.7zm-1.2 1.5l-.4-.6-3.5-5h1.2l2.8 4 .4.6 3.7 5.3h-1.2l-3-4.3z"
      />
    </svg>
  );
}

export const brandSocialLinks = [
  { key: "facebook", label: "Facebook", icon: FacebookBrandIcon },
  { key: "instagram", label: "Instagram", icon: InstagramBrandIcon },
  { key: "linkedin", label: "LinkedIn", icon: LinkedInBrandIcon },
  { key: "twitter", label: "X (Twitter)", icon: XBrandIcon },
] as const;

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
        "flex shrink-0 items-center justify-center transition-opacity hover:opacity-85",
        className
      )}
    >
      <Icon className={iconClassName} />
    </a>
  );
}
