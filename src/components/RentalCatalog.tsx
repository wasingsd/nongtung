'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, Package, ShoppingCart, Filter, CheckCircle, Sparkles, MessageCircle } from 'lucide-react';
import { Rental } from '@/types/types';

interface RentalCatalogProps {
    rentals: Rental[];
    lang?: string;
}

const CATEGORIES = [
    { key: 'all', label: 'All Equipment', th: 'ทั้งหมด' },
    { key: 'Tent', label: 'Tents & Shelter', th: 'เต็นท์ & ทาร์ป' },
    { key: 'Sleeping', label: 'Sleeping Gear', th: 'ถุงนอน & แผ่นรอง' },
    { key: 'Chair', label: 'Chairs & Tables', th: 'เก้าอี้ & โต๊ะ' },
    { key: 'Kitchen', label: 'Camp Kitchen', th: 'ชุดครัว & เตา' },
    { key: 'Lighting', label: 'Lighting', th: 'ไฟ & ตะเกียง' },
] as const;

export default function RentalCatalog({ rentals, lang = 'th' }: RentalCatalogProps) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredRentals = useMemo(() => {
        return rentals.filter(r => {
            const matchesCategory = selectedCategory === 'all' || r.type === selectedCategory;
            const matchesSearch = !search.trim() || 
                r.name.toLowerCase().includes(search.toLowerCase()) ||
                (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [rentals, search, selectedCategory]);

    const isThai = lang === 'th';

    return (
        <div className="space-y-10">
            {/* Control Bar */}
            <div className="bg-white rounded-[2.5rem] immersive-shadow p-6 md:p-8 border border-forest/5">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
                        {CATEGORIES.map(cat => {
                            const active = selectedCategory === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategory(cat.key)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap active:scale-95 ${
                                        active 
                                            ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105' 
                                            : 'bg-surface text-forest/70 hover:bg-forest/5 hover:text-forest'
                                    }`}
                                >
                                    {isThai ? cat.th : cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Live Search */}
                    <div className="relative w-full lg:w-72">
                        <div className="flex items-center bg-surface rounded-full px-4 py-2 border border-forest/10 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <Search className="w-4 h-4 text-forest/40 shrink-0 mr-2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={isThai ? "ค้นหาอุปกรณ์..." : "Search equipment..."}
                                className="bg-transparent text-xs font-bold text-forest placeholder:text-forest/30 w-full focus:outline-none"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="text-forest/30 hover:text-forest text-xs font-bold px-1"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Counter & Hygiene Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-forest/5 text-xs">
                    <div className="text-forest/50 font-bold">
                        {isThai 
                            ? `แสดง ${filteredRentals.length} จากทั้งหมด ${rentals.length} รายการ`
                            : `Showing ${filteredRentals.length} of ${rentals.length} items`}
                    </div>
                    <div className="flex items-center gap-2 text-accent font-bold">
                        <CheckCircle className="w-4 h-4" />
                        <span>{isThai ? 'ฆ่าเชื้อและทำความสะอาดทุกชิ้น 100%' : '100% Sanitized & Tested Before Every Trip'}</span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredRentals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredRentals.map(item => {
                        const inStock = (item.stock || 0) > 0;
                        const inquiryMessage = encodeURIComponent(`สวัสดีครับ สนใจเช่าอุปกรณ์: ${item.name} (${item.price || 0} บาท/${item.unit || 'Day'})`);
                        const lineUrl = `https://line.me/R/oaMessage/@nongtung/?${inquiryMessage}`;
                        const messengerUrl = `https://m.me/Venturevibecnx?text=${inquiryMessage}`;

                        return (
                            <div
                                key={item.id}
                                className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden immersive-shadow border border-forest/5 hover:-translate-y-1.5 transition-all duration-300 p-4"
                            >
                                {/* Media Container */}
                                <div className="relative h-60 bg-surface/70 rounded-[1.75rem] overflow-hidden p-6 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 p-4"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <Package className="w-16 h-16 text-forest/10" />
                                    )}

                                    {/* Stock Badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs ${
                                            (item.stock || 0) > 3 
                                                ? 'bg-accent/15 text-accent border border-accent/20' 
                                                : inStock
                                                ? 'bg-ochre/15 text-ochre border border-ochre/20'
                                                : 'bg-red-50 text-red-600 border border-red-200'
                                        }`}>
                                            {inStock 
                                                ? (isThai ? `มีของ (${item.stock})` : `In Stock (${item.stock})`)
                                                : (isThai ? 'ของหมดชั่วคราว' : 'Out of Stock')}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-black font-heading text-forest group-hover:text-primary transition-colors line-clamp-1 tracking-tight mb-1.5">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-forest/50 font-medium line-clamp-2 leading-relaxed mb-4 flex-grow">
                                        {item.description || (isThai ? 'อุปกรณ์เดินป่าและแคมป์ปิ้งมาตรฐานสูง ใช้งานง่ายและทนทาน' : 'Professional high-grade outdoor equipment.')}
                                    </p>

                                    {/* Price & CTA */}
                                    <div className="flex items-center justify-between pt-3 border-t border-forest/5 mt-auto">
                                        <div>
                                            <div className="text-xs font-bold text-forest/40 uppercase tracking-wider">
                                                {isThai ? 'ราคาเช่า' : 'Rate'}
                                            </div>
                                            <div className="text-xl font-black text-forest font-heading tracking-tight tabular-nums">
                                                ฿{(item.price || 0).toLocaleString()}
                                                <span className="text-xs font-bold text-forest/40 ml-1">/{item.unit || 'Day'}</span>
                                            </div>
                                        </div>

                                        {inStock ? (
                                            <div className="flex items-center gap-1.5">
                                                <a
                                                    href={lineUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                                                    title="Inquire via LINE"
                                                    aria-label="Inquire via LINE"
                                                >
                                                    <MessageCircle className="w-5 h-5" />
                                                </a>
                                                <a
                                                    href={messengerUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-forest hover:bg-primary text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                                                    title="Inquire via Messenger"
                                                    aria-label="Inquire via Messenger"
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                </a>
                                            </div>
                                        ) : (
                                            <span className="w-10 h-10 rounded-full bg-surface text-forest/20 flex items-center justify-center cursor-not-allowed">
                                                <ShoppingCart className="w-4 h-4" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-forest/5 immersive-shadow p-8">
                    <Package className="w-16 h-16 mx-auto mb-4 text-forest/20" />
                    <h3 className="text-xl font-black font-heading text-forest mb-2">
                        {isThai ? 'ไม่พบอุปกรณ์ที่ค้นหา' : 'No equipment found'}
                    </h3>
                    <p className="text-xs text-forest/50 font-medium max-w-sm mx-auto mb-6">
                        {isThai ? 'ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น' : 'Try adjusting your search terms or clearing category filters.'}
                    </p>
                    <button
                        onClick={() => { setSearch(''); setSelectedCategory('all'); }}
                        className="bg-forest text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-primary transition-all"
                    >
                        {isThai ? 'แสดงทั้งหมด' : 'Reset Filters'}
                    </button>
                </div>
            )}
        </div>
    );
}
