import Image from 'next/image';
import { CheckCircle, Bus, Phone, Info, Calendar, MapPin, Gauge } from 'lucide-react';
import { getTransport, getHomeSettings } from '@/lib/firestore-db';
import TransportCard from '@/components/TransportCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { Metadata } from 'next';

// ISR: Revalidate page at most once every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'เช่ารถตู้ VIP พร้อมคนขับ เชียงใหม่-น่าน-แม่ฮ่องสอน | Nongtung Transport',
  description: 'บริการเช่ารถตู้ VIP พร้อมคนขับชำนาญทางเขาในภาคเหนือ เชียงใหม่ น่าน ปาย แม่ฮ่องสอน บริการอบอุ่น ปลอดภัย ราคาโปร่งใส',
  keywords: [
    'chiang mai van rental',
    'private van chiang mai',
    'airport transfer chiang mai',
    'chauffeur service chiang mai',
    'van rental northern thailand',
    'รถตู้เช่าเชียงใหม่',
    'รถรับส่งสนามบินเชียงใหม่',
  ],
  openGraph: {
    title: 'รถตู้ VIP พร้อมคนขับ | Nongtung Transport',
    description: 'บริการเช่ารถตู้ VIP พร้อมคนขับชำนาญทางเขาในภาคเหนือ อุ่นใจทุกเส้นทาง',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'],
  },
};

export default async function TransportPage() {
  const [transports, settings] = await Promise.all([
    getTransport(),
    getHomeSettings(),
  ]);

  const facebookUrl = settings?.facebookUrl || 'https://www.facebook.com/NONGTUNG.Adventure';
  const fbHandle = facebookUrl.includes('facebook.com/')
    ? facebookUrl.split('facebook.com/').pop()?.split('/').filter(Boolean)[0]
    : 'NONGTUNG.Adventure';
  const messengerUrl = `https://m.me/${fbHandle}`;
  const lineBookingUrl = `https://line.me/R/ti/p/@nongtungrunning?text=${encodeURIComponent('สวัสดีครับ สนใจสอบถามคิวรถตู้ VIP / จองรถเที่ยวเชียงใหม่')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'Nongtung Transport Services',
    description: 'High-quality private fleet and chauffeur services for Northern Thailand adventures.',
    areaServed: 'Chiang Mai, Thailand',
    availableLanguage: ['English', 'Thai'],
    priceRange: '฿฿',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
  };

  return (
    <div className="fade-in bg-[#fdfdfb] text-forest pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Immersive Hero Banner */}
      <section className="relative h-[55vh] sm:h-[62vh] md:h-[68vh] w-full overflow-hidden bg-forest flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600"
          fill
          className="object-cover opacity-50 scale-105"
          alt="Transport Hero"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-black/40 z-10" />

        <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-16">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.4em] mb-3 block">
              Safe, Reliable & Private
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-heading text-white leading-[1.05] tracking-tight">
              PRIVATE <span className="text-primary italic">JOURNEYS</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/85 mt-4 sm:mt-6 max-w-2xl font-normal leading-relaxed">
              เดินทางท่องเที่ยวภาคเหนืออย่างอุ่นใจและสะดวกสบาย ด้วยรถตู้ VIP 9-10 ที่นั่ง พร้อมคนขับผู้ชำนาญเส้นทางเขาสูงทุกเส้นทาง ปลอดภัย ตรงเวลา และใส่ใจตลอดการเดินทาง
            </p>
          </div>
        </div>
      </section>

      {/* 2. Fleet Grid Section (Clean spacing, zero margin clash) */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="กองทัพรถให้บริการ"
            title="รถตู้ VIP & รถส่วนตัว"
            highlight="พร้อมคนขับ"
            description="เลือกรถที่เหมาะกับจำนวนผู้โดยสารและสไตล์การเดินทางของคุณ ทุกคันผ่านการตรวจเช็กมาตรฐานความปลอดภัยสม่ำเสมอ"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {transports.map((car) => (
              <TransportCard
                key={car.id}
                car={car}
                langPrefix="/th"
                selectText="สอบถาม / จองรถคันนี้"
                messengerUrl={messengerUrl}
              />
            ))}
          </div>

          {transports.length === 0 && (
            <div className="text-center py-20 bg-surface/50 rounded-3xl border border-forest/10">
              <Bus className="w-12 h-12 text-forest/20 mx-auto mb-3" />
              <p className="text-forest/60 font-bold text-sm">
                รถตู้ทุกลำดับกำลังอยู่ระหว่างการปฏิบัติภารกิจ กรุณาติดต่อทีมงานเพื่อจัดหารถเสริม
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Service Pledge & Transparency Charter */}
      <section className="py-12 sm:py-16 bg-white border-t border-forest/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto bg-forest rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden text-white">
            <div className="relative z-10">
              <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.35em] mb-3 block">
                Our Service Pledge
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-10 tracking-tight">
                TRANSPARENT & <span className="text-primary italic">RELIABLE</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl text-primary border border-white/10 shrink-0">
                      <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg mb-1">บริการ 10 ชั่วโมง / วัน</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        เริ่มนับเวลาจากเวลานัดหมายที่คุณสะดวก ใช้งานได้เต็มอิ่ม ไม่เร่งรีบ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl text-primary border border-white/10 shrink-0">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg mb-1">ไม่มีค่าคนขับแอบแฝง</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        รวมค่าแรงคนขับ ค่าที่พักและอาหารของคนขับเรียบร้อยแล้ว ไม่มีเก็บจุกจิก
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl text-primary border border-white/10 shrink-0">
                      <Info className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg mb-1">ค่าน้ำมันตามจริง (Fuel at Cost)</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        เติมน้ำมันเต็มถังก่อนออกเดินทาง และเติมคืนเต็มถังเมื่อจบทริป จ่ายตรงตามใบเสร็จปั๊มน้ำมัน
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl text-primary border border-white/10 shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg mb-1">คนขับชำนาญทางเขาภาคเหนือ</h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        มีประสบการณ์ขับเส้นทางภูเขา ชัน โค้งเยอะ เช่น ปาย น่าน ปัว บ่อเกลือ ดอยอินทนนท์ ขับนุ่มนวล ปลอดภัย
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <a
                  href={lineBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#06c755] hover:bg-[#05b34c] text-white px-8 sm:px-10 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-xl shadow-[#06c755]/25 active:scale-95 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                  </svg>
                  <span>สอบถามคิวรถ / จองผ่าน LINE</span>
                </a>
                <p className="text-xs text-white/50 font-medium">
                  ทีมงานพร้อมตอบข้อสงสัยและให้คำแนะนำเส้นทางฟรี (LINE ID: @nongtungrunning)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
