'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Filter, Map, BarChart, CheckSquare } from 'lucide-react';
import { Trip } from '@/types/types';

export default function TripList({ trips }: { trips: Trip[] }) {
    const [filter, setFilter] = useState({ duration: 'all', type: 'all' });

    const filteredTrips = trips.filter(t => {
        const dFilter = filter.duration === 'all' ||
            (filter.duration === '1d' && t.duration === '1D') ||
            (filter.duration === '2d' && t.duration === '2D1N') ||
            (filter.duration === '3d' && t.duration === '3D+');
        const tFilter = filter.type === 'all' || t.type === filter.type;
        return dFilter && tFilter;
    });

    return (
        <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center bg-surface p-4 rounded-lg">
                <span className="font-bold text-sm text-forest uppercase tracking-wide mr-2 flex items-center">
                    <Filter className="w-4 h-4 mr-1" /> Filter:
                </span>

                <div className="flex gap-2">
                    {['All', '1D', '2D', '3D+'].map(d => (
                        <button
                            key={d}
                            onClick={() => setFilter({ ...filter, duration: d.toLowerCase() })}
                            className={`px-4 py-1 rounded text-sm font-medium transition-colors ${filter.duration === d.toLowerCase() ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
                <div className="w-px h-6 bg-gray-300 mx-2 hidden sm:block"></div>
                <div className="flex gap-2">
                    {['All', 'Join', 'Private'].map(t => (
                        <button
                            key={t}
                            onClick={() => setFilter({ ...filter, type: t.toLowerCase() })}
                            className={`px-4 py-1 rounded text-sm font-medium transition-colors ${filter.type === t.toLowerCase() ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                {filteredTrips.map(t => (
                    <div key={t.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
                        {/* Image Container */}
                        <div className="relative h-72 overflow-hidden shadow-inner translate-z-0">
                            <Image
                                src={t.image}
                                alt={t.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Duration Badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-white/90 backdrop-blur-sm text-forest font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider shadow-sm border border-white/20">
                                    {t.duration}
                                </span>
                            </div>
                            {/* Price Badge */}
                            <div className="absolute bottom-4 left-4 z-10">
                                <span className="bg-[#f07d2f] text-white px-4 py-1.5 rounded-lg text-lg font-bold shadow-lg flex items-center gap-1">
                                    <span className="text-xs font-normal opacity-80">฿</span>
                                    {t.price.toLocaleString()}
                                </span>
                            </div>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content Container */}
                        <div className="p-8 flex flex-col flex-grow">
                            {/* Tags - Flex wrap to support many tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {t.tags.map(tag => (
                                    <span key={tag} className="bg-[#f2f4f1] text-forest-light px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-2xl font-bold text-forest font-heading leading-tight mb-6 hover:text-primary transition-colors line-clamp-2">
                                {t.title}
                            </h3>

                            {/* Info Rows */}
                            <div className="space-y-3 mb-8 flex-grow">
                                <div className="flex items-center gap-3 text-forest-light/80 font-medium">
                                    <div className="bg-orange-50 p-1.5 rounded-lg">
                                        <Map className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <span className="text-sm">{t.location || 'เชียงใหม่, ไทย'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-forest-light/80 font-medium">
                                    <div className="bg-orange-50 p-1.5 rounded-lg">
                                        <BarChart className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <span className="text-sm">ความยาก: {t.difficulty}</span>
                                </div>
                                <div className="flex items-center gap-3 text-forest-light/80 font-medium">
                                    <div className="bg-orange-50 p-1.5 rounded-lg">
                                        <CheckSquare className="w-4 h-4 text-orange-400" />
                                    </div>
                                    <span className="text-sm line-clamp-1">รวม: {t.whatsIncluded?.slice(0, 3).join(', ') || 'รถรับส่ง, อาหาร, ประกัน'}</span>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className="mt-auto pt-6 border-t border-gray-50">
                                <Link
                                    href={`/trips/${t.id}`}
                                    className="block w-full border-2 border-forest text-forest hover:bg-forest hover:text-white font-black py-3.5 rounded-xl transition-all duration-300 uppercase text-sm text-center tracking-widest shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    VIEW DETAILS
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredTrips.length === 0 && <div className="text-center py-20 text-gray-400">No trips found matching your filters.</div>}
        </>
    );
}
