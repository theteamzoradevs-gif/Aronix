import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { TrustTopBar } from "@/components/layout/TrustTopBar";
import { Header } from "@/components/layout/Header";
import { Main } from "@/components/layout/Main";
import { Footer } from "@/components/layout/Footer";
import { StickyQuoteBar } from "@/components/layout/StickyQuoteBar";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import "@/styles/globals.css";

const QuoteModal = dynamic(() =>
  import("@/components/layout/QuoteModal").then((mod) => mod.QuoteModal)
);
const FaqChatbot = dynamic(() =>
  import("@/components/layout/FaqChatbot").then((mod) => mod.FaqChatbot)
);
const LeadPopup = dynamic(() =>
  import("@/components/layout/LeadPopup").then((mod) => mod.LeadPopup)
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aronix Infra - Manufacturer of Shipping Containers and Porta Cabins",
  description:
    "Aronix Infra is a manufacturer and supplier of portable cabins, shipping containers, guard cabins, and prefabricated structures in Greater Noida, India.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} font-inter antialiased`}>
        <QuoteModalProvider>
          <TrustTopBar />
          <Header />
          <Main>{children}</Main>
          <Footer />
          <StickyQuoteBar />
          <FaqChatbot />
          <QuoteModal />
          <LeadPopup />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
