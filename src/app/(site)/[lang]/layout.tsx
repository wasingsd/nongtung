import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Kanit, Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "../../globals.css";
import { Providers } from "@/app/providers";
import FloatingLineChat from "@/components/FloatingLineChat";
import { getHomeSettings } from "@/lib/firestore-db";
import { getDictionary } from "@/lib/dictionary";
import { i18n, type Locale } from "@/i18n-config";

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL("https://nongtung.com"),
  applicationName: "NONGTUNG",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NONGTUNG",
  },
  formatDetection: {
    telephone: false,
  },
  title: {
    default: "NONGTUNG - Bespoke Northern Thailand Adventure & Trekking Experiences",
    template: "%s | NONGTUNG"
  },
  description: "Experience unique Northern Thailand adventures, trekking, and camping curated for international travelers. Bespoke travel, local culture, and breathtaking landscapes in Chiang Mai and Pai.",
  keywords: [
    "Nongtung", "Nongtung Adventure", "นองตึง",
    "chiang mai trekking", "camping chiang mai",
    "เดินป่าเชียงใหม่", "แคมป์ปิ้งเชียงใหม่"
  ],
  authors: [{ name: "NONGTUNG Team" }],
  creator: "NONGTUNG",
  publisher: "NONGTUNG",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "NONGTUNG: Bespoke Northern Thailand Adventures & Trekking",
    description: "Bespoke northern Thailand travel curated for those who seek the extraordinary. Trekking, camping, and private van services.",
    url: "https://nongtung.com",
    siteName: "NONGTUNG",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/og-image-hq.png", width: 1200, height: 630, alt: "NONGTUNG Bespoke Adventures" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NONGTUNG: Bespoke Northern Thailand Adventures & Trekking",
    description: "Bespoke northern Thailand travel curated for those who seek the extraordinary.",
    images: ["/images/og-image-hq.png"],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const settings = await getHomeSettings();
  const facebookUrl = settings?.facebookUrl || "https://www.facebook.com/Venturevibecnx";

  const fbHandle = facebookUrl.includes('facebook.com/')
    ? facebookUrl.split('facebook.com/').pop()?.split('/').filter(Boolean)[0]
    : 'Venturevibecnx';
  const messengerUrl = `https://m.me/${fbHandle}`;

  return (
    <html lang={lang}>
      <head>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3B7SBQS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Providers>
          <Navbar facebookUrl={facebookUrl} lang={lang} dict={dict.Navigation} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer facebookUrl={facebookUrl} lang={lang} dict={dict.Footer} />
          <FloatingLineChat />
        </Providers>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["TravelAgency", "LocalBusiness", "Organization"],
            name: "Nongtung Adventure",
            url: "https://nongtung.com",
            logo: "https://nongtung.com/images/favicon.png",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["en", "th"],
              url: messengerUrl
            },
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <SpeedInsights />
      </body>
    </html>
  );
}
