import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionBadge";

export function HsnTable() {
  return (
    <section className="about-cream section-padding">
      <Container>
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            badge="HSN Codes"
            title="Deals in HSN Code"
            subtitle="Standard harmonized system codes for our product categories and trade classifications."
            align="center"
          />

          <div className="mt-10 overflow-hidden rounded-[24px] border border-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:mt-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse">
                <thead>
                  <tr className="bg-dark text-left text-white">
                    <th className="px-5 py-4 text-sm font-semibold md:px-6 md:py-5 md:text-[15px]">
                      HSN Code
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold md:px-6 md:py-5 md:text-[15px]">
                      HSN Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {site.hsnCodes.map((row, i) => (
                    <tr
                      key={row.code}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#faf8f5]"}
                    >
                      <td className="border-t border-border px-5 py-4 text-sm font-bold text-text md:px-6 md:py-5">
                        {row.code}
                      </td>
                      <td className="border-t border-border px-5 py-4 text-sm leading-relaxed text-text-muted md:px-6 md:py-5 md:text-[15px]">
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
