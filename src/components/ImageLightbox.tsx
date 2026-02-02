'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
    images: string[];
    mainImage?: string;
}

export default function ImageLightbox({ images, mainImage }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Combine main image with gallery
    const allImages = mainImage ? [mainImage, ...images] : images;

    // Ensure component is mounted before using portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle body scroll lock with iOS-specific handling
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;

            // iOS Safari specific handling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const openLightbox = useCallback((index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setIsOpen(false);
    }, []);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, [allImages.length]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }, [allImages.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeLightbox, goNext, goPrev]);

    if (images.length === 0) return null;

    // Lightbox Modal Component - rendered via portal
    const LightboxModal = () => (
        <div
            className="lightbox-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                height: '100dvh', // Dynamic viewport height for iOS
                zIndex: 99999,
                backgroundColor: 'rgba(0, 0, 0, 0.98)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
            }}
            onClick={closeLightbox}
        >
            {/* Close Button - Always visible, safe area aware */}
            <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                style={{
                    position: 'absolute',
                    top: 'max(16px, env(safe-area-inset-top, 16px))',
                    right: 'max(16px, env(safe-area-inset-right, 16px))',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#000',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 999999,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                }}
                aria-label="Close Gallery"
            >
                <X size={32} strokeWidth={2.5} />
            </button>

            {/* Navigation - Previous */}
            {allImages.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        style={{
                            position: 'absolute',
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 999998,
                        }}
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 999998,
                        }}
                    >
                        <ChevronRight size={32} />
                    </button>
                </>
            )}

            {/* Main Image Container */}
            <div
                style={{
                    position: 'relative',
                    width: '90vw',
                    height: '70vh',
                    maxWidth: '1200px',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={allImages[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="90vw"
                />
            </div>

            {/* Image Counter */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 'max(100px, calc(env(safe-area-inset-bottom, 20px) + 80px))',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    zIndex: 999997,
                }}
            >
                {currentIndex + 1} / {allImages.length}
            </div>

            {/* Thumbnail Strip */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 'max(40px, calc(env(safe-area-inset-bottom, 20px) + 20px))',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    maxWidth: '90vw',
                    overflowX: 'auto',
                    padding: '8px',
                    zIndex: 999997,
                }}
            >
                {allImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                        style={{
                            position: 'relative',
                            width: '60px',
                            height: '45px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            border: currentIndex === i ? '2px solid #f97316' : '2px solid transparent',
                            opacity: currentIndex === i ? 1 : 0.6,
                            transform: currentIndex === i ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="60px" />
                    </button>
                ))}
            </div>
        </div>
    );

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

            {/* Lightbox Modal - Rendered via Portal to ensure it's on top */}
            {mounted && isOpen && createPortal(
                <LightboxModal />,
                document.body
            )}
        </>
    );
}
