'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import {
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
    Share2,
    Bookmark,
    User,
    Tag,
    ArrowRight,
    MessageSquare,
    Check,
    Copy,
    Compass,
    MapPin,
    Sparkles,
    BookOpen,
    ExternalLink,
    Phone,
    ShieldCheck,
    List,
    ChevronDown,
    ChevronUp,
    Camera,
    Eye,
    ZoomIn,
    X,
    Image as ImageIcon
} from 'lucide-react';
import { Article } from '../data';
import { Trip } from '@/types/types';
import TrekkingMap from '@/components/TrekkingMapSafe';

interface TocItem {
    id: string;
    text: string;
}

interface ArticleDetailClientProps {
    article: Article;
    processedContent: string;
    toc: TocItem[];
    relatedTrip: Trip | null;
    prevArticle: Article | null;
    nextArticle: Article | null;
    relatedArticles: Article[];
    facebookUrl: string;
    messengerUrl: string;
}

function splitContentAtMidpoint(html: string): [string, string] {
    if (!html) return ['', ''];
    const h2Regex = /<h2[\s>]/gi;
    const matches: number[] = [];
    let match;
    while ((match = h2Regex.exec(html)) !== null) {
        matches.push(match.index);
    }

    if (matches.length >= 2) {
        const splitIndex = matches[Math.floor(matches.length / 2)];
        return [html.substring(0, splitIndex), html.substring(splitIndex)];
    }

    const pRegex = /<\/p>/gi;
    const pMatches: number[] = [];
    while ((match = pRegex.exec(html)) !== null) {
        pMatches.push(match.index + 4);
    }

    if (pMatches.length >= 2) {
        const splitIndex = pMatches[Math.floor(pMatches.length / 2)];
        return [html.substring(0, splitIndex), html.substring(splitIndex)];
    }

    return [html, ''];
}

