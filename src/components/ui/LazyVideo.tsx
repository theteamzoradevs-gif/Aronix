"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  label: string;
  className?: string;
};

/** Keeps multi-megabyte clips off the network until the tile is near the screen. */
export function LazyVideo({ src, label, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "160px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      autoPlay={active}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      aria-label={label}
    />
  );
}
