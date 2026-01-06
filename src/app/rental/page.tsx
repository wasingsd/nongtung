import Image from 'next/image';
import { Search, AlertCircle, ShoppingCart } from 'lucide-react';
import { RENTAL_GEAR } from '@/data/mock';

export default function RentalPage() {
    return (
        <div className="container mx-auto px-6 py-12 fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-bold font-heading text-forest mb-2">GEAR RENTAL</h2>
                    <p className="text-gray-500">อุปกรณ์แคมป์ปิ้งคุณภาพ สะอาด ผ่านการฆ่าเชื้อทุกครั้งก่อนส่งมอบ</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                    <input type="text" placeholder="Search gear..." className="bg-surface px-4 py-2 rounded outline-none text-sm w-64 focus:ring-1 focus:ring-primary" />
                    <button className="bg-forest text-white px-4 py-2 rounded hover:bg-forest-light transition-colors"><Search className="w-4 h-4" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {RENTAL_GEAR.map(g => (
                    <div key={g.id} className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all group">
                        <div className="relative h-48 bg-surface p-4">
                            <Image
                                src={g.image}
                                alt={g.name}
                                fill
                                className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute top-2 right-2 text-xs bg-white/80 backdrop-blur px-2 py-1 rounded text-forest font-bold shadow-sm">Stock: {g.stock}</div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-forest mb-1 line-clamp-1">{g.name}</h3>
                            <p className="text-xs text-gray-500 mb-4 h-8 overflow-hidden">{g.desc}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-primary font-bold">฿{g.price} <span className="text-xs text-gray-400 font-normal">/{g.unit}</span></div>
                                <button className="bg-surface text-forest hover:bg-primary hover:text-white p-2 rounded transition-colors"><ShoppingCart className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rental Conditions */}
            <div className="mt-16 bg-surface p-8 rounded-lg">
                <h3 className="font-bold text-forest mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-primary" /> เงื่อนไขการเช่า</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <li>• วางเงินมัดจำ 50% ของมูลค่าของ หรือตามตกลง</li>
                    <li>• คืนของช้ากว่ากำหนด ปรับวันละ 1 เท่าของค่าเช่า</li>
                    <li>• หากอุปกรณ์เสียหาย ผู้เช่าต้องรับผิดชอบตามมูลค่าจริง</li>
                    <li>• รับ-ส่ง อุปกรณ์ที่ร้าน (ในเมืองเชียงใหม่) ฟรี</li>
                </ul>
            </div>
        </div>
    );
}
