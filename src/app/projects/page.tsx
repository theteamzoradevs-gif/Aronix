import { PageHero } from "@/components/layout/PageHero";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { VideoSection } from "@/components/home/VideoSection";
import { ContactCta } from "@/components/home/ContactCta";
import { MotionReveal } from "@/components/motion/MotionReveal";

export const metadata = {
  title: "Projects - aronixinfra.com",
  description:
    "View delivered portable cabins, guard rooms, shipping containers, and prefab structures by Aronix Infra across India.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero>
        <MotionReveal>
          <EditorialHeader
            label="Project gallery"
            title="Delivered across construction sites, factories & commercial projects"
            subtitle="Manufacturing, delivery, and installation from our Greater Noida facility."
            description="Deployed at sites across India — offices, guard cabins, containers, and prefab structures."
            align="center"
            className="mx-auto max-w-3xl"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <ProjectGallery showFilters hideHeader compact masonry />

      <VideoSection />
      <ContactCta />
    </>
  );
}
