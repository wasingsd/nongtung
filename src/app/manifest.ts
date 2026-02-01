import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nongtung Adventure',
        short_name: 'Nongtung',
        description: 'Bespoke northern Thailand travel curated for those who seek the extraordinary.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2C4F3C',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
