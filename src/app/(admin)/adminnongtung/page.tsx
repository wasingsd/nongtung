import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  Video,
  Car,
  Building2,
  BookOpen,
  Settings,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Heart,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { getTrips, getReels, getTransport, getQuotes, getArticles } from '@/lib/firestore-db';

export const metadata = {
  title: 'Executive Dashboard | Nongtung Admin Hub',
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [trips, reels, transports, quotes, articles] = await Promise.all([
    getTrips(),
    getReels(),
    getTransport(),
    getQuotes(),
    getArticles(),
  ]);

  const pendingQuotes = quotes.filter((q) => q.status === 'pending');
  const activeReels = reels.filter((r) => r.isActive !== false);
  const availableTrips = trips.filter((t) => t.status === 'available');

  // Format today's date in Thai
  const todayStr = new Intl.DateTimeFormat('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Executive Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1E241E] via-[#2A312A] to-[#181D18] text-white p-7 sm:p-10 shadow-2xl border border-white/10">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-white/90">
                {todayStr} • Nongtung Cloud Console
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white uppercase italic leading-tight">
              Executive <span className="text-primary italic">Dashboard</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/70 font-normal mt-3 max-w-xl leading-relaxed">
              ยินดีต้อนรับสู่ระบบควบคุมหลังบ้าน Nongtung จัดการแพ็กเกจเดินป่า, คลิปสั้น TikTok Shoppable Reels, ยานพาหนะ VIP และติดตามคำขอใบเสนอราคาจากลูกค้าองค์กรได้แบบครบวงจร
            </p>
          </div>

          {/* Quick Action Launch Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Link
              href="/adminnongtung/trips/create"
              className="bg-primary hover:bg-primary-deep text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>สร้างทริปใหม่</span>
            </Link>

            <Link
              href="/adminnongtung/reels"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all backdrop-blur-md active:scale-95"
            >
              <Video className="w-4 h-4 text-primary" />
              <span>จัดการคลิป TikTok</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & KPIs Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* KPI 1: Active Trips */}
        <Link
          href="/adminnongtung/trips"
          className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-forest/5 text-forest group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-50 border border-green-200/50 px-2.5 py-1 rounded-full">
              {availableTrips.length} พร้อมจอง
            </span>
          </div>

          <div>
            <div className="text-3xl font-black font-heading text-forest group-hover:text-primary transition-colors">
              {trips.length}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
              แพ็กเกจทริปทั้งหมด
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>จัดการแพ็กเกจทริป</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* KPI 2: TikTok Reels & Clips */}
        <Link
          href="/adminnongtung/reels"
          className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center shadow-sm">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {activeReels.length} ออนไลน์
            </span>
          </div>

          <div>
            <div className="text-3xl font-black font-heading text-forest group-hover:text-primary transition-colors">
              {reels.length}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
              คลิปสั้น Shoppable Reels
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>จัดการคลิป & สินค้า</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* KPI 3: VIP Transport Fleet */}
        <Link
          href="/adminnongtung/transport"
          className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all flex items-center justify-center shadow-sm">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/50 px-2.5 py-1 rounded-full">
              VIP Fleet
            </span>
          </div>

          <div>
            <div className="text-3xl font-black font-heading text-forest group-hover:text-primary transition-colors">
              {transports.length}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
              ยานพาหนะพร้อมคนขับ
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>จัดการกองรถตู้ & 4WD</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* KPI 4: Corporate Inquiries */}
        <Link
          href="/adminnongtung/corporate"
          className={`group bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
            pendingQuotes.length > 0
              ? 'border-red-200 hover:border-red-400 bg-gradient-to-b from-white to-red-50/20'
              : 'border-gray-100 hover:border-primary/30'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all ${
                pendingQuotes.length > 0
                  ? 'bg-red-500 text-white'
                  : 'bg-forest/5 text-forest group-hover:bg-primary group-hover:text-white'
              }`}
            >
              <Building2 className="w-6 h-6" />
            </div>
            {pendingQuotes.length > 0 ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-red-500 px-2.5 py-1 rounded-full shadow-sm animate-pulse">
                {pendingQuotes.length} รอดำเนินการ
              </span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-wider text-green-700 bg-green-50 border border-green-200/50 px-2.5 py-1 rounded-full">
                เรียบร้อยครบ
              </span>
            )}
          </div>

          <div>
            <div className="text-3xl font-black font-heading text-forest group-hover:text-primary transition-colors">
              {quotes.length}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
              คำขอใบเสนอราคาองค์กร
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
            <span>เปิด CRM ลูกค้าองค์กร</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* 3. Main Dashboard Body: Left (Recent Inquiries) & Right (Quick Launch & Active Trips) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Corporate Inquiries (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-gray-100 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="text-lg sm:text-xl font-black font-heading text-forest tracking-tight">
                  คำขอใบเสนอราคาล่าสุด (Recent Inquiries)
                </h2>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                รายชื่อบริษัทและองค์กรที่ติดต่อเข้ามาจัดทริปหรือเช่ารถตู้
              </p>
            </div>

            <Link
              href="/adminnongtung/corporate"
              className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1 group"
            >
              <span>ดูทั้งหมด ({quotes.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {quotes.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs font-bold">
              ยังไม่มีรายการคำขอใบเสนอราคาในขณะนี้
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {quotes.slice(0, 5).map((q) => (
                <div
                  key={q.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-gray-50/50 -mx-2 px-2 rounded-2xl transition-all"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-forest text-sm truncate">
                        {q.companyName}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          q.status === 'pending'
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : 'bg-green-50 text-green-700 border border-green-200'
                        }`}
                      >
                        {q.status === 'pending' ? 'รอดำเนินการ' : 'ติดต่อแล้ว'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span>👤 {q.contactPerson}</span>
                      <span className="text-primary font-bold">📞 {q.phone}</span>
                      <span>👥 {q.groupSize} ท่าน</span>
                    </div>

                    {q.requirements && (
                      <p className="text-[11px] text-gray-400 italic line-clamp-1 mt-1">
                        "{q.requirements}"
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-gray-400 font-mono">
                      {q.createdAt ? new Date(q.createdAt).toLocaleDateString('th-TH') : '-'}
                    </div>
                    <Link
                      href="/adminnongtung/corporate"
                      className="inline-block mt-1 text-[11px] font-bold text-forest hover:text-primary underline decoration-primary/30"
                    >
                      จัดการ &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Launch Shortcuts & Platform Modules (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Shortcuts Matrix */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h2 className="text-base sm:text-lg font-black font-heading text-forest tracking-tight mb-4">
              ทางลัดจัดการระบบ (Quick Launchpad)
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  href: '/adminnongtung/trips/create',
                  label: 'สร้างทริปใหม่',
                  desc: 'เพิ่มแพ็กเกจ',
                  icon: Plus,
                  color: 'text-primary bg-primary/10',
                },
                {
                  href: '/adminnongtung/reels',
                  label: 'คลิป TikTok',
                  desc: 'ผูกสินค้าในคลิป',
                  icon: Video,
                  color: 'text-rose-500 bg-rose-50',
                },
                {
                  href: '/adminnongtung/transport/create',
                  label: 'เพิ่มรถนำเที่ยว',
                  desc: 'VIP Van / 4WD',
                  icon: Car,
                  color: 'text-amber-600 bg-amber-50',
                },
                {
                  href: '/adminnongtung/articles/edit/new',
                  label: 'เขียนบทความ',
                  desc: 'Content Blog',
                  icon: BookOpen,
                  color: 'text-blue-600 bg-blue-50',
                },
                {
                  href: '/adminnongtung/settings',
                  label: 'ตั้งค่าหน้าแรก',
                  desc: 'Popular Trips',
                  icon: Settings,
                  color: 'text-emerald-600 bg-emerald-50',
                },
                {
                  href: '/th',
                  label: 'ดูหน้าเว็บจริง',
                  desc: 'เปิดแท็บใหม่',
                  icon: ExternalLink,
                  color: 'text-forest bg-surface',
                  external: true,
                },
              ].map((shortcut, i) => (
                <Link
                  key={i}
                  href={shortcut.href}
                  target={shortcut.external ? '_blank' : undefined}
                  rel={shortcut.external ? 'noopener noreferrer' : undefined}
                  className="p-4 rounded-2xl border border-gray-100 bg-surface/30 hover:bg-white hover:border-primary/40 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${shortcut.color}`}
                  >
                    <shortcut.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-forest text-xs group-hover:text-primary transition-colors">
                      {shortcut.label}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{shortcut.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Adventure Highlights */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black font-heading text-forest">
                แพ็กเกจทริปยอดนิยม (Trips)
              </h3>
              <Link href="/adminnongtung/trips" className="text-xs font-bold text-primary hover:underline">
                ดูทั้งหมด &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {trips.slice(0, 3).map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface/50 border border-forest/5 hover:bg-surface transition-all"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-forest/10">
                    <Image src={trip.image} alt={trip.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="text-xs font-bold text-forest truncate">{trip.title}</div>
                    <div className="text-[10px] text-gray-400">
                      {trip.location} • {trip.duration}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-primary">฿{trip.price.toLocaleString()}</div>
                    <span
                      className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        trip.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : trip.status === 'limited'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
