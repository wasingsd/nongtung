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

const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://nongtung.com"),
  title: {
    default: "NONGTUNG - Bespoke Northern Thailand Adventure Experiences",
    template: "%s | NONGTUNG"
  },
  description: "Experience unique Northern Thailand adventures curated for international travelers. Bespoke travel, local culture, and breathtaking landscapes in Chiang Mai and beyond.",
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
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Manually added for high priority */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M3B7SBQS');
            `,
          }}
        />
        {FACEBOOK_PIXEL_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${FACEBOOK_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </head>
      <body
        className={`${kanit.variable} ${urbanist.variable} antialiased flex flex-col min-h-screen bg-white`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3B7SBQS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
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
            description: "Bespoke northern Thailand travel curate specializing in unique adventures, local culture, and breathtaking landscapes for international seekers of the extraordinary.",
            url: "https://nongtung.com",
            logo: "https://nongtung.com/images/favicon.png",
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
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chiang Mai",
              addressCountry: "TH"
            },
            priceRange: "$$"
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                var target = e.target.closest('a');
                if (target && target.href.includes('facebook.com')) {
                  if (window.gtag) {
                    gtag('event', 'click_facebook', {
                      'event_category': 'outbound',
                      'event_label': target.href
                    });
                  }
                  if (window.fbq) {
                    fbq('trackCustom', 'ClickFacebook', { url: target.href });
                  }
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
