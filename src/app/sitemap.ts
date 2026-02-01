import { MetadataRoute } from 'next'
import { getTrips, getTransport } from '@/lib/firestore-db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nongtung.com'

    // Fetch dynamic data
    const [trips, transports] = await Promise.all([
        getTrips(),
        getTransport()
    ])

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/trips`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/transport`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/rental`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    // Dynamic Trip Pages
    const tripPages: MetadataRoute.Sitemap = trips.map((trip) => ({
        url: `${baseUrl}/trips/${trip.id}`,
        lastModified: new Date(), // Ideally use trip.updatedAt if available
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    // Dynamic Transport Detail Pages (if they exist, currently transport page lists all)
    // For now, let's just stick to the main listing and specific trip details
    // unless transport has detail pages too.

    return [...staticPages, ...tripPages]
}
