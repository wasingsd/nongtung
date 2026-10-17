'use client';

import { useState } from 'react';
import { Filter, Map, BarChart, Compass } from 'lucide-react';
import { Trip } from '@/types/types';
import TripCard from '@/components/TripCard';

export default function TripList({
  trips,
  lang,
  dict,
}: {
  trips: Trip[];
  lang: string;
  dict: any;
}) {
  const [filter, setFilter] = useState({
    duration: 'all',
    type: 'all',
    difficulty: 'all',
    location: 'all',
  });

  const langPrefix = `/${lang}`;

  const provinces = Array.from(
    new Set(
      trips.map((t) => {
        const parts = t.location ? t.location.split(',') : [];
        return parts.length ? parts[parts.length - 1].trim() : '';
      })
    )
  )
    .filter((p) => p && p !== 'ไทย' && p !== 'Thailand')
    .sort();

  const filteredTrips = trips.filter((t) => {
    const dFilter =
      filter.duration === 'all' ||
      (filter.duration === '1d' && t.duration?.includes('1')) ||
      (filter.duration === '2d' && t.duration?.includes('2')) ||
      (filter.duration === '3d' && (t.duration?.includes('3') || t.duration?.includes('4')));
    const tFilter = filter.type === 'all' || t.type?.toLowerCase() === filter.type;
    const diffFilter = filter.difficulty === 'all' || t.difficulty === filter.difficulty;
    const locFilter = filter.location === 'all' || (t.location && t.location.includes(filter.location));
    return dFilter && tFilter && diffFilter && locFilter;
  });

  return (
    <>
      {/* Impeccable Filter Console */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-forest/10 impeccable-surface-shadow mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
        <div className="flex flex-nowrap md:flex-wrap gap-4 sm:gap-6 items-center min-w-max md:min-w-0">
          {/* Duration Pills */}
          <div className="flex items-center gap-2.5">
            <span className="font-bold font-heading text-[11px] text-forest/50 uppercase tracking-wider whitespace-nowrap flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-primary" /> {dict?.duration || 'ระยะเวลา'}:
            </span>
            <div className="flex gap-1.5">
              {[
                { label: dict?.all || 'ทั้งหมด', val: 'all' },
                { label: '1 วัน', val: '1d' },
                { label: '2 วัน', val: '2d' },
                { label: '3 วัน+', val: '3d' },
              ].map((d) => (
                <button
                  key={d.val}
                  onClick={() => setFilter({ ...filter, duration: d.val })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-heading transition-all duration-300 ${
                    filter.duration === d.val
                      ? 'bg-primary text-white shadow-sm shadow-primary/25 scale-102'
                      : 'bg-surface text-forest/70 hover:text-primary hover:bg-forest/5'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-forest/10 hidden xl:block" />

          {/* Trip Type Pills */}
          <div className="flex items-center gap-1.5">
            {[
              { label: dict?.all || 'ทุกรูปแบบ', val: 'all' },
              { label: dict?.join || 'Join ทริป', val: 'join' },
              { label: dict?.private || 'กรุ๊ปเหมา ส่วนตัว', val: 'private' },
            ].map((t) => (
              <button
                key={t.val}
                onClick={() => setFilter({ ...filter, type: t.val })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-heading transition-all duration-300 ${
                  filter.type === t.val
                    ? 'bg-forest text-white shadow-sm scale-102'
                    : 'bg-surface text-forest/70 hover:text-forest hover:bg-forest/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-forest/10 hidden xl:block" />

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-bold font-heading text-[11px] text-forest/50 uppercase tracking-wider whitespace-nowrap flex items-center">
              <BarChart className="w-3.5 h-3.5 mr-1.5 text-primary" /> {dict?.difficulty || 'ระดับความยาก'}:
            </span>
            <select
              value={filter.difficulty}
              onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
              className="bg-surface text-forest text-xs font-bold font-heading rounded-full px-4 py-1.5 outline-none border border-forest/10 focus:border-primary cursor-pointer transition-all"
            >
              <option value="all">ทุกระดับ (ALL)</option>
              <option value="Easy">ระดับง่าย (EASY)</option>
              <option value="Moderate">ปานกลาง (MODERATE)</option>
              <option value="Hard">ท้าทาย (HARD)</option>
            </select>
          </div>

          <div className="w-px h-6 bg-forest/10 hidden xl:block" />

          {/* Location Dropdown */}
          <div className="flex items-center gap-2 flex-grow">
            <span className="font-bold font-heading text-[11px] text-forest/50 uppercase tracking-wider whitespace-nowrap flex items-center">
              <Map className="w-3.5 h-3.5 mr-1.5 text-primary" /> {dict?.location || 'พื้นที่'}:
            </span>
            <select
              value={filter.location}
              onChange={(e) => setFilter({ ...filter, location: e.target.value })}
              className="bg-surface text-forest text-xs font-bold font-heading rounded-full px-4 py-1.5 outline-none border border-forest/10 focus:border-primary cursor-pointer transition-all"
            >
              <option value="all">ทุกพื้นที่ (ALL LOCATIONS)</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Standardized TripCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredTrips.map((t) => (
          <TripCard
            key={t.id}
            trip={t}
            langPrefix={langPrefix}
            viewDetailsText={dict?.discover || 'ดูทริป'}
          />
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-20 bg-surface/50 rounded-3xl border border-forest/10">
          <Compass className="w-12 h-12 text-forest/20 mx-auto mb-3" />
          <p className="text-forest/60 font-bold font-heading text-sm">
            {dict?.no_results || 'ไม่พบทริปตามเงื่อนไขที่เลือก กรุณาลองเลือกตัวกรองใหม่อีกครั้ง'}
          </p>
        </div>
      )}
    </>
  );
}
