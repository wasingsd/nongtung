import Link from 'next/link';
import Image from 'next/image';
import { getTrips } from '@/lib/firestore-db';
import { Plus, Edit, Search, Filter, Compass, Ticket, ExternalLink } from 'lucide-react';
import { deleteTrip } from '@/app/actions/tripActions';
import { DeleteButton } from '@/components/DeleteButton';

export const metadata = {
  title: 'Manage Adventure Trips | Nongtung Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminTripsPage() {
  const trips = await getTrips();

  const availableCount = trips.filter((t) => t.status === 'available').length;
  const limitedCount = trips.filter((t) => t.status === 'limited').length;
  const soldOutCount = trips.filter((t) => t.status === 'sold-out').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full mb-3 border border-primary/20">
            <Compass className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Adventure Packages
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">
            Manage <span className="text-primary italic">Trips</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm mt-2 max-w-xl">
            จัดการรายการแพ็กเกจเดินป่า ดอยหลวงเชียงดาว ห้วยกุ๊บกั๊บ ดอยม่อนจอง กำหนดราคา ระยะเวลา และสถานะการจอง
          </p>
        </div>

        {/* Stats Summary & Action */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[90px]">
            <div className="text-2xl font-black text-forest font-heading">{trips.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              ทริปทั้งหมด
            </div>
          </div>

          <div className="bg-white px-4 py-3 rounded-2xl border border-green-100 shadow-sm text-center min-w-[90px]">
            <div className="text-2xl font-black text-green-600 font-heading">{availableCount}</div>
            <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-0.5">
              พร้อมจอง
            </div>
          </div>

          <Link
            href="/adminnongtung/trips/create"
            className="group bg-primary hover:bg-forest text-white px-6 sm:px-8 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm font-bold"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>สร้างทริปใหม่</span>
          </Link>
        </div>
      </div>

      {/* Table/List View Card */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-5">แพ็กเกจทริป (Adventure)</th>
                <th className="px-8 py-5">ราคาเริ่มต้น</th>
                <th className="px-8 py-5">สถานะ</th>
                <th className="px-8 py-5">รูปแบบ (Type)</th>
                <th className="px-8 py-5 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trips.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Ticket className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-forest mb-2">ยังไม่มีแพ็กเกจทริป</h3>
                      <p className="text-gray-400 text-xs mb-6">
                        เริ่มต้นด้วยการสร้างทริปเดินป่าแพ็กเกจแรกของคุณ
                      </p>
                      <Link
                        href="/adminnongtung/trips/create"
                        className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary-deep transition-all"
                      >
                        + สร้างทริปแรกเลย
                      </Link>
                    </div>
                  </td>
                </tr>
              )}

              {trips.map((trip) => (
                <tr key={trip.id} className="group hover:bg-gray-50/60 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden relative shadow-sm border border-forest/10 shrink-0">
                        <Image
                          src={trip.image}
                          alt={trip.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-forest text-sm truncate group-hover:text-primary transition-colors">
                          {trip.title}
                        </div>
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mt-0.5">
                          {trip.location} • {trip.duration}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="text-sm font-black text-forest">
                      ฿{trip.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                      Net Price / Pax
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                        trip.status === 'available'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : trip.status === 'limited'
                          ? 'bg-orange-50 text-orange-700 border-orange-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          trip.status === 'available'
                            ? 'bg-green-500'
                            : trip.status === 'limited'
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                        }`}
                      />
                      {trip.status === 'available'
                        ? 'พร้อมจอง'
                        : trip.status === 'limited'
                        ? 'ที่นั่งจำกัด'
                        : 'เต็มแล้ว'}
                    </span>
                  </td>

                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-forest/60 uppercase tracking-wider bg-surface px-2.5 py-1 rounded-lg border border-forest/5">
                      {trip.type === 'join' ? 'Join Trip' : 'Private'}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/th/trips/${trip.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-surface hover:bg-forest text-forest hover:text-white flex items-center justify-center transition-all shadow-sm"
                        title="ดูหน้าเว็บจริง"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/adminnongtung/trips/${trip.id}`}
                        className="w-9 h-9 rounded-xl bg-surface hover:bg-primary text-forest hover:text-white flex items-center justify-center transition-all shadow-sm"
                        title="แก้ไขทริป"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      <form action={deleteTrip.bind(null, trip.id)}>
                        <DeleteButton className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-bold">
          <span>แสดงทั้งหมด {trips.length} แพ็กเกจ</span>
          <span className="text-[10px] uppercase tracking-widest font-mono">
            Synced with Firestore
          </span>
        </div>
      </div>
    </div>
  );
}
