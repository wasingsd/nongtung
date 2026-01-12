'use client';

import { useState } from 'react';
import { Rental } from '@/types/types';
import { createRental, updateRental } from '@/app/actions/rentalActions';
import { Save, Plus, X, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

interface RentalFormProps {
    rental?: Rental;
}

export default function RentalForm({ rental }: RentalFormProps) {
    const [imageUrl, setImageUrl] = useState<string>(rental?.image || '');
    const [features, setFeatures] = useState<string[]>(rental?.features || []);

    const handleSubmit = async (formData: FormData) => {
        formData.append('features', JSON.stringify(features));
        formData.append('imageUrl', imageUrl);

        if (rental) {
            await updateRental(rental.id, formData);
        } else {
            await createRental(formData);
        }
    };

    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 space-y-8">
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-forest border-b pb-2">Rental Info</h3>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
                    <input name="name" defaultValue={rental?.name} required type="text" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price Per Day (฿)</label>
                        <input name="pricePerDay" defaultValue={rental?.pricePerDay} required type="number" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                        <select name="type" defaultValue={rental?.type || 'Bike'} className="w-full border border-gray-300 rounded p-3 bg-white">
                            <option value="Bike">Bike</option>
                            <option value="Car">Car</option>
                            <option value="Van">Van</option>
                            <option value="Gear">Camping Gear</option>
                        </select>
                    </div>
                </div>

                {/* Image URL Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                    <div className="flex gap-4 items-start">
                        <div className="flex-grow">
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full border border-gray-300 rounded p-3 pl-10 focus:ring-2 focus:ring-primary outline-none"
                                />
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

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">Features</label>
                        <button type="button" onClick={() => setFeatures([...features, ''])} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1 text-primary font-bold"><Plus className="w-3 h-3" /> Add</button>
                    </div>
                    <div className="space-y-2">
                        {features.map((f, i) => (
                            <div key={i} className="flex gap-2">
                                <input type="text" value={f} onChange={(e) => { const n = [...features]; n[i] = e.target.value; setFeatures(n); }} className="flex-grow border border-gray-300 rounded p-2 text-sm" placeholder="Feature..." />
                                <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Capacity (Persons)</label>
                    <input name="capacity" defaultValue={rental?.capacity || 1} type="number" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>
            </section>

            <div className="pt-6 border-t border-gray-100">
                <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary-deep transition-all flex justify-center items-center gap-2 shadow-lg text-lg">
                    <Save className="w-6 h-6" /> {rental ? 'Update Rental' : 'Create Rental'}
                </button>
            </div>
        </form>
    );
}
