'use client';

import Image from 'next/image';
import { Plane, ShieldCheck, MessageCircle, ShoppingBag, Package } from 'lucide-react';
import { PRODUCTS } from '@/data/mock';

export default function ShopPage() {
    return (
        <div className="container mx-auto px-6 py-12 fade-in">
            {/* Header & Value Prop */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold font-heading text-forest mb-4">NONGTUNG GEAR STORE</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-8">
                    คัดสรรอุปกรณ์แคมป์ปิ้งคุณภาพระดับโลก ส่งตรงจากโรงงาน<br />
                    <span className="text-primary font-bold">Imported • Quality Checked • Best Price</span>
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-forest-light">
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full"><Plane className="w-4 h-4 text-primary" /> Direct Import</div>
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full"><ShieldCheck className="w-4 h-4 text-primary" /> QC Passed</div>
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full"><MessageCircle className="w-4 h-4 text-primary" /> Expert Consult</div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {PRODUCTS.map(p => (
                    <div key={p.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                        <div className="relative h-64 bg-surface p-6">
                            <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${p.status === 'ready' ? 'bg-line text-white' : 'bg-primary text-white'}`}>{p.badge}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="text-xs text-ochre font-bold uppercase mb-2 tracking-wide">{p.category}</div>
                            <h3 className="text-lg font-bold text-forest font-heading mb-2 line-clamp-2 min-h-[3.5rem]">{p.name}</h3>
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <div className="text-xs text-gray-400">Price</div>
                                    <div className="text-2xl font-bold text-forest">฿{p.price.toLocaleString()}</div>
                                </div>
                            </div>
                            <button onClick={() => window.open('https://shop.line.me/@nongtung', '_blank')}
                                className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-3 rounded font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                                <ShoppingBag className="w-5 h-5" />
                                Shop via LINE
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-3">สอบถามสเปค/ขอรูปเพิ่มเติมได้ทันที</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* How to Order */}
            <div className="bg-surface rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl font-bold text-forest font-heading mb-8">HOW TO ORDER</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -z-0 -translate-y-1/2"></div>

                    <div className="relative z-10 bg-surface">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-md mx-auto mb-4 text-2xl font-bold border-4 border-surface">1</div>
                        <h4 className="font-bold text-forest">เลือกสินค้า</h4>
                        <p className="text-sm text-gray-500">เลือกดูสินค้าที่ชอบจาก Catalog หน้าเว็บ</p>
                    </div>
                    <div className="relative z-10 bg-surface">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#06c755] shadow-md mx-auto mb-4 border-4 border-surface"><MessageCircle className="w-8 h-8" /></div>
                        <h4 className="font-bold text-forest">ทักแชท LINE</h4>
                        <p className="text-sm text-gray-500">กดปุ่ม Shop via LINE เพื่อคุยกับแอดมิน</p>
                    </div>
                    <div className="relative z-10 bg-surface">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary shadow-md mx-auto mb-4 border-4 border-surface"><Package className="w-8 h-8" /></div>
                        <h4 className="font-bold text-forest">รอรับของ</h4>
                        <p className="text-sm text-gray-500">ชำระเงินและรอรับสินค้าที่บ้านได้เลย</p>
                    </div>
                </div>
                <button onClick={() => window.open('https://line.me/ti/p/@nongtung', '_blank')} className="mt-12 bg-forest text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-all">
                    Add LINE: @nongtung
                </button>
            </div>
        </div>
    );
}
