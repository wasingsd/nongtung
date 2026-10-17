'use client';

import { useState } from 'react';
import { createTransport, updateTransport } from '@/app/actions/transportActions';
import { Transport } from '@/types/types';
import { Loader2, Users } from 'lucide-react';

interface TransportFormProps {
    transport?: Transport;
}

export default function TransportForm({ transport }: TransportFormProps) {
    const [imageUrl, setImageUrl] = useState(transport?.image || '');
    const [capacity, setCapacity] = useState(transport?.capacity || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            formData.set('imageUrl', imageUrl);
            formData.set('capacity', capacity);

            if (transport) {
                await updateTransport(transport.id, formData);
            } else {
                await createTransport(formData);
            }
        } catch (err: any) {
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
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
                    <p className="text-red-800 font-bold">เกิดข้อผิดพลาด</p>
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 rounded-r-xl">
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
                    placeholder="เช่น รถตู้ VIP 9 ที่นั่ง, รถกระบะ 4WD, รถสองแถวแดง"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    required
                />
            </div>

            {/* Passenger Capacity */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-forest flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>จำนวนที่นั่ง / ความจุผู้โดยสาร (Passenger Capacity)</span>
                    </label>
                    <span className="text-xs text-gray-400">เลือกหรือพิมพ์เองได้</span>
                </div>
                <input
                    type="text"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="เช่น 9-10 ที่นั่ง VIP, 4-5 ที่นั่ง (กระบะ 4WD), 8-10 ที่นั่ง (สองแถว)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm font-medium"
                />
                
                {/* Preset quick buttons */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                    <button
                        type="button"
                        onClick={() => setCapacity('9-10 ที่นั่ง VIP')}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                            capacity === '9-10 ที่นั่ง VIP'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                        🚐 รถตู้: 9-10 ที่นั่ง VIP
                    </button>
                    <button
                        type="button"
                        onClick={() => setCapacity('4-5 ที่นั่ง (กระบะ 4WD)')}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                            capacity === '4-5 ที่นั่ง (กระบะ 4WD)'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                        🛻 รถกระบะ: 4-5 ที่นั่ง (กระบะ 4WD)
                    </button>
                    <button
                        type="button"
                        onClick={() => setCapacity('8-10 ที่นั่ง (สองแถว)')}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                            capacity === '8-10 ที่นั่ง (สองแถว)'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                        🛺 รถสองแถว: 8-10 ที่นั่ง (สองแถว)
                    </button>
                    <button
                        type="button"
                        onClick={() => setCapacity('4-6 ที่นั่ง (SUV)')}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                            capacity === '4-6 ที่นั่ง (SUV)'
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                        🚙 SUV: 4-6 ที่นั่ง
                    </button>
                </div>
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
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
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
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        required
                    />
                </div>
            </div>

            {/* Note */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">หมายเหตุ / คำอธิบายการให้บริการ</label>
                <textarea
                    name="note"
                    defaultValue={transport?.note || ''}
                    placeholder="เช่น บริการ 10 ชม./วัน, ไม่พบค่าน้ำมัน, ออกแบบสำหรับขึ้นดอยสูง"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
            </div>

            {/* Image URL */}
            <div>
                <label className="block text-sm font-bold text-forest mb-2">รูปภาพประกอบ (URL)</label>
                <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
                {imageUrl && (
                    <div className="mt-4 relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-forest/5">
                        <picture>
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                        </picture>
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white py-3.5 rounded-full font-bold text-sm uppercase transition-colors flex justify-center items-center gap-2 shadow-lg
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
