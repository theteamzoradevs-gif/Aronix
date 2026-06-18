import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="text-4xl font-bold text-text">404</h1>
        <p className="mt-4 text-text-muted">Page not found</p>
        <Link href="/" className="mt-8 inline-block text-primary hover:underline">
          Back to Home
        </Link>
      </Container>
    </section>
  );
}
