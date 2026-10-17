import { getTrips, getHomeSettings } from '@/lib/firestore-db';
import HomeSettingsEditor from '@/components/admin/HomeSettingsEditor';
import { Settings, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Home Display Settings | Nongtung Admin',
};

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const [trips, settings] = await Promise.all([
    getTrips().catch(() => []),
    getHomeSettings().catch(() => null),
  ]);
  const safeTrips = Array.isArray(trips) ? trips : [];

  const initialSelectedIds = settings?.popularAdventureIds || [];
  const initialFacebookUrl = settings?.facebookUrl || 'https://www.facebook.com/NONGTUNG.Adventure';

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 px-3.5 py-1.5 rounded-full mb-3 border border-emerald-500/20">
            <Settings className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Landing Page Curation
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">
            Home <span className="text-primary italic">Display Settings</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm mt-2 max-w-xl">
            กำหนดทริปแนะนำ (Popular Adventures) ที่จะนำไปแสดงบนหน้าแรกของเว็บไซต์ พร้อมลิงก์ปิดการขาย Facebook / Messenger
          </p>
        </div>

        <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="text-2xl font-black text-forest font-heading">
            {initialSelectedIds.length} / 6
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            ทริปแนะนำที่เลือก
          </div>
        </div>
      </div>

      <HomeSettingsEditor
        allTrips={safeTrips}
        initialSelectedIds={initialSelectedIds}
        initialFacebookUrl={initialFacebookUrl}
      />
    </div>
  );
}
