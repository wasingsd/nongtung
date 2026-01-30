'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Filter, Map, BarChart, CheckSquare } from 'lucide-react';
import { Trip } from '@/types/types';

export default function TripList({ trips }: { trips: Trip[] }) {
    const [filter, setFilter] = useState({ duration: 'all', type: 'all', difficulty: 'all', location: 'all' });

    const provinces = Array.from(new Set(trips.map(t => {
        const parts = t.location.split(',');
        return parts[parts.length - 1].trim();
    }))).filter(p => p && p !== 'ไทย' && p !== 'Thailand').sort();

    const filteredTrips = trips.filter(t => {
        const dFilter = filter.duration === 'all' ||
            (filter.duration === '1d' && t.duration === '1D') ||
            (filter.duration === '2d' && t.duration === '2D1N') ||
            (filter.duration === '3d' && t.duration === '3D+');
        const tFilter = filter.type === 'all' || t.type === filter.type;
        const diffFilter = filter.difficulty === 'all' || t.difficulty === filter.difficulty;
        const locFilter = filter.location === 'all' || t.location.includes(filter.location);
        return dFilter && tFilter && diffFilter && locFilter;
    });

    return (
        <>
            {/* Filters */}
            <div className="bg-surface/50 backdrop-blur-sm p-6 rounded-[2rem] border border-forest/5 fade-in shadow-sm overflow-x-auto no-scrollbar">
                <div className="flex flex-nowrap md:flex-wrap gap-6 items-center min-w-max md:min-w-0">
                    {/* Duration */}
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-[10px] text-forest/40 uppercase tracking-[0.2em] whitespace-nowrap flex items-center">
                            <Filter className="w-3 h-3 mr-2" /> Duration:
                        </span>
                        <div className="flex gap-2">
                            {['All', '1D', '2D', '3D+'].map(d => (
                                <button
                                    key={d}
                                    onClick={() => setFilter({ ...filter, duration: d.toLowerCase() })}
                                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${filter.duration === d.toLowerCase() ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-white text-forest/60 hover:text-primary border border-forest/5'}`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-px h-6 bg-forest/10 hidden xl:block"></div>

                    {/* Trip Type */}
                    <div className="flex gap-2">
                        {['All', 'Join', 'Private'].map(t => (
                            <button
                                key={t}
                                onClick={() => setFilter({ ...filter, type: t.toLowerCase() })}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${filter.type === t.toLowerCase() ? 'bg-forest text-white shadow-lg shadow-forest/20 scale-105' : 'bg-white text-forest/60 hover:text-forest border border-forest/5'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-forest/10 hidden xl:block"></div>

                    {/* Difficulty */}
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-[10px] text-forest/40 uppercase tracking-[0.2em] whitespace-nowrap flex items-center">
                            <BarChart className="w-3 h-3 mr-2" /> Difficulty:
                        </span>
                        <select
                            value={filter.difficulty}
                            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                            className="bg-white border border-forest/5 text-forest/60 text-[10px] font-black uppercase tracking-widest rounded-full px-5 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none min-w-[120px]"
                        >
                            <option value="all">ALL LEVELS</option>
                            <option value="Easy">EASY</option>
                            <option value="Moderate">MODERATE</option>
                            <option value="Hard">HARD</option>
                        </select>
                    </div>

                    <div className="w-px h-6 bg-forest/10 hidden xl:block"></div>

                    {/* Location */}
                    <div className="flex items-center gap-3 flex-grow">
                        <span className="font-bold text-[10px] text-forest/40 uppercase tracking-[0.2em] whitespace-nowrap flex items-center">
                            <Map className="w-3 h-3 mr-2" /> Location:
                        </span>
                        <select
                            value={filter.location}
                            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
                            className="bg-white border border-forest/5 text-forest/60 text-[10px] font-black uppercase tracking-widest rounded-full px-5 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none min-w-[140px]"
                        >
                            <option value="all">ALL LOCATIONS</option>
                            {provinces.map(p => (
                                <option key={p} value={p}>{p.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Trip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                {filteredTrips.map(t => (
                    <div key={t.id} className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden immersive-shadow border border-forest/5 hover:-translate-y-2 transition-all duration-500">
                        {/* Image Container */}
                        <div className="relative h-72 overflow-hidden">
                            <Image
                                src={t.image}
                                alt={t.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            {/* Tags on Image Overlay */}
                            <div className="absolute top-5 left-5 z-10 flex flex-wrap gap-2">
                                <span className="bg-white/95 backdrop-blur-md text-forest font-black px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest shadow-sm">
                                    {t.duration}
                                </span>
                            </div>
                            {/* Price Label */}
                            <div className="absolute bottom-5 left-5 z-10">
                                <span className="bg-primary text-white px-4 py-2 rounded-xl text-lg font-black shadow-xl flex items-center gap-1">
                                    <span className="text-[10px] font-medium opacity-80 mt-1">THB</span>
                                    {t.price.toLocaleString()}
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-base font-black text-forest font-heading group-hover:text-primary transition-colors duration-300 leading-tight break-words">
                                {t.title}
                            </h3>
                            {t.subtitle && (
                                <p className="text-[11px] font-medium text-forest/40 mt-1 line-clamp-2">
                                    {t.subtitle}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-2 mt-2 mb-6">
                                {t.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] font-black uppercase tracking-[0.2em] text-forest/40">
                                        • {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-3 mb-8 text-forest-light/70 font-medium">
                                <div className="flex items-center gap-3">
                                    <div className="bg-surface p-2 rounded-lg">
                                        <Map className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs">{t.location || 'เชียงใหม่, ไทย'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-surface p-2 rounded-lg">
                                        <BarChart className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs">ระดับ: {t.difficulty}</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-forest/5">
                                <Link
                                    href={`/trips/${t.id}`}
                                    className="block w-full bg-forest text-white hover:bg-primary py-4 rounded-full font-black text-[10px] tracking-[0.2em] text-center transition-all duration-300 shadow-lg hover:shadow-primary/30 uppercase"
                                >
                                    Discover Experience
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
            {filteredTrips.length === 0 && <div className="text-center py-20 text-forest/40 italic">No adventures found in this category.</div>}
        </>
    );
}
