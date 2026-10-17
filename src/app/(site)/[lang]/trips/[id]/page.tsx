import { getTrip, getTrips, getHomeSettings } from '@/lib/firestore-db';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n-config';
import { Metadata } from 'next';
import TripDetailClient from './TripDetailClient';

// ISR: Revalidate page at most once every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const trip = await getTrip(decodedId);

    if (!trip) return { title: 'Trip Not Found | Nongtung' };

    return {
        title: `${trip.title} | Nongtung`,
        description: trip.subtitle || trip.description?.substring(0, 160) || `Explore ${trip.title} with Nongtung. ${trip.duration} adventure in ${trip.location}.`,
        openGraph: {
            title: trip.title,
            description: trip.subtitle || trip.description?.substring(0, 160),
            images: [trip.image],
            type: 'website',
        },
        keywords: [trip.location, trip.type, 'trekking chiang mai', 'adventure thailand', trip.title, ...trip.tags],
        alternates: {
            canonical: `https://nongtung.com/trips/${decodedId}`
        }
    };
}

export default async function TripDetailPage({
    params,
}: {
    params: Promise<{ id: string; lang: Locale }>;
}) {
    const { id, lang } = await params;
    const decodedId = decodeURIComponent(id);
    const [trip, settings, dict, allTrips] = await Promise.all([
        getTrip(decodedId),
        getHomeSettings(),
        getDictionary(lang),
        getTrips(),
    ]);

    if (!trip) {
        notFound();
    }

    const facebookUrl = settings?.facebookUrl || "https://www.facebook.com/NONGTUNG.Adventure";
    const fbHandle = facebookUrl.includes('facebook.com/')
        ? facebookUrl.split('facebook.com/').pop()?.split('/').filter(Boolean)[0]
        : 'NONGTUNG.Adventure';
    const messengerUrl = `https://m.me/${fbHandle}`;

    // Filter related trips (exclude current)
    const relatedTrips = (allTrips || [])
        .filter((t) => t.id !== decodedId)
        .slice(0, 3);

    // Structured data for SEO (Product + TouristTrip + Breadcrumb)
    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': ['Product', 'TouristTrip'],
        name: trip.title,
        description: trip.description,
        image: trip.image,
        category: 'Travel/Adventure',
        touristType: trip.type === 'private' ? 'Private' : 'Group',
        itinerary: (trip.itinerary || []).map((it, idx) => ({
            '@type': 'TouristAttraction',
            name: it.title,
            description: it.desc,
        })),
        offers: {
            '@type': 'Offer',
            price: trip.price,
            priceCurrency: 'THB',
            availability: trip.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `https://nongtung.com/trips/${decodedId}`
        },
        brand: {
            '@type': 'Brand',
            name: 'Nongtung'
        }
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://nongtung.com'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Trips',
                item: 'https://nongtung.com/trips'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: trip.title,
                item: `https://nongtung.com/trips/${decodedId}`
            }
        ]
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <TripDetailClient
                trip={trip}
                lang={lang}
                dict={dict}
                facebookUrl={facebookUrl}
                messengerUrl={messengerUrl}
                relatedTrips={relatedTrips}
            />
        </>
    );
}
