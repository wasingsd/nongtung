'use client';

import { useState } from 'react';
import { Rental } from '@/types/types';
import { createRental, updateRental } from '@/app/actions/rentalActions';
import { Save, Plus, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface RentalFormProps {
    rental?: Rental;
}

export default function RentalForm({ rental }: RentalFormProps) {
    const [imagePreview, setImagePreview] = useState<string>(rental?.image || '');
    const [features, setFeatures] = useState<string[]>(rental?.features || []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        formData.append('features', JSON.stringify(features));
        // Pass existing image URL if no new file is uploaded
        if (!formData.get('imageFile') && rental?.image) {
            formData.append('image', rental.image);
        }

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

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Image</label>
                    <div className="flex gap-4 items-start">
                        <div className="relative w-40 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group hover:border-primary transition-colors">
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                            ) : (
                                <Upload className="text-gray-400" />
                            )}
                            <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
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
