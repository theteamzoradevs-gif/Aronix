import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";
import { MotionReveal } from "@/components/motion/MotionReveal";

export function HsnTable() {
  return (
    <section className="section-band-light section-editorial border-t border-border-light">
      <Container>
        <div className="mx-auto max-w-4xl">
          <MotionReveal>
            <SectionHeader
              badge="HSN Codes"
              title="Deals in HSN Code"
              subtitle="Standard harmonized system codes for our product categories and trade classifications."
              align="center"
            />
          </MotionReveal>

          <div className="mt-10 overflow-hidden rounded-3xl border border-border-light bg-white shadow-[var(--shadow-card)] md:mt-12">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-primary text-left text-white">
                    <th className="w-[30%] px-3 py-4 text-sm font-semibold sm:w-[28%] sm:px-6 md:py-5 md:text-[15px]">
                      HSN Code
                    </th>
                    <th className="w-[70%] px-3 py-4 text-sm font-semibold sm:w-[72%] sm:px-6 md:py-5 md:text-[15px]">
                      HSN Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {site.hsnCodes.map((row, i) => (
                    <tr
                      key={row.code}
                      className={i % 2 === 0 ? "bg-white" : "bg-cream/50"}
                    >
                      <td className="break-words border-t border-border-light px-3 py-4 text-sm font-bold text-ink sm:px-6 md:py-5">
                        {row.code}
                      </td>
                      <td className="break-words border-t border-border-light px-3 py-4 text-sm leading-relaxed text-text-muted sm:px-6 md:py-5 md:text-[15px]">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
