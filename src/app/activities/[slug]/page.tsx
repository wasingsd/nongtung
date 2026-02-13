import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getActivity, getTrips } from '@/lib/firestore-db';
import { Metadata } from 'next';
import { Calendar, MapPin, Clock, Users, ChevronLeft, Share2, Tag, ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const activity = await getActivity(slug);

    if (!activity) return { title: 'Activity Not Found | Nongtung' };

    const title = activity.metaTitle || `${activity.title} | Nongtung Activities Chiang Mai`;
    const description = activity.metaDescription || activity.excerpt || activity.subtitle || 'Join this unique experience in Chiang Mai with Nongtung Adventure';

    return {
        title,
        description,
        keywords: activity.keywords?.length > 0 ? activity.keywords : ['Chiang Mai activity', 'Thailand experience', 'adventure tour', 'Nongtung'],
        openGraph: {
            title: activity.title,
            description,
            type: 'article',
            images: [{ url: activity.coverImage, width: 1200, height: 630 }],
        }
    };
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    upcoming: { bg: 'bg-blue-500', text: 'text-white', label: 'Upcoming' },
    ongoing: { bg: 'bg-green-500', text: 'text-white', label: 'Ongoing' },
    completed: { bg: 'bg-gray-400', text: 'text-white', label: 'Completed' },
    cancelled: { bg: 'bg-red-500', text: 'text-white', label: 'Cancelled' },
};

const TYPE_LABELS: Record<string, string> = {
    event: 'Event',
    workshop: 'Workshop',
    tour: 'Tour',
    seasonal: 'Seasonal',
    special: 'Special',
};

