import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EditorialHeader } from "@/components/ui/EditorialHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar, ContactMapPanel } from "@/components/contact/ContactSidebar";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { site } from "@/lib/data";
import { formatPhoneDisplay } from "@/components/layout/TopBar";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata = {
  title: "Contact Us - aronixinfra.com",
};

export default function ContactPage() {
  return (
    <>
      <PageHero className="py-7 md:py-14">
        <MotionReveal>
          <EditorialHeader
            label="Contact"
            title="Lets Get In Touch"
            subtitle="Reach out for quotes, product enquiries, or site visits."
            description="Our team responds quickly across phone, email, and WhatsApp."
            subtitleClassName="hidden md:block"
            descriptionClassName="hidden md:block"
            align="center"
            className="mx-auto max-w-2xl"
            prominentLabel
          />
        </MotionReveal>
      </PageHero>

      <section className="section-white border-b border-border-light py-6 md:py-10">
        <Container>
          <div className="mb-5 flex gap-2.5 md:hidden">
            <a
              href={`tel:${site.phone}`}
              className="btn-accent inline-flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              <PhoneIcon />
              Call Now
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 py-3 text-sm font-semibold text-[#1a9e4a] transition-colors hover:bg-[#25D366]/20"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>

          <div className="grid items-stretch gap-5 md:gap-8 lg:grid-cols-2 lg:gap-10">
            <MotionReveal className="order-1">
              <ContactSidebar />
            </MotionReveal>

            <MotionReveal delay={0.06} className="order-2">
              <ContactForm />
            </MotionReveal>

            <MotionReveal delay={0.1} className="order-3 lg:col-span-2">
              <ContactMapPanel className="min-h-[220px] sm:min-h-[280px] lg:min-h-[420px]" />
            </MotionReveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
