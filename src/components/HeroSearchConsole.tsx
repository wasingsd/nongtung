'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Car, MapPin, Calendar, Users, Search, ArrowRight } from 'lucide-react';

interface HeroSearchConsoleProps {
  lang: string;
}

export default function HeroSearchConsole({ lang }: HeroSearchConsoleProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'trips' | 'transport'>('trips');

  // Trips form state
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [groupSize, setGroupSize] = useState('');

  // Transport form state
  const [pickupCity, setPickupCity] = useState('เชียงใหม่');
  const [rentalDays, setRentalDays] = useState('1');

  const langPrefix = `/${lang}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'trips') {
      const params = new URLSearchParams();
      if (destination) params.set('q', destination);
      if (duration) params.set('duration', duration);
      router.push(`${langPrefix}/trips${params.toString() ? `?${params.toString()}` : ''}`);
    } else {
      router.push(`${langPrefix}/transport`);
    }
  };

  const tabs = [
    { id: 'trips', label: 'ทริปท่องเที่ยว & เดินป่า', icon: Compass },
    { id: 'transport', label: 'รถตู้ VIP พร้อมคนขับ', icon: Car },
  ] as const;

  const quickDestinations = [
    'ปัว - บ่อเกลือ',
    'ดอยภูคา',
    'สะปัน น่าน',
    'เชียงดาว',
    'แม่ฮ่องสอน',
  ];

  return (
    <div className="w-full max-w-5xl mx-auto relative z-30 px-4 -mt-10 sm:-mt-12 md:-mt-14 mb-8">
      <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 impeccable-card-shadow border border-forest/10 transition-all duration-300">
        {/* 1. Active Service Switcher Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 pb-4 mb-5 border-b border-forest/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-heading transition-all duration-300 active:scale-95 ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]'
                    : 'bg-surface text-forest/70 hover:bg-forest/5 hover:text-forest'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. Interactive Search Form Segmented Bar */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          {activeTab === 'trips' ? (
            <>
              {/* Segment 1: Destination / Route */}
              <div className="md:col-span-4 bg-surface rounded-2xl p-3.5 sm:p-4 border border-forest/10 hover:border-primary/50 focus-within:border-primary transition-all">
                <label className="text-[11px] font-bold font-heading text-forest/50 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>จุดหมาย / เส้นทาง</span>
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="เช่น ปัว, ดอยภูคา, สะปัน..."
                  className="w-full bg-transparent text-sm font-bold font-heading text-forest placeholder-forest/30 focus:outline-none"
                />
              </div>

              {/* Segment 2: Duration */}
              <div className="md:col-span-3 bg-surface rounded-2xl p-3.5 sm:p-4 border border-forest/10 hover:border-primary/50 focus-within:border-primary transition-all">
                <label className="text-[11px] font-bold font-heading text-forest/50 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>ระยะเวลา</span>
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold font-heading text-forest focus:outline-none cursor-pointer"
                >
                  <option value="">ทุกช่วงเวลา</option>
                  <option value="1 วัน">1 วัน (ไป-กลับ)</option>
                  <option value="2 วัน 1 คืน">2 วัน 1 คืน</option>
                  <option value="3 วัน 2 คืน">3 วัน 2 คืน</option>
                  <option value="ทริปยาว">4 วันขึ้นไป (Expedition)</option>
                </select>
              </div>

              {/* Segment 3: Group Size */}
              <div className="md:col-span-3 bg-surface rounded-2xl p-3.5 sm:p-4 border border-forest/10 hover:border-primary/50 focus-within:border-primary transition-all">
                <label className="text-[11px] font-bold font-heading text-forest/50 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  <span>จำนวนผู้เดินทาง</span>
                </label>
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold font-heading text-forest focus:outline-none cursor-pointer"
                >
                  <option value="">ไม่ระบุ</option>
                  <option value="1-2">1 - 2 ท่าน (Join ทริป)</option>
                  <option value="3-5">3 - 5 ท่าน</option>
                  <option value="6-9">6 - 9 ท่าน (กรุ๊ปเหมา VIP)</option>
                  <option value="10+">10 ท่านขึ้นไป (Corporate)</option>
                </select>
              </div>

              {/* Segment 4: Search Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-primary hover:bg-primary-deep text-white font-bold font-heading rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-sm tracking-wide">ค้นหา</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Transport Segment 1: Pickup */}
              <div className="md:col-span-5 bg-surface rounded-2xl p-3.5 sm:p-4 border border-forest/10 hover:border-primary/50 focus-within:border-primary transition-all">
                <label className="text-[11px] font-bold font-heading text-forest/50 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>จุดรับ-ส่ง / พื้นที่ให้บริการ</span>
                </label>
                <select
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold font-heading text-forest focus:outline-none cursor-pointer"
                >
                  <option value="เชียงใหม่">เชียงใหม่ (สนามบิน / โรงแรม / ทั่วตัวเมือง)</option>
                  <option value="น่าน">น่าน (สนามบินน่าน / ปัว / บ่อเกลือ)</option>
                  <option value="แม่ฮ่องสอน">แม่ฮ่องสอน - ปาย</option>
                  <option value="เชียงราย">เชียงราย</option>
                </select>
              </div>

              {/* Transport Segment 2: Period */}
              <div className="md:col-span-5 bg-surface rounded-2xl p-3.5 sm:p-4 border border-forest/10 hover:border-primary/50 focus-within:border-primary transition-all">
                <label className="text-[11px] font-bold font-heading text-forest/50 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>ระยะเวลาการใช้งาน</span>
                </label>
                <select
                  value={rentalDays}
                  onChange={(e) => setRentalDays(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold font-heading text-forest focus:outline-none cursor-pointer"
                >
                  <option value="1">1 วัน (10 ชม. รวมคนขับชำนาญทางเขา)</option>
                  <option value="2">2 วัน 1 คืน (ค้างคืนนอกเมือง)</option>
                  <option value="3">3 วัน 2 คืน</option>
                  <option value="4+">4 วันขึ้นไป (Road Trip)</option>
                </select>
              </div>

              {/* Transport Segment 3: Action */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 sm:h-14 bg-primary hover:bg-primary-deep text-white font-bold font-heading rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <Car className="w-5 h-5" />
                  <span className="text-sm tracking-wide">ดูรถตู้</span>
                </button>
              </div>
            </>
          )}
        </form>

        {/* 3. Quick Popular Destinations */}
        <div className="mt-4 pt-3.5 border-t border-forest/5 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-forest/40 font-medium font-heading">เส้นทางยอดนิยม:</span>
          {quickDestinations.map((place) => (
            <button
              key={place}
              type="button"
              onClick={() => {
                setDestination(place);
                router.push(`${langPrefix}/trips?q=${encodeURIComponent(place)}`);
              }}
              className="px-3 py-1 rounded-full bg-surface text-forest/70 hover:text-primary hover:bg-primary/10 transition-colors text-xs font-medium font-heading"
            >
              {place}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