function formatDate(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const activity = await getActivity(slug);

    if (!activity) notFound();

    // Fetch related trips if any
    let relatedTrips: any[] = [];
    if (activity.relatedTripIds && activity.relatedTripIds.length > 0) {
        const allTrips = await getTrips();
        relatedTrips = allTrips.filter(t => activity.relatedTripIds.includes(t.id));
    }

    const isFull = (activity.maxParticipants ?? 0) > 0 && (activity.currentParticipants || 0) >= (activity.maxParticipants ?? 0);
    const isEnded = activity.status === 'completed' || activity.status === 'cancelled';

    return (
        <div className="fade-in bg-[#fdfdfb] min-h-screen pb-32 font-kanit">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden bg-forest">
                <Image
                    src={activity.coverImage || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600'}
                    alt={activity.title}
                    fill
                    className="object-cover opacity-80 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent"></div>

                {/* Back Button */}
                <div className="absolute top-28 left-6 md:left-12 z-30">
                    <Link href="/activities" className="group flex items-center bg-white/10 backdrop-blur-xl border border-white/20 pl-3 pr-5 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary hover:border-primary">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> All Activities
                    </Link>
                </div>

                {/* Status Badge */}
                <div className="absolute top-28 right-6 md:right-12 z-30">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_STYLES[activity.status]?.bg || 'bg-gray-500'} ${STATUS_STYLES[activity.status]?.text || 'text-white'}`}>
                        {STATUS_STYLES[activity.status]?.label || activity.status}
                    </span>
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="h-px w-8 bg-primary"></span>
                            <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">{TYPE_LABELS[activity.activityType] || activity.activityType}</span>
                            <span className="h-px w-8 bg-primary"></span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black font-heading text-white leading-tight tracking-tighter mb-6 drop-shadow-2xl">
                            {activity.title}
                        </h1>
                        {activity.subtitle && (
                            <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl mx-auto">{activity.subtitle}</p>
                        )}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em]">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info Bar */}
                        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                                {activity.startDate ? (
                                    <div className="flex items-center gap-2 text-sm font-bold text-forest">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        <span>{formatDate(activity.startDate)}</span>
                                        {activity.endDate && activity.endDate !== activity.startDate && (
                                            <span> - {formatDate(activity.endDate)}</span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                                        <Sparkles className="w-5 h-5" />
                                        <span>Available Anytime</span>
                                    </div>
                                )}
                                {activity.time && (
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        {activity.time}
                                    </div>
                                )}
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-black font-heading text-forest uppercase tracking-tight mb-6">About This Activity</h2>
                            <article className="prose prose-lg prose-forest max-w-none
                                prose-headings:font-black prose-headings:font-heading prose-headings:tracking-tight
                                prose-p:text-forest/80 prose-p:leading-relaxed
                                prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            ">
                                <div dangerouslySetInnerHTML={{ __html: activity.description }} />
                            </article>
                        </div>

                        {/* Highlights */}
                        {activity.highlights && activity.highlights.length > 0 && (
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-black font-heading text-forest uppercase tracking-tight mb-6">Highlights</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activity.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <span className="font-medium text-forest">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {activity.requirements && (
                            <div className="bg-amber-50 rounded-[2rem] p-6 md:p-8 border border-amber-100">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-black text-forest uppercase tracking-tight mb-2">What to Bring</h3>
                                        <p className="text-amber-800/80 font-medium">{activity.requirements}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {activity.gallery && activity.gallery.length > 0 && (
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-black font-heading text-forest uppercase tracking-tight mb-6">Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {activity.gallery.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                                            <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Booking Card */}
                        <div className="bg-forest rounded-[2.5rem] p-8 shadow-2xl text-white sticky top-28">
                            {(activity.price ?? 0) > 0 && (
                                <div className="mb-6">
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Price</div>
                                    <div className="text-4xl font-black text-primary">
                                        ฿{(activity.price ?? 0).toLocaleString()}
                                        {activity.priceNote && <span className="text-lg text-white/60 font-medium">/{activity.priceNote}</span>}
                                    </div>
                                </div>
                            )}

                            {(activity.maxParticipants ?? 0) > 0 && (
                                <div className="mb-6 p-4 bg-white/5 rounded-2xl">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-2 text-white/60">
                                            <Users className="w-4 h-4" /> Participants
                                        </span>
                                        <span className="font-black">
                                            {activity.currentParticipants || 0}/{activity.maxParticipants}
                                        </span>
                                    </div>
                                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${Math.min(((activity.currentParticipants || 0) / (activity.maxParticipants ?? 1)) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {isEnded ? (
                                <div className="bg-white/10 text-white/60 py-4 rounded-full font-black uppercase text-xs tracking-widest text-center">
                                    This Activity Has Ended
                                </div>
                            ) : isFull ? (
                                <div className="bg-red-500/20 text-red-300 py-4 rounded-full font-black uppercase text-xs tracking-widest text-center border border-red-500/30">
                                    Fully Booked
                                </div>
                            ) : (
                                <a
                                    href={activity.contactInfo || "https://www.facebook.com/Venturevibecnx"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-primary hover:bg-white hover:text-forest text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-lg text-center"
                                >
                                    Book Now / Register
                                </a>
                            )}

                            {/* Location */}
                            {activity.location && (
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Location</div>
                                            <div className="font-medium">{activity.location}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Organizer */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Organized By</div>
                                <div className="font-bold">{activity.organizer}</div>
                            </div>
                        </div>

                        {/* Tags */}
                        {activity.tags && activity.tags.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {activity.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-gray-50 rounded-full text-xs font-bold text-gray-500">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related Trips */}
                        {relatedTrips.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight mb-4">Related Trips</h3>
                                <div className="space-y-3">
                                    {relatedTrips.map(trip => (
                                        <Link
                                            key={trip.id}
                                            href={`/trips/${trip.id}`}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors group"
                                        >
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                                <Image src={trip.image} alt={trip.title} width={48} height={48} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="font-bold text-forest group-hover:text-primary transition-colors truncate">{trip.title}</div>
                                                <div className="text-xs text-gray-400">฿{trip.price?.toLocaleString()}</div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
