import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { VideoSection } from "@/components/home/VideoSection";

export const metadata = {
  title: "Projects - aronixinfra.com",
  description:
    "View delivered portable cabins, guard rooms, shipping containers, and prefab structures by Aronix Infra across India.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="about-cream py-12 md:py-16">
        <Container>
          <SectionHeader
            badge="Projects"
            title="Our Project Gallery"
            subtitle="Manufacturing, delivery, and installation of portable infrastructure for construction, industrial, and commercial sites."
            align="center"
          />
        </Container>
      </section>

      <ProjectGallery showFilters hideHeader compact />

      <VideoSection />
    </>
  );
}
