import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://nongtung.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/adminnongtung/'], // Prevent crawling of admin pages
            },
            {
                // Explicitly allow AI bots for Generative Engine Optimization (GEO)
                userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
                allow: '/',
                disallow: ['/adminnongtung/'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
