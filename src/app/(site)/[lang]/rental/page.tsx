import Image from 'next/image';
import { AlertCircle } from 'lucide-react';
import { getRentals } from '@/lib/firestore-db';
import { Metadata } from 'next';
import RentalCatalog from '@/components/RentalCatalog';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Camping Gear Rental Chiang Mai | Equipment Rental',
    description: 'Hygiene-first camping gear rental in Chiang Mai. Complete camping sets (K2, Coleman), tents, sleeping bags, and trekking equipment. 100% sanitized after every use.',
    keywords: [
        'camping gear rental chiang mai', 'tent rental chiang mai', 'camping equipment rental thailand',
        'outdoor gear rental chiang mai', 'เช่าอุปกรณ์แคมป์ปิ้ง', 'เช่าเต็นท์เชียงใหม่'
    ],
    openGraph: {
        title: 'Camping Gear Rental | Nongtung',
        description: 'Clean & Complete Camping Sets in Chiang Mai. Rent tents, glamping gear, and stoves.',
    },
};

type Props = {
    params: Promise<{ lang: string }>;
};

export default async function RentalPage({ params }: Props) {
    const { lang } = await params;
    const rentals = await getRentals();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Nongtung Rental Shop',
        description: 'Professional grade camping and adventure equipment rental.',
        areaServed: 'Chiang Mai, Thailand',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Camping Equipment',
            itemListElement: rentals.map(r => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Product',
                    name: r.name,
                    image: r.image,
                    description: r.description
                },
                priceSpecification: {
                    '@type': 'PriceSpecification',
                    price: r.price,
                    priceCurrency: 'THB',
                    unitCode: r.unit === 'Day' ? 'DAY' : 'C62'
                },
                availability: (r.stock || 0) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
            }))
        }
    };

    return (
        <div className="fade-in bg-[#fdfdfb] min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Immersive Header */}
            <div className="relative bg-forest pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600')] bg-cover bg-center grayscale"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Clean & Complete Sets</span>
                        <h2 className="text-4xl md:text-7xl font-black font-heading text-white mb-6 tracking-tighter leading-none">
                            RENTAL <span className="italic text-primary">GEAR & SETS</span>
                        </h2>
                        <p className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
                            Professional camping sets (K2, Coleman) and trekking essentials. Meticulously cleaned and sanitized for your hygiene and comfort.
                        </p>
                    </div>
                </div>
            </div>

            {/* Inventory & Search Section */}
            <div className="container mx-auto px-6 -mt-10 relative z-20 pb-32">
                <RentalCatalog rentals={rentals} lang={lang} />

                {/* Rental Conditions: The Charter */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px bg-forest/5 flex-grow"></div>
                        <h3 className="font-black text-forest uppercase tracking-[0.4em] text-xs flex items-center gap-3">
                            <AlertCircle className="w-4 h-4 text-primary" />
                            Rental Charter
                        </h3>
                        <div className="h-px bg-forest/5 flex-grow"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            { title: 'Security Deposit', desc: 'A 50% deposit of equipment value is required to secure your reservation.' },
                            { title: 'Late Return Policy', desc: 'Overdue returns are subject to a daily late fee equal to one full day rental.' },
                            { title: 'Damage Responsibility', desc: 'Renters are fully liable for the repair or replacement cost of damaged items.' },
                            { title: 'Local Logistics', desc: 'Complimentary pick-up and drop-off available within Chiang Mai city limits.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="text-primary font-black text-xl italic opacity-30">0{i + 1}</div>
                                <div>
                                    <h4 className="font-black text-forest tracking-tight text-lg mb-2">{item.title}</h4>
                                    <p className="text-sm text-forest/40 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
