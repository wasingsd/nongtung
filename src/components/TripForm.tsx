'use client';

import { useState } from 'react';
import { Trip, ItineraryItem } from '@/types/types';
import { createTrip, updateTrip } from '@/app/actions/tripActions';
import { Save, Plus, X, Link as LinkIcon, RefreshCw, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { slugify } from '@/lib/utils';

interface TripFormProps {
    trip?: Trip; // Optional, if provided = edit mode
}

export default function TripForm({ trip }: TripFormProps) {
    // Basic Fields
    const [imageUrl, setImageUrl] = useState<string>(trip?.image || '');

    // Dynamic Lists
    const [highlights, setHighlights] = useState<string[]>(trip?.highlights || []);
    const [included, setIncluded] = useState<string[]>(trip?.whatsIncluded || []);
    const [notIncluded, setNotIncluded] = useState<string[]>(trip?.notIncluded || []);
    const [itinerary, setItinerary] = useState<ItineraryItem[]>(trip?.itinerary || []);
    const [packingList, setPackingList] = useState<string[]>(trip?.packingList || []);
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(trip?.faqs || []);
    const [gallery, setGallery] = useState<string[]>(trip?.gallery || []);
    const [newGalleryUrl, setNewGalleryUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [slug, setSlug] = useState(trip?.id || '');

    // Handlers for lists
    const addHighlight = () => setHighlights([...highlights, '']);
    const updateHighlight = (i: number, val: string) => {
        const newH = [...highlights];
        newH[i] = val;
        setHighlights(newH);
    };
    const removeHighlight = (i: number) => setHighlights(highlights.filter((_, idx) => idx !== i));

    const addPackingItem = () => setPackingList([...packingList, '']);
    const updatePackingItem = (i: number, val: string) => {
        const next = [...packingList];
        next[i] = val;
        setPackingList(next);
    };
    const removePackingItem = (i: number) => setPackingList(packingList.filter((_, idx) => idx !== i));

    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const updateFaq = (i: number, field: 'question' | 'answer', val: string) => {
        const next = [...faqs];
        next[i] = { ...next[i], [field]: val };
        setFaqs(next);
    };
    const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));

    // Add gallery URL
    const addGalleryUrl = () => {
        if (newGalleryUrl.trim()) {
            setGallery([...gallery, newGalleryUrl.trim()]);
            setNewGalleryUrl('');
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Serialize complex fields
            formData.append('highlights', JSON.stringify(highlights));
            formData.append('whatsIncluded', JSON.stringify(included));
            formData.append('notIncluded', JSON.stringify(notIncluded));
            formData.append('itinerary', JSON.stringify(itinerary));
            formData.append('gallery', JSON.stringify(gallery));
            formData.append('packingList', JSON.stringify(packingList));
            formData.append('faqs', JSON.stringify(faqs));
            formData.append('imageUrl', imageUrl);

            if (trip) {
                await updateTrip(trip.id, formData);
            } else {
                await createTrip(formData);
            }
        } catch (err: any) {
            // If it's a redirect, we don't want to show it as an error
            // In Next.js, redirect() throws a special error that should not be caught on the client 
            // if we want the browser to actually redirect.
            if (err.message === 'NEXT_REDIRECT' || err.digest?.startsWith('NEXT_REDIRECT')) {
                // Let the redirect happen
                return;
            }

            console.error('Submit error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
            // Scroll to top to see error
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 space-y-8 relative">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-800 font-bold">เกิดข้อผิดพลาด</p>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}
            {/* Basic Info */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-forest border-b pb-2">Basic Information</h3>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trip Title</label>
                    <input name="title" defaultValue={trip?.title} required type="text" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trip Subtitle</label>
                    <input name="subtitle" defaultValue={trip?.subtitle} placeholder="e.g. Discovery the untamed nature" type="text" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">Trip ID / Slug (สำหรับ SEO)</label>
                        <button
                            type="button"
                            onClick={() => setSlug(slugify(trip?.title || ''))}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-forest transition-colors flex items-center gap-1"
                        >
                            <RefreshCw className="w-3 h-3" /> Auto-generate from title
                        </button>
                    </div>
                    <input
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(slugify(e.target.value))}
                        required
                        type="text"
                        placeholder="เช่น hiking-doi-lang-ka-luang"
                        className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        {trip
                            ? "⚠️ การเปลี่ยน ID จะทำให้ลิงก์เก่าเข้าไม่ได้ และสร้างลิงก์ใหม่ตามที่ตั้ง (ดีต่อ SEO ถ้าใช้ Keyword)"
                            : "ใช้ตัวอักษรภาษาอังกฤษ, ตัวเลข และขีดกลาง (-) เท่านั้น เช่น my-trip-2024 (ระบบจะปรับให้อัตโนมัติ)"}
                    </p>
                    <p className="text-[10px] text-primary mt-1 font-bold">
                        URL Preview: /trips/{slug || '...'}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (฿)</label>
                        <input name="price" defaultValue={trip?.price} required type="number" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                        <input name="location" defaultValue={trip?.location} placeholder="e.g. Chiang Mai" required type="text" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                </div>

                {/* Image URL Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                    <div className="flex gap-4 items-start">
                        <div className="flex-grow">
                            <div className="flex gap-2">
                                <div className="relative flex-grow">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full border border-gray-300 rounded p-3 pl-10 focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                                💡 ใช้รูปจาก Unsplash, Imgur หรือ URL รูปภาพอื่นๆ
                            </p>
                        </div>
                        {imageUrl && (
                            <div className="relative w-24 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Gallery URLs */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">Gallery Images ({gallery.length}/10)</label>
                    </div>
                    <div className="grid grid-cols-5 gap-3 mb-4">
                        {gallery.map((url, i) => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
                                <button type="button" onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {gallery.length < 10 && (
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newGalleryUrl}
                                onChange={(e) => setNewGalleryUrl(e.target.value)}
                                placeholder="Paste image URL here..."
                                className="flex-grow border border-gray-300 rounded p-2 text-sm"
                            />
                            <button type="button" onClick={addGalleryUrl} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded flex items-center gap-2 text-sm font-bold">
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </div>
                    )}
                    {gallery.length >= 10 && (
                        <p className="text-xs text-orange-500 font-medium">✓ ครบ 10 รูปแล้ว</p>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                        <select name="duration" defaultValue={trip?.duration || '2D1N'} className="w-full border border-gray-300 rounded p-3 bg-white">
                            <option value="1D">1 Day</option>
                            <option value="2D1N">2 Days 1 Night</option>
                            <option value="3D+">3 Days +</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                        <select name="difficulty" defaultValue={trip?.difficulty || 'Moderate'} className="w-full border border-gray-300 rounded p-3 bg-white">
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                        <select name="status" defaultValue={trip?.status || 'available'} className="w-full border border-gray-300 rounded p-3 bg-white">
                            <option value="available">Available</option>
                            <option value="limited">Limited</option>
                            <option value="sold-out">Sold Out</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trip Type</label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="type" value="join" defaultChecked={trip?.type !== 'private'} />
                            <span>Join-in Group</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="type" value="private" defaultChecked={trip?.type === 'private'} />
                            <span>Private Group</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
                    <input name="tags" defaultValue={trip?.tags?.join(', ')} placeholder="Hiking, Nature" type="text" className="w-full border border-gray-300 rounded p-3" />
                </div>

                {/* Adventure Specs & Logistics */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                    <h4 className="font-bold text-forest text-sm uppercase tracking-wider">Adventure Specs & Logistics (ข้อมูลเฉพาะสำหรับหน้ารายละเอียด)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">จุดนัดพบ (Meeting Point)</label>
                            <input name="meetingPoint" defaultValue={trip?.meetingPoint} placeholder="เช่น ปั๊ม ปตท. สนามบินเชียงใหม่ หรือ ตัวเมืองเชียงใหม่" type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">ช่วงเวลาที่แนะนำ (Best Season)</label>
                            <input name="bestSeason" defaultValue={trip?.bestSeason} placeholder="เช่น ตุลาคม - กุมภาพันธ์ (ทะเลหมอก & อากาศหนาว)" type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">ระยะทางเดินเท้า (Distance)</label>
                            <input name="distanceKm" defaultValue={trip?.distanceKm} placeholder="เช่น 8 - 12 กม." type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">ความสูงยอดดอย (Elevation)</label>
                            <input name="elevationGain" defaultValue={trip?.elevationGain} placeholder="เช่น 1,850 ม. รทก." type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">ความพร้อมร่างกาย (Fitness Level)</label>
                            <input name="fitnessLevel" defaultValue={trip?.fitnessLevel} placeholder="เช่น มือใหม่เดินได้สบาย / สุขภาพแข็งแรง" type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm bg-white" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-forest border-b pb-2">Trip Details</h3>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Overview / Description</label>
                    <textarea name="description" defaultValue={trip?.description} rows={4} className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="Describe the trip..." required />
                </div>

                {/* Highlights */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">Highlights</label>
                        <button type="button" onClick={addHighlight} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1 text-primary font-bold"><Plus className="w-3 h-3" /> Add</button>
                    </div>
                    <div className="space-y-2">
                        {highlights.map((h, i) => (
                            <div key={i} className="flex gap-2">
                                <input type="text" value={h} onChange={(e) => updateHighlight(i, e.target.value)} className="flex-grow border border-gray-300 rounded p-2 text-sm" placeholder="Highlight point..." />
                                <button type="button" onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                        {highlights.length === 0 && <p className="text-sm text-gray-400 italic">No highlights added.</p>}
                    </div>
                </div>

                {/* Included / Excluded */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-green-700">What&apos;s Included</label>
                            <button type="button" onClick={() => setIncluded([...included, ''])} className="text-xs bg-green-50 hover:bg-green-100 px-2 py-1 rounded flex items-center gap-1 text-green-700 font-bold"><Plus className="w-3 h-3" /> Add</button>
                        </div>
                        <div className="space-y-2">
                            {included.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input type="text" value={item} onChange={(e) => { const n = [...included]; n[i] = e.target.value; setIncluded(n); }} className="flex-grow border border-gray-300 rounded p-2 text-sm" placeholder="Included item..." />
                                    <button type="button" onClick={() => setIncluded(included.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-red-700">Not Included</label>
                            <button type="button" onClick={() => setNotIncluded([...notIncluded, ''])} className="text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded flex items-center gap-1 text-red-700 font-bold"><Plus className="w-3 h-3" /> Add</button>
                        </div>
                        <div className="space-y-2">
                            {notIncluded.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input type="text" value={item} onChange={(e) => { const n = [...notIncluded]; n[i] = e.target.value; setNotIncluded(n); }} className="flex-grow border border-gray-300 rounded p-2 text-sm" placeholder="Excluded item..." />
                                    <button type="button" onClick={() => setNotIncluded(notIncluded.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary */}
            <section className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <div>
                        <h3 className="text-xl font-bold text-forest">Itinerary (กำหนดการเดินทาง)</h3>
                        <p className="text-xs text-gray-500">สามารถใส่รูปภาพกิจกรรมประจำวันได้มากกว่า 1 ภาพ เพื่อให้ลูกค้าเห็นบรรยากาศจริง</p>
                    </div>
                    <button type="button" onClick={() => setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, title: '', desc: '', images: [] }])} className="bg-primary text-white text-sm px-3 py-1.5 rounded hover:bg-primary-deep flex items-center gap-2 font-bold shadow-sm"><Plus className="w-4 h-4" /> Add Day</button>
                </div>

                <div className="space-y-4">
                    {itinerary.map((day, i) => (
                        <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative shadow-xs">
                            <button type="button" onClick={() => setItinerary(itinerary.filter((_, idx) => idx !== i))} className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors" title="ลบวันนี้"><X className="w-4 h-4" /></button>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                                <div className="md:col-span-1">
                                    <label className="text-xs font-bold text-gray-600 mb-1 block">วัน (Day Label)</label>
                                    <input type="text" value={day.day} onChange={(e) => { const n = [...itinerary]; n[i] = { ...n[i], day: e.target.value }; setItinerary(n); }} className="w-full border border-gray-300 rounded p-2 font-bold text-sm bg-white" placeholder="e.g. Day 1" />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="text-xs font-bold text-gray-600 mb-1 block">หัวข้อกิจกรรม (Title)</label>
                                    <input type="text" value={day.title} onChange={(e) => { const n = [...itinerary]; n[i] = { ...n[i], title: e.target.value }; setItinerary(n); }} className="w-full border border-gray-300 rounded p-2 font-bold mb-2 bg-white" placeholder="Title (e.g. เริ่มเดินทาง & ตั้งแคมป์ริมลำธาร)" />
                                    <label className="text-xs font-bold text-gray-600 mb-1 block">รายละเอียดกำหนดการ (Timeline / Description)</label>
                                    <textarea rows={3} value={day.desc} onChange={(e) => { const n = [...itinerary]; n[i] = { ...n[i], desc: e.target.value }; setItinerary(n); }} className="w-full border border-gray-300 rounded p-2 text-sm bg-white" placeholder="เช่น 08:00 – นัดพบในตัวเมืองเชียงใหม่&#10;09:00 – ออกเดินทางขึ้นดอย..." />
                                </div>
                            </div>

                            {/* Multi-image photo management for this Day */}
                            <div className="mt-3 pt-3 border-t border-gray-200 bg-white p-3.5 rounded-lg border border-gray-200/60">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5 text-primary" />
                                        <span>รูปภาพกิจกรรมของ {day.day || `วันที่ ${i + 1}`} ({day.images?.length || 0} ภาพ)</span>
                                    </label>
                                    <span className="text-[11px] text-gray-400">รองรับทั้ง path ในเว็บ (เช่น /images/articles/...) หรือ URL เต็ม (https://...)</span>
                                </div>

                                {/* Thumbnails list */}
                                {day.images && day.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2.5 mb-3">
                                        {day.images.map((imgUrl, imgIdx) => (
                                            <div key={imgIdx} className="relative group/thumb w-24 h-18 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 shadow-xs">
                                                <img src={imgUrl} alt={`day-${i}-img-${imgIdx}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const n = [...itinerary];
                                                        n[i] = { ...n[i], images: n[i].images?.filter((_, idx) => idx !== imgIdx) };
                                                        setItinerary(n);
                                                    }}
                                                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity font-bold text-xs"
                                                    title="ลบรูปภาพนี้"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">
                                                    #{imgIdx + 1}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add image input */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id={`day-img-input-${i}`}
                                        placeholder="วาง URL รูปภาพ เช่น /images/articles/chiang-dao-summit.jpg หรือ https://..."
                                        className="flex-grow border border-gray-300 rounded p-2 text-xs bg-gray-50 focus:bg-white focus:outline-primary"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                const input = e.currentTarget;
                                                if (input.value.trim()) {
                                                    const n = [...itinerary];
                                                    const currentImgs = n[i].images || [];
                                                    n[i] = { ...n[i], images: [...currentImgs, input.value.trim()] };
                                                    setItinerary(n);
                                                    input.value = '';
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const input = document.getElementById(`day-img-input-${i}`) as HTMLInputElement;
                                            if (input && input.value.trim()) {
                                                const n = [...itinerary];
                                                const currentImgs = n[i].images || [];
                                                n[i] = { ...n[i], images: [...currentImgs, input.value.trim()] };
                                                setItinerary(n);
                                                input.value = '';
                                            }
                                        }}
                                        className="bg-primary hover:bg-primary-deep text-white text-xs px-3.5 py-2 rounded flex items-center gap-1 font-bold whitespace-nowrap shadow-xs transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>เพิ่มรูป</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {itinerary.length === 0 && <p className="text-gray-400 italic text-center py-4">ยังไม่มีรายละเอียดกำหนดการเดินทาง</p>}
                </div>
            </section>

            {/* Packing List */}
            <section className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-xl font-bold text-forest">Packing List (สิ่งที่ต้องเตรียมมา)</h3>
                    <button type="button" onClick={addPackingItem} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded flex items-center gap-1 text-primary font-bold"><Plus className="w-3.5 h-3.5" /> Add Item</button>
                </div>
                <div className="space-y-2">
                    {packingList.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => updatePackingItem(i, e.target.value)} className="flex-grow border border-gray-300 rounded p-2 text-sm" placeholder="เช่น รองเท้าเดินป่า/ผ้าใบ, เสื้อกันหนาว, ไฟฉาย..." />
                            <button type="button" onClick={() => removePackingItem(i)} className="text-gray-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                        </div>
                    ))}
                    {packingList.length === 0 && <p className="text-xs text-gray-400 italic">ไม่มีรายการที่ระบุ (ระบบจะแสดงรายการมาตรฐานของน่องตึงให้โดยอัตโนมัติ)</p>}
                </div>
            </section>

            {/* FAQs */}
            <section className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-xl font-bold text-forest">Frequently Asked Questions (คำถามที่พบบ่อย)</h3>
                    <button type="button" onClick={addFaq} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded flex items-center gap-1 text-primary font-bold"><Plus className="w-3.5 h-3.5" /> Add Question</button>
                </div>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative space-y-2">
                            <button type="button" onClick={() => removeFaq(i)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                            <input type="text" value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm font-bold" placeholder="คำถาม เช่น มีสัญญาณมือถือไหม?" />
                            <textarea rows={2} value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} className="w-full border border-gray-300 rounded p-2 text-sm" placeholder="คำตอบ..." />
                        </div>
                    ))}
                    {faqs.length === 0 && <p className="text-xs text-gray-400 italic">ไม่มีคำถามที่ระบุ (ระบบจะแสดงคำถามที่พบบ่อยทั่วไปของน่องตึงให้โดยอัตโนมัติ)</p>}
                </div>
            </section>

            <div className="pt-6 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-4 rounded-lg transition-all flex justify-center items-center gap-2 shadow-lg text-lg text-white
                        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-deep'}
                    `}
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-6 h-6" /> {trip ? 'Update Trip' : 'Create Trip'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
