import Link from 'next/link';
import Image from 'next/image';
import { getTransport } from '@/lib/firestore-db';
import { Plus, Edit, Car, Users, Calendar, ShieldCheck, Sparkles, Trash2, Fuel } from 'lucide-react';
import { deleteTransport } from '@/app/actions/transportActions';
import { DeleteButton } from '@/components/DeleteButton';

export const metadata = {
  title: 'VIP Transport Fleet | Nongtung Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminTransportPage() {
  const transports = await getTransport();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 px-3.5 py-1.5 rounded-full mb-3 border border-amber-500/20">
            <Car className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Fleet Management
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">
            VIP Transport <span className="text-primary italic">Fleet</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm mt-2 max-w-xl">
            จัดการข้อมูลยานพาหนะพร้อมคนขับชำนาญเส้นทางภาคเหนือ รถตู้ VIP 9-10 ที่นั่ง, SUV 4WD และรถสองแถวแดง
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[100px]">
            <div className="text-2xl font-black text-forest font-heading">{transports.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              รถในระบบ
            </div>
          </div>

          <Link
            href="/adminnongtung/transport/create"
            className="group bg-primary hover:bg-forest text-white px-6 sm:px-8 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm font-bold"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>เพิ่มรถใหม่</span>
          </Link>
        </div>
      </div>

      {/* Modern Cards Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transports.map((car) => (
          <div
            key={car.id}
            className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Header with Price Badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest/5">
                <img
                  src={car.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'}
                  alt={car.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-primary" />
                  <span>{car.capacity || (car.type.toLowerCase().includes('van') ? '9-10 ที่นั่ง VIP' : car.type.toLowerCase().includes('truck') || car.type.toLowerCase().includes('pickup') ? '4-5 ที่นั่ง (กระบะ 4WD)' : '8-10 ที่นั่ง (สองแถว)')}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-heading font-black text-base sm:text-lg drop-shadow-md">
                    {car.type}
                  </h3>
                  {car.note && (
                    <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                      {car.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Pricing & Features Specs */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-surface/60 border border-forest/5 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      อัตราเช่า 1 วัน
                    </span>
                    <span className="text-base font-black text-forest">
                      ฿{(car.price1Day || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-l border-forest/10 pl-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      อัตราเช่า 2 วัน
                    </span>
                    <span className="text-base font-black text-primary">
                      ฿{(car.price2Day || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-forest/70 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>พร้อมคนขับชำนาญทางเขา ประกันภัยชั้น 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>
                      {car.type.toLowerCase().includes('van')
                        ? 'เบาะกัปตัน VIP เอนสบาย แอร์เย็นฉ่ำ'
                        : car.type.toLowerCase().includes('truck') || car.type.toLowerCase().includes('pickup')
                        ? 'กระบะกว้าง จุสัมภาระและเต็นท์แคมป์ปิ้ง ลุย 4WD'
                        : 'สองแถวเปิดโล่ง สัมผัสลมธรรมชาติและวิวเขา'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-5 pt-0 border-t border-gray-100/60 mt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                พร้อมให้บริการ
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/adminnongtung/transport/${car.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-forest/5 hover:bg-forest text-forest hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>แก้ไข</span>
                </Link>

                <form action={deleteTransport.bind(null, car.id)}>
                  <DeleteButton className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm" />
                </form>
              </div>
            </div>
          </div>
        ))}

        {transports.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200 p-8">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-forest">ยังไม่มีข้อมูลรถนำเที่ยว</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-5">
              กรุณาเพิ่มข้อมูลรถตู้ VIP หรือ 4WD เพื่อให้ลูกค้าเลือกดูได้ที่หน้าเว็บ
            </p>
            <Link
              href="/adminnongtung/transport/create"
              className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary-deep transition-all"
            >
              + เพิ่มรถใหม่ตอนนี้
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
