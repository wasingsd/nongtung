'use client';

import { useState } from 'react';
import { createTransport, updateTransport } from '@/app/actions/transportActions';
import { Transport } from '@/types/types';

interface TransportFormProps {
    transport?: Transport;
}

export default function TransportForm({ transport }: TransportFormProps) {
    const [imageUrl, setImageUrl] = useState(transport?.image || '');

    const handleSubmit = async (formData: FormData) => {
        formData.set('imageUrl', imageUrl);

        if (transport) {
            await updateTransport(transport.id, formData);
        } else {
            await createTransport(formData);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-lg shadow border border-gray-100">
            {/* Type */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">ประเภทรถ (Type)</label>
                <input
                    type="text"
                    name="type"
                    defaultValue={transport?.type || ''}
                    placeholder="เช่น VIP Van 9 ที่นั่ง, รถแดง 4WD"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    required
                />
            </div>

            {/* Route */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">เส้นทาง (Route)</label>
                <input
                    type="text"
                    name="route"
                    defaultValue={transport?.route || ''}
                    placeholder="เช่น City - Doi Suthep, City - Doi Inthanon"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    required
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">ราคา (บาท)</label>
                <input
                    type="number"
                    name="price"
                    defaultValue={transport?.price || ''}
                    placeholder="เช่น 1500"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    required
                />
            </div>

            {/* Departure Time */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">เวลาออกเดินทาง</label>
                <input
                    type="text"
                    name="departureTime"
                    defaultValue={transport?.departureTime || ''}
                    placeholder="เช่น 08:00, ตามนัดหมาย"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    required
                />
            </div>

            {/* Image URL */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">รูปภาพ (URL)</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
                {imageUrl && (
                    <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm uppercase hover:bg-primary-deep transition-colors"
                >
                    {transport ? 'Update Transport' : 'Create Transport'}
                </button>
            </div>
        </form>
    );
}
