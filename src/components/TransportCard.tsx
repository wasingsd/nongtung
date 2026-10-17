'use client';

import Image from 'next/image';
import { Users, Check, Info } from 'lucide-react';
import { Transport } from '@/types/types';

interface TransportCardProps {
  car: Transport;
  langPrefix: string;
  selectText?: string;
  messengerUrl?: string;
  lineUrl?: string;
}

export function getVehicleCapacity(car: Transport): string {
  if (car.capacity && car.capacity.trim().length > 0) {
    return car.capacity;
  }
  const t = (car.type || '').toLowerCase();
  if (t.includes('van') || t.includes('ตู้') || t.includes('commuter')) {
    return '9-10 ที่นั่ง VIP';
  }
  if (t.includes('pickup') || t.includes('truck') || t.includes('กระบะ') || t.includes('4wd') || t.includes('suv')) {
    return '4-5 ที่นั่ง (กระบะ 4WD)';
  }
  if (t.includes('songthaew') || t.includes('สองแถว') || t.includes('red') || t.includes('แดง')) {
    return '8-10 ที่นั่ง (สองแถว)';
  }
  return '4-6 ที่นั่ง';
}

function getVehicleFeature(car: Transport): string {
  const t = (car.type || '').toLowerCase();
  if (t.includes('van') || t.includes('ตู้')) {
    return 'เบาะกัปตัน VIP เอนนอนสบาย แอร์เย็นฉ่ำ เหมาะสำหรับ 6-10 ท่าน';
  }
  if (t.includes('pickup') || t.includes('truck') || t.includes('กระบะ') || t.includes('4wd')) {
    return 'กระบะท้ายกว้าง บรรทุกสัมภาระ/อุปกรณ์แคมป์ปิ้ง ลุยทางเขาชัน 4WD';
  }
  if (t.includes('songthaew') || t.includes('สองแถว') || t.includes('แดง')) {
    return 'เบาะสองแถวเปิดโล่ง รับลมธรรมชาติ สัมผัสวิถีเชียงใหม่แท้ๆ';
  }
  return 'รถตรวจเช็กสภาพความปลอดภัยสม่ำเสมอ พร้อมใช้งาน';
}

export default function TransportCard({
  car,
  langPrefix,
  selectText = 'เลือกรถคันนี้',
  messengerUrl,
  lineUrl,
}: TransportCardProps) {
  const capacityText = getVehicleCapacity(car);
  const vehicleFeature = getVehicleFeature(car);

  const lineBookingUrl = lineUrl || `https://line.me/R/ti/p/@nongtungrunning?text=${encodeURIComponent(
    `สวัสดีครับ สนใจสอบถาม/จองรถ: ${car.type} (${capacityText})`
  )}`;

  return (
    <div className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-forest/5 impeccable-card-shadow impeccable-hover-shadow hover:-translate-y-1.5 transition-all duration-300">
      {/* 16:10 Aspect Vehicle Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={car.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'}
          alt={car.type}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Dynamic Capacity badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-forest font-bold px-3 py-1.5 rounded-full text-xs shadow-sm flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>{capacityText}</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-heading text-forest tracking-tight mb-3">
            {car.type}
          </h3>

          {/* Pricing Grid (1 Day / 2 Days) */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="p-3 bg-surface rounded-2xl border border-forest/5">
              <span className="text-[10px] text-forest/50 font-medium block">ไป-กลับ 1 วัน</span>
              <span className="text-base sm:text-lg font-black text-primary">
                ฿{(car.price1Day || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-forest/40 block">/ วัน</span>
            </div>

            <div className="p-3 bg-surface rounded-2xl border border-forest/5">
              <span className="text-[10px] text-forest/50 font-medium block">ค้างคืน 2 วันขึ้นไป</span>
              <span className="text-base sm:text-lg font-black text-forest">
                ฿{(car.price2Day || car.price1Day || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-forest/40 block">/ วัน</span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-1.5 text-xs text-forest/70 mb-4">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="font-medium text-forest/90">{vehicleFeature}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>คนขับชำนาญเส้นทางเขา แม่ฮ่องสอน น่าน เชียงใหม่</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>บริการวันละ 10 ชม. ไม่จำกัดระยะทางในโปรแกรม</span>
            </li>
          </ul>

          {car.note && (
            <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 mb-4">
              <p className="text-[11px] text-primary-deep flex items-start gap-1.5 leading-snug">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{car.note}</span>
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <a
          href={lineBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-3 rounded-full font-bold font-heading text-xs tracking-wider text-center transition-all duration-300 shadow-md shadow-[#06c755]/20 uppercase active:scale-98 flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
          </svg>
          <span>{selectText}</span>
        </a>
      </div>
    </div>
  );
}
