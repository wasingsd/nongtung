import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/adminnongtung/',
        },
        sitemap: 'https://nongtung.com/sitemap.xml',
    };
}