export default function ArticleDetailClient({
    article,
    processedContent,
    toc,
    relatedTrip,
    prevArticle,
    nextArticle,
    relatedArticles,
    facebookUrl,
    messengerUrl,
}: ArticleDetailClientProps) {
    const [readingProgress, setReadingProgress] = useState(0);
    const [activeSection, setActiveSection] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Sub-images separation
    const midImages = (article.subImages || []).filter(img => img.position === 'mid' && img.url);
    const bottomImages = (article.subImages || []).filter(img => img.position === 'bottom' && img.url);

    const [contentPart1, contentPart2] = midImages.length > 0
        ? splitContentAtMidpoint(processedContent)
        : [processedContent, ''];

    // Lightbox & Modal
    const [mounted, setMounted] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const allDisplayImages = [
        { url: article.coverImage, caption: article.title },
        ...midImages.map((img, i) => ({ url: img.url, caption: img.caption || `ภาพประกอบกลางบทความ #${i + 1}` })),
        ...bottomImages.map((img, i) => ({ url: img.url, caption: img.caption || `ภาพบรรยากาศเพิ่มเติม #${i + 1}` }))
    ];

    const openLightbox = (url: string) => {
        const idx = allDisplayImages.findIndex(img => img.url === url);
        setActiveImageIndex(idx >= 0 ? idx : 0);
        setLightboxOpen(true);
    };

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
    }, []);

    const goNext = useCallback(() => {
        setActiveImageIndex(prev => (prev + 1) % allDisplayImages.length);
    }, [allDisplayImages.length]);

    const goPrev = useCallback(() => {
        setActiveImageIndex(prev => (prev - 1 + allDisplayImages.length) % allDisplayImages.length);
    }, [allDisplayImages.length]);

    // Handle keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, closeLightbox, goNext, goPrev]);

    // 1. Reading Progress Bar & Active Section Tracker
    useEffect(() => {
        const handleScroll = () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollTotal > 0) {
                const currentProgress = (window.scrollY / scrollTotal) * 100;
                setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
            }

            // Track active TOC heading
            if (toc.length > 0) {
                for (let i = toc.length - 1; i >= 0; i--) {
                    const el = document.getElementById(toc[i].id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 160) {
                            setActiveSection(toc[i].id);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [toc]);

    // 2. Share handlers
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(currentUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            }
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: currentUrl,
                });
            } catch {
                // user cancelled or share failed
            }
        } else {
            handleCopyLink();
        }
    };

    const handleFacebookShare = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=400');
    };

    const handleLineShare = () => {
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=500');
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMobileTocOpen(false);
        }
    };

    return (
        <div className="bg-[#FAF9F5] text-forest min-h-screen">
            {/* Top Reading Progress Bar (Fixed) */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-primary-deep z-50 transition-all duration-150 ease-out"
                style={{ width: `${readingProgress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(readingProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
            />

            {/* Breadcrumb & Navigation Header */}
            <header className="pt-28 pb-8 sm:pb-10 bg-white/70 backdrop-blur-md border-b border-forest/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-forest/60">
                            <Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link>
                            <span>/</span>
                            <Link href="/articles" className="hover:text-primary transition-colors">เรื่องเล่า & บทความ</Link>
                            <span>/</span>
                            <span className="text-primary truncate max-w-[200px] sm:max-w-xs">{article.tags[0] || 'เชียงใหม่'}</span>
                        </nav>

                        {/* Back Button */}
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 bg-surface hover:bg-forest hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border border-forest/5 group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>ย้อนกลับไปรวมบทความ</span>
                        </Link>
                    </div>

                    {/* Article Category & Title Header */}
                    <div className="w-full">
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                            <span className="bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                🌲 {article.tags[0] || 'Adventure Guide'}
                            </span>
                            <span className="bg-forest/5 text-forest/70 px-3 py-1 rounded-full text-xs font-semibold">
                                ✓ ข้อมูลอัปเดต 2026
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-forest leading-[1.2] tracking-tight mb-6">
                            {article.title}
                        </h1>

                        {/* Excerpt Lead Box */}
                        {article.excerpt && (
                            <p className="text-base sm:text-lg text-forest/80 font-reading leading-relaxed border-l-4 border-primary/60 pl-4 py-1 mb-6 bg-surface/50 rounded-r-2xl max-w-5xl">
                                {article.excerpt}
                            </p>
                        )}

                        {/* Author & Meta Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-forest/5 text-xs text-forest/70 font-medium">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-forest text-primary font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-primary/20">
                                        NT
                                    </div>
                                    <div>
                                        <div className="font-bold text-forest text-sm">{article.author || 'ทีมงานน่องตึง'}</div>
                                        <div className="text-[11px] text-forest/50">Local Trekking & Camping Team</div>
                                    </div>
                                </div>

                                <div className="hidden sm:flex items-center gap-4 text-forest/60 border-l border-forest/10 pl-6">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-primary" />
                                        {article.date}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                        {article.readingTime || '10 min read'}
                                    </span>
                                </div>
                            </div>

                            {/* Share Buttons Strip */}
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold text-forest/40 uppercase tracking-wider mr-1 hidden sm:inline">แชร์:</span>
                                <button
                                    onClick={handleCopyLink}
                                    title="คัดลอกลิงก์"
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                        copied
                                            ? 'bg-green-600 text-white border-green-600'
                                            : 'bg-white text-forest hover:bg-forest hover:text-white border-forest/10'
                                    }`}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}</span>
                                </button>
                                <button
                                    onClick={handleFacebookShare}
                                    title="แชร์ไปยัง Facebook"
                                    className="w-8 h-8 rounded-full bg-white hover:bg-[#1877F2] hover:text-white text-forest/70 border border-forest/10 flex items-center justify-center transition-all"
                                >
                                    <span className="font-bold text-sm">f</span>
                                </button>
                                <button
                                    onClick={handleLineShare}
                                    title="แชร์ไปยัง LINE"
                                    className="w-8 h-8 rounded-full bg-white hover:bg-[#06C755] hover:text-white text-forest/70 border border-forest/10 flex items-center justify-center transition-all font-bold text-[11px]"
                                >
                                    LINE
                                </button>
                                <button
                                    onClick={handleNativeShare}
                                    title="แชร์บทความ"
                                    className="w-8 h-8 rounded-full bg-white hover:bg-primary hover:text-white text-forest/70 border border-forest/10 flex items-center justify-center transition-all"
                                >
                                    <Share2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Hero Visual (Clickable for full resolution lightbox) */}
            <section className="container mx-auto px-6 pt-6 pb-10">
                <div
                    onClick={() => openLightbox(article.coverImage)}
                    className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-forest/5 shadow-2xl bg-forest cursor-pointer group"
                >
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1536px) 100vw, 1536px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Zoom Hint */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
                        <ZoomIn className="w-3.5 h-3.5 text-primary" />
                        <span>คลิกดูภาพปกขนาดเต็ม</span>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>จังหวัดเชียงใหม่ • ภาคเหนือของไทย</span>
                    </div>
                </div>
            </section>

            {/* Main Content Layout (Golden Ratio on desktop) */}
            <main className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT COLUMN: Article Narrative */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 xl:p-12 border border-forest/5 shadow-sm">
                            
                            {/* Mobile Table of Contents (Collapsible) */}
                            {toc.length > 0 && (
                                <div className="lg:hidden mb-10 bg-surface rounded-2xl p-5 border border-forest/10">
                                    <button
                                        onClick={() => setMobileTocOpen(!mobileTocOpen)}
                                        className="w-full flex items-center justify-between font-bold text-forest text-sm"
                                    >
                                        <span className="flex items-center gap-2">
                                            <List className="w-4 h-4 text-primary" />
                                            <span>สารบัญในบทความ ({toc.length} หัวข้อ)</span>
                                        </span>
                                        {mobileTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    {mobileTocOpen && (
                                        <div className="mt-4 pt-4 border-t border-forest/10 space-y-2 text-sm">
                                            {toc.map((item, idx) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => scrollToSection(item.id)}
                                                    className="w-full text-left py-1 text-forest/75 hover:text-primary font-reading transition-colors flex items-start gap-2"
                                                >
                                                    <span className="text-primary font-bold text-xs mt-0.5">{idx + 1}.</span>
                                                    <span>{item.text}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Rendered Article Content with Mid-Image Injection */}
                            <article
                                className="prose prose-lg sm:prose-xl prose-forest max-w-none
                                    prose-headings:font-black prose-headings:font-heading prose-headings:text-forest
                                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-forest/5
                                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                    prose-p:text-forest/85 prose-p:font-reading prose-p:leading-[1.9] prose-p:mb-6
                                    prose-li:text-forest/85 prose-li:font-reading prose-li:leading-relaxed
                                    prose-img:rounded-3xl prose-img:shadow-md prose-img:my-8 prose-img:border prose-img:border-forest/5
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-forest prose-blockquote:font-reading prose-blockquote:not-italic
                                    prose-a:text-primary prose-a:font-bold prose-a:underline hover:prose-a:text-primary-deep
                                    prose-strong:text-forest prose-strong:font-black"
                            >
                                <div dangerouslySetInnerHTML={{ __html: contentPart1 }} />

                                {/* Mid-Article Sub-Images (รูปภาพย่อยกลางหน้า) */}
                                {midImages.length > 0 && (
                                    <div className="not-prose my-12 pt-6 pb-6 border-y border-forest/10 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                                                <Camera className="w-4 h-4" />
                                                <span>ภาพบรรยากาศระหว่างเส้นทาง (จุดชมวิว & จุดสำคัญ)</span>
                                            </div>
                                            <span className="text-[11px] font-bold text-forest/50 bg-surface px-2.5 py-1 rounded-full border border-forest/5">
                                                {midImages.length} รูป
                                            </span>
                                        </div>

                                        {midImages.length === 1 ? (
                                            // 1 Single Mid Image: Heroic editorial frame
                                            <figure className="relative rounded-3xl overflow-hidden border border-forest/10 shadow-lg group bg-white">
                                                <div
                                                    className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-forest cursor-pointer overflow-hidden"
                                                    onClick={() => openLightbox(midImages[0].url)}
                                                >
                                                    <Image
                                                        src={midImages[0].url}
                                                        alt={midImages[0].caption || article.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                        sizes="(max-width: 1024px) 100vw, 850px"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                                        <span className="opacity-0 group-hover:opacity-100 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full transition-opacity flex items-center gap-2 shadow-lg">
                                                            <ZoomIn className="w-4 h-4 text-primary" />
                                                            คลิกเพื่อดูรูปภาพขนาดเต็ม
                                                        </span>
                                                    </div>
                                                </div>
                                                {midImages[0].caption && (
                                                    <figcaption className="p-4 bg-surface/60 border-t border-forest/5 text-xs sm:text-sm text-forest/80 font-reading flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                                        <span>{midImages[0].caption}</span>
                                                    </figcaption>
                                                )}
                                            </figure>
                                        ) : (
                                            // Multiple Mid Images: 2-column editorial grid
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {midImages.map((img, idx) => (
                                                    <figure
                                                        key={idx}
                                                        className="relative rounded-2xl overflow-hidden border border-forest/10 shadow-sm group bg-white flex flex-col"
                                                    >
                                                        <div
                                                            className="relative aspect-[4/3] w-full bg-forest cursor-pointer overflow-hidden"
                                                            onClick={() => openLightbox(img.url)}
                                                        >
                                                            <Image
                                                                src={img.url}
                                                                alt={img.caption || `ภาพที่ ${idx + 1}`}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                sizes="(max-width: 768px) 100vw, 420px"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                                                <span className="opacity-0 group-hover:opacity-100 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition-opacity flex items-center gap-1.5 shadow">
                                                                    <ZoomIn className="w-3.5 h-3.5 text-primary" />
                                                                    ขยายรูป
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {img.caption && (
                                                            <figcaption className="p-3 text-xs text-forest/80 font-reading bg-surface/50 border-t border-forest/5 flex items-start gap-1.5">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                                                                <span className="line-clamp-2">{img.caption}</span>
                                                            </figcaption>
                                                        )}
                                                    </figure>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {contentPart2 && <div dangerouslySetInnerHTML={{ __html: contentPart2 }} />}
                            </article>

                            {/* Bottom-Article Sub-Images (แกลเลอรีรูปภาพท้ายบทความ) */}
                            {bottomImages.length > 0 && (
                                <section className="mt-12 pt-10 border-t border-forest/10">
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                        <div>
                                            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                                                JOURNEY PHOTO GALLERY
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-black font-heading text-forest flex items-center gap-2">
                                                <Camera className="w-5 h-5 text-primary" />
                                                <span>ภาพบรรยากาศเพิ่มเติมจากสถานที่จริง</span>
                                            </h3>
                                        </div>
                                        <span className="text-xs font-bold text-forest/70 bg-surface px-3 py-1.5 rounded-full border border-forest/5 flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-primary" />
                                            {bottomImages.length} รูปภาพท้ายบทความ
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {bottomImages.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => openLightbox(img.url)}
                                                className="group bg-white rounded-2xl overflow-hidden border border-forest/10 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
                                            >
                                                <div className="relative aspect-[4/3] w-full bg-forest overflow-hidden">
                                                    <Image
                                                        src={img.url}
                                                        alt={img.caption || `ภาพประกอบ ${idx + 1}`}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                                        <span className="opacity-0 group-hover:opacity-100 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full transition-opacity flex items-center gap-1.5 shadow">
                                                            <ZoomIn className="w-3.5 h-3.5 text-primary" />
                                                            ดูขนาดเต็ม
                                                        </span>
                                                    </div>
                                                </div>
                                                {img.caption && (
                                                    <div className="p-3.5 bg-surface/40 text-xs text-forest/80 font-reading border-t border-forest/5 flex items-start gap-2">
                                                        <span className="text-primary font-black mt-0.5">•</span>
                                                        <span className="line-clamp-2 leading-relaxed">{img.caption}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Tags List */}
                            {article.tags?.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-forest/10">
                                    <div className="text-xs font-bold text-forest/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Tag className="w-3.5 h-3.5 text-primary" />
                                        <span>แท็กที่เกี่ยวข้อง</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3.5 py-1.5 rounded-full bg-surface text-xs font-bold text-forest/70 hover:bg-primary hover:text-white transition-all cursor-pointer border border-forest/5"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Author Bio Box */}
                            <div className="mt-12 p-6 sm:p-8 bg-[#FAF9F5] rounded-3xl border border-forest/10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                <div className="w-16 h-16 rounded-full bg-forest text-primary font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
                                    NT
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">เกี่ยวกับผู้เขียน</div>
                                    <h4 className="text-lg font-bold font-heading text-forest mb-2">ทีมงานน่องตึง (Nongtung Local Adventure Team)</h4>
                                    <p className="text-sm text-forest/70 font-reading leading-relaxed">
                                        กลุ่มคนรุ่นใหม่ในเชียงใหม่ผู้หลงรักการวิ่งเทรล แคมป์ปิ้ง และสำรวจขุนเขาภาคเหนือ เราถ่ายทอดข้อมูลจริงจากหน้างาน เพื่อให้ทุกคนออกไปสัมผัสธรรมชาติอย่างปลอดภัย สบายใจ และได้รับความสุขที่สุด
                                    </p>
                                </div>
                            </div>

                            {/* In-Article Conversion Call-to-Action */}
                            <div className="mt-12 bg-gradient-to-br from-forest to-[#3a3f32] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="relative z-10">
                                    <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4">
                                        🌲 วางแผนเที่ยวเชียงใหม่
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-black font-heading mb-3 leading-snug">
                                        อยากจัดทริป หรือปรึกษาแผนเที่ยวกับน่องตึง?
                                    </h3>
                                    <p className="text-white/70 text-sm sm:text-base font-reading max-w-xl mb-8 leading-relaxed">
                                        ไม่ว่าจะเป็นทริปเดินป่าส่วนตัว จอยทริปยอดดอย รถตู้ VIP พร้อมคนขับชำนาญทาง หรือเช่าเต็นท์อุปกรณ์แคมป์ปิ้งสะอาดพร้อมใช้งาน ทักคุยกับเราได้เลยครับ
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <a
                                            href="https://line.me/R/ti/p/@nongtungrunning"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#06C755] hover:bg-[#05b34c] text-white font-bold px-7 py-3.5 rounded-full text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                                        >
                                            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                                            </svg>
                                            <span>คุยกับทีมงานทาง LINE: @nongtungrunning</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </a>

                                        <Link
                                            href="/trips"
                                            className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-full text-sm border border-white/20 transition-all flex items-center gap-2"
                                        >
                                            <span>ดูโปรแกรมทริปทั้งหมด</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Prev / Next Articles Navigation */}
                            {(prevArticle || nextArticle) && (
                                <div className="mt-12 pt-8 border-t border-forest/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {prevArticle ? (
                                        <Link
                                            href={`/articles/${prevArticle.slug}`}
                                            className="group p-5 bg-surface hover:bg-white rounded-2xl border border-forest/5 transition-all text-left block"
                                        >
                                            <div className="text-[11px] font-bold text-forest/40 uppercase tracking-wider mb-1 flex items-center gap-1 group-hover:text-primary transition-colors">
                                                <ChevronLeft className="w-3.5 h-3.5" /> บทความก่อนหน้า
                                            </div>
                                            <div className="font-bold font-heading text-forest text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                {prevArticle.title}
                                            </div>
                                        </Link>
                                    ) : <div />}

                                    {nextArticle ? (
                                        <Link
                                            href={`/articles/${nextArticle.slug}`}
                                            className="group p-5 bg-surface hover:bg-white rounded-2xl border border-forest/5 transition-all text-right block"
                                        >
                                            <div className="text-[11px] font-bold text-forest/40 uppercase tracking-wider mb-1 flex items-center justify-end gap-1 group-hover:text-primary transition-colors">
                                                บทความถัดไป <ChevronRight className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="font-bold font-heading text-forest text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                {nextArticle.title}
                                            </div>
                                        </Link>
                                    ) : <div />}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Sidebar */}
                    <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
                        
                        {/* 1. Desktop Table of Contents (Sticky) */}
                        {toc.length > 0 && (
                            <div className="hidden lg:block sticky top-28 bg-white rounded-3xl p-6 border border-forest/5 shadow-sm">
                                <div className="flex items-center gap-2 font-bold text-forest text-sm uppercase tracking-wider pb-3 mb-4 border-b border-forest/5">
                                    <List className="w-4 h-4 text-primary" />
                                    <span>สารบัญเนื้อหา</span>
                                </div>

                                <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                                    {toc.map((item, idx) => {
                                        const isActive = activeSection === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-reading transition-all flex items-start gap-2.5 ${
                                                    isActive
                                                        ? 'bg-primary/10 text-primary font-bold'
                                                        : 'text-forest/70 hover:bg-surface hover:text-forest'
                                                }`}
                                            >
                                                <span className={`shrink-0 text-[10px] font-mono mt-0.5 ${isActive ? 'text-primary' : 'text-forest/40'}`}>
                                                    {String(idx + 1).padStart(2, '0')}.
                                                </span>
                                                <span className="line-clamp-2">{item.text}</span>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        )}

                        {/* 2. Fast Consultation CTA Card */}
                        <div className="bg-[#FAF9F5] rounded-3xl p-6 border border-forest/10 shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold font-heading text-forest text-base mb-1">
                                วางแผนเที่ยวเชียงใหม่?
                            </h4>
                            <p className="text-xs text-forest/70 font-reading mb-5 leading-relaxed">
                                ทีมงานพร้อมให้คำแนะนำเรื่องเส้นทางเทรล สภาพอากาศ และจุดกางเต็นท์แบบ Exclusive
                            </p>
                            <a
                                href="https://line.me/R/ti/p/@nongtungrunning"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-4 rounded-full text-xs flex items-center justify-center gap-2 shadow-md transition-all mb-2"
                            >
                                <span>คุยกับไกด์ทาง LINE</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <div className="text-[11px] text-forest/50 font-medium">LINE ID: @nongtungrunning</div>
                        </div>

                        {/* 3. Featured Trip Card */}
                        {relatedTrip && (
                            <div className="bg-white rounded-3xl overflow-hidden border border-forest/5 shadow-sm group hover:shadow-md transition-all">
                                <div className="relative aspect-[16/10] bg-forest">
                                    <Image
                                        src={relatedTrip.image || article.coverImage}
                                        alt={relatedTrip.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black uppercase text-forest tracking-wider">
                                        ทริปแนะนำ
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-forest/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-primary">
                                        ฿{relatedTrip.price?.toLocaleString()}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-forest/50 mb-1">
                                        <span>{relatedTrip.duration || '2D1N'}</span>
                                        <span>•</span>
                                        <span className="text-primary">{relatedTrip.difficulty || 'Moderate'}</span>
                                    </div>
                                    <h4 className="font-bold font-heading text-forest text-sm line-clamp-2 mb-3">
                                        {relatedTrip.title}
                                    </h4>
                                    <Link
                                        href={`/trips/${relatedTrip.id}`}
                                        className="w-full bg-surface hover:bg-forest hover:text-white text-forest font-bold py-2.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 transition-all border border-forest/5"
                                    >
                                        <span>ดูรายละเอียดทริป</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* 4. Interactive Trekking Map Card */}
                        {article.mapCoordinates && (
                            <div className="bg-white rounded-3xl overflow-hidden border border-forest/5 shadow-sm">
                                <div className="p-4 border-b border-forest/5 flex items-center justify-between">
                                    <div className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        <span>แผนที่พิกัดเส้นทาง</span>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <div className="h-56 relative">
                                    <TrekkingMap
                                        start={article.mapCoordinates.start}
                                        end={article.mapCoordinates.end}
                                        route={article.mapCoordinates.end ? [article.mapCoordinates.start, article.mapCoordinates.end] : undefined}
                                        zoom={article.mapCoordinates.zoom || 14}
                                    />
                                </div>
                                <div className="p-4 bg-surface text-xs text-forest/70 font-medium">
                                    พิกัด: {article.mapCoordinates.start[0].toFixed(4)}, {article.mapCoordinates.start[1].toFixed(4)}
                                </div>
                            </div>
                        )}

                    </aside>
                </div>

                {/* BOTTOM SECTION: Related Articles Grid */}
                {relatedArticles.length > 0 && (
                    <section className="mt-20 pt-12 border-t border-forest/10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
                                    NONGTUNG JOURNAL
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest">
                                    บทความที่คุณอาจสนใจ
                                </h2>
                            </div>
                            <Link
                                href="/articles"
                                className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1 group"
                            >
                                <span>ดูบทความทั้งหมด</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.slug}
                                    href={`/articles/${rel.slug}`}
                                    className="group bg-white rounded-3xl overflow-hidden border border-forest/5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-forest">
                                        <Image
                                            src={rel.coverImage || '/videos/reel-1-cover.jpg'}
                                            alt={rel.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {rel.tags?.[0] && (
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-forest">
                                                {rel.tags[0]}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 text-[11px] text-forest/50 mb-2">
                                                <span>{rel.date}</span>
                                                <span>•</span>
                                                <span>{rel.readingTime || '10 min'}</span>
                                            </div>
                                            <h3 className="font-bold font-heading text-forest text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                                {rel.title}
                                            </h3>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-forest/5 flex items-center text-xs font-bold text-primary">
                                            <span>อ่านต่อ</span>
                                            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Fullscreen Lightbox Modal */}
            {mounted && lightboxOpen && createPortal(
                <div
                    className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none touch-none"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                        className="absolute top-6 right-6 z-[999999] w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-lg"
                        aria-label="Close Lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Prev / Next controls */}
                    {allDisplayImages.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-[999999] w-12 h-12 rounded-full bg-black/50 hover:bg-primary text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                                aria-label="Previous Image"
                            >
                                <ChevronLeft className="w-7 h-7" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-[999999] w-12 h-12 rounded-full bg-black/50 hover:bg-primary text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                                aria-label="Next Image"
                            >
                                <ChevronRight className="w-7 h-7" />
                            </button>
                        </>
                    )}

                    {/* Active Image Container */}
                    <div
                        className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={allDisplayImages[activeImageIndex]?.url || article.coverImage}
                            alt={allDisplayImages[activeImageIndex]?.caption || article.title}
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 1200px) 95vw, 1200px"
                        />
                    </div>

                    {/* Caption & Counter Bar */}
                    <div
                        className="mt-4 max-w-2xl text-center px-4 z-[999999]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {allDisplayImages[activeImageIndex]?.caption && (
                            <p className="text-white/90 text-sm sm:text-base font-reading mb-2 leading-relaxed">
                                {allDisplayImages[activeImageIndex].caption}
                            </p>
                        )}
                        <div className="inline-block bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full font-mono">
                            {activeImageIndex + 1} / {allDisplayImages.length}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
