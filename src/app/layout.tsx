import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Kanit, Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import "./globals.css";
import { Providers } from "@/app/providers";
import FloatingLineChat from "@/components/FloatingLineChat";

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
    // Brand
    "Nongtung", "Nongtung Adventure", "นองตึง",
    // Trekking (EN)
    "chiang mai trekking", "trekking in chiang mai", "chiang mai trail", "hiking chiang mai",
    "doi inthanon trekking", "doi suthep hiking", "chiang mai hiking tour",
    // Camping (EN)
    "camping chiang mai", "chiang mai camping trip", "overnight camping thailand",
    "camping tour chiang mai", "chiang mai camping experience",
    // Transport (EN)
    "chiang mai van rental", "private van chiang mai", "airport transfer chiang mai",
    "chauffeur service chiang mai", "van rental northern thailand",
    // Adventure (EN)
    "adventure chiang mai", "outdoor activities chiang mai", "nature tour chiang mai",
    "chiang mai outdoor adventure", "northern thailand adventure",
    // Corporate (EN)
    "team building chiang mai", "corporate retreat thailand", "company outing chiang mai",
    // Thai keywords
    "เดินป่าเชียงใหม่", "แคมป์ปิ้งเชียงใหม่", "ทริปเดินป่า", "รถตู้เช่าเชียงใหม่"
  ],
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
    title: "NONGTUNG: Bespoke Northern Thailand Adventures & Trekking",
    description: "Bespoke northern Thailand travel curated for those who seek the extraordinary. Trekking, camping, and private van services.",
    url: "https://nongtung.com",
    siteName: "NONGTUNG",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image-hq.png",
        width: 1200,
        height: 630,
        alt: "NONGTUNG Bespoke Adventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NONGTUNG: Bespoke Northern Thailand Adventures & Trekking",
    description: "Bespoke northern Thailand travel curated for those who seek the extraordinary.",
    images: ["/images/og-image-hq.png"],
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
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingLineChat />
        </Providers>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["TravelAgency", "LocalBusiness", "Organization"],
            "@id": "https://nongtung.com/#organization",
            name: "Nongtung Adventure",
            alternateName: "NONGTUNG",
            description: "Bespoke outdoor adventures and trekking experiences in Northern Thailand. We offer professionally guided trekking, camping, private van rental, and corporate teambuilding.",
            url: "https://nongtung.com",
            logo: "https://nongtung.com/images/favicon.png",
            image: "https://nongtung.com/images/og-image-hq.png",
            sameAs: [
              "https://www.facebook.com/Venturevibecnx",
              "https://www.instagram.com/nongtung",
              "https://lin.ee/pAbgN1M"
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              areaServed: ["TH", "Worldwide"],
              availableLanguage: ["en", "th"],
              url: "https://m.me/Venturevibecnx"
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chiang Mai",
              addressRegion: "Chiang Mai",
              addressCountry: "TH"
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "18.7883",
              longitude: "98.9853"
            },
            areaServed: {
              "@type": "Place",
              name: "Northern Thailand"
            },
            serviceType: ["Trekking Tours", "Camping Adventures", "Private Van Rental", "Corporate Teambuilding", "Equipment Rental"],
            priceRange: "$$",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "08:00",
              closes: "20:00"
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Adventure Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "TouristTrip",
                    name: "Trekking & Camping Trips",
                    description: "Guided multi-day adventures in Northern Thailand mountains"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Private Van Rental",
                    description: "Comfortable 9-seater vans with professional drivers"
                  }
                }
              ]
            }
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize dataLayer
              window.dataLayer = window.dataLayer || [];

              // Version Tracking
              console.log('✅ [Nongtung Tracking v1.2] Active');

              // Global tracking helper
              window.trackEvent = function(eventName, params) {
                params = params || {};
                console.log('🚀 [Nongtung Event Log]:', eventName, params);
                
                // 1. Google Analytics
                if (window.gtag) {
                  gtag('event', eventName, params);
                }
                
                // 2. Facebook Pixel Standard Mapping
                if (window.fbq) {
                  if (eventName === 'generate_lead') {
                    fbq('track', 'Lead', { content_name: params.text, ...params });
                  } else if (eventName === 'booking_intent') {
                    fbq('track', 'InitiateCheckout', { content_name: params.text, content_category: params.type, ...params });
                  } else {
                    fbq('trackCustom', eventName, params);
                  }
                }
                
                // 3. GTM DataLayer
                window.dataLayer.push({
                  event: eventName,
                  event_data: params
                });
              };

              // Optimized Click Listener
              document.addEventListener('click', function(e) {
                var target = e.target.closest('a, button');
                if (!target) return;

                var text = (target.innerText || target.ariaLabel || "").trim().toLowerCase();
                var href = (target.getAttribute('href') || "").toLowerCase();

                // 🎯 Debug point: console.log('🖱️ Click on:', text, '| href:', href);

                // A. Social Links
                if (href.includes('facebook.com') || href.includes('fb.me')) {
                  window.trackEvent('click_social', { platform: 'facebook', url: href });
                } else if (href.includes('instagram.com')) {
                  window.trackEvent('click_social', { platform: 'instagram', url: href });
                } else if (href.includes('tiktok.com')) {
                  window.trackEvent('click_social', { platform: 'tiktok', url: href });
                }

                // B. Lead & Contact (Added more triggers)
                var leadTriggers = ['contact', 'chat', 'ติดต่อ', 'inquire', 'สอบถาม', 'message', 'talk to', 'availability', 'concierge'];
                var isLead = leadTriggers.some(function(word) { return text.includes(word); }) || 
                             href.startsWith('mailto:') || 
                             href.startsWith('tel:') ||
                             href.includes('m.me');
                
                if (isLead) {
                  var method = 'button';
                  if (href.startsWith('mailto:')) method = 'email';
                  else if (href.startsWith('tel:')) method = 'phone';
                  else if (href.includes('m.me')) method = 'messenger';

                  window.trackEvent('generate_lead', { 
                    method: method, 
                    text: text,
                    destination: href 
                  });
                }

                // C. Booking Intent (Added more specific transport/trip triggers)
                var bookingTriggers = ['book', 'rent', 'select', 'จอง', 'เลือก', 'discover', 'experience', 'booking', 'now'];
                var isBooking = bookingTriggers.some(function(word) { return text.includes(word); });

                if (isBooking) {
                  // Intelligence for type
                  var transportWords = ['van', 'transport', 'car', 'รถ', 'fleet', 'chauffeur'];
                  var isTransport = transportWords.some(function(word) { return text.includes(word) || href.includes('transport'); });

                  window.trackEvent('booking_intent', { 
                    type: isTransport ? 'transport' : 'trip', 
                    text: text 
                  });
                }

                // D. Newsletter
                if (text === 'go' || text.includes('sign up') || text.includes('subscription')) {
                  window.trackEvent('newsletter_signup', { location: 'footer' });
                }
              }, true); // Use capture mode to bypass some stopPropagation cases
            `,
          }}
        />
      </body>
    </html>
  );
}
