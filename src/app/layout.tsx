import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteModal } from "@/components/layout/QuoteModal";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aronix Infra - Manufacturer of Shipping Containers and Porta Cabins",
  description:
    "Aronix Infra is a manufacturer and supplier of portable cabins, shipping containers, guard cabins, and prefabricated structures in Greater Noida, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <QuoteModalProvider>
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
