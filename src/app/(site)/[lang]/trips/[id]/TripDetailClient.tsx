'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import {
    ChevronLeft,
    ChevronRight,
    Share2,
    Check,
    Copy,
    MapPin,
    Clock,
    Users,
    Shield,
    ShieldCheck,
    MessageCircle,
    Phone,
    Sparkles,
    Calendar,
    Mountain,
    Camera,
    Tent,
    Compass,
    CheckCircle2,
    XCircle,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    SunMedium,
    Backpack,
    AlertCircle,
    ArrowRight,
    ExternalLink,
    Maximize2,
    X,
    Mail
} from 'lucide-react';
import { Trip } from '@/types/types';
import { Locale } from '@/i18n-config';
import TripCard from '@/components/TripCard';
import { trackLeadConversion, trackViewItem, trackItineraryInteraction } from '@/lib/analytics';

interface TripDetailClientProps {
    trip: Trip;
    lang: Locale;
    dict: any;
    facebookUrl: string;
    messengerUrl: string;
    relatedTrips: Trip[];
}

export default function TripDetailClient({
    trip,
    lang,
    dict,
    facebookUrl,
    messengerUrl,
    relatedTrips,
}: TripDetailClientProps) {
    const t = dict?.TripDetails || {};
    const [copied, setCopied] = useState(false);
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    // Lightbox modal state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Combine main cover + gallery for the mosaic
    const allGalleryImages = [
        trip.image,
        ...(Array.isArray(trip.gallery) ? trip.gallery : [])
    ].filter(Boolean);

    // Lightbox keyboard controls
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
    }, []);

    const nextImage = useCallback(() => {
        setLightboxIndex((prev) => (prev + 1) % allGalleryImages.length);
    }, [allGalleryImages.length]);

    const prevImage = useCallback(() => {
        setLightboxIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);
    }, [allGalleryImages.length]);

    useEffect(() => {
        if (!lightboxOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

    // Itinerary Lightbox modal state (for Day 1, 2, 3 photos)
    const [itineraryLightbox, setItineraryLightbox] = useState<{
        images: string[];
        index: number;
        dayLabel: string;
    } | null>(null);

    const openItineraryPhoto = (images: string[], index: number, dayLabel: string) => {
        trackItineraryInteraction(dayLabel, 'open_lightbox');
        setItineraryLightbox({ images, index, dayLabel });
    };

    const closeItineraryPhoto = useCallback(() => {
        setItineraryLightbox(null);
    }, []);

    const nextItineraryPhoto = useCallback(() => {
        setItineraryLightbox((prev) =>
            prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
        );
    }, []);

    const prevItineraryPhoto = useCallback(() => {
        setItineraryLightbox((prev) =>
            prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null
        );
    }, []);

    useEffect(() => {
        if (!itineraryLightbox) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeItineraryPhoto();
            if (e.key === 'ArrowRight') nextItineraryPhoto();
            if (e.key === 'ArrowLeft') prevItineraryPhoto();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [itineraryLightbox, closeItineraryPhoto, nextItineraryPhoto, prevItineraryPhoto]);

    // GA4 Track Trip View
    useEffect(() => {
        trackViewItem({
            itemId: trip.id,
            itemName: trip.title,
            price: trip.price,
            itemCategory: trip.type,
        });
    }, [trip.id, trip.title, trip.price, trip.type]);

    // Handle Share
    const handleShare = async () => {
        if (typeof window === 'undefined') return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${trip.title} | Nongtung Adventure`,
                    text: trip.subtitle || trip.description?.substring(0, 100),
                    url: window.location.href,
                });
                return;
            } catch (err) {
                // fall through to clipboard copy
            }
        }
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    // International language check (EN or ZH)
    const isInter = lang === 'en' || lang === 'zh';

    // Pre-filled booking link (localized)
    const lineBookingText = isInter
        ? `Hello! I'm interested in booking the trip: ${trip.title} (${trip.duration})`
        : `สวัสดีครับ สนใจจองทริป: ${trip.title} (${trip.duration})`;
    const lineBookingUrl = `https://line.me/R/ti/p/@nongtungrunning?text=${encodeURIComponent(lineBookingText)}`;

    // Trip-specific Email Inquiry link (English for EN/ZH, friendly Thai with ฉัน for TH)
    const contactEmail = 'tripntrail.cnx@gmail.com';
    const emailSubject = isInter
        ? `Inquiry & Booking Request: ${trip.title} (${trip.duration})`
        : `สอบถามข้อมูลและจองทริป: ${trip.title} (${trip.duration})`;

    const emailBody = isInter
        ? `Hi Nongtung Adventure Team,

I'm interested in this trip and would like to inquire about details & availability:
• Trip: ${trip.title} (${trip.duration})
• Package Price: ฿${trip.price.toLocaleString()} / person
• Trip Type: ${trip.type === 'private' ? 'Private Group' : 'Join-in Group'}
• Location: ${trip.location}
• Difficulty: ${trip.difficulty}

My Contact & Booking Details:
- Contact Name: 
- Phone Number / WhatsApp: 
- LINE ID / WeChat (optional): 
- Preferred Travel Date: 
- Number of Travelers: ___ person(s)
- Questions / Special Requests: 

Thank you!`
        : `สวัสดีทีมงาน Nongtung Adventure,

ฉันสนใจทริปนี้และอยากสอบถามรายละเอียดเพิ่มเติม:
• ทริป: ${trip.title} (${trip.duration})
• ราคา: ฿${trip.price.toLocaleString()} / ท่าน
• รูปแบบ: ${trip.type === 'private' ? 'ทริปส่วนตัว' : 'จอยทริป'}
• สถานที่: ${trip.location}
• ระดับความยาก: ${trip.difficulty}

ข้อมูลติดต่อและรายละเอียดของฉัน:
- ชื่อผู้ติดต่อ: 
- เบอร์โทรศัพท์: 
- LINE ID (ถ้ามี): 
- วันที่ที่สะดวกออกเดินทาง: 
- จำนวนผู้ร่วมเดินทาง: ___ ท่าน
- สิ่งที่อยากสอบถามเพิ่มเติม: 

ขอบคุณครับ/ค่ะ`;

    const emailInquiryUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Default smart specs if not explicitly filled by admin
    const meetingPoint = trip.meetingPoint || 'ตัวเมืองเชียงใหม่ / ปั๊ม ปตท. สนามบินเชียงใหม่';
    const bestSeason = trip.bestSeason || 'ตุลาคม – กุมภาพันธ์ (ฤดูหนาว & ทะเลหมอก)';
    const distanceKm = trip.distanceKm || '6 - 12 กม. (ปรับตามความพร้อมผู้ร่วมทริป)';
    const elevationGain = trip.elevationGain || '1,600+ ม. จากระดับน้ำทะเล';
    const fitnessLevel = trip.fitnessLevel || 'มือใหม่เดินได้สบาย / สุขภาพแข็งแรงทั่วไป';

    // Default Packing list
    const packingList = (trip.packingList && trip.packingList.length > 0)
        ? trip.packingList
        : [
            'รองเท้าเดินป่า หรือรองเท้าผ้าใบดอกยางลึกสำหรับเกาะพื้นดิน',
            'เสื้อกันหนาว / เสื้อกันลม (อุณหภูมิบนยอดดอยช่วงเช้า 12-18°C)',
            'ไฟฉายคาดหัว (Headlamp) หรือไฟฉายพกพาสำหรับช่วงเช้ามืด',
            'ยาส่วนตัว, ยาแก้แพ้ และสเปรย์กันยุง/แมลง',
            'ถุงกันน้ำ (Dry Bag) หรือถุงซิปล็อคสำหรับโทรศัพท์และกล้อง',
            'กระบอกน้ำดื่มส่วนตัว หรือถุงน้ำ (Hydration Pack)',
            'เพาเวอร์แบงค์ (Power Bank) สำหรับชาร์จอุปกรณ์ตลอดทริป',
            'เสื้อผ้าแห้งไว (Quick-dry) สำหรับผลัดเปลี่ยน'
        ];

    // Default FAQs
    const faqs = (trip.faqs && trip.faqs.length > 0)
        ? trip.faqs
        : [
            {
                question: 'มือใหม่ไม่มีประสบการณ์เดินป่ามาก่อน สามารถเข้าร่วมได้ไหม?',
                answer: 'ไปได้แน่นอนครับ! ทริปของน่องตึงมีทีมงานและไกด์ท้องถิ่นคอยดูแลตลอดเส้นทาง ไม่เร่งฝีเท้า มีจุดพักถ่ายรูปและชมวิวอย่างเพียงพอ เหมาะสำหรับผู้ที่ต้องการเริ่มต้นสัมผัสธรรมชาติอย่างแท้จริง'
            },
            {
                question: 'บนดอยหรือจุดพักแรมมีสัญญาณโทรศัพท์และจุดชาร์จแบตไหม?',
                answer: 'จุดชมวิวหลักบางจุดมีสัญญาณเครือข่าย AIS และ True แต่ในหุบเขาอาจมีจุดอับสัญญาณเป็นช่วงๆ แนะนำให้เตรียม Power Bank ความจุ 10,000–20,000 mAh เพื่อใช้งานตลอดทริปครับ'
            },
            {
                question: 'ห้องน้ำและสิ่งอำนวยความสะดวกในทริปเป็นอย่างไร?',
                answer: 'มีห้องน้ำและจุดบริการสุขาพื้นฐานของชุมชนหรืออุทยานฯ พร้อมน้ำสะอาด และทีมงานจัดเตรียมน้ำดื่มสะอาดรวมถึงอาหารปรุงสุก สะอาด ถูกสุขอนามัยครบทุกมื้อตามโปรแกรม'
            },
            {
                question: 'การเดินทางและจุดนัดพบในวันแรกเริ่มกี่โมง?',
                answer: `จุดนัดพบคือ ${meetingPoint} โดยปกติเริ่มนัดพบเวลา 07:30 - 08:30 น. ของวันแรก (หรือตามที่ตกลงกันล่วงหน้า) เพื่อเริ่มออกเดินทางด้วยรถตู้ VIP ปรับอากาศ`
            }
        ];

    const itinerary = trip.itinerary || [];
    const highlights = trip.highlights || [];
    const whatsIncluded = trip.whatsIncluded || [];
    const notIncluded = trip.notIncluded || [];

    return (
        <div className="bg-[#fdfdfb] text-forest min-h-screen pb-32">
            {/* 1. TOP BREADCRUMB & UTILITY BAR */}
            <div className="border-b border-forest/5 bg-white/80 backdrop-blur-md sticky top-16 sm:top-20 z-30 transition-all">
                <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    <nav className="flex items-center gap-2 text-xs font-heading font-medium text-forest-light truncate">
                        <Link href={`/${lang}`} className="hover:text-primary transition-colors">
                            หน้าแรก
                        </Link>
                        <span className="text-forest/20">/</span>
                        <Link href={`/${lang}/trips`} className="hover:text-primary transition-colors">
                            ทริปเที่ยว
                        </Link>
                        <span className="text-forest/20">/</span>
                        <span className="text-forest font-bold truncate max-w-[200px] sm:max-w-md">
                            {trip.title}
                        </span>
                    </nav>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold text-forest bg-surface hover:bg-forest hover:text-white transition-all border border-forest/10 active:scale-95 cursor-pointer"
                            title="แชร์ทริปนี้"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                    <span className="text-green-600 font-bold">คัดลอกลิงก์แล้ว!</span>
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-3.5 h-3.5 text-primary" />
                                    <span className="hidden sm:inline">แชร์ทริป</span>
                                </>
                            )}
                        </button>

                        <Link
                            href={`/${lang}/trips`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-heading font-bold text-forest/70 hover:text-forest hover:bg-surface transition-all border border-transparent"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">กลับหน้ารวมทริป</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. PHOTO MOSAIC & HERO HEADER */}
            <section className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
                {/* Header Titles */}
                <div className="max-w-4xl mb-6 sm:mb-8">
                    {/* Status & Category Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {trip.duration}
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-heading font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {trip.status === 'available' ? 'พร้อมให้บริการ (เปิดรับจอง)' : trip.status === 'limited' ? 'ที่นั่งใกล้เต็ม' : 'เต็มแล้ว'}
                        </span>
                        <span className="bg-surface text-forest-light border border-forest/10 px-3 py-1 rounded-full text-xs font-heading font-medium">
                            {trip.type === 'private' ? 'ทริปส่วนตัว (Private)' : 'จอยทริป (Join-in Group)'}
                        </span>
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-heading font-bold flex items-center gap-1">
                            <Mountain className="w-3.5 h-3.5 text-amber-600" />
                            ระดับ {trip.difficulty}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-forest leading-[1.12] tracking-tight">
                        {trip.title}
                    </h1>

                    {trip.subtitle && (
                        <p className="mt-3 text-base sm:text-lg md:text-xl text-forest-light font-reading leading-relaxed font-normal">
                            {trip.subtitle}
                        </p>
                    )}

                    <div className="flex items-center gap-2 mt-4 text-xs sm:text-sm text-forest-light font-heading">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-bold text-forest">{trip.location || 'เชียงใหม่'}</span>
                        <span className="text-forest/30">•</span>
                        <span>ดูแลโดยทีมงานน่องตึง ไกด์ท้องถิ่นชำนาญทาง</span>
                    </div>
                </div>

                {/* Photo Mosaic Gallery */}
                <div className="relative rounded-3xl overflow-hidden border border-forest/10 impeccable-card-shadow bg-surface">
                    {allGalleryImages.length >= 5 ? (
                        /* 5-image luxe mosaic */
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[440px] md:h-[500px]">
                            {/* Main Large Hero Image (Left 50%) */}
                            <div
                                onClick={() => openLightbox(0)}
                                className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden"
                            >
                                <Image
                                    src={allGalleryImages[0]}
                                    alt={trip.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* 4 Small Images Grid (Right 50%) */}
                            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
                                {allGalleryImages.slice(1, 5).map((imgUrl, idx) => {
                                    const imageIndex = idx + 1;
                                    const isLast = idx === 3;
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => openLightbox(imageIndex)}
                                            className="relative h-full cursor-pointer group overflow-hidden"
                                        >
                                            <Image
                                                src={imgUrl}
                                                alt={`${trip.title} รูปที่ ${imageIndex + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="25vw"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                                            {/* Show "View all photos" button on the 5th tile */}
                                            {isLast && (
                                                <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-2 text-center text-white backdrop-blur-[2px] hover:bg-black/55 transition-colors">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Camera className="w-5 h-5 text-white" />
                                                        <span className="text-xs font-black font-heading uppercase tracking-wider">
                                                            ดูภาพทั้งหมด ({allGalleryImages.length} รูป)
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Single or few photos presentation */
                        <div
                            onClick={() => openLightbox(0)}
                            className="relative h-[300px] sm:h-[420px] md:h-[480px] cursor-pointer group overflow-hidden"
                        >
                            <Image
                                src={trip.image}
                                alt={trip.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                                sizes="100vw"
                            />
                            {allGalleryImages.length > 1 && (
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
                                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-forest text-xs font-heading font-black px-4 py-2 rounded-full border border-forest/10 shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                                >
                                    <Camera className="w-4 h-4 text-primary" />
                                    ดูรูปทั้งหมด ({allGalleryImages.length} รูป)
                                </button>
                            )}
                        </div>
                    )}

                    {/* Mobile "View All Photos" pill button */}
                    <button
                        type="button"
                        onClick={() => openLightbox(0)}
                        className="md:hidden absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-heading font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{allGalleryImages.length} รูป</span>
                    </button>
                </div>
            </section>

            {/* 3. KEY ADVENTURE SPECS MATRIX (6 Pill Cards) */}
            <section className="container mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
                <div className="bg-white rounded-3xl p-5 sm:p-7 border border-forest/10 impeccable-card-shadow">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 divide-forest/5">
                        {/* 1. Duration */}
                        <div className="flex flex-col gap-1.5 pt-2 sm:pt-0">
                            <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-widest flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                ระยะเวลาทริป
                            </span>
                            <span className="text-sm sm:text-base font-bold font-heading text-forest">
                                {trip.duration === '1D' ? '1 วัน (One Day)' : trip.duration === '2D1N' ? '2 วัน 1 คืน' : '3 วัน 2 คืนขึ้นไป'}
                            </span>
                        </div>

                        {/* 2. Difficulty */}
                        <div className="flex flex-col gap-1.5 pt-2 sm:pt-0">
                            <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-widest flex items-center gap-1">
                                <Mountain className="w-3.5 h-3.5 text-primary" />
                                ระดับความยาก
                            </span>
                            <span className="text-sm sm:text-base font-bold font-heading text-forest flex items-center gap-1">
                                {trip.difficulty}
                                <span className="text-xs text-forest/40 font-normal">
                                    {trip.difficulty === 'Easy' ? '(เดินสบาย)' : trip.difficulty === 'Moderate' ? '(ปานกลาง)' : '(ท้าทาย)'}
                                </span>
                            </span>
                        </div>

                        {/* 3. Meeting Point */}
                        <div className="flex flex-col gap-1.5 pt-2 sm:pt-0">
                            <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-widest flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                จุดนัดพบ
                            </span>
                            <span className="text-xs sm:text-sm font-bold font-heading text-forest truncate" title={meetingPoint}>
                                {meetingPoint}
                            </span>
                        </div>

                        {/* 4. Best Season */}
                        <div className="flex flex-col gap-1.5 pt-2 sm:pt-0">
                            <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-widest flex items-center gap-1">
                                <SunMedium className="w-3.5 h-3.5 text-primary" />
                                ช่วงที่แนะนำ
                            </span>
                            <span className="text-xs sm:text-sm font-bold font-heading text-forest truncate" title={bestSeason}>
                                {bestSeason}
                            </span>
                        </div>

                        {/* 5. Elevation / Distance */}
                        <div className="flex flex-col gap-1.5 pt-2 sm:pt-0">
                            <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-widest flex items-center gap-1">
                                <Compass className="w-3.5 h-3.5 text-primary" />
                                ความสูง / ระยะทาง
                            </span>
                            <span className="text-xs sm:text-sm font-bold font-heading text-forest">
                                {elevationGain || distanceKm}
                            </span>
                        </div>

                        {/* 6. Group Type */}
                        <div className="flex flex-col gap-1.5 pt-2 sm:pt-0">
                            <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-widest flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-primary" />
                                รูปแบบการเดินทาง
                            </span>
                            <span className="text-sm sm:text-base font-bold font-heading text-forest">
                                {trip.type === 'private' ? 'กลุ่มส่วนตัว (Private)' : 'กลุ่มจอย (Join Group)'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. MAIN CONTENT & STICKY BOOKING CONCIERGE */}
            <section className="container mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* LEFT COLUMN: THE STORY & SPECS (8 COLS) */}
                    <div className="lg:col-span-8 space-y-10 sm:space-y-14">
                        {/* Section: Overview & Story */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 impeccable-card-shadow">
                            <div className="flex items-center gap-2 text-xs font-black font-heading text-primary uppercase tracking-[0.2em] mb-2">
                                <Compass className="w-4 h-4" />
                                <span>Overview & Experience</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest mb-6">
                                เรื่องราวและบรรยากาศของทริป
                            </h2>

                            <div className="prose prose-forest max-w-none text-forest/85 font-reading text-base sm:text-lg leading-relaxed whitespace-pre-line border-l-4 border-primary pl-4 sm:pl-6 bg-surface/50 py-4 pr-4 rounded-r-2xl">
                                {trip.description || 'มาร่วมสัมผัสความงามของธรรมชาติภาคเหนือกับเส้นทางที่คัดสรรมาอย่างพิถีพิถัน'}
                            </div>

                            {/* Tags */}
                            {trip.tags && trip.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-forest/5">
                                    {trip.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-surface text-forest/70 px-3 py-1 rounded-full text-xs font-heading font-medium border border-forest/10"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: Highlights */}
                        {highlights.length > 0 && (
                            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 impeccable-card-shadow">
                                <div className="flex items-center gap-2 text-xs font-black font-heading text-primary uppercase tracking-[0.2em] mb-2">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Highlights</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest mb-6">
                                    จุดเด่นที่ไม่ควรพลาดในเส้นทางนี้
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {highlights.map((highlight, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#faf9f5] border border-forest/5 hover:border-primary/20 transition-all group"
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm sm:text-base font-bold font-heading text-forest leading-snug">
                                                    {highlight}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Section: Timeline Itinerary */}
                        {itinerary.length > 0 && (
                            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 impeccable-card-shadow">
                                <div className="flex items-center gap-2 text-xs font-black font-heading text-primary uppercase tracking-[0.2em] mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Itinerary Timeline</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest mb-4">
                                    กำหนดการเดินทางแบบละเอียด
                                </h2>
                                <p className="text-sm text-forest-light font-reading mb-6">
                                    ตารางเวลาอาจมีการปรับเปลี่ยนตามสภาพอากาศและการจราจร เพื่อความปลอดภัยสูงสุดของผู้ร่วมเดินทาง
                                </p>

                                {/* Day Selector Tabs if more than 1 day */}
                                {itinerary.length > 1 && (
                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                                        {itinerary.map((dayItem, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setActiveDayIndex(idx)}
                                                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-black transition-all shrink-0 cursor-pointer ${
                                                    activeDayIndex === idx
                                                        ? 'bg-forest text-white shadow-md'
                                                        : 'bg-surface hover:bg-forest/10 text-forest-light border border-forest/10'
                                                }`}
                                            >
                                                {dayItem.day}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Selected Day Content Card */}
                                {itinerary[activeDayIndex] && (() => {
                                    const currentDay = itinerary[activeDayIndex];
                                    const dayImages = currentDay.images && currentDay.images.length > 0 ? currentDay.images : [];
                                    const hasImages = dayImages.length > 0;

                                    return (
                                        <div className="bg-[#faf9f5] rounded-3xl p-6 sm:p-8 border border-forest/5 shadow-sm transition-all">
                                            {/* Day Header */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-forest/10">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-primary text-white text-xs font-black font-heading px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                        {currentDay.day}
                                                    </span>
                                                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-forest">
                                                        {currentDay.title}
                                                    </h3>
                                                </div>
                                                {hasImages && (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-forest/70 bg-white px-3 py-1.5 rounded-full border border-forest/10 shadow-xs">
                                                        <Camera className="w-3.5 h-3.5 text-primary" />
                                                        <span>{dayImages.length} ภาพบรรยากาศ</span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Content Body: Timeline Schedule & Photo Gallery */}
                                            <div className={`grid grid-cols-1 ${hasImages ? 'lg:grid-cols-12 gap-8 items-start' : 'gap-6'}`}>
                                                {/* Left: Schedule Details */}
                                                <div className={hasImages ? 'lg:col-span-7' : 'w-full'}>
                                                    <div className="text-forest/85 font-reading text-sm sm:text-base leading-relaxed whitespace-pre-line pl-4 sm:pl-5 border-l-2 border-primary/40 space-y-2">
                                                        {currentDay.desc}
                                                    </div>
                                                </div>

                                                {/* Right: Day Photos Gallery Grid */}
                                                {hasImages && (
                                                    <div className="lg:col-span-5 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-xs font-heading font-bold text-forest/70 uppercase tracking-wider flex items-center gap-1.5">
                                                                <Camera className="w-3.5 h-3.5 text-primary" />
                                                                <span>ภาพไฮไลท์ประจำวัน</span>
                                                            </div>
                                                            <span className="text-[11px] font-reading text-forest/50">คลิกเพื่อดูภาพขยาย</span>
                                                        </div>

                                                        {/* Dynamic Layout based on count */}
                                                        {dayImages.length === 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => openItineraryPhoto(dayImages, 0, currentDay.day)}
                                                                className="group/img relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-forest/5 border border-forest/10 shadow-sm cursor-pointer block text-left"
                                                            >
                                                                <Image
                                                                    src={dayImages[0]}
                                                                    alt={`${currentDay.day} photo`}
                                                                    fill
                                                                    className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                                                                    <div className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-forest p-2.5 rounded-full shadow-lg backdrop-blur-xs">
                                                                        <Maximize2 className="w-4 h-4 text-forest" />
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        )}

                                                        {dayImages.length === 2 && (
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {dayImages.map((img, idx) => (
                                                                    <button
                                                                        key={idx}
                                                                        type="button"
                                                                        onClick={() => openItineraryPhoto(dayImages, idx, currentDay.day)}
                                                                        className="group/img relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest/5 border border-forest/10 shadow-sm cursor-pointer block"
                                                                    >
                                                                        <Image
                                                                            src={img}
                                                                            alt={`${currentDay.day} photo ${idx + 1}`}
                                                                            fill
                                                                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                                            sizes="(max-width: 1024px) 50vw, 20vw"
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                                                                            <div className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-forest p-2 rounded-full shadow-lg">
                                                                                <Maximize2 className="w-3.5 h-3.5 text-forest" />
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {dayImages.length === 3 && (
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openItineraryPhoto(dayImages, 0, currentDay.day)}
                                                                    className="group/img relative col-span-2 aspect-[16/9] rounded-2xl overflow-hidden bg-forest/5 border border-forest/10 shadow-sm cursor-pointer block"
                                                                >
                                                                    <Image
                                                                        src={dayImages[0]}
                                                                        alt={`${currentDay.day} photo 1`}
                                                                        fill
                                                                        className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                                                                        <div className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-forest p-2.5 rounded-full shadow-lg">
                                                                            <Maximize2 className="w-4 h-4 text-forest" />
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                                {dayImages.slice(1).map((img, idx) => (
                                                                    <button
                                                                        key={idx + 1}
                                                                        type="button"
                                                                        onClick={() => openItineraryPhoto(dayImages, idx + 1, currentDay.day)}
                                                                        className="group/img relative aspect-[4/3] rounded-xl overflow-hidden bg-forest/5 border border-forest/10 shadow-sm cursor-pointer block"
                                                                    >
                                                                        <Image
                                                                            src={img}
                                                                            alt={`${currentDay.day} photo ${idx + 2}`}
                                                                            fill
                                                                            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                                            sizes="(max-width: 1024px) 50vw, 20vw"
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                                                                            <div className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-forest p-2 rounded-full shadow-lg">
                                                                                <Maximize2 className="w-3.5 h-3.5 text-forest" />
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {dayImages.length >= 4 && (
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {dayImages.slice(0, 4).map((img, idx) => {
                                                                    const isLastSlot = idx === 3;
                                                                    const remainingCount = dayImages.length - 4;

                                                                    return (
                                                                        <button
                                                                            key={idx}
                                                                            type="button"
                                                                            onClick={() => openItineraryPhoto(dayImages, idx, currentDay.day)}
                                                                            className="group/img relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest/5 border border-forest/10 shadow-sm cursor-pointer block"
                                                                        >
                                                                            <Image
                                                                                src={img}
                                                                                alt={`${currentDay.day} photo ${idx + 1}`}
                                                                                fill
                                                                                className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                                                sizes="(max-width: 1024px) 50vw, 20vw"
                                                                            />
                                                                            {isLastSlot && remainingCount > 0 ? (
                                                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center group-hover/img:bg-black/70 transition-colors">
                                                                                    <Camera className="w-5 h-5 mb-1" />
                                                                                    <span className="text-sm font-heading font-black">+{remainingCount + 1} ภาพ</span>
                                                                                    <span className="text-[10px] text-white/80">ดูทั้งหมด</span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                                                                                    <div className="opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/90 text-forest p-2 rounded-full shadow-lg">
                                                                                        <Maximize2 className="w-3.5 h-3.5 text-forest" />
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}

                        {/* Section: Inclusions & Exclusions */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 impeccable-card-shadow">
                            <div className="flex items-center gap-2 text-xs font-black font-heading text-primary uppercase tracking-[0.2em] mb-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Inclusions & Exclusions</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest mb-6">
                                สิ่งที่รวม และ ไม่รวมในแพ็กเกจ
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {/* Included Column */}
                                <div className="bg-emerald-50/60 rounded-2xl p-6 border border-emerald-100">
                                    <div className="flex items-center gap-2 text-emerald-800 font-heading font-bold text-base mb-4">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        <span>สิ่งที่รวมในราคา (Included)</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {whatsIncluded.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-reading">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Excluded Column */}
                                <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100">
                                    <div className="flex items-center gap-2 text-rose-800 font-heading font-bold text-base mb-4">
                                        <XCircle className="w-5 h-5 text-rose-500" />
                                        <span>สิ่งที่ไม่รวมในราคา (Not Included)</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {notIncluded.length > 0 ? (
                                            notIncluded.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950 font-reading">
                                                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-xs sm:text-sm text-forest/50 font-reading italic">
                                                ไม่รวมค่าใช้จ่ายส่วนตัว และเครื่องดื่มแอลกอฮอล์
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section: Packing & Preparation Guide */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 impeccable-card-shadow">
                            <div className="flex items-center gap-2 text-xs font-black font-heading text-primary uppercase tracking-[0.2em] mb-2">
                                <Backpack className="w-4 h-4" />
                                <span>Preparation Guide</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest mb-4">
                                สิ่งที่ต้องเตรียมมาสำหรับทริปนี้
                            </h2>
                            <p className="text-sm text-forest-light font-reading mb-6">
                                แนะนำจัดสัมภาระใส่กระเป๋าเป้ขนาด 30–45 ลิตร เพื่อความคล่องตัวในการเดินป่าและการเดินทาง
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {packingList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3.5 rounded-xl bg-surface/70 border border-forest/5 text-xs sm:text-sm font-reading text-forest font-medium"
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section: FAQ */}
                        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest/10 impeccable-card-shadow">
                            <div className="flex items-center gap-2 text-xs font-black font-heading text-primary uppercase tracking-[0.2em] mb-2">
                                <HelpCircle className="w-4 h-4" />
                                <span>FAQ</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black font-heading text-forest mb-6">
                                คำถามที่พบบ่อยเกี่ยวกับทริปนี้
                            </h2>

                            <div className="space-y-3">
                                {faqs.map((faq, idx) => {
                                    const isOpen = openFaqIndex === idx;
                                    return (
                                        <div
                                            key={idx}
                                            className="rounded-2xl border border-forest/10 overflow-hidden bg-[#faf9f5] transition-all"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-forest cursor-pointer hover:bg-white/60 transition-colors"
                                            >
                                                <span>{faq.question}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-forest/40 shrink-0" />
                                                )}
                                            </button>
                                            {isOpen && (
                                                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-forest/80 font-reading leading-relaxed border-t border-forest/5 pt-3">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: STICKY CONCIERGE BOOKING CARD (4 COLS) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest/10 impeccable-card-shadow">
                            {/* Price Header */}
                            <div className="border-b border-forest/5 pb-6 text-center">
                                <span className="text-[10px] font-black font-heading text-forest/40 uppercase tracking-[0.2em] block mb-1">
                                    ราคาแพ็กเกจทริป
                                </span>
                                <div className="flex items-baseline justify-center gap-1.5 mt-1">
                                    <span className="text-xs sm:text-sm font-bold font-heading text-forest/50">เริ่มต้น</span>
                                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-primary tracking-tight">
                                        ฿{trip.price.toLocaleString()}
                                    </span>
                                    <span className="text-xs font-bold font-heading text-forest/50">/ ท่าน</span>
                                </div>
                                <p className="text-[11px] text-emerald-600 font-bold font-heading mt-1.5 flex items-center justify-center gap-1">
                                    <Check className="w-3.5 h-3.5" /> รวมภาษีและค่าธรรมเนียมตามโปรแกรม ไม่มีบวกเพิ่ม
                                </p>
                            </div>

                            {/* Trip Quick Spec Sheet */}
                            <div className="py-5 space-y-3 border-b border-forest/5 text-xs font-heading">
                                <div className="flex justify-between items-center">
                                    <span className="text-forest/50">ระยะเวลา:</span>
                                    <span className="font-bold text-forest">{trip.duration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-forest/50">สถานะการจอง:</span>
                                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        {trip.status === 'available' ? 'เปิดรับจองปกติ' : trip.status === 'limited' ? 'ใกล้เต็ม' : 'เต็มแล้ว'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-forest/50">รูปแบบกลุ่ม:</span>
                                    <span className="font-bold text-forest">{trip.type === 'private' ? 'ทริปส่วนตัว' : 'จอยทริป'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-forest/50">ระดับความยาก:</span>
                                    <span className="font-bold text-forest">{trip.difficulty}</span>
                                </div>
                            </div>

                            {/* Booking CTA Buttons */}
                            <div className="pt-6 space-y-3">
                                {/* LINE Official Direct Booking */}
                                <a
                                    href={lineBookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        trackLeadConversion({
                                            channel: 'line',
                                            tripId: trip.id,
                                            tripTitle: trip.title,
                                            value: trip.price,
                                            locationName: trip.location,
                                        });
                                    }}
                                    className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-3.5 sm:py-4 px-6 rounded-full font-black font-heading text-sm text-center flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#06c755]/20 active:scale-95"
                                >
                                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                                    </svg>
                                    <span>{isInter ? 'Book via LINE Official' : 'จองทริปผ่าน LINE Official'}</span>
                                </a>

                                {/* Email Inquiry (Tailored to current trip) */}
                                <a
                                    href={emailInquiryUrl}
                                    onClick={() => {
                                        trackLeadConversion({
                                            channel: 'quote',
                                            tripId: trip.id,
                                            tripTitle: trip.title,
                                            value: trip.price,
                                            locationName: trip.location,
                                        });
                                    }}
                                    className="w-full bg-forest hover:bg-forest-light text-white py-3 sm:py-3.5 px-6 rounded-full font-bold font-heading text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                                >
                                    <Mail className="w-4 h-4 text-primary shrink-0" />
                                    <span>{isInter ? 'Inquire via Email / Request Quote' : 'ส่งอีเมลสอบถาม / ขอใบเสนอราคา'}</span>
                                </a>

                                {/* Call Direct */}
                                <a
                                    href="tel:+66804425189"
                                    onClick={() => {
                                        trackLeadConversion({
                                            channel: 'phone',
                                            tripId: trip.id,
                                            tripTitle: trip.title,
                                            value: trip.price,
                                        });
                                    }}
                                    className="w-full bg-surface hover:bg-white text-forest/80 hover:text-forest py-2.5 px-4 rounded-full font-heading font-bold text-xs text-center flex items-center justify-center gap-2 border border-forest/10 transition-all cursor-pointer"
                                >
                                    <Phone className="w-3.5 h-3.5 text-primary" />
                                    <span>{isInter ? 'Call Our Team: +66 80 442 5189' : 'โทรปรึกษาทีมงาน: 080-442-5189'}</span>
                                </a>
                            </div>

                            {/* Trust Signals & Guarantee */}
                            <div className="mt-6 pt-6 border-t border-forest/5 space-y-2.5 text-[11px] text-forest/60 font-reading">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>มีประกันอุบัติเหตุคุ้มครองตลอดการเดินทาง</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>ทีมงานท้องถิ่นเชียงใหม่ ชำนาญทางและปฐมพยาบาลเบื้องต้น</span>
                                </div>
                            </div>
                        </div>

                        {/* Helper Concierge Box */}
                        <div className="bg-forest text-white rounded-3xl p-6 sm:p-7 relative overflow-hidden">
                            <div className="relative z-10">
                                <span className="text-[10px] font-black font-heading text-primary uppercase tracking-[0.2em] block mb-1">
                                    Custom Private Group
                                </span>
                                <h3 className="text-lg font-black font-heading leading-snug mb-2">
                                    ต้องการจัดทริปส่วนตัว หรือปรับวันเดินทาง?
                                </h3>
                                <p className="text-xs text-white/70 font-reading leading-relaxed mb-4">
                                    เราพร้อมออกแบบโปรแกรมเฉพาะกลุ่ม สำหรับเพื่อน องค์กร หรือครอบครัว พร้อมรถตู้ VIP ส่วนตัว
                                </p>
                                <a
                                    href={lineBookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-primary hover:text-white transition-colors"
                                >
                                    <span>{isInter ? 'Talk to our team for custom private trips' : 'คุยกับทีมงานเพื่อจัดทริปส่วนตัว'}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. RELATED ADVENTURES */}
            {relatedTrips && relatedTrips.length > 0 && (
                <section className="container mx-auto px-4 sm:px-6 mt-16 sm:mt-24 pt-12 border-t border-forest/5">
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                        <span className="text-[10px] font-black font-heading text-primary uppercase tracking-[0.3em] block mb-2">
                            Explore More Adventures
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black font-heading text-forest">
                            ทริปท่องเที่ยวธรรมชาติอื่นๆ ที่น่าสนใจ
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {relatedTrips.slice(0, 3).map((rTrip) => (
                            <TripCard key={rTrip.id} trip={rTrip} langPrefix={`/${lang}`} />
                        ))}
                    </div>
                </section>
            )}

            {/* 6. MOBILE STICKY BOTTOM BOOKING BAR */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-forest/10 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                <div className="container mx-auto flex items-center justify-between gap-3">
                    <div>
                        <span className="text-[10px] font-heading text-forest/40 uppercase block">เริ่มต้น</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black font-heading text-primary">
                                ฿{trip.price.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-forest/50 font-heading">/ ท่าน</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={lineBookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#06c755] text-white text-xs font-black font-heading px-5 py-3 rounded-full flex items-center gap-1.5 shadow-md active:scale-95"
                        >
                            <span>{isInter ? 'Book via LINE' : 'จองทริปผ่าน LINE'}</span>
                        </a>

                        <a
                            href={emailInquiryUrl}
                            onClick={() => {
                                trackLeadConversion({
                                    channel: 'quote',
                                    tripId: trip.id,
                                    tripTitle: trip.title,
                                    value: trip.price,
                                });
                            }}
                            className="bg-forest text-white p-3 rounded-full flex items-center justify-center active:scale-95 shadow-sm cursor-pointer"
                            title={isInter ? 'Inquire via Email / Request Quote' : 'ส่งอีเมลสอบถามข้อมูลทริปนี้'}
                        >
                            <Mail className="w-4 h-4 text-primary" />
                        </a>
                    </div>
                </div>
            </div>

            {/* 7. FULLSCREEN LIGHTBOX PORTAL */}
            {mounted && lightboxOpen && createPortal(
                <div
                    className="fixed inset-0 z-[99999] bg-black/95 flex flex-col justify-between p-4 select-none touch-none"
                    onClick={closeLightbox}
                >
                    {/* Header bar */}
                    <div className="flex items-center justify-between text-white z-10 px-2 pt-2" onClick={(e) => e.stopPropagation()}>
                        <div className="text-xs font-heading font-bold text-white/70">
                            {trip.title} • {lightboxIndex + 1} / {allGalleryImages.length}
                        </div>
                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Main Image in Viewport */}
                    <div
                        className="relative flex-grow flex items-center justify-center max-w-6xl mx-auto w-full my-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={allGalleryImages[lightboxIndex]}
                            alt={`${trip.title} ${lightboxIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                        />

                        {/* Navigation Arrows */}
                        {allGalleryImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Bottom Thumbnail Strip */}
                    {allGalleryImages.length > 1 && (
                        <div
                            className="flex justify-center gap-2 overflow-x-auto py-2 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {allGalleryImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setLightboxIndex(idx)}
                                    className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                                        lightboxIndex === idx
                                            ? 'border-primary scale-105 opacity-100'
                                            : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                                >
                                    <Image src={img} alt={`thumb ${idx}`} fill className="object-cover" sizes="56px" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>,
                document.body
            )}

            {/* Itinerary Lightbox Modal */}
            {itineraryLightbox && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
                    onClick={closeItineraryPhoto}
                >
                    {/* Top Bar */}
                    <div className="flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                            <span className="bg-primary text-white text-xs font-black font-heading px-3 py-1 rounded-full uppercase tracking-wider">
                                {itineraryLightbox.dayLabel}
                            </span>
                            <span className="text-sm text-white/80 font-heading">
                                ภาพที่ {itineraryLightbox.index + 1} จาก {itineraryLightbox.images.length}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={closeItineraryPhoto}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Main Image Stage */}
                    <div
                        className="relative flex-1 w-full max-w-5xl mx-auto my-4 flex items-center justify-center min-h-[50vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={itineraryLightbox.images[itineraryLightbox.index]}
                            alt={`${itineraryLightbox.dayLabel} photo ${itineraryLightbox.index + 1}`}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                        />

                        {/* Navigation Arrows */}
                        {itineraryLightbox.images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevItineraryPhoto}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                                    aria-label="Previous photo"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextItineraryPhoto}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                                    aria-label="Next photo"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Bottom Thumbnail Strip */}
                    {itineraryLightbox.images.length > 1 && (
                        <div
                            className="flex justify-center gap-2 overflow-x-auto py-2 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {itineraryLightbox.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setItineraryLightbox((prev) => prev ? { ...prev, index: idx } : null)}
                                    className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                                        itineraryLightbox.index === idx
                                            ? 'border-primary scale-105 opacity-100'
                                            : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                                >
                                    <Image src={img} alt={`thumb ${idx}`} fill className="object-cover" sizes="56px" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
