import { MetadataRoute } from 'next'
import { getTrips, getArticles, getActivities } from '@/lib/firestore-db'
import { i18n } from '@/i18n-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nongtung.com'
    const locales = i18n.locales

    // Fetch dynamic data
    const [trips, articles, activities] = await Promise.all([
        getTrips(),
        getArticles(),
        getActivities()
    ])

    const entries: MetadataRoute.Sitemap = []

    // Helper to generate alternates
    const createAlternates = (path: string) => {
        const languages: Record<string, string> = {}
        for (const loc of locales) {
            languages[loc] = `${baseUrl}/${loc}${path}`
        }
        languages['x-default'] = `${baseUrl}/th${path}`
        return { languages }
    }

    // Static pages
    const staticPaths = [
        { path: '', priority: 1.0, freq: 'daily' as const },
        { path: '/trips', priority: 0.95, freq: 'daily' as const },
        { path: '/transport', priority: 0.9, freq: 'weekly' as const },
        { path: '/activities', priority: 0.85, freq: 'weekly' as const },
        { path: '/articles', priority: 0.85, freq: 'weekly' as const },
        { path: '/rental', priority: 0.8, freq: 'weekly' as const },
        { path: '/corporate', priority: 0.75, freq: 'monthly' as const },
    ]

    for (const item of staticPaths) {
        for (const locale of locales) {
            entries.push({
                url: `${baseUrl}/${locale}${item.path}`,
                lastModified: new Date(),
                changeFrequency: item.freq,
                priority: item.priority,
                alternates: createAlternates(item.path),
            })
        }
    }

    // Dynamic Trip Pages
    for (const trip of trips) {
        const path = `/trips/${trip.id}`
        for (const locale of locales) {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.85,
                alternates: createAlternates(path),
            })
        }
    }

    // Dynamic Article Pages
    for (const article of articles) {
        const path = `/articles/${article.slug}`
        for (const locale of locales) {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: article.date ? new Date(article.date) : new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: createAlternates(path),
            })
        }
    }

    // Dynamic Activity Pages
    for (const activity of activities) {
        const path = `/activities/${activity.slug}`
        for (const locale of locales) {
            entries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(activity.updatedAt || activity.createdAt || Date.now()),
                changeFrequency: 'weekly',
                priority: 0.8,
                alternates: createAlternates(path),
            })
        }
    }

    return entries
}
