'use client';

import Link from 'next/link';
import { Compass, Car, Building2, BookOpen, ChevronRight } from 'lucide-react';

interface QuickServiceStripProps {
  lang: string;
}

export default function QuickServiceStrip({ lang }: QuickServiceStripProps) {
  const langPrefix = `/${lang}`;

  const services = [
    {
      title: 'ทริปท่องเที่ยว & เดินป่า',
      subtitle: 'เปิดประสบการณ์ธรรมชาติเมืองเหนือ',
      icon: Compass,
      href: `${langPrefix}/trips`,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'รถตู้ VIP พร้อมคนขับ',
      subtitle: 'ชำนาญเส้นทางเขา สะดวกปลอดภัย',
      icon: Car,
      href: `${langPrefix}/transport`,
      color: 'bg-accent/15 text-accent',
    },
    {
      title: 'กรุ๊ปเหมา & ทริปองค์กร',
      subtitle: 'จัดทริปพิเศษเฉพาะทีมงานของคุณ',
      icon: Building2,
      href: `${langPrefix}/corporate`,
      color: 'bg-ochre/15 text-ochre',
    },
    {
      title: 'เรื่องเล่า & บทความ',
      subtitle: 'คู่มือและบันทึกการเดินทางสู่ขุนเขา',
      icon: BookOpen,
      href: `${langPrefix}/articles`,
      color: 'bg-forest/10 text-forest',
    },
  ];

  return (
    <section className="py-6 sm:py-8 mb-4">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex items-center gap-3 sm:gap-4 p-4 rounded-2xl bg-white border border-forest/10 impeccable-surface-shadow hover:impeccable-card-shadow hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.color}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-grow">
                  <h4 className="text-xs sm:text-sm font-bold text-forest truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-forest/50 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
