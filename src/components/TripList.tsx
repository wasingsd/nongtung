'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Filter, Map, BarChart, ChevronDown, ArrowRight, Compass } from 'lucide-react';
import { Trip } from '@/types/types';

export default function TripList({ trips, lang, dict }: { trips: Trip[], lang: string, dict: any }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({ duration: 'all', type: 'all', difficulty: 'all', location: 'all' });

    const provinces = Array.from(new Set(trips.map(t => {
        const parts = t.location.split(',');
        return parts[parts.length - 1].trim();
    }))).filter(p => p && p !== 'ไทย' && p !== 'Thailand').sort();

    const filteredTrips = trips.filter(t => {
        const matchesSearch = !search.trim() || 
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.subtitle && t.subtitle.toLowerCase().includes(search.toLowerCase())) ||
            (t.location && t.location.toLowerCase().includes(search.toLowerCase())) ||
            t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

        const dFilter = filter.duration === 'all' ||
            (filter.duration === '1d' && t.duration === '1D') ||
            (filter.duration === '2d' && t.duration === '2D1N') ||
            (filter.duration === '3d' && t.duration === '3D+');
        const tFilter = filter.type === 'all' || t.type === filter.type;
        const diffFilter = filter.difficulty === 'all' || t.difficulty === filter.difficulty;
        const locFilter = filter.location === 'all' || t.location.includes(filter.location);
        return matchesSearch && dFilter && tFilter && diffFilter && locFilter;
    });

    const isFiltered = search || filter.duration !== 'all' || filter.type !== 'all' || filter.difficulty !== 'all' || filter.location !== 'all';

    return (
        <div className="space-y-8">
            {/* Search & Filter Bar */}
            <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2.5rem] border border-forest/5 dark:border-white/5 immersive-shadow">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <div className="flex items-center bg-surface dark:bg-zinc-800 rounded-full px-5 py-3 border border-forest/10 dark:border-white/10 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Filter className="w-4 h-4 text-forest/40 dark:text-gray-400 mr-3 shrink-0" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={lang === 'th' ? "ค้นหาชื่อทริป, ยอดดอย, หรือสถานที่..." : "Search expeditions by mountain, trail or location..."}
                            className="bg-transparent text-xs font-bold text-forest dark:text-white placeholder:text-forest/30 w-full focus:outline-none"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="text-forest/40 hover:text-forest text-xs font-bold px-2"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Controls Row */}
                <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-between">
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Duration Tabs */}
                        <div className="flex items-center gap-1.5 bg-surface dark:bg-zinc-800 p-1 rounded-full border border-forest/5">
                            {['All', '1D', '2D', '3D+'].map(d => (
                                <button
                                    key={d}
                                    onClick={() => setFilter({ ...filter, duration: d.toLowerCase() })}
                                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                                        filter.duration === d.toLowerCase() 
                                            ? 'bg-primary text-white shadow-xs scale-105' 
                                            : 'text-forest/60 dark:text-gray-400 hover:text-primary'
                                    }`}
                                >
                                    {d === 'All' ? dict.all : d}
                                </button>
                            ))}
                        </div>

                        {/* Trip Type Tabs */}
                        <div className="flex items-center gap-1.5 bg-surface dark:bg-zinc-800 p-1 rounded-full border border-forest/5">
                            {['All', 'Join', 'Private'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setFilter({ ...filter, type: t.toLowerCase() })}
                                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                                        filter.type === t.toLowerCase() 
                                            ? 'bg-forest text-white shadow-xs scale-105' 
                                            : 'text-forest/60 dark:text-gray-400 hover:text-forest'
                                    }`}
                                >
                                    {t === 'All' ? dict.all : (t === 'Join' ? dict.join : (t === 'Private' ? dict.private : t))}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dropdowns */}
                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Difficulty */}
                        <div className="relative">
                            <select
                                value={filter.difficulty}
                                onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                                className="bg-surface dark:bg-zinc-800 border border-forest/10 dark:border-white/10 hover:border-primary/40 text-forest dark:text-white text-[10px] font-black uppercase tracking-widest rounded-full pl-4 pr-8 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none min-w-[130px]"
                            >
                                <option value="all">ALL LEVELS</option>
                                <option value="Easy">EASY • ง่าย</option>
                                <option value="Moderate">MODERATE • ปานกลาง</option>
                                <option value="Hard">HARD • ท้าทาย</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-forest/40 dark:text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Location */}
                        <div className="relative">
                            <select
                                value={filter.location}
                                onChange={(e) => setFilter({ ...filter, location: e.target.value })}
                                className="bg-surface dark:bg-zinc-800 border border-forest/10 dark:border-white/10 hover:border-primary/40 text-forest dark:text-white text-[10px] font-black uppercase tracking-widest rounded-full pl-4 pr-8 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none min-w-[145px]"
                            >
                                <option value="all">ALL LOCATIONS</option>
                                {provinces.map(p => (
                                    <option key={p} value={p}>{p.toUpperCase()}</option>
                                ))}
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-forest/40 dark:text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {isFiltered && (
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setFilter({ duration: 'all', type: 'all', difficulty: 'all', location: 'all' });
                                }}
                                className="text-[10px] font-black uppercase tracking-wider text-forest/40 hover:text-primary transition-colors px-2"
                            >
                                {lang === 'th' ? 'ล้างตัวกรอง' : 'Reset'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Counter */}
                <div className="pt-4 mt-4 border-t border-forest/5 dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-forest/50 dark:text-gray-400">
                    <span>
                        {lang === 'th' 
                            ? `พบทั้งหมด ${filteredTrips.length} เส้นทางผจญภัย`
                            : `Showing ${filteredTrips.length} expeditions`}
                    </span>
                    <span className="text-accent flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        {lang === 'th' ? 'มีกำหนดการเดินทางทุกสัปดาห์' : 'Weekly Departures Available'}
                    </span>
                </div>
            </div>

            {/* Trip Grid */}
            {filteredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {filteredTrips.map(t => {
                        const isEasy = t.difficulty === 'Easy';
                        const isMod = t.difficulty === 'Moderate';
                        const dotColor = isEasy ? 'bg-accent' : isMod ? 'bg-ochre' : 'bg-primary';

                        return (
                            <div key={t.id} className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden immersive-shadow border border-forest/5 dark:border-white/5 card-lift">
                                {/* Image Container */}
                                <div className="relative h-64 md:h-72 overflow-hidden">
                                    <Image
                                        src={t.image}
                                        alt={t.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {/* Duration Pill */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-forest/85 backdrop-blur-md text-white font-black px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider shadow-sm">
                                            {t.duration}
                                        </span>
                                    </div>
                                    {/* Difficulty Pill */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-forest dark:text-white font-bold px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                                            <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                                            {t.difficulty}
                                        </span>
                                    </div>
                                    {/* Subtle scrim */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <h3 className="text-lg font-black font-heading text-forest dark:text-white group-hover:text-primary transition-colors duration-200 leading-snug break-words mb-1.5">
                                        {t.title}
                                    </h3>
                                    {t.subtitle && (
                                        <p className="text-xs font-medium text-forest/50 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                                            {t.subtitle}
                                        </p>
                                    )}

                                    {/* Tag Chips */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {t.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] font-bold text-forest/50 dark:text-gray-400 bg-surface dark:bg-zinc-800 px-2.5 py-1 rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Location Info */}
                                    <div className="flex items-center gap-2 text-xs text-forest/60 dark:text-gray-400 font-medium mb-6">
                                        <Map className="w-3.5 h-3.5 text-primary shrink-0" />
                                        <span className="line-clamp-1">{t.location || 'เชียงใหม่, ไทย'}</span>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="mt-auto pt-4 border-t border-forest/5 dark:border-white/5 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-forest/40 dark:text-gray-400 uppercase tracking-wider block">
                                                {lang === 'th' ? 'ราคาเริ่มต้น' : 'From'}
                                            </span>
                                            <span className="text-xl font-black font-heading text-forest dark:text-white tracking-tight tabular-nums">
                                                ฿{t.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/${lang}/trips/${t.id}`}
                                            className="bg-forest dark:bg-white text-white dark:text-forest group-hover:bg-primary group-hover:text-white py-2.5 px-5 rounded-full font-black text-[10px] tracking-wider transition-all duration-300 shadow-md flex items-center gap-1.5"
                                        >
                                            <span>{dict.discover}</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-[3rem] border border-forest/5 dark:border-white/5 immersive-shadow p-8">
                    <Compass className="w-16 h-16 mx-auto mb-4 text-forest/20 dark:text-white/20" />
                    <h3 className="text-xl font-black font-heading text-forest dark:text-white mb-2">
                        {lang === 'th' ? 'ไม่พบเส้นทางที่ตรงกับเงื่อนไข' : 'No expeditions found'}
                    </h3>
                    <p className="text-xs text-forest/50 dark:text-gray-400 font-medium max-w-sm mx-auto mb-6">
                        {lang === 'th' ? 'ลองปรับระดับความยาก ระยะเวลา หรือเลือกทุกพื้นที่เพื่อดูทริปทั้งหมด' : 'Try broadening your search or resetting filters.'}
                    </p>
                    <button
                        onClick={() => {
                            setSearch('');
                            setFilter({ duration: 'all', type: 'all', difficulty: 'all', location: 'all' });
                        }}
                        className="bg-forest text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-primary transition-all"
                    >
                        {lang === 'th' ? 'แสดงทริปทั้งหมด' : 'Reset Filters'}
                    </button>
                </div>
            )}
        </div>
    );
}
