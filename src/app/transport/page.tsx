import Image from 'next/image';
import { CheckCircle, Bus, Phone, Info, Calendar } from 'lucide-react';
import { getTransport } from '@/lib/firestore-db';

export default async function TransportPage() {
    const transports = await getTransport();

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <div className="bg-forest text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600')] bg-cover bg-center" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            PRIVATE CAR SERVICE
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            บริการรถนำเที่ยวพร้อมคนขับ ชำนาญเส้นทางดอยและแหล่งท่องเที่ยวในเชียงใหม่
                            ให้คุณเดินทางอย่างสะดวกสบายและปลอดภัย
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                ราคารวมค่าคนขับ
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                ไม่รวมค่าน้ำมันตามจริง
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary" />
                                คนขับสุภาพ ชำนาญทาง
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Cards Section */}
            <section className="py-20 bg-surface">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-forest mb-4">บริการรถนำเที่ยวพร้อมคนขับ</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            เลือกประเภทรถที่เหมาะสมกับการเดินทางของคุณ ราคานี้เป็นค่าบริการรวมคนขับ (10 ชม./วัน)
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-6 py-3 rounded-full text-sm font-bold border border-orange-100 italic">
                            <Info className="w-4 h-4" /> หมายเหตุ: ราคาข้างต้นยังไม่รวมค่าน้ำมัน (เติมตามจริง)
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {transports.map((car) => (
                            <div key={car.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={car.image}
                                        alt={car.type}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6">
                                        <h3 className="text-2xl font-bold text-white">{car.type}</h3>
                                    </div>
                                </div>

                                <div className="p-8 flex-grow">
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm font-bold">1</div>
                                                <span className="font-bold text-forest">ทริป 1 วัน</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-primary">฿{(car.price1Day || 0).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm font-bold">2</div>
                                                <span className="font-bold text-forest">ทริป 2 วัน 1 คืน</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-primary">฿{(car.price2Day || 0).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {car.note && (
                                        <p className="text-sm text-gray-500 italic mb-8 flex items-start gap-2">
                                            <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                                            {car.note}
                                        </p>
                                    )}

                                    <button className="w-full bg-forest text-white py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-forest-light transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                                        <Phone className="w-5 h-5" /> ติดต่อจองรถ
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {transports.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                            <Bus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-400 font-medium">ยังไม่มีข้อมูลรถนำเที่ยวในขณะนี้</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Rental Conditions Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-forest text-white rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Bus className="w-48 h-48" />
                        </div>
                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-3xl font-bold font-heading mb-8 flex items-center justify-center md:justify-start gap-3">
                                <Info className="w-8 h-8 text-primary" />
                                เงื่อนไขการรับบริการ
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-200">
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                                        <span>บริการนำเที่ยว 10 ชม./วัน (เริ่มนับจากเวลาตามนัดหมาย)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                                        <span>ราคาที่แสดง **ไม่รวมค่าน้ำมัน** ลูกค้าเติมเองตามจริง</span>
                                    </li>
                                </ul>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                                        <span>ราคารวมค่าจ้างคนขับ ประกันอุบัติเหตุ และค่าทำความสะอาดรถแล้ว</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                                        <span>กรณีนอกเวลาบริการ (OT) คิดเพิ่มตามประเภทรถ</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 flex flex-col md:flex-row items-center justify-center md:justify-start gap-6">
                                <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-10 py-4 rounded-2xl font-bold uppercase hover:bg-primary-deep transition-all shadow-lg flex items-center gap-3">
                                    <Phone className="w-5 h-5" /> จองผ่าน Line
                                </a>
                                <p className="text-sm text-gray-400 italic">สอบถามข้อมูลเพิ่มเติมได้ตลอด 24 ชม.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
