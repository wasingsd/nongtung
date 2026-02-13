'use client';

import { useState } from 'react';
import { Trip } from '@/types/types';
import { updateHomeSettings } from '@/app/actions/settingActions';
import {
    Search, CheckCircle2, Circle, Star,
    ArrowRight, ArrowUp, ArrowDown, X,
    GripVertical, LayoutGrid, List
} from 'lucide-react';
import Image from 'next/image';

interface HomeSettingsEditorProps {
    allTrips: Trip[];
    initialSelectedIds: string[];
    initialFacebookUrl: string;
}

export default function HomeSettingsEditor({ allTrips, initialSelectedIds, initialFacebookUrl }: HomeSettingsEditorProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
    const [facebookUrl, setFacebookUrl] = useState(initialFacebookUrl);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const toggleTrip = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newIds = [...selectedIds];
        [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
        setSelectedIds(newIds);
    };

    const moveDown = (index: number) => {
        if (index === selectedIds.length - 1) return;
        const newIds = [...selectedIds];
        [newIds[index + 1], newIds[index]] = [newIds[index], newIds[index + 1]];
        setSelectedIds(newIds);
    };

    const autoFill = () => {
        const top6 = allTrips.slice(0, 6).map(t => t.id);
        setSelectedIds(top6);
    };

    const featuredTrips = selectedIds
        .map(id => allTrips.find(t => t.id === id))
        .filter((t): t is Trip => !!t);

    const availableTrips = allTrips
        .filter(t => !selectedIds.includes(t.id))
        .filter(t =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="space-y-10">
            {/* Featured Selection Area */}
            <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-forest p-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="w-6 h-6 text-primary fill-primary" />
                                <h2 className="text-2xl font-black font-heading tracking-tight uppercase">Featured Adventures</h2>
                            </div>
                            <p className="text-white/50 text-sm font-medium">Manage the order and selection of trips shown on the homepage.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase border border-white/10">
                                {selectedIds.length} Selected
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {featuredTrips.length === 0 ? (
                        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <LayoutGrid className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-400">No trips featured yet</h3>
                            <p className="text-gray-400 text-sm mb-6">Select trips from the gallery below or use the button below to start.</p>
                            <button
                                onClick={autoFill}
                                className="bg-white border border-gray-200 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-forest hover:bg-forest hover:text-white transition-all shadow-sm"
                            >
                                Auto-fill with current display
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {featuredTrips.map((trip, index) => (
                                <div
                                    key={trip.id}
                                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all animate-in fade-in slide-in-from-top-2 duration-300"
                                >
                                    <div className="flex flex-col gap-1 pr-2 border-r border-gray-200">
                                        <button
                                            onClick={() => moveUp(index)}
                                            disabled={index === 0}
                                            className="p-1 text-gray-300 hover:text-primary disabled:opacity-0 transition-colors"
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => moveDown(index)}
                                            disabled={index === featuredTrips.length - 1}
                                            className="p-1 text-gray-300 hover:text-primary disabled:opacity-0 transition-colors"
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image src={trip.image} alt={trip.title} fill className="object-cover" />
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <h4 className="font-bold text-forest truncate">{trip.title}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{trip.duration}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">• ฿{trip.price.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => toggleTrip(trip.id)}
                                        className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-100 transition-all group-hover:shadow-sm"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-8 py-10 bg-gray-50 border-t border-gray-100">
                    <form action={updateHomeSettings} className="space-y-8">
                        {/* Facebook URL Setting */}
                        <div className="max-w-2xl bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-forest uppercase tracking-tight">Sales Closing Link</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Direct customers to Facebook Inbox or Page</p>
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="facebookUrl"
                                    value={facebookUrl}
                                    onChange={(e) => setFacebookUrl(e.target.value)}
                                    placeholder="https://facebook.com/your-page"
                                    className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {selectedIds.map(id => (
                            <input key={id} type="hidden" name="popularAdventureIds" value={id} />
                        ))}

                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-primary hover:bg-forest text-white px-12 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0"
                            >
                                Publish All Changes
                            </button>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                                This will update both Featured Trips and the Contact Link
                            </p>
                        </div>
                    </form>
                </div>
            </section>

            {/* Selection Gallery */}
            <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <LayoutGrid className="w-6 h-6 text-forest" />
                            <h2 className="text-2xl font-black font-heading tracking-tight uppercase">Trip Gallery</h2>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Browse and select trips to add to the featured section.</p>
                    </div>

                    <div className="flex items-center gap-4 flex-grow max-w-md">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by trip name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableTrips.map(trip => (
                        <div
                            key={trip.id}
                            onClick={() => toggleTrip(trip.id)}
                            className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <Image
                                    src={trip.image}
                                    alt={trip.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                                <div className="absolute top-4 right-4">
                                    <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                                        {trip.duration}
                                    </span>
                                    <span className="text-sm font-black text-forest tracking-tighter">฿{trip.price.toLocaleString()}</span>
                                </div>
                                <h4 className="font-bold text-forest leading-tight group-hover:text-primary transition-colors line-clamp-2">{trip.title}</h4>
                            </div>
                        </div>
                    ))}
                    {availableTrips.length === 0 && (
                        <div className="col-span-full py-16 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200 uppercase tracking-widest text-[10px] font-black">
                            No matching trips found
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
