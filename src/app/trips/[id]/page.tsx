import { getTrips } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Clock, Users, CheckCircle, Shield, AlertCircle, ChevronLeft } from 'lucide-react';

export function generateStaticParams() {
    const TRIPS = getTrips();
    return TRIPS.map((trip) => ({
        id: trip.id,
    }));
}

export default async function TripDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const TRIPS = getTrips();
    const trip = TRIPS.find((t) => t.id === id);

    if (!trip) {
        notFound();
    }

    // Default fallbacks if fields are missing (for old data)
    const highlights = trip.highlights || [];
    const itinerary = trip.itinerary || [];
    const whatsIncluded = trip.whatsIncluded || [];
    const notIncluded = trip.notIncluded || [];

    return (
        <div className="fade-in pb-20">
            {/* Breadcrumb / Back Navigation */}
            <div className="bg-surface py-4">
                <div className="container mx-auto px-6">
                    <Link href="/trips" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to All Trips
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Column: Main Content */}
                    <div className="lg:w-2/3">
                        {/* Hero Image */}
                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-8">
                            <Image
                                src={trip.image}
                                alt={trip.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="bg-white/90 backdrop-blur text-forest font-bold px-3 py-1 rounded text-sm uppercase tracking-wide shadow-sm">
                                    {trip.duration}
                                </span>
                                <span className={`px-3 py-1 rounded text-sm font-bold uppercase tracking-wide shadow-sm text-white ${trip.type === 'private' ? 'bg-primary-deep' : 'bg-accent'}`}>
                                    {trip.type} Group
                                </span>
                            </div>
                        </div>

                        {/* Title & Stats */}
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-5xl font-bold font-heading text-forest mb-4 leading-tight">{trip.title}</h1>
                            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-gray-600 border-b border-gray-100 pb-8">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span>{trip.location || 'Chiang Mai, Thailand'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span>{trip.duration} Adventure</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    <span>Min 2 Pax</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-primary" />
                                    <span>Difficulty: <span className="font-bold text-forest">{trip.difficulty}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold font-heading text-forest mb-4">Overview</h2>
                            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                                {trip.description || 'No description available.'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {highlights.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-surface p-4 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm text-forest-light font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Gallery */}
                        {(trip.gallery && trip.gallery.length > 0) && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold font-heading text-forest mb-4">Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {trip.gallery.map((img, i) => (
                                        <div key={i} className="relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                                            <Image src={img} alt={`${trip.title} gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Itinerary */}
                        {itinerary.length > 0 && (
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold font-heading text-forest mb-6">Itinerary</h2>
                                <div className="space-y-6">
                                    {itinerary.map((day, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:bg-primary transition-colors">
                                                    {i + 1}
                                                </div>
                                                {i !== itinerary.length - 1 && <div className="w-px h-full bg-gray-200 my-2"></div>}
                                            </div>
                                            <div className="pb-6">
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">{day.day}</span>
                                                <h3 className="text-lg font-bold text-forest mb-2">{day.title}</h3>
                                                <p className="text-sm text-gray-500 leading-relaxed">{day.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Included / Excluded */}
                        <section className="mb-12 bg-surface rounded-2xl p-8">
                            <h2 className="text-2xl font-bold font-heading text-forest mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                                {whatsIncluded.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-line" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            {notIncluded.length > 0 && (
                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-2 font-bold text-orange-400">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            <span>Not Included:</span>
                                        </div>
                                        <ul className="list-disc list-inside pl-6">
                                            {notIncluded.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Booking Card (Sticky) */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-forest p-6 text-white text-center">
                                    <p className="text-sm opacity-80 mb-1">Starting Price</p>
                                    <div className="text-4xl font-bold font-heading">฿{trip.price.toLocaleString()}</div>
                                    <p className="text-xs opacity-60 mt-2">Per Person</p>
                                </div>

                                <div className="p-8">
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-3">
                                            <span className="text-gray-500">Status</span>
                                            <span className={`font-bold uppercase ${trip.status === 'available' ? 'text-line' : 'text-orange-500'}`}>{trip.status}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-3">
                                            <span className="text-gray-500">Duration</span>
                                            <span className="font-bold text-forest">{trip.duration}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-3">
                                            <span className="text-gray-500">Group Type</span>
                                            <span className="font-bold text-forest">{trip.type === 'join' ? 'Join-in Group' : 'Private Group'}</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-primary hover:bg-primary-deep text-white font-bold py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transition-all mb-4 transform hover:-translate-y-1">
                                        Book This Trip
                                    </button>

                                    <button className="w-full bg-surface hover:bg-gray-200 text-forest font-bold py-3 rounded-lg uppercase text-sm transition-all flex items-center justify-center gap-2">
                                        <Shield className="w-4 h-4" /> Ask a Question
                                    </button>

                                    <p className="text-center text-xs text-gray-400 mt-6">
                                        No credit card required. Free cancellation up to 7 days before trip.
                                    </p>
                                </div>
                            </div>

                            {/* Support Box */}
                            <div className="mt-8 bg-surface rounded-xl p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Need Help?</p>
                                    <p className="font-bold text-forest cursor-pointer hover:text-primary transition-colors">Contact Support Team</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
