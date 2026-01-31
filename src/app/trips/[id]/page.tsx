import { getTrips, getTrip } from '@/lib/firestore-db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Users, CheckCircle, MessageCircle, BarChart, AlertCircle, ChevronLeft, Shield } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';
import { Metadata } from 'next';

export async function generateStaticParams() {
    const TRIPS = await getTrips();
    return TRIPS.map((trip) => ({
        id: trip.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const trip = await getTrip(decodedId);

    if (!trip) return { title: 'Trip Not Found | Nongtung' };

    return {
        title: `${trip.title} | Nongtung`,
        description: trip.description?.substring(0, 160) || `Explore ${trip.title} with Nongtung. ${trip.duration} adventure in ${trip.location}.`,
        openGraph: {
            title: trip.title,
            description: trip.description?.substring(0, 160),
            images: [trip.image],
            type: 'website',
        },
        keywords: [trip.location, trip.type, 'trekking chiang mai', 'adventure thailand', trip.title, ...trip.tags],
        alternates: {
            canonical: `https://nongtung.com/trips/${decodedId}`
        }
    };
}

export default async function TripDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    console.log('Fetching Public Trip Page for ID:', decodedId);
    const trip = await getTrip(decodedId);

    if (!trip) {
        notFound();
    }

    // Default fallbacks if fields are missing (for old data)
    const highlights = trip.highlights || [];
    const itinerary = trip.itinerary || [];
    const whatsIncluded = trip.whatsIncluded || [];
    const notIncluded = trip.notIncluded || [];

    // JSON-LD for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: trip.title,
        description: trip.description,
        image: trip.image,
        offers: {
            '@type': 'Offer',
            price: trip.price,
            priceCurrency: 'THB',
            availability: trip.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `https://nongtung.com/trips/${decodedId}`
        },
        brand: {
            '@type': 'Brand',
            name: 'Nongtung'
        }
    };

    return (
        <div className="fade-in pb-32 bg-[#fdfdfb]">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
                <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>

                {/* Back Link Overlay */}
                <div className="absolute top-8 left-8 z-20">
                    <Link href="/trips" className="inline-flex items-center text-sm font-bold text-white/90 hover:text-white transition-all bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Trips
                    </Link>
                </div>

                {/* Hero Content Overlay */}
                <div className="absolute bottom-16 left-0 w-full z-10">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <div className="flex gap-3 mb-6">
                                <span className="bg-primary text-white font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-xl">
                                    {trip.duration} TRIP
                                </span>
                                <span className="bg-white/20 backdrop-blur-md text-white font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] border border-white/20">
                                    {trip.type} group
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-7xl font-black font-heading text-white leading-[1.05] tracking-tighter drop-shadow-2xl uppercase italic">
                                {trip.title}
                            </h1>
                            {trip.subtitle && (
                                <p className="text-lg md:text-2xl font-medium text-white/80 mt-4 tracking-tight drop-shadow-lg max-w-2xl">
                                    {trip.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">

                    {/* Left Column: The Journal Content */}
                    <div className="lg:w-2/3 bg-white p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] immersive-shadow border border-forest/5">

                        {/* Highlights Row */}
                        <div className="flex flex-wrap gap-6 md:gap-12 mb-8 md:mb-16 border-b border-forest/5 pb-6 md:pb-10">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-forest/30 uppercase tracking-widest">LOCATION</span>
                                <span className="text-forest font-bold">{trip.location || 'Chiang Mai, TH'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-forest/30 uppercase tracking-widest">LEVEL</span>
                                <span className="text-forest font-bold">{trip.difficulty}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-forest/30 uppercase tracking-widest">PACE</span>
                                <span className="text-forest font-bold text-xs md:text-base">Standard Adventure</span>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        {(trip.gallery && trip.gallery.length > 0) && (
                            <section className="mb-10 md:mb-20">
                                <h2 className="text-2xl md:text-3xl font-black font-heading text-forest mb-6 md:mb-8 tracking-tighter">Photo Gallery</h2>
                                <ImageLightbox images={trip.gallery} mainImage={trip.image} />
                            </section>
                        )}

                        {/* Story/Description */}
                        <section className="mb-10 md:mb-20">
                            <h2 className="text-2xl md:text-3xl font-black font-heading text-forest mb-6 md:mb-8 tracking-tighter">Trip Details</h2>
                            <div className="prose prose-forest max-w-none">
                                <p className="text-sm md:text-xl text-forest/70 leading-relaxed whitespace-pre-line font-medium italic mb-6 md:mb-10 border-l-4 border-primary/20 pl-5 md:pl-8">
                                    {trip.description || 'No description available.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
                                {highlights.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 md:p-6 rounded-2xl bg-surface/50 border border-forest/5 hover:border-primary/20 transition-all group">
                                        <div className="bg-white p-2 rounded-xl shadow-sm text-primary group-hover:scale-110 transition-transform">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs md:text-sm text-forest-light font-bold leading-tight mt-1">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Journal Timeline (Itinerary) - Optimized for Mobile */}
                        {itinerary.length > 0 && (
                            <section className="mb-10 md:mb-20">
                                <h2 className="text-2xl md:text-3xl font-black font-heading text-forest mb-8 md:mb-12 tracking-tighter">Plan for the Trip</h2>
                                <div className="space-y-6 md:space-y-12 relative before:absolute before:left-4 md:before:left-5 before:top-2 before:bottom-0 before:w-px before:bg-forest/5">
                                    {itinerary.map((day, i) => (
                                        <div key={i} className="relative pl-12 md:pl-16 group">
                                            <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-4 border-surface text-forest flex items-center justify-center font-black text-[10px] md:text-xs shadow-soft z-10 group-hover:border-primary group-hover:text-primary transition-all">
                                                {i + 1}
                                            </div>
                                            <div className="bg-surface/30 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-forest/5 group-hover:bg-white group-hover:immersive-shadow transition-all duration-500">
                                                <span className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 md:mb-2 block">{day.day}</span>
                                                <h3 className="text-base md:text-2xl font-black text-forest mb-2 md:mb-3 tracking-tighter uppercase italic">{day.title}</h3>
                                                <p className="text-xs md:text-lg text-forest/50 leading-relaxed font-medium whitespace-pre-line">{day.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Inclusions */}
                        <section className="bg-forest text-white/90 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16">
                            <h2 className="text-2xl md:text-3xl font-black font-heading text-white mb-6 md:mb-10 tracking-tighter">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-4">
                                {whatsIncluded.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 md:gap-4 text-white/70">
                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary shadow-glow"></div>
                                        <span className="text-sm md:text-lg font-bold tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {notIncluded.length > 0 && (
                                <div className="mt-10 md:mt-16 pt-8 md:pt-10 border-t border-white/5">
                                    <p className="text-xs font-black text-white/30 uppercase tracking-widest mb-4 md:mb-6">NOT INCLUDED</p>
                                    <div className="flex flex-wrap gap-3 md:gap-4">
                                        {notIncluded.map((item, i) => (
                                            <span key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-white/50">
                                                × {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Premium Concierge Card */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28">
                            <div className="bg-white rounded-[2.5rem] immersive-shadow border border-forest/5 overflow-hidden p-8 md:p-10">
                                <div className="text-center mb-10">
                                    <span className="text-[10px] font-black text-forest/30 uppercase tracking-[0.3em] block mb-2">BOOKING</span>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-sm font-black text-forest/40">THB</span>
                                        <span className="text-3xl md:text-6xl font-black font-heading text-forest tracking-tighter">
                                            {trip.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-forest/30 mt-2 block">Price per person</span>
                                </div>

                                <div className="space-y-4 mb-10 bg-surface/50 p-6 rounded-3xl border border-forest/5">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs font-bold text-forest/40 uppercase tracking-widest">Availability</span>
                                        <span className="text-xs font-black text-line uppercase tracking-widest">{trip.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-xs font-bold text-forest/40 uppercase tracking-widest">Group Choice</span>
                                        <span className="text-xs font-black text-forest uppercase tracking-widest">{trip.type}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={`https://m.me/Venturevibecnx?text=${encodeURIComponent(`สวัสดีครับ สนใจจองทริป: ${trip.title}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-primary hover:bg-forest text-white text-center font-black py-5 rounded-full uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
                                    >
                                        Booking
                                    </a>

                                    <a
                                        href={`https://m.me/Venturevibecnx?text=${encodeURIComponent(`สวัสดีครับ มีคำถามเกี่ยวกับทริป: ${trip.title}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-surface hover:bg-white text-forest text-center font-black py-4 rounded-full uppercase text-[10px] tracking-[0.2em] transition-all border border-forest/5 flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Message Us
                                    </a>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-forest/20 uppercase tracking-[0.2em]">
                                    <Shield className="w-3 h-3" /> SAFE & DIRECT
                                </div>
                            </div>

                            {/* Help Box */}
                            <a
                                href="https://m.me/Venturevibecnx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 bg-forest rounded-3xl p-8 flex items-center gap-6 hover:bg-primary transition-all duration-500 group shadow-xl"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shadow-soft group-hover:scale-110 group-hover:bg-white group-hover:text-primary transition-all">
                                    <MessageCircle className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">NEED HELP?</p>
                                    <p className="text-lg font-black text-white tracking-tighter">Talk to our Team</p>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
