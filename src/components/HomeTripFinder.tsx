'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Compass, Search, Sparkles, ChevronDown } from 'lucide-react';

interface HomeTripFinderProps {
    lang: string;
    dict?: any;
}

export default function HomeTripFinder({ lang, dict }: HomeTripFinderProps) {
    const router = useRouter();
    const [destination, setDestination] = useState('all');
    const [duration, setDuration] = useState('all');
    const [type, setType] = useState('all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (destination !== 'all') params.set('location', destination);
        if (duration !== 'all') params.set('duration', duration);
        if (type !== 'all') params.set('type', type);

        const query = params.toString();
        router.push(`/${lang}/trips${query ? `?${query}` : ''}`);
    };

    const isThai = lang === 'th';

    return (
        <div className="w-full max-w-5xl mx-auto -mt-16 md:-mt-20 relative z-30 px-4 sm:px-6">
            <div className="glass-dock rounded-[2.5rem] p-6 md:p-8 border border-white/80 dark:border-white/10 shadow-2xl">
                <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-center">
                    
                    {/* Destination */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface/80 dark:bg-white/5 border border-forest/5 hover:border-primary/30 transition-all">
                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/50 dark:text-gray-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {isThai ? 'จุดหมายปลายทาง' : 'Destination'}
                        </label>
                        <div className="relative">
                            <select
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full bg-transparent font-black text-sm text-forest dark:text-white outline-none cursor-pointer appearance-none pr-6"
                            >
                                <option value="all" className="dark:bg-zinc-900">{isThai ? 'ทุกพื้นที่ในภาคเหนือ' : 'All Northern Trails'}</option>
                                <option value="เชียงใหม่" className="dark:bg-zinc-900">{isThai ? 'เชียงใหม่ (Chiang Mai)' : 'Chiang Mai'}</option>
                                <option value="เชียงดาว" className="dark:bg-zinc-900">{isThai ? 'ดอยหลวงเชียงดาว' : 'Doi Luang Chiang Dao'}</option>
                                <option value="อินทนนท์" className="dark:bg-zinc-900">{isThai ? 'ดอยอินทนนท์' : 'Doi Inthanon'}</option>
                                <option value="แม่ฮ่องสอน" className="dark:bg-zinc-900">{isThai ? 'แม่ฮ่องสอน / ปาย' : 'Mae Hong Son / Pai'}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-forest/40 dark:text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface/80 dark:bg-white/5 border border-forest/5 hover:border-primary/30 transition-all">
                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/50 dark:text-gray-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {isThai ? 'ระยะเวลา' : 'Duration'}
                        </label>
                        <div className="relative">
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-transparent font-black text-sm text-forest dark:text-white outline-none cursor-pointer appearance-none pr-6"
                            >
                                <option value="all" className="dark:bg-zinc-900">{isThai ? 'ทุกช่วงเวลา' : 'Any Duration'}</option>
                                <option value="1d" className="dark:bg-zinc-900">{isThai ? '1 วัน (One Day Trek)' : '1 Day Trek'}</option>
                                <option value="2d" className="dark:bg-zinc-900">{isThai ? '2 วัน 1 คืน (2D1N Camp)' : '2 Days 1 Night'}</option>
                                <option value="3d" className="dark:bg-zinc-900">{isThai ? '3 วันขึ้นไป (Expedition)' : '3+ Days Summit'}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-forest/40 dark:text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Type */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-surface/80 dark:bg-white/5 border border-forest/5 hover:border-primary/30 transition-all">
                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/50 dark:text-gray-400 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-primary" />
                            {isThai ? 'รูปแบบทริป' : 'Experience Style'}
                        </label>
                        <div className="relative">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-transparent font-black text-sm text-forest dark:text-white outline-none cursor-pointer appearance-none pr-6"
                            >
                                <option value="all" className="dark:bg-zinc-900">{isThai ? 'ทุกรูปแบบ' : 'All Styles'}</option>
                                <option value="join" className="dark:bg-zinc-900">{isThai ? 'จอยทริป (Join Group)' : 'Join Group Trek'}</option>
                                <option value="private" className="dark:bg-zinc-900">{isThai ? 'ทริปส่วนตัว (Private VIP)' : 'Private Expedition'}</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-forest/40 dark:text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-deep text-white py-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg hover:shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            <span>{isThai ? 'ค้นหาเส้นทาง' : 'Find Trips'}</span>
                        </button>
                    </div>
                </form>

                {/* Micro Vitals */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-forest/5 dark:border-white/5 text-[11px] font-bold text-forest/60 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span>{isThai ? 'ทริปพร้อมเปิดจองตลอดปี 2026' : 'Active 2026 Summit Seasons Open'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>🌲 {isThai ? 'ไกด์ท้องถิ่นผู้เชี่ยวชาญ' : 'Certified Local Rangers'}</span>
                        <span>🏕️ {isThai ? 'อุปกรณ์เดินป่าระดับโปร' : 'Pro Camping Gear Included'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
