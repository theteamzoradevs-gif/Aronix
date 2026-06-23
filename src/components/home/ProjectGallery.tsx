"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, projectCategoryLabels } from "@/lib/data";
import type { ProjectCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { SiteImage } from "@/components/ui/SiteImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const filterCategories: ProjectCategory[] = [
  "all",
  "office",
  "guard",
  "container",
  "bunk",
  "factory",
];

interface ProjectGalleryProps {
  limit?: number;
  showFilters?: boolean;
  hideHeader?: boolean;
  compact?: boolean;
}

export function ProjectGallery({
  limit,
  showFilters = true,
  hideHeader = false,
  compact = false,
}: ProjectGalleryProps) {
  const [active, setActive] = useState<ProjectCategory>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section
      className={cn(
        "section-white",
        compact ? "pt-6 pb-12 md:pt-8 md:pb-16" : "section-padding"
      )}
    >
      <Container>
        {!hideHeader && (
          <ScrollReveal>
            <SectionHeader
              badge="Projects"
              title="Delivered across India"
              subtitle="Real portable cabins, containers, and site infrastructure manufactured and delivered from our Greater Noida facility."
              align="center"
            />
          </ScrollReveal>
        )}

        {showFilters && (
          <div className={cn("-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0", hideHeader ? "mt-0" : "mt-8")}>
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap md:justify-center">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active === cat
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-text-muted hover:border-primary hover:text-primary"
                  )}
                >
                  {projectCategoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((project) => (
            <article
              key={project.id}
              className="industrial-card card-hover-lift group overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SiteImage
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-dark/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {projectCategoryLabels[project.category]}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text">{project.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                  <LocationIcon />
                  {project.location}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        {limit && (
          <div className="mt-10 text-center">
            <Link href="/projects" className="btn-accent">
              View all projects
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

function LocationIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
