'use client';

import { useState } from 'react';
import { Rental } from '@/types/types';
import { createRental, updateRental } from '@/app/actions/rentalActions';
import { Save, Plus, X, Link as LinkIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface RentalFormProps {
    rental?: Rental;
}

export default function RentalForm({ rental }: RentalFormProps) {
    const [imageUrl, setImageUrl] = useState<string>(rental?.image || '');
    const [features, setFeatures] = useState<string[]>(rental?.features || []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            formData.append('features', JSON.stringify(features));
            formData.append('imageUrl', imageUrl);

            if (rental) {
                await updateRental(rental.id, formData);
            } else {
                await createRental(formData);
            }
        } catch (err: any) {
            // Handle Next.js redirect special error
            if (err.message === 'NEXT_REDIRECT' || err.digest?.startsWith('NEXT_REDIRECT')) {
                return;
            }

            console.error('Submit error:', err);
            setError(err.message || 'Something went wrong. Please check your permissions.');
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 space-y-8 max-w-2xl relative">
            {error && (
                <div className="bg-red-50/90 border border-red-200 p-4 mb-6 rounded-2xl flex items-start gap-3 shadow-xs">
                    <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                        <X className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-red-900 font-bold text-sm">เกิดข้อผิดพลาด</p>
                        <p className="text-red-700 text-xs mt-0.5">{error}</p>
                    </div>
                </div>
            )}

            <section className="space-y-6">
                <h3 className="text-xl font-bold text-forest border-b pb-2">ข้อมูลอุปกรณ์</h3>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">ชื่ออุปกรณ์</label>
                    <input name="name" defaultValue={rental?.name} required type="text" placeholder="เช่น Coleman Tough Screen 2-Room" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">คำอธิบาย</label>
                    <textarea name="description" defaultValue={rental?.description} rows={2} placeholder="เช่น เต็นท์ครอบครัว กันฝนเยี่ยม" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ราคา (฿)</label>
                        <input name="price" defaultValue={rental?.price} required type="number" placeholder="800" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">หน่วย</label>
                        <select name="unit" defaultValue={rental?.unit || 'Day'} className="w-full border border-gray-300 rounded p-3 bg-white">
                            <option value="Day">ต่อวัน (Day)</option>
                            <option value="Trip">ต่อทริป (Trip)</option>
                            <option value="Night">ต่อคืน (Night)</option>
                            <option value="Set">ต่อเซ็ต (Set)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">ประเภท</label>
                        <select name="type" defaultValue={rental?.type || 'Tent'} className="w-full border border-gray-300 rounded p-3 bg-white">
                            <option value="Tent">เต็นท์ (Tent)</option>
                            <option value="Chair">เก้าอี้ (Chair)</option>
                            <option value="Sleeping">ถุงนอน/แมท (Sleeping)</option>
                            <option value="Kitchen">อุปกรณ์ครัว (Kitchen)</option>
                            <option value="Lighting">ไฟ/ตะเกียง (Lighting)</option>
                            <option value="Other">อื่นๆ (Other)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">จำนวนสต็อก</label>
                        <input name="stock" defaultValue={rental?.stock || 1} required type="number" min="0" className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                </div>

                {/* Image URL Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">รูปภาพ (URL)</label>
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
                        <label className="block text-sm font-bold text-gray-700">คุณสมบัติพิเศษ (Features)</label>
                        <button type="button" onClick={() => setFeatures([...features, ''])} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1 text-primary font-bold"><Plus className="w-3 h-3" /> เพิ่ม</button>
                    </div>
                    <div className="space-y-2">
                        {features.map((f, i) => (
                            <div key={i} className="flex gap-2">
                                <input type="text" value={f} onChange={(e) => {
                                    const n = [...features];
                                    n[i] = e.target.value;
                                    setFeatures(n);
                                }} className="flex-grow border border-gray-300 rounded p-2 text-sm" placeholder="เช่น กันน้ำ 100%" />
                                <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="pt-6 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white font-bold py-4 rounded-lg transition-all flex justify-center items-center gap-2 shadow-lg text-lg
                        ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-deep'}
                    `}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            กำลังบันทึก...
                        </>
                    ) : (
                        <>
                            <Save className="w-6 h-6" /> {rental ? 'อัพเดท' : 'สร้างรายการใหม่'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
