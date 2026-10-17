'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, BarChart } from 'lucide-react';
import { Trip } from '@/types/types';

interface TripCardProps {
  trip: Trip;
  langPrefix: string;
  viewDetailsText?: string;
  compact?: boolean;
}

export default function TripCard({
  trip,
  langPrefix,
  viewDetailsText = 'ดูทริป',
  compact = false,
}: TripCardProps) {
  const displayLocation = trip.location || (trip.tags?.[0] ? `${trip.tags[0]} • ธรรมชาติ` : 'ภาคเหนือ • ไทย');

  return (
    <Link
      href={`${langPrefix}/trips/${trip.id}`}
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-forest/5 impeccable-card-shadow impeccable-hover-shadow hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* 16:10 Photography container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={trip.image || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1200'}
          alt={trip.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Duration pill badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-forest font-bold font-heading px-3 py-1.5 rounded-full text-xs shadow-sm flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{trip.duration}</span>
          </span>
        </div>

        {/* Difficulty pill badge if exists */}
        {trip.difficulty && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="bg-forest/80 backdrop-blur-md text-white font-bold font-heading px-2.5 py-1 rounded-full text-[10px] tracking-wide uppercase">
              {trip.difficulty}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Location / Province */}
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold font-heading mb-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold font-heading text-forest group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {trip.title}
          </h3>

          {/* Subtitle / Excerpt */}
          {trip.subtitle && !compact && (
            <p className="text-xs text-forest/60 mt-1.5 line-clamp-2 font-normal font-reading leading-relaxed">
              {trip.subtitle}
            </p>
          )}

          {/* Tags */}
          {trip.tags && trip.tags.length > 0 && !compact && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {trip.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium font-heading bg-surface text-forest/70 px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Price & CTA Bar */}
        <div className="mt-5 pt-3.5 border-t border-forest/5 flex items-end justify-between gap-2">
          <div>
            <span className="text-[10px] sm:text-[11px] text-forest/40 block font-medium font-heading">เริ่มต้น</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black font-heading text-primary">฿{trip.price.toLocaleString()}</span>
              <span className="text-[11px] sm:text-xs text-forest/50 font-heading">/ ท่าน</span>
            </div>
          </div>
          <span className="bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white text-xs font-bold font-heading px-4 py-2 rounded-full transition-all duration-300 shadow-sm">
            {viewDetailsText}
          </span>
        </div>
      </div>
    </Link>
  );
}
