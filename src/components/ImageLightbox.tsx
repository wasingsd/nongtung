'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
    images: string[];
    mainImage?: string;
}

export default function ImageLightbox({ images, mainImage }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Combine main image with gallery
    const allImages = mainImage ? [mainImage, ...images] : images;

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % allImages.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    };

    if (images.length === 0) return null;

    return (
        <>
            {/* Balanced Thumbnails Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
                {images.slice(0, 10).map((img, i) => {
                    const isLast = i === 9 && images.length > 10;
                    return (
                        <button
                            key={i}
                            onClick={() => openLightbox(mainImage ? i + 1 : i)}
                            className="relative aspect-square rounded-2xl overflow-hidden immersive-shadow border border-forest/5 group cursor-pointer"
                        >
                            <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            {isLast ? (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-black text-lg">
                                    +{images.length - 9}
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Navigation Arrows */}
                    {allImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    {/* Main Image */}
                    <div
                        className="relative w-[90vw] h-[85vh] max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={allImages[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">
                        {currentIndex + 1} / {allImages.length}
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto py-2 px-4">
                        {allImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${currentIndex === i ? 'ring-2 ring-primary scale-110' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
