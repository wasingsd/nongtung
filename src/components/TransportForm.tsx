'use client';

import { useState } from 'react';
import { createTransport, updateTransport } from '@/app/actions/transportActions';
import { Transport } from '@/types/types';
import { Loader2, Save } from 'lucide-react';

interface TransportFormProps {
    transport?: Transport;
}

export default function TransportForm({ transport }: TransportFormProps) {
    const [imageUrl, setImageUrl] = useState(transport?.image || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            formData.set('imageUrl', imageUrl);

            if (transport) {
                await updateTransport(transport.id, formData);
            } else {
                await createTransport(formData);
            }
        } catch (err: any) {
            // Handle Next.js redirect special error
            if (err.message === 'NEXT_REDIRECT' || err.digest?.startsWith('NEXT_REDIRECT')) {
                return;
            }

            console.error('Submit error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-lg shadow border border-gray-100 relative">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-red-800 font-bold">เกิดข้อผิดพลาด</p>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
                <p className="text-sm text-orange-700 font-medium">
                    ⚠️ ราคานี้เป็นค่าบริการรถนำเที่ยวพร้อมคนขับ **ไม่รวมค่าน้ำมันตามจริง**
                </p>
            </div>

            {/* Type */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">ประเภทรถ (Vehicle Type)</label>
                <input
                    type="text"
                    name="type"
                    defaultValue={transport?.type || ''}
                    placeholder="เช่น รถตู้ VIP 9 ที่นั่ง, รถแดง 4WD"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1 Day Price */}
                <div>
                    <label className="block text-sm font-bold text-forest mb-2">ราคาเหมา 1 วัน (฿)</label>
                    <input
                        type="number"
                        name="price1Day"
                        defaultValue={transport?.price1Day || ''}
                        placeholder="เช่น 2000"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                    />
                </div>

                {/* 2 Day Price */}
                <div>
                    <label className="block text-sm font-bold text-forest mb-2">ราคาเหมา 2 วัน (฿)</label>
                    <input
                        type="number"
                        name="price2Day"
                        defaultValue={transport?.price2Day || ''}
                        placeholder="เช่น 4000"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                    />
                </div>
            </div>

            {/* Note */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">หมายเหตุ / รายละเอียดเพิ่มเติม</label>
                <textarea
                    name="note"
                    defaultValue={transport?.note || ''}
                    placeholder="เช่น บริการ 10 ชม./วัน, ไม่พบค่าน้ำมัน"
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
            </div>

            {/* Image URL */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">รูปภาพประกอบ (URL)</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
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
                    disabled={isSubmitting}
                    className={`w-full text-white py-3 rounded-lg font-bold text-sm uppercase transition-colors flex justify-center items-center gap-2
                        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-deep'}
                    `}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            กำลังบันทึก...
                        </>
                    ) : (
                        transport ? 'อัพเดทข้อมูลรถ' : 'เพิ่มข้อมูลรถใหม่'
                    )}
                </button>
            </div>
        </form>
    );
}
