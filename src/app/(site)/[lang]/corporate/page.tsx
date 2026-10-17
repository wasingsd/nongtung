'use client';

import Image from 'next/image';
import { Users2, Compass, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitCorporateInquiry } from '@/app/actions/corporate';
import { useState, useTransition } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

export default function CorporatePage() {
  return (
    <div className="fade-in bg-[#fdfdfb] text-forest pb-24">
      {/* 1. Immersive Hero Section */}
      <section className="relative h-[55vh] sm:h-[62vh] md:h-[68vh] flex items-center justify-center overflow-hidden bg-forest">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          alt="Corporate Team Building"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-black/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-4xl pt-16">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-3 block text-primary">
            Impactful Team Retreats
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-heading leading-[1.05] tracking-tight">
            NATURE <span className="text-primary italic">CONNECTIONS</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/85 mt-4 sm:mt-6 max-w-2xl mx-auto font-normal leading-relaxed">
            เปิดประสบการณ์เอาท์ดอร์เพื่อกระชับความสัมพันธ์ของทีมงานอย่างมีความหมาย พักผ่อนท่ามกลางธรรมชาติเมืองเหนือ พร้อมบริการเต็มรูปแบบและใบกำกับภาษีถูกต้อง
          </p>
        </div>
      </section>

      {/* 2. Value Propositions (Clean spacing, zero margin clash) */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-forest/10 impeccable-card-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 border border-forest/5 shadow-sm">
                  <Users2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-forest mb-2 tracking-tight">
                  Impactful Bonding
                </h3>
                <p className="text-xs sm:text-sm text-forest/65 leading-relaxed font-normal">
                  กิจกรรมกระชับความสัมพันธ์ที่สร้างสรรค์ สอดแทรกการทำงานเป็นทีมท่ามกลางธรรมชาติที่ผ่อนคลาย
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 border border-forest/5 shadow-sm">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-forest mb-2 tracking-tight">
                  Tailored Value
                </h3>
                <p className="text-xs sm:text-sm text-forest/65 leading-relaxed font-normal">
                  ออกแบบโปรแกรมและงบประมาณได้ยืดหยุ่น ปรับแต่งตามขนาดขององค์กรและเป้าหมายของทีม
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 border border-forest/5 shadow-sm">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-forest mb-2 tracking-tight">
                  Seamless Service & e-Tax
                </h3>
                <p className="text-xs sm:text-sm text-forest/65 leading-relaxed font-normal">
                  ออกใบกำกับภาษีเต็มรูปแบบ (e-Tax) ถูกต้อง พร้อมผู้ประสานงานทริปมืออาชีพดูแลตลอดการเดินทาง
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Retreat Formats */}
      <section className="py-12 sm:py-16 bg-white border-y border-forest/5">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Corporate Formats"
            title="รูปแบบทริปองค์กร"
            highlight="ยอดนิยม"
            description="เรามีแพ็กเกจที่ครอบคลุมตั้งแต่การประชุมผู้บริหาร ไปจนถึงกิจกรรมเอาท์ดอร์สร้างพลังทีม"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="group relative h-[320px] sm:h-[380px] overflow-hidden rounded-3xl border border-forest/10 impeccable-card-shadow">
              <Image
                src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Management Retreat"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">
                  Private & Exclusive
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mb-2">
                  Executive Retreats
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-normal">
                  ทริปพักผ่อนและวางแผนกลยุทธ์สำหรับผู้บริหาร เน้นความเป็นส่วนตัว รีสอร์ตคุณภาพ และบรรยากาศสดชื่น
                </p>
              </div>
            </div>

            <div className="group relative h-[320px] sm:h-[380px] overflow-hidden rounded-3xl border border-forest/10 impeccable-card-shadow">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Team Building"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">
                  Outdoor & Energy
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mb-2">
                  Team Empowerment
                </h4>
                <p className="text-xs sm:text-sm text-white/80 font-normal">
                  กิจกรรมเดินป่าระยะสั้นหรือแคมป์ปิ้งสร้างพลังใจ สร้างความสนิทสนมและความผูกพันในองค์กร
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inquiry Form Section */}
      <section className="py-12 sm:py-20 bg-surface/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14">
            <div className="lg:w-5/12">
              <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.3em] mb-2 block">
                Start Planning
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading text-forest tracking-tight mb-4 leading-tight">
                ร่วมออกแบบ <span className="text-primary italic">ทริปในฝัน</span> ของทีมคุณ
              </h2>
              <p className="text-xs sm:text-sm text-forest/70 font-normal leading-relaxed mb-6">
                แจ้งข้อมูลเบื้องต้นเกี่ยวกับทีมและช่วงเวลาที่ต้องการ ทีมงานนองตึงจะติดต่อกลับพร้อมข้อเสนอและแผนการเดินทางที่เหมาะสมที่สุด
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-forest/80">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>โปรแกรมเฉพาะทีม ไม่ปนกับใคร</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-forest/80">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>ราคาโปร่งใส แจกแจงทุกรายการ</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-forest/80">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>ออกใบเสนอราคาและใบกำกับภาษี e-Tax</span>
                </div>
              </div>

              <div className="pt-5">
                <a
                  href="https://line.me/R/ti/p/@nongtungrunning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                  </svg>
                  <span>คุยรายละเอียดทริปด่วนทาง LINE</span>
                </a>
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-forest/10 impeccable-card-shadow">
                <CorporateForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CorporateForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await submitCorporateInquiry(formData);
      setStatus(result);
      if (result.success) {
        (event.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {status && (
        <div
          className={`sm:col-span-2 p-3.5 rounded-2xl text-center text-xs font-bold ${
            status.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {status.message}
        </div>
      )}
      <div className="sm:col-span-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest/50 mb-1.5 block">
          ชื่อองค์กร / บริษัท
        </label>
        <input
          required
          name="companyName"
          type="text"
          className="w-full bg-surface border border-forest/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-forest placeholder:text-forest/30 focus:border-primary focus:outline-none transition-all"
          placeholder="เช่น บจก. เอบีซี อินโนเวชั่น"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest/50 mb-1.5 block">
          ชื่อผู้ติดต่อ
        </label>
        <input
          required
          name="contactPerson"
          type="text"
          className="w-full bg-surface border border-forest/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-forest placeholder:text-forest/30 focus:border-primary focus:outline-none transition-all"
          placeholder="คุณสมชาย"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest/50 mb-1.5 block">
          เบอร์โทรศัพท์ / LINE ID
        </label>
        <input
          required
          name="phone"
          type="text"
          className="w-full bg-surface border border-forest/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-forest placeholder:text-forest/30 focus:border-primary focus:outline-none transition-all"
          placeholder="08X-XXX-XXXX"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest/50 mb-1.5 block">
          จำนวนผู้เดินทางโดยประมาณ
        </label>
        <input
          required
          name="groupSize"
          type="text"
          className="w-full bg-surface border border-forest/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-forest placeholder:text-forest/30 focus:border-primary focus:outline-none transition-all"
          placeholder="เช่น 15-20 ท่าน"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest/50 mb-1.5 block">
          ช่วงวันที่สะดวกเดินทาง
        </label>
        <input
          name="expectedDate"
          type="date"
          className="w-full bg-surface border border-forest/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-forest focus:border-primary focus:outline-none transition-all"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest/50 mb-1.5 block">
          ความต้องการพิเศษ / งบประมาณ
        </label>
        <textarea
          name="requirements"
          className="w-full bg-surface border border-forest/10 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-forest h-28 placeholder:text-forest/30 focus:border-primary focus:outline-none transition-all"
          placeholder="เช่น ต้องการรถตู้ 2 คัน, พักรีสอร์ต 2 วัน 1 คืน หรือกิจกรรม Team Building"
        />
      </div>
      <div className="sm:col-span-2 pt-2">
        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-primary hover:bg-primary-deep text-white py-3.5 sm:py-4 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-lg shadow-primary/25 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPending ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลเพื่อรับข้อเสนอและใบเสนอราคา'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
