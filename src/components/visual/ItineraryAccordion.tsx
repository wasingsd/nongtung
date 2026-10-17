'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { ItineraryItem } from '@/types/types';

export default function ItineraryAccordion({ itinerary }: { itinerary: ItineraryItem[] }) {
    // By default, open the first day
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {itinerary.map((day, i) => {
                const isOpen = openIndex === i;
                return (
                    <div key={i} className="group">
                        <button
                            onClick={() => toggle(i)}
                            className={`w-full text-left bg-surface/30 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-forest/5 flex gap-4 transition-all duration-300 ${isOpen ? 'bg-white immersive-shadow ring-1 ring-primary/10' : 'hover:bg-white hover:shadow-sm'}`}
                        >
                            {/* Day Badge */}
                            <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 flex items-center justify-center font-black font-heading text-[10px] md:text-xs transition-colors ${isOpen ? 'bg-primary border-primary text-white' : 'bg-white border-surface text-forest'}`}>
                                {i + 1}
                            </div>

                            {/* Header Content */}
                            <div className="flex-grow">
                                <span className={`text-[9px] md:text-[10px] font-black font-heading uppercase tracking-[0.2em] mb-1 md:mb-2 block transition-colors ${isOpen ? 'text-primary' : 'text-primary/70'}`}>
                                    {day.day}
                                </span>
                                <h3 className="text-base md:text-2xl font-bold font-heading text-forest tracking-tight uppercase flex items-center justify-between gap-2">
                                    <span>{day.title}</span>
                                    {isOpen ? <ChevronUp className="w-5 h-5 text-primary opacity-50" /> : <ChevronDown className="w-5 h-5 text-forest/20" />}
                                </h3>

                                {/* Collapsible Content */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-xs md:text-base text-forest/75 leading-relaxed font-normal font-reading whitespace-pre-line border-l-2 border-primary/20 pl-4 ml-1">
                                            {day.desc}
                                        </p>

                                        {day.images && day.images.length > 0 && (
                                            <div className="mt-4 pt-3 border-t border-forest/10">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-forest/70 mb-2.5">
                                                    <ImageIcon className="w-3.5 h-3.5 text-primary" />
                                                    <span>บรรยากาศกิจกรรมของวัน ({day.images.length} ภาพ)</span>
                                                </div>
                                                <div className={`grid gap-2.5 ${day.images.length === 1 ? 'grid-cols-1' : day.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                                                    {day.images.map((imgUrl, imgIdx) => (
                                                        <div key={imgIdx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface group/img border border-forest/10 shadow-sm">
                                                            <Image
                                                                src={imgUrl}
                                                                alt={`${day.day} - image ${imgIdx + 1}`}
                                                                fill
                                                                className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
