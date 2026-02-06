'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Building2, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Quote {
    id: string;
    companyName: string;
    contactPerson: string;
    phone: string;
    groupSize: string;
    status: 'pending' | 'done';
    createdAt: string;
}

interface NotificationBellProps {
    initialPendingCount: number;
    initialPendingQuotes: Quote[];
}

export default function NotificationBell({ initialPendingCount, initialPendingQuotes }: NotificationBellProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [pendingCount, setPendingCount] = useState(initialPendingCount);
    const [pendingQuotes, setPendingQuotes] = useState<Quote[]>(initialPendingQuotes);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
        if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
        if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
        return date.toLocaleDateString('th-TH');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-forest transition-all relative"
            >
                <Bell className="w-5 h-5" />
                {pendingCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        {pendingCount > 9 ? '9+' : pendingCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-forest text-white flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest">Notifications</h3>
                            <p className="text-[10px] text-white/50 font-medium mt-0.5">{pendingCount} รายการรอดำเนินการ</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/50" />
                        </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {pendingQuotes.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-400 text-sm font-bold">ไม่มีการแจ้งเตือนใหม่</p>
                            </div>
                        ) : (
                            pendingQuotes.slice(0, 5).map((quote) => (
                                <Link
                                    key={quote.id}
                                    href="/adminnongtung/corporate"
                                    onClick={() => setIsOpen(false)}
                                    className="block p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-forest text-sm truncate">{quote.companyName}</span>
                                                <span className="text-[8px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase">NEW</span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">
                                                {quote.contactPerson} • {quote.groupSize}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {formatDate(quote.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {pendingQuotes.length > 0 && (
                        <Link
                            href="/adminnongtung/corporate"
                            onClick={() => setIsOpen(false)}
                            className="block p-4 bg-gray-50 text-center text-xs font-black text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                        >
                            ดูทั้งหมด <ExternalLink className="w-3 h-3" />
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
