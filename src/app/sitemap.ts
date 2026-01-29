import { MetadataRoute } from 'next';
import { getTrips } from '@/lib/firestore-db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nongtung.com';

    // Fetch dynamic trips
    const trips = await getTrips();
    const tripEntries = trips.map((trip) => ({
        url: `${baseUrl}/trips/${trip.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Static pages
    const staticPages = [
        '',
        '/trips',
        '/transport',
        '/rental',
        '/corporate',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.9,
    }));

    return [...staticPages, ...tripEntries];
}
