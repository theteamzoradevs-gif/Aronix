import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Main } from "@/components/layout/Main";
import { Footer } from "@/components/layout/Footer";
import { QuoteModal } from "@/components/layout/QuoteModal";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { FaqChatbot } from "@/components/layout/FaqChatbot";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} font-inter antialiased`}>
        <QuoteModalProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <FloatingActions />
          <FaqChatbot />
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
