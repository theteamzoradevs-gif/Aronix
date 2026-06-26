import { Suspense } from "react";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export const metadata = {
  title: "Projects - aronixinfra.com",
  description:
    "View delivered portable cabins, guard rooms, shipping containers, and prefab structures by Aronix Infra across India.",
};

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-text-muted">
          Loading projects...
        </div>
      }
    >
      <ProjectsPageClient />
    </Suspense>
  );
}
