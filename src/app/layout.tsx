import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Kanit, Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
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
  metadataBase: new URL("https://nongtung.com"),
  title: {
    default: "NONGTUNG - Adventure Experiences",
    template: "%s | NONGTUNG"
  },
  description: "Bespoke northern Thailand travel curated for those who seek the extraordinary. Experience unique adventures, local culture, and breathtaking landscapes.",
  keywords: ["Nongtung", "Northern Thailand Travel", "Adventure Experiences", "Thailand Tours", "Chiang Mai Travel", "Bespoke Travel", "Nature Tours", "Cultural Experiences"],
  authors: [{ name: "NONGTUNG Team" }],
  creator: "NONGTUNG",
  publisher: "NONGTUNG",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "NONGTUNG - Adventure Experiences",
    description: "Bespoke northern Thailand travel curated for those who seek the extraordinary.",
    url: "https://nongtung.com",
    siteName: "NONGTUNG",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", // Ensure this image exists or change path
        width: 1200,
        height: 630,
        alt: "NONGTUNG Adventure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NONGTUNG - Adventure Experiences",
    description: "Bespoke northern Thailand travel curated for those who seek the extraordinary.",
    images: ["/images/og-image.jpg"], // Ensure this image exists
  },
  alternates: {
    canonical: "https://nongtung.com",
  },
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NONGTUNG",
            url: "https://nongtung.com",
            logo: "https://nongtung.com/images/favicon.svg",
            sameAs: [
              "https://www.facebook.com/nongtung",
              "https://www.instagram.com/nongtung"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+66-123-456-789",
              contactType: "customer service",
              areaServed: "TH",
              availableLanguage: ["en", "th"]
            }
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
      </body>
    </html>
  );
}
