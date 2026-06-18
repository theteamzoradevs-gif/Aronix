import { site } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function HsnTable() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="hsn-wrap">
          <h2 className="hsn-title text-center text-[28px] font-bold text-text">
            Deals in HSN Code
            <span className="underline mx-auto mt-2.5 block h-1 w-12 rounded bg-primary" />
          </h2>
          <div className="hsn-card mt-6 overflow-hidden rounded border border-border-light shadow-[0_4px_14px_rgba(46,43,146,0.06)]">
            <table className="hsn-table w-full border-collapse">
              <thead>
                <tr>
                  <th>HSN Code</th>
                  <th>HSN Description</th>
                </tr>
              </thead>
              <tbody>
                {site.hsnCodes.map((row) => (
                  <tr key={row.code}>
                    <td className="code font-semibold">{row.code}</td>
                    <td>{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
