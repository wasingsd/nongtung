import Image from 'next/image';
import { CheckCircle, Bus, Phone, Info, Calendar, MapPin, Gauge } from 'lucide-react';
import { getTransport } from '@/lib/firestore-db';
import { Metadata } from 'next';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Private Van Rental Chiang Mai | Quality Transport',
    description: 'Bespoke private van rental and chauffeur services in Chiang Mai. Experience exceptional value, safety, and comfort for your Northern Thailand adventures.',
    keywords: [
        'chiang mai van rental', 'private van chiang mai', 'airport transfer chiang mai',
        'chauffeur service chiang mai', 'van rental northern thailand',
        'รถตู้เช่าเชียงใหม่', 'รถรับส่งสนามบินเชียงใหม่'
    ],
    openGraph: {
        title: 'Private Transport | Nongtung',
        description: 'Experience Northern Thailand with our quality fleet. Safety, comfort, and local expertise included.',
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'],
    },
};

export default async function TransportPage() {
    const transports = await getTransport();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: 'Nongtung Transport Services',
        description: 'High-quality private fleet and chauffeur services for Northern Thailand adventures.',
        areaServed: 'Chiang Mai, Thailand',
        availableLanguage: ['English', 'Thai'],
        priceRange: 'Top-tier',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Transport Fleet',
            itemListElement: transports.map(t => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Vehicle',
                    name: t.type,
                    image: t.image
                },
                priceSpecification: {
                    '@type': 'PriceSpecification',
                    price: t.price1Day,
                    priceCurrency: 'THB',
                    unitCode: 'DAY'
                }
            }))
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
                name: 'Transport Services',
                item: 'https://nongtung.com/transport'
            }
        ]
    };

    return (
        <div className="fade-in pb-32 bg-[#fdfdfb]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-forest">
                <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
                    fill
                    className="object-cover opacity-60 scale-105"
                    alt="Transport Hero"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-forest z-10"></div>

                <div className="absolute bottom-20 left-0 w-full z-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block drop-shadow-lg">Safe, Reliable & Private</span>
                            <h1 className="text-4xl md:text-7xl font-black font-heading text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                                PRIVATE<br /><span className="italic">JOURNEYS</span>
                            </h1>
                            <p className="text-xl text-white/70 mt-8 max-w-2xl font-medium leading-relaxed">
                                Explore Northern Thailand with peace of mind. Our well-maintained fleet and expert local drivers ensure your safety and comfort at every turn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Cards Section */}
            <section className="relative z-30 -mt-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {transports.map((car) => (
                            <div key={car.id} className="group flex flex-col h-full bg-white rounded-[3rem] overflow-hidden immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500">
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={car.image}
                                        alt={car.type}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-8">
                                        <h3 className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">{car.type}</h3>
                                    </div>
                                </div>

                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center justify-between p-6 bg-surface rounded-[2rem] border border-forest/5 group-hover:bg-white group-hover:shadow-soft transition-all duration-500">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm font-black text-xs">1D</div>
                                                <span className="font-bold text-forest/40 uppercase tracking-widest text-xs">Full Day</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-forest tracking-tighter">฿{(car.price1Day || 0).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-surface rounded-[2rem] border border-forest/5 group-hover:bg-white group-hover:shadow-soft transition-all duration-500">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm font-black text-xs">2D</div>
                                                <span className="font-bold text-forest/40 uppercase tracking-widest text-xs">Overnight</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-forest tracking-tighter">฿{(car.price2Day || 0).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {car.note && (
                                        <div className="mb-10 p-6 rounded-2xl bg-[#fffcf5] border border-orange-100/50">
                                            <p className="text-xs text-orange-800 font-bold italic flex items-start gap-3 leading-relaxed">
                                                <Info className="w-4 h-4 shrink-0 text-primary" />
                                                {car.note}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-auto">
                                        <a
                                            href={`https://m.me/Venturevibecnx?text=${encodeURIComponent(`สวัสดีครับ สนใจจองรถ: ${car.type}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-forest text-white py-5 rounded-full font-black text-[10px] tracking-[0.2em] text-center transition-all duration-300 shadow-lg hover:shadow-forest/30 uppercase group-hover:bg-primary"
                                        >
                                            Check Availability
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {transports.length === 0 && (
                        <div className="text-center py-32 bg-surface/30 rounded-[3rem] border-2 border-dashed border-forest/5">
                            <Bus className="w-16 h-16 mx-auto mb-6 text-forest/10" />
                            <p className="text-forest/30 font-black uppercase tracking-[0.3em] text-xs">Fleet currently on assignment</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Service Charter Section */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto bg-forest rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Bus className="w-[40rem] h-[40rem] -right-20 -bottom-20 absolute rotate-12" />
                        </div>
                        <div className="relative z-10">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 block">Our Service Pledge</span>
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-16 tracking-tighter">
                                TRANSPARENT & <span className="italic">RELIABLE</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-white/50">
                                <ul className="space-y-8">
                                    <li className="flex items-start gap-6">
                                        <div className="bg-white/5 p-3 rounded-2xl text-primary border border-white/10">
                                            <Gauge className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-lg tracking-tight mb-2">10 Hours Daily Service</p>
                                            <p className="text-sm font-medium leading-relaxed">Full day service begins at your preferred pickup time.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6">
                                        <div className="bg-white/5 p-3 rounded-2xl text-primary border border-white/10">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-lg tracking-tight mb-2">No Hidden Driver Fees</p>
                                            <p className="text-sm font-medium leading-relaxed">Driver's wage, accommodation (if needed), and simple meals are included.</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="space-y-8">
                                    <li className="flex items-start gap-6">
                                        <div className="bg-white/5 p-3 rounded-2xl text-primary border border-white/10">
                                            <Info className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-lg tracking-tight mb-2">Fuel at Cost</p>
                                            <p className="text-sm font-medium leading-relaxed">We believe in honesty. You only pay for the fuel you actually use.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-6">
                                        <div className="bg-white/5 p-3 rounded-2xl text-primary border border-white/10">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-lg tracking-tight mb-2">Mountain Experts</p>
                                            <p className="text-sm font-medium leading-relaxed">Our drivers are skilled in navigating the winding northern roads safely.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-20 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center gap-10">
                                <a
                                    href="https://m.me/Venturevibecnx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-forest transition-all shadow-xl shadow-primary/20"
                                >
                                    Book via Concierge
                                </a>
                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">We are here to help 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
