'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ItineraryItem {
    day: string;
    title: string;
    desc: string;
}

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
                            <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-4 flex items-center justify-center font-black text-[10px] md:text-xs transition-colors ${isOpen ? 'bg-primary border-primary text-white' : 'bg-white border-surface text-forest'}`}>
                                {i + 1}
                            </div>

                            {/* Header Content */}
                            <div className="flex-grow">
                                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block transition-colors ${isOpen ? 'text-primary' : 'text-primary/70'}`}>
                                    {day.day}
                                </span>
                                <h3 className="text-base md:text-2xl font-black text-forest tracking-tighter uppercase italic flex items-center justify-between gap-2">
                                    <span>{day.title}</span>
                                    {isOpen ? <ChevronUp className="w-5 h-5 text-primary opacity-50" /> : <ChevronDown className="w-5 h-5 text-forest/20" />}
                                </h3>

                                {/* Collapsible Content */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="text-xs md:text-lg text-forest/60 leading-relaxed font-medium whitespace-pre-line border-l-2 border-forest/5 pl-4 ml-1">
                                            {day.desc}
                                        </p>
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
