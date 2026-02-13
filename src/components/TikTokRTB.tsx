'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// TikTok content from @nongtungrunning - { id, type: 'video' | 'photo' }
const TIKTOK_CONTENT = [
    { id: '7603675455408934164', type: 'video' },
    { id: '7576139598758202625', type: 'video' },
    { id: '7560361631113350407', type: 'photo' },  // This is a photo
    { id: '7381118220578606342', type: 'video' },
    { id: '7382537203567578374', type: 'video' },
];

export default function TikTokRTB() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        // Load TikTok embed script
        const loadTikTokScript = () => {
            const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
        };

        loadTikTokScript();

        return () => {
            const script = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
            if (script) script.remove();
        };
    }, []);

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons();
            return () => container.removeEventListener('scroll', checkScrollButtons);
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-surface/50 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-100 px-6 py-3 rounded-full mb-6">
                        <svg className="w-5 h-5 text-forest" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        <span className="text-xs font-bold text-forest/60 uppercase tracking-widest">Watch Our Adventures</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black font-heading text-forest mb-4 tracking-tight leading-tight">
                        Real Trips, <span className="text-primary">Real Moments</span>
                    </h2>

                    <p className="text-base md:text-lg text-forest/40 max-w-xl mx-auto font-medium">
                        Follow @nongtungrunning for daily adventure content
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-14 h-14 rounded-full bg-white flex items-center justify-center text-forest border border-gray-200 shadow-xl transition-all duration-300 hover:bg-forest hover:text-white hover:scale-110 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        aria-label="Previous videos"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-14 h-14 rounded-full bg-white flex items-center justify-center text-forest border border-gray-200 shadow-xl transition-all duration-300 hover:bg-forest hover:text-white hover:scale-110 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        aria-label="Next videos"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Gradient Masks */}
                    <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface/80 to-transparent z-10 pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface/80 to-transparent z-10 pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}></div>

                    {/* Scrollable Videos Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth px-2"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {TIKTOK_CONTENT.map((content) => (
                            <div
                                key={content.id}
                                className="flex-shrink-0 w-[280px] md:w-[calc(33.333%-14px)] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <blockquote
                                    className="tiktok-embed"
                                    cite={`https://www.tiktok.com/@nongtungrunning/${content.type}/${content.id}`}
                                    data-video-id={content.id}
                                    style={{
                                        maxWidth: '100%',
                                        minWidth: '100%',
                                    }}
                                >
                                    <section>
                                        <a
                                            target="_blank"
                                            href={`https://www.tiktok.com/@nongtungrunning/${content.type}/${content.id}`}
                                            rel="noopener noreferrer"
                                            className="text-forest/60 text-sm flex items-center justify-center h-[500px]"
                                        >
                                            <div className="text-center">
                                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
                                                    <svg className="w-6 h-6 text-forest/40" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                                    </svg>
                                                </div>
                                                <span className="text-forest/40 text-sm font-medium">Loading TikTok...</span>
                                            </div>
                                        </a>
                                    </section>
                                </blockquote>
                            </div>
                        ))}
                    </div>

                    {/* Scroll Indicator Dots (Mobile) */}
                    <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
                        {TIKTOK_CONTENT.map((content, idx) => (
                            <div
                                key={idx}
                                className="w-2 h-2 rounded-full bg-forest/20"
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-10 md:mt-14">
                    <a
                        href="https://www.tiktok.com/@nongtungrunning"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-forest text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-primary transition-all shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        Follow @nongtungrunning
                        <ExternalLink className="w-4 h-4" />
                    </a>

                    <p className="text-forest/30 text-sm mt-4 font-medium">
                        New adventure videos every week!
                    </p>
                </div>
            </div>
        </section>
    );
}
