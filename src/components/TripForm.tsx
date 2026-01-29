'use client';

import { useState } from 'react';
import { Trip } from '@/types/types';
import { createTrip, updateTrip } from '@/app/actions/tripActions';
import { Save, Plus, X, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

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
    const [itinerary, setItinerary] = useState<{ day: string, title: string, desc: string }[]>(trip?.itinerary || []);
    const [gallery, setGallery] = useState<string[]>(trip?.gallery || []);
    const [newGalleryUrl, setNewGalleryUrl] = useState('');

    // Handlers for lists
    const addHighlight = () => setHighlights([...highlights, '']);
    const updateHighlight = (i: number, val: string) => {
        const newH = [...highlights];
        newH[i] = val;
        setHighlights(newH);
    };
    const removeHighlight = (i: number) => setHighlights(highlights.filter((_, idx) => idx !== i));

    // Add gallery URL
    const addGalleryUrl = () => {
        if (newGalleryUrl.trim()) {
            setGallery([...gallery, newGalleryUrl.trim()]);
            setNewGalleryUrl('');
        }
    };

    const handleSubmit = async (formData: FormData) => {
        // Serialize complex fields
        formData.append('highlights', JSON.stringify(highlights));
        formData.append('whatsIncluded', JSON.stringify(included));
        formData.append('notIncluded', JSON.stringify(notIncluded));
        formData.append('itinerary', JSON.stringify(itinerary));
        formData.append('gallery', JSON.stringify(gallery));
        formData.append('imageUrl', imageUrl);

        if (trip) {
            await updateTrip(trip.id, formData);
        } else {
            await createTrip(formData);
        }
    };

    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 space-y-8">
            {/* Basic Info */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-forest border-b pb-2">Basic Information</h3>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trip Title</label>
                    <input name="title" defaultValue={trip?.title} required type="text" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trip ID / Slug (สำหรับ SEO)</label>
                    <input
                        name="slug"
                        defaultValue={trip?.id}
                        required
                        type="text"
                        placeholder="เช่น hiking-doi-lang-ka-luang"
                        readOnly={!!trip}
                        className={`w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none ${trip ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    {!trip && <p className="text-xs text-gray-400 mt-1">ใช้ตัวอักษรภาษาอังกฤษ, ตัวเลข และขีดกลาง (-) เท่านั้น เช่น my-trip-2024</p>}
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
                    <h3 className="text-xl font-bold text-forest">Itinerary</h3>
                    <button type="button" onClick={() => setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, title: '', desc: '' }])} className="bg-primary text-white text-sm px-3 py-1 rounded hover:bg-primary-deep flex items-center gap-2"><Plus className="w-4 h-4" /> Add Day</button>
                </div>

                <div className="space-y-4">
                    {itinerary.map((day, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                            <button type="button" onClick={() => setItinerary(itinerary.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-gray-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="md:col-span-1">
                                    <input type="text" value={day.day} onChange={(e) => { const n = [...itinerary]; n[i].day = e.target.value; setItinerary(n); }} className="w-full border border-gray-300 rounded p-2 font-bold text-sm" placeholder="e.g. Day 1" />
                                </div>
                                <div className="md:col-span-3">
                                    <input type="text" value={day.title} onChange={(e) => { const n = [...itinerary]; n[i].title = e.target.value; setItinerary(n); }} className="w-full border border-gray-300 rounded p-2 font-bold mb-2" placeholder="Title (e.g. Departure)" />
                                    <textarea rows={2} value={day.desc} onChange={(e) => { const n = [...itinerary]; n[i].desc = e.target.value; setItinerary(n); }} className="w-full border border-gray-300 rounded p-2 text-sm" placeholder="Detailed description..." />
                                </div>
                            </div>
                        </div>
                    ))}
                    {itinerary.length === 0 && <p className="text-gray-400 italic text-center py-4">No itinerary details yet.</p>}
                </div>
            </section>

            <div className="pt-6 border-t border-gray-100">
                <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-deep transition-all flex justify-center items-center gap-2 shadow-lg text-lg">
                    <Save className="w-6 h-6" /> {trip ? 'Update Trip' : 'Create Trip'}
                </button>
            </div>
        </form>
    );
}
