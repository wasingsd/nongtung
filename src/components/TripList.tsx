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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                {filteredTrips.map(t => (
                    <div key={t.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group flex flex-col h-full">
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={t.image}
                                alt={t.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                <span className="px-2 py-1 rounded-sm text-xs font-bold uppercase bg-white/90 text-forest shadow-sm">{t.duration}</span>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 text-sm font-bold z-10">฿{t.price.toLocaleString()}</div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex gap-2 mb-3">
                                {t.tags.map(tag => (
                                    <span key={tag} className="text-[10px] bg-surface text-forest-light px-2 py-1 rounded font-bold uppercase tracking-wide">{tag}</span>
                                ))}
                            </div>
                            <h3 className="text-xl font-bold text-forest font-heading leading-tight mb-4">{t.title}</h3>

                            <div className="space-y-2 mb-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2"><Map className="w-4 h-4 text-primary" /> เชียงใหม่, ไทย</div>
                                <div className="flex items-center gap-2"><BarChart className="w-4 h-4 text-primary" /> ความยาก: {t.difficulty}</div>
                                <div className="flex items-center gap-2"><CheckSquare className="w-4 h-4 text-primary" /> รวม: รถรับส่ง, อาหาร, ประกัน</div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <Link href={`/trips/${t.id}`} className="block w-full border-2 border-forest text-forest hover:bg-forest hover:text-white font-bold py-2 rounded transition-colors uppercase text-sm text-center">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredTrips.length === 0 && <div className="text-center py-20 text-gray-400">No trips found matching your filters.</div>}
        </>
    );
}
