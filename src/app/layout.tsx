import type { Metadata } from "next";
import { Kanit, Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const kanit = Kanit({
  weight: ['300', '400', '500', '600'],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
});

const urbanist = Urbanist({
  weight: ['400', '600', '700', '900'],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "NONGTUNG - Premium Adventure Experiences",
  description: "Bespoke northern Thailand travel curate for those who seek the extraordinary.",
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${kanit.variable} ${urbanist.variable} antialiased flex flex-col min-h-screen bg-white`}
      >
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
