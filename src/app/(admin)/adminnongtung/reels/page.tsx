import { getReels, getTrips } from '@/lib/firestore-db';
import ReelsEditor from '@/components/admin/ReelsEditor';
import { Video, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'TikTok Reels & Shoppable Clips | Nongtung Admin',
};

// Force dynamic fetch
export const dynamic = 'force-dynamic';

export default async function AdminReelsPage() {
  const [reels, trips] = await Promise.all([
    getReels().catch(() => []),
    getTrips().catch(() => []),
  ]);
  const safeReels = Array.isArray(reels) ? reels : [];
  const safeTrips = Array.isArray(trips) ? trips : [];

  const activeCount = safeReels.filter((r) => r && r.isActive !== false).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full mb-3 border border-primary/20">
            <Video className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              TikTok Shoppable Reels
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">
            TikTok Reels & <span className="text-primary italic">Shoppable Clips</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm mt-2 max-w-2xl">
            จัดการคลิปสั้น TikTok จากช่อง @nongtungrunning พร้อมกำหนดสินค้าหรือแพ็กเกจทริปที่ต้องการให้ลูกค้ากดจองได้ทันที
          </p>
        </div>

        {/* Stats Summary Pills */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
            <div className="text-2xl font-black text-forest font-heading">{reels.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              คลิปทั้งหมด
            </div>
          </div>
          <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
            <div className="text-2xl font-black text-green-600 font-heading">{activeCount}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              เปิดแสดงบนเว็บ
            </div>
          </div>
        </div>
      </div>

      {/* Main Reels Editor */}
      <ReelsEditor initialReels={safeReels} allTrips={safeTrips} />
    </div>
  );
}
