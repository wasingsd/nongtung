import Image from 'next/image';
import { Search, AlertCircle, ShoppingCart, Package, ShieldCheck, Zap } from 'lucide-react';
import { getRentals } from '@/lib/firestore-db';
import { Metadata } from 'next';

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

export default async function RentalPage() {
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
                <div className="bg-white rounded-[3rem] immersive-shadow p-10 md:p-12 mb-16 border border-forest/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex gap-10">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-forest">Deeply Sanitized</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-forest">Pro-Level</span>
                            </div>
                        </div>
                        <div className="flex w-full md:w-auto bg-surface rounded-full p-1 border border-forest/5 group focus-within:border-primary/50 transition-all">
                            <input
                                type="text"
                                placeholder="Search the armory..."
                                className="bg-transparent px-6 py-2 text-xs font-bold w-full md:w-64 focus:outline-none placeholder-forest/20"
                            />
                            <button className="bg-forest text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-all"><Search className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>

                {rentals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {rentals.map(g => (
                            <div key={g.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500 p-3">
                                <div className="relative h-64 bg-surface rounded-[2rem] overflow-hidden p-8 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                                    {g.image ? (
                                        <Image
                                            src={g.image}
                                            alt={g.name}
                                            fill
                                            className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 p-6"
                                        />
                                    ) : (
                                        <Package className="w-16 h-16 text-forest/10" />
                                    )}
                                    <div className={`absolute top-4 right-4 text-[9px] font-black px-3 py-1.5 rounded-xl shadow-soft uppercase tracking-widest ${(g.stock || 0) > 5 ? 'bg-green-50 text-green-600' :
                                        (g.stock || 0) > 0 ? 'bg-orange-50 text-orange-600' :
                                            'bg-red-50 text-red-600'
                                        }`}>
                                        Stock: {g.stock || 0}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-forest font-heading mb-2 line-clamp-1 tracking-tighter">{g.name}</h3>
                                    <p className="text-xs text-forest/40 font-medium mb-6 line-clamp-2 leading-relaxed">{g.description || 'Professional grade equipment for rugged use.'}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-forest/5">
                                        <div className="text-forest font-black text-lg">฿{(g.price || 0).toLocaleString()} <span className="text-[10px] text-forest/20 uppercase tracking-widest font-black ml-1">/{g.unit || 'Day'}</span></div>
                                        {(g.stock || 0) > 0 ? (
                                            <a
                                                href={`https://m.me/Venturevibecnx?text=${encodeURIComponent(`สวัสดีครับ สนใจเช่า: ${g.name}`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full flex items-center justify-center bg-forest text-white hover:bg-primary shadow-lg hover:shadow-primary/30 transition-all"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="w-10 h-10 rounded-full flex items-center justify-center bg-surface text-gray-200 cursor-not-allowed">
                                                <ShoppingCart className="w-4 h-4" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-surface/30 rounded-[3rem] border-2 border-dashed border-forest/5">
                        <Package className="w-16 h-16 mx-auto mb-6 text-forest/10" />
                        <p className="text-forest/30 font-black uppercase tracking-[0.3em] text-xs">Armory currently undergoing maintenance</p>
                    </div>
                )}

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
