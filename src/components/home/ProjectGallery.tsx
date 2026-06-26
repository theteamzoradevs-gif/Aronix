"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, projectCategoryLabels } from "@/lib/data";
import { resolveDisplayImage } from "@/lib/gallery";
import type { Project, ProjectCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
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
  items?: Project[];
  limit?: number;
  showFilters?: boolean;
  hideHeader?: boolean;
  compact?: boolean;
  masonry?: boolean;
  hideCategoryBadge?: boolean;
}

export function ProjectGallery({
  items: externalItems,
  limit,
  showFilters = true,
  hideHeader = false,
  compact = false,
  masonry = false,
  hideCategoryBadge = false,
}: ProjectGalleryProps) {
  const [active, setActive] = useState<ProjectCategory>("all");

  const filtered =
    externalItems ??
    (active === "all" ? projects : projects.filter((p) => p.category === active));
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section
      className={cn(
        "section-white",
        compact
          ? "border-t border-gray-100 py-10 md:py-10"
          : "section-editorial"
      )}
    >
      <Container>
        {!hideHeader && (
          <MotionReveal>
            <EditorialHeader
              label="Projects"
              title="Delivered across India"
              subtitle="Real portable cabins, containers, and site infrastructure manufactured and delivered from our Greater Noida facility."
              align="center"
              className="mx-auto max-w-2xl"
              prominentLabel
            />
          </MotionReveal>
        )}

        {showFilters && !externalItems && (
          <div className={cn("-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0", hideHeader ? "mt-0" : "mt-10 md:mt-12")}>
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap md:justify-center">
              {filterCategories.map((cat) => {
                const isActive = active === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-white" : "bg-cream text-text-muted hover:text-primary"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {projectCategoryLabels[cat]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <article className="card-premium group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SiteImage
                    src={resolveDisplayImage(project.image, project.id)}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {projectCategoryLabels[project.category]}
                    </span>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
                      <LocationIcon />
                      {project.location}
                    </p>
                  </div>
                  {!hideCategoryBadge && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary backdrop-blur-sm group-hover:opacity-0">
                      {projectCategoryLabels[project.category]}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 font-display font-semibold text-ink">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-muted">
                    {project.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {limit && (
          <div className="mt-10 text-center">
            <Link href="/projects" className="btn-primary">
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
