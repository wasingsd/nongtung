'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  X,
  Compass,
  Heart,
  Eye,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

import { Reel } from '@/types/types';
import { DEFAULT_REELS } from '@/data/defaultReels';

export type ShoppableReel = Reel;

interface TikTokRTBProps {
  reels?: Reel[];
}

export default function TikTokRTB({ reels: propReels }: TikTokRTBProps = {}) {
  const displayReels = (propReels && propReels.length > 0)
    ? propReels.filter(r => r.isActive !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : DEFAULT_REELS;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Active Reel Modal State
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);

  // Video playback states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Photo Album state for Photo Mode Reels
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoViewMode, setPhotoViewMode] = useState<'album' | 'video'>('album');

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
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const currentReel = activeReelIndex !== null ? displayReels[activeReelIndex] : null;
  const hasPhotoAlbum = Boolean(currentReel?.images && currentReel.images.length > 1);

  // Reset photo index and default view mode when switching reels
  useEffect(() => {
    setPhotoIndex(0);
    if (currentReel?.images && currentReel.images.length > 1) {
      setPhotoViewMode('album');
    } else {
      setPhotoViewMode('video');
    }
  }, [activeReelIndex]);

  // Touch Swipe for mobile & touch gestures
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartX.current = null;
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentReel?.images?.length) return;
    setPhotoIndex((prev) => (prev + 1) % currentReel.images!.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentReel?.images?.length) return;
    setPhotoIndex((prev) => (prev - 1 + currentReel.images!.length) % currentReel.images!.length);
  };

  // Keyboard shortcut for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === 'Escape') setActiveReelIndex(null);
      if (e.key === 'ArrowRight') {
        if (hasPhotoAlbum && photoViewMode === 'album') {
          handleNextPhoto();
        } else {
          handleNextReel();
        }
      }
      if (e.key === 'ArrowLeft') {
        if (hasPhotoAlbum && photoViewMode === 'album') {
          handlePrevPhoto();
        } else {
          handlePrevReel();
        }
      }
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelIndex, isPlaying, hasPhotoAlbum, photoViewMode, photoIndex]);

  const handleNextReel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeReelIndex === null) return;
    setActiveReelIndex((prev) => ((prev ?? 0) + 1) % displayReels.length);
  };

  const handlePrevReel = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeReelIndex === null) return;
    setActiveReelIndex((prev) => ((prev ?? 0) - 1 + displayReels.length) % displayReels.length);
  };

  // Play video/audio automatically when modal opens or reel switches
  useEffect(() => {
    if (activeReelIndex !== null && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Autoplay prevented:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [activeReelIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  // Resolve video URL safely (falls back to local mp4 if empty or mixkit)
  const getVideoSrc = (reel: Reel | null) => {
    if (!reel) return '';
    if (reel.videoUrl && !reel.videoUrl.includes('mixkit.co')) {
      return reel.videoUrl;
    }
    return `/videos/${reel.id}.mp4`;
  };

  return (
    <section className="py-14 sm:py-20 bg-surface/50 relative overflow-hidden border-y border-forest/5">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Actions & Scroll Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full mb-3 border border-forest/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                Official TikTok Channel: @nongtungrunning
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-forest tracking-tight">
              Real Trips, <span className="text-primary italic">Real Moments</span>
            </h2>
            <p className="text-xs sm:text-sm text-forest/65 max-w-lg font-normal mt-2">
              คลิกดูคลิปและภาพชุดจริงจาก TikTok บัญชีทางการของนองตึง พร้อมกดจองทริปที่เห็นได้ทันที
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <a
              href="https://www.tiktok.com/@nongtungrunning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1.5 group pb-0.5"
            >
              <span>เปิดหน้าช่อง TikTok @nongtungrunning</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Clean Header Carousel Controls */}
            <div className="hidden md:flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-9 h-9 rounded-full bg-white border border-forest/10 flex items-center justify-center text-forest shadow-sm transition-all ${
                  canScrollLeft
                    ? 'hover:bg-forest hover:text-white hover:scale-105 active:scale-95 cursor-pointer'
                    : 'opacity-35 cursor-not-allowed'
                }`}
                aria-label="Previous reels"
                title="เลื่อนไปทางซ้าย"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-9 h-9 rounded-full bg-white border border-forest/10 flex items-center justify-center text-forest shadow-sm transition-all ${
                  canScrollRight
                    ? 'hover:bg-forest hover:text-white hover:scale-105 active:scale-95 cursor-pointer'
                    : 'opacity-35 cursor-not-allowed'
                }`}
                aria-label="Next reels"
                title="เลื่อนไปทางขวา"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 9:16 Smartphone Reel Track (Flush Aligned with Container) */}
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
          >
            {displayReels.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveReelIndex(index)}
                className="group shrink-0 snap-start w-[260px] sm:w-[280px] md:w-[300px] xl:w-[calc((100%-4*1.25rem)/5)] h-[520px] sm:h-[560px] md:h-[590px] rounded-[2.25rem] overflow-hidden relative bg-forest border border-forest/10 impeccable-card-shadow hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 cursor-pointer text-white select-none"
              >
                {/* Poster Background */}
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/50 group-hover:from-black/95 transition-all" />

                {/* Top Overlay: Location + Stats (Clean & Flush) */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-black/55 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-sm">
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    <span>{item.location}</span>
                  </span>

                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>{item.views}</span>
                  </div>
                </div>

                {/* Center Glowing Play / Album Button */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:bg-primary transition-all duration-300">
                    {item.images && item.images.length > 1 ? (
                      <Layers className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5 fill-white" />
                    )}
                  </div>
                  <span className="mt-2 text-[10px] font-bold tracking-wider text-white/90 bg-black/50 px-2.5 py-0.5 rounded-full border border-white/15">
                    {item.images && item.images.length > 1 ? `ภาพชุด (${item.images.length} รูป)` : 'Watch Reel'}
                  </span>
                </div>

                {/* Bottom Overlay: Title & Shoppable Pinned Trip */}
                <div className="relative z-10 space-y-2.5">
                  <h3 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2 text-white/95">
                    {item.title}
                  </h3>

                  {/* Pinned Shoppable Trip Pill */}
                  <div className="p-2 sm:p-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 transition-all flex items-center justify-between gap-2 group/trip">
                    <div className="min-w-0 flex-grow">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-primary block">
                        ทริปในวิดีโอ
                      </span>
                      <p className="text-[11px] font-bold text-white truncate">
                        {item.linkedTrip.title}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-black text-primary">
                        ฿{item.linkedTrip.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover/trip:translate-x-1 transition-transform ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎬 Unified High-Performance Shoppable Video / Photo Album Modal */}
      {currentReel && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveReelIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveReelIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative w-full max-w-md md:max-w-5xl lg:max-w-6xl xl:max-w-7xl h-[94vh] sm:h-[90vh] max-h-[920px] bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Media Column (Video / Interactive Photo Album Carousel) */}
            <div className="relative w-full md:w-[480px] lg:w-[540px] xl:w-[600px] h-[55%] md:h-full bg-black flex items-center justify-center overflow-hidden shrink-0 group/player select-none">
              {/* Background Music/Audio from Reel (Always playing) */}
              <video
                ref={videoRef}
                src={getVideoSrc(currentReel)}
                poster={currentReel.poster}
                autoPlay
                loop
                playsInline
                muted={isMuted}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                className={
                  hasPhotoAlbum && photoViewMode === 'album'
                    ? 'hidden'
                    : 'relative z-10 w-full h-full object-contain cursor-pointer'
                }
              />

              {/* A. If Photo Album & Mode === 'album': Interactive Photo Carousel */}
              {hasPhotoAlbum && photoViewMode === 'album' ? (
                <div
                  className="relative z-10 w-full h-full flex items-center justify-center"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Ambient Blurred Background of Current Photo */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <Image
                      key={`ambient-${photoIndex}`}
                      src={currentReel.images![photoIndex]}
                      alt=""
                      fill
                      className="object-cover blur-2xl opacity-35 scale-125 transition-all duration-300"
                    />
                  </div>

                  {/* Main Crisp Photo */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                    <Image
                      key={`photo-${photoIndex}`}
                      src={currentReel.images![photoIndex]}
                      alt={`${currentReel.title} - รูปที่ ${photoIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Photo Counter Badge (Top Right) */}
                  <div className="absolute top-4 right-4 z-30 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-lg">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>รูปที่ {photoIndex + 1} / {currentReel.images!.length}</span>
                  </div>

                  {/* Interactive Photo Navigation Arrows */}
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-2xl border border-white/20 hover:scale-105 cursor-pointer"
                    aria-label="รูปก่อนหน้า"
                    title="รูปก่อนหน้า"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow-2xl border border-white/20 hover:scale-105 cursor-pointer"
                    aria-label="รูปถัดไป"
                    title="รูปถัดไป"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Bottom Pagination Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
                    {currentReel.images!.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPhotoIndex(idx);
                        }}
                        className={`transition-all rounded-full ${
                          photoIndex === idx
                            ? 'w-6 h-2 bg-primary shadow-sm'
                            : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                        }`}
                        aria-label={`ไปที่รูปที่ ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* B. Video Mode: Ambient Glow + Full aspect video */
                <>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <video
                      src={getVideoSrc(currentReel)}
                      poster={currentReel.poster}
                      autoPlay
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-cover blur-2xl opacity-35 scale-125"
                    />
                  </div>

                  {/* Center Play Button Overlay when Paused */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer z-20 transition-all"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-2xl scale-100 hover:scale-110 active:scale-95 transition-transform">
                        <Play className="w-8 h-8 ml-1 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Timeline Progress Bar (Bottom of Video) */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                    <div
                      className="h-full bg-primary transition-[width] duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}

              {/* Floating Audio Control (Top Left) */}
              <button
                type="button"
                onClick={toggleMute}
                className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-semibold border border-white/20 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />
                    <span>แตะเปิดเสียง</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-primary" />
                    <span>เปิดเสียงแล้ว</span>
                  </>
                )}
              </button>

              {/* Mode Switcher Pill (Only for Photo Album Reels) */}
              {hasPhotoAlbum && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-black/65 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-xl text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoViewMode('album');
                    }}
                    className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                      photoViewMode === 'album'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>เลื่อนดูรูป ({currentReel.images!.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoViewMode('video');
                      if (videoRef.current) {
                        videoRef.current.play().catch(() => {});
                        setIsPlaying(true);
                      }
                    }}
                    className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                      photoViewMode === 'video'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>สไลด์วิดีโอ</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Shoppable Info & Trip Booking Drawer */}
            <div className="w-full md:flex-grow p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto bg-zinc-900/95 text-white">
              {/* Header / Caption */}
              <div>
                <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/20 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold border border-primary/30">
                      📍 {currentReel.location}
                    </span>
                    <span className="text-xs font-medium text-white/70 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> {currentReel.likes}
                    </span>
                    <span className="text-[11px] font-bold text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-primary" /> {currentReel.views}
                    </span>
                  </div>

                  {/* Previous / Next Reel Switcher Controls */}
                  <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full text-xs font-bold border border-white/15">
                    <button
                      type="button"
                      onClick={handlePrevReel}
                      className="px-2.5 py-1 rounded-full hover:bg-white/15 transition-all text-white/80 hover:text-white flex items-center gap-1"
                      title="ดูคลิปก่อนหน้า"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">คลิปก่อนหน้า</span>
                    </button>
                    <span className="text-white/30">|</span>
                    <button
                      type="button"
                      onClick={handleNextReel}
                      className="px-2.5 py-1 rounded-full hover:bg-white/15 transition-all text-white/80 hover:text-white flex items-center gap-1"
                      title="ดูคลิปถัดไป"
                    >
                      <span className="hidden sm:inline">คลิปถัดไป</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-bold font-heading leading-snug mb-3 text-white">
                  {currentReel.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60 font-medium mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="truncate">{currentReel.audioTrack}</span>
                </p>

                {/* Direct Open in TikTok Action */}
                <a
                  href={currentReel.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full transition-all border border-white/15 mb-4 active:scale-95 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span>เปิดดูใน TikTok ของ @nongtungrunning</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Pinned Shoppable Trip Card Box */}
              <div className="bg-white/5 rounded-3xl p-5 sm:p-6 border border-white/10 mt-4 sm:mt-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ทริปที่อยู่ในวิดีโอนี้</span>
                </div>

                <div className="flex gap-3.5 items-center mb-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-white/15">
                    <Image
                      src={currentReel.linkedTrip.image}
                      alt={currentReel.linkedTrip.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-grow">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-snug">
                      {currentReel.linkedTrip.title}
                    </h4>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      {currentReel.linkedTrip.location} • {currentReel.linkedTrip.duration}
                    </p>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-[11px] text-white/50">เริ่มต้น</span>
                      <span className="text-base sm:text-lg font-black text-primary">
                        ฿{currentReel.linkedTrip.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-white/40">/ ท่าน</span>
                    </div>
                  </div>
                </div>

                {/* Conversion Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Link
                    href={currentReel.linkedTrip.url || `/th/trips`}
                    onClick={() => setActiveReelIndex(null)}
                    className="w-full bg-primary hover:bg-primary-deep text-white py-2.5 sm:py-3 rounded-full font-bold text-xs tracking-wider text-center transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>ดูรายละเอียดทริป</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://line.me/R/ti/p/@nongtungrunning?text=${encodeURIComponent(
                      `สวัสดีครับ สนใจสอบถามคิวว่างทริปจากคลิป TikTok: ${currentReel?.linkedTrip?.title || ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-2.5 sm:py-3 rounded-full font-bold text-xs tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                    </svg>
                    <span>สอบถามคิวว่างผ่าน LINE</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
