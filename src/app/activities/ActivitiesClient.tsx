'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Activity } from '@/types/types';
import { Calendar, MapPin, ArrowRight, Users, Clock, Sparkles, Filter, Compass, CalendarDays } from 'lucide-react';

interface ActivitiesClientProps {
    activities: Activity[];
}

type FilterType = 'all' | 'activities' | 'events';

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    upcoming: { bg: 'bg-blue-500', text: 'text-white', label: 'Upcoming' },
    ongoing: { bg: 'bg-green-500', text: 'text-white', label: 'Ongoing' },
    completed: { bg: 'bg-gray-400', text: 'text-white', label: 'Completed' },
    cancelled: { bg: 'bg-red-500', text: 'text-white', label: 'Cancelled' },
};

const TYPE_ICONS: Record<string, string> = {
    event: '🎉',
    workshop: '🛠️',
    tour: '🚐',
    seasonal: '🌸',
    special: '⭐',
};

function formatDate(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

function formatShortDate(dateStr: string): string {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch {
        return dateStr;
    }
}

export default function ActivitiesClient({ activities }: ActivitiesClientProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    // Separate activities (no dates) from events (with dates)
    const alwaysAvailable = activities.filter(a => !a.startDate && (a.status === 'upcoming' || a.status === 'ongoing'));
    const events = activities.filter(a => a.startDate && (a.status === 'upcoming' || a.status === 'ongoing'));
    const pastItems = activities.filter(a => a.status === 'completed');

    // Filter logic
    const getFilteredItems = () => {
        if (filter === 'activities') return alwaysAvailable;
        if (filter === 'events') return events;
        return [...alwaysAvailable, ...events];
    };

    const filteredItems = getFilteredItems();

    const filterButtons = [
        { key: 'all' as FilterType, label: 'All', icon: Filter, count: alwaysAvailable.length + events.length },
        { key: 'activities' as FilterType, label: 'Activities', icon: Compass, count: alwaysAvailable.length },
        { key: 'events' as FilterType, label: 'Events', icon: CalendarDays, count: events.length },
    ];

    return (
        <div className="fade-in bg-gradient-to-b from-[#fdfdfb] to-gray-50 min-h-screen pb-32">

            {/* Hero Section */}
            <div className="relative pt-28 pb-32 px-6 bg-gradient-to-br from-forest via-forest to-emerald-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')]"></div>
                </div>

                {/* Decorative Blurs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>

                <div className="container mx-auto text-center relative z-10 max-w-4xl">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2.5 rounded-full mb-8">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Explore & Experience</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-heading text-white mb-6 tracking-tight leading-[1.1]">
                        Activities <span className="text-primary">&</span> Events
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Discover unique adventures and seasonal experiences in Chiang Mai.
                        From thrilling outdoor activities to special cultural events.
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-black text-primary">{alwaysAvailable.length}</div>
                            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Activities</div>
                        </div>
                        <div className="w-px h-12 bg-white/10"></div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-primary">{events.length}</div>
                            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Events</div>
                        </div>
                    </div>
                </div>

                {/* Wave Decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" className="w-full">
                        <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,75 1440,60 L1440,120 L0,120 Z" fill="#fdfdfb" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-8 relative z-20">

                {/* Filter Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-2xl p-2 shadow-xl border border-gray-100 gap-2">
                        {filterButtons.map(btn => (
                            <button
                                key={btn.key}
                                onClick={() => setFilter(btn.key)}
                                className={`
                                    flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all
                                    ${filter === btn.key
                                        ? 'bg-forest text-white shadow-lg'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-forest'
                                    }
                                `}
                            >
                                <btn.icon className="w-4 h-4" />
                                <span>{btn.label}</span>
                                <span className={`
                                    px-2 py-0.5 rounded-full text-xs font-black
                                    ${filter === btn.key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}
                                `}>
                                    {btn.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Activities Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, idx) => (
                            <Link
                                href={`/activities/${item.slug}`}
                                key={item.slug}
                                className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 transform hover:-translate-y-2"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.coverImage || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                    {/* Top Badges */}
                                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${STATUS_STYLES[item.status]?.bg || 'bg-gray-500'} ${STATUS_STYLES[item.status]?.text || 'text-white'}`}>
                                                {STATUS_STYLES[item.status]?.label || item.status}
                                            </span>
                                        </div>
                                        <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                            {TYPE_ICONS[item.activityType] || '📌'} {item.activityType === 'event' || item.startDate ? 'Event' : 'Activity'}
                                        </span>
                                    </div>

                                    {/* Price Badge */}
                                    {(item.price ?? 0) > 0 && (
                                        <div className="absolute bottom-4 right-4 bg-primary text-white px-5 py-2.5 rounded-xl shadow-lg">
                                            <span className="text-lg font-black">฿{(item.price ?? 0).toLocaleString()}</span>
                                            {item.priceNote && <span className="text-white/70 text-sm font-medium">/{item.priceNote}</span>}
                                        </div>
                                    )}

                                    {/* Date Badge for Events */}
                                    {item.startDate && (
                                        <div className="absolute bottom-4 left-4 bg-white text-forest px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <span className="font-bold text-sm">{formatShortDate(item.startDate)}</span>
                                            {item.endDate && item.endDate !== item.startDate && (
                                                <>
                                                    <span className="text-gray-300">→</span>
                                                    <span className="font-bold text-sm">{formatShortDate(item.endDate)}</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-grow p-6 flex flex-col">
                                    {/* Availability / Time */}
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        {!item.startDate ? (
                                            <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full">
                                                <Sparkles className="w-3 h-3" /> Available Now
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-full">
                                                <CalendarDays className="w-3 h-3" /> Scheduled Event
                                            </span>
                                        )}
                                        {item.time && (
                                            <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                                <Clock className="w-3 h-3" /> {item.time}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black font-heading text-forest group-hover:text-primary transition-colors leading-tight mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Subtitle */}
                                    {item.subtitle && (
                                        <p className="text-sm text-gray-500 font-medium mb-4 line-clamp-2">{item.subtitle}</p>
                                    )}

                                    {/* Location */}
                                    {item.location && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                    )}

                                    {/* Participants - Only show for Events (with dates) */}
                                    {item.startDate && (item.maxParticipants ?? 0) > 0 && (
                                        <div className="flex items-center gap-2 text-xs font-bold text-forest/60 mb-4">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>
                                                {item.currentParticipants || 0}/{item.maxParticipants} spots
                                                {(item.currentParticipants || 0) >= (item.maxParticipants ?? 0) && (
                                                    <span className="ml-2 text-red-500 font-black">(Fully Booked)</span>
                                                )}
                                            </span>
                                            {/* Progress Bar */}
                                            <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden ml-2">
                                                <div
                                                    className="h-full bg-primary rounded-full transition-all"
                                                    style={{ width: `${Math.min(((item.currentParticipants || 0) / (item.maxParticipants || 1)) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Spacer */}
                                    <div className="flex-grow"></div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="flex items-center text-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </span>
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex items-center gap-1">
                                                {item.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-gray-50 rounded-md text-[10px] font-bold text-gray-400">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-[3rem] p-16 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            {filter === 'events' ? (
                                <CalendarDays className="w-10 h-10 text-gray-300" />
                            ) : filter === 'activities' ? (
                                <Compass className="w-10 h-10 text-gray-300" />
                            ) : (
                                <Sparkles className="w-10 h-10 text-gray-300" />
                            )}
                        </div>
                        <h3 className="text-2xl font-black font-heading text-forest mb-4">
                            No {filter === 'all' ? 'Items' : filter === 'events' ? 'Events' : 'Activities'} Found
                        </h3>
                        <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
                            {filter === 'events'
                                ? 'No upcoming events at the moment. Check back soon for new scheduled events!'
                                : filter === 'activities'
                                    ? 'No activities available right now. We\'re always adding new experiences!'
                                    : 'No activities or events available. Follow us to stay updated!'}
                        </p>
                        {filter !== 'all' && (
                            <button
                                onClick={() => setFilter('all')}
                                className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-primary transition-all"
                            >
                                <Filter className="w-4 h-4" /> Show All
                            </button>
                        )}
                    </div>
                )}

                {/* Past Events Section */}
                {pastItems.length > 0 && filter === 'all' && (
                    <section className="mt-24">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black font-heading text-forest uppercase tracking-tight">Past Events</h2>
                                <p className="text-gray-400 text-sm font-medium">Previous adventures & experiences</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {pastItems.map((item) => (
                                <Link
                                    href={`/activities/${item.slug}`}
                                    key={item.slug}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
                                >
                                    <div className="relative h-32 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <Image
                                            src={item.coverImage || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30"></div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            {item.startDate ? formatDate(item.startDate) : 'Past Activity'}
                                        </div>
                                        <h4 className="font-bold text-forest group-hover:text-primary transition-colors line-clamp-2">
                                            {item.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Newsletter CTA */}
            <div className="container mx-auto px-6 mt-24">
                <div className="bg-forest rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')]"></div>
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black font-heading text-white mb-4 tracking-tight">
                                Don't Miss <span className="text-primary">New Events!</span>
                            </h2>
                            <p className="text-white/60 text-lg font-medium max-w-lg">
                                Follow us to get updates on new activities, special promotions, and exclusive experiences in Chiang Mai.
                            </p>
                        </div>
                        <a
                            href="https://www.facebook.com/Venturevibecnx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 bg-white text-forest px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1"
                        >
                            Follow Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
