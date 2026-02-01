import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/adminnongtung/'], // Prevent crawling of admin pages
            },
        ],
        sitemap: 'https://nongtung.com/sitemap.xml',
    }
}
