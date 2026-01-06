'use client';

import { useState } from 'react';
import { Trip } from '@/types/types';
import { createTrip, updateTrip } from '@/app/actions/tripActions';
import { Save, Plus, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface TripFormProps {
    trip?: Trip; // Optional, if provided = edit mode
}

export default function TripForm({ trip }: TripFormProps) {
    // Basic Fields
    const [imagePreview, setImagePreview] = useState<string>(trip?.image || '');

    // Dynamic Lists
    const [highlights, setHighlights] = useState<string[]>(trip?.highlights || []);
    const [included, setIncluded] = useState<string[]>(trip?.whatsIncluded || []);
    const [notIncluded, setNotIncluded] = useState<string[]>(trip?.notIncluded || []);
    const [itinerary, setItinerary] = useState<{ day: string, title: string, desc: string }[]>(trip?.itinerary || []);
    const [gallery, setGallery] = useState<string[]>(trip?.gallery || []);

    // Handlers for lists
    const addHighlight = () => setHighlights([...highlights, '']);
    const updateHighlight = (i: number, val: string) => {
        const newH = [...highlights];
        newH[i] = val;
        setHighlights(newH);
    };
    const removeHighlight = (i: number) => setHighlights(highlights.filter((_, idx) => idx !== i));

    // Handle Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        // Serialize complex fields
        formData.append('highlights', JSON.stringify(highlights));
        formData.append('whatsIncluded', JSON.stringify(included));
        formData.append('notIncluded', JSON.stringify(notIncluded));
        formData.append('itinerary', JSON.stringify(itinerary));
        formData.append('gallery', JSON.stringify(gallery)); // Send existing gallery items

        // Pass existing image URL if no new file is uploaded
        if (!formData.get('imageFile') && trip?.image) {
            formData.append('image', trip.image);
        }

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

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
                    <div className="flex gap-4 items-start">
                        <div className="relative w-40 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-primary transition-colors">
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                            ) : (
                                <Upload className="text-gray-400" />
                            )}
                            <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                        <div className="text-sm text-gray-500 pt-2">
                            <p>Click to upload a new cover image.</p>
                            <p className="text-xs mt-1">Accepts JPG, PNG, WebP.</p>
                        </div>
                    </div>
                    {/* Hidden input to keep old URL if not changed */}
                    <input type="hidden" name="image" value={trip?.image || ''} />
                </div>

                {/* Gallery Upload */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gallery Images</label>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {/* Existing Gallery Preview */}
                        {gallery.map((url, i) => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
                                <button type="button" onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors font-medium text-sm">
                            <Upload className="w-4 h-4" /> Upload More
                            <input type="file" name="galleryFiles" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                        <p className="text-xs text-gray-400">Select multiple files to add to the gallery.</p>
                    </div>
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
                    <input name="tags" defaultValue={trip?.tags.join(', ')} placeholder="Hiking, Nature" type="text" className="w-full border border-gray-300 rounded p-3" />
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
                            <label className="block text-sm font-bold text-green-700">What's Included</label>
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
