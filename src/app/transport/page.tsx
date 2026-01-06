import Image from 'next/image';
import { CheckCircle, Bus } from 'lucide-react';

export default function TransportPage() {
    return (
        <div className="container mx-auto px-6 py-12 fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-bold font-heading text-forest mb-2">TRANSPORTATION</h2>
                    <p className="text-gray-500">บริการรถรับส่งดอย และนำเที่ยวเชียงใหม่ โดยทีมขับรถชำนาญเส้นทางเขา</p>
                </div>
                <div className="mt-4 md:mt-0 bg-surface px-4 py-2 rounded text-sm text-forest font-medium">
                    <CheckCircle className="w-4 h-4 inline mr-1 text-primary" /> รถตู้ VIP 9 ที่นั่ง / รถแดง 4WD
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Card 1: Doi Suthep Zone */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                    <div className="relative w-full h-48">
                        <Image
                            src="https://images.unsplash.com/photo-1596423737522-675975298839?auto=format&fit=crop&q=80&w=800"
                            alt="Doi Suthep"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-forest mb-2">Zone: Doi Suthep & Pui</h3>
                        <p className="text-sm text-gray-500 mb-4">เส้นทางยอดฮิต ใกล้ตัวเมือง เหมาะสำหรับ One Day Trip</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex justify-between text-sm border-b border-dashed pb-2"><span>City - Wat Phra That</span><span className="font-bold">800.-</span></li>
                            <li className="flex justify-between text-sm border-b border-dashed pb-2"><span>City - Doi Pui Village</span><span className="font-bold">1,200.-</span></li>
                            <li className="flex justify-between text-sm border-b border-dashed pb-2"><span>City - Khun Chang Kian</span><span className="font-bold">1,800.-</span></li>
                        </ul>
                        <button className="w-full bg-primary text-white py-2 rounded font-bold text-sm uppercase hover:bg-primary-deep">Book Now</button>
                    </div>
                </div>

                {/* Card 2: Doi Inthanon Zone */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                    <div className="relative w-full h-48">
                        <Image
                            src="https://images.unsplash.com/photo-1599573860017-d586d1c97a89?auto=format&fit=crop&q=80&w=800"
                            alt="Doi Inthanon"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-forest mb-2">Zone: Doi Inthanon</h3>
                        <p className="text-sm text-gray-500 mb-4">หลังคาแดนสยาม เส้นทางคดเคี้ยว ต้องการคนขับชำนาญ</p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex justify-between text-sm border-b border-dashed pb-2"><span>City - Summit (Round trip)</span><span className="font-bold">3,500.-</span></li>
                            <li className="flex justify-between text-sm border-b border-dashed pb-2"><span>City - Kew Mae Pan</span><span className="font-bold">3,500.-</span></li>
                            <li className="flex justify-between text-sm border-b border-dashed pb-2"><span>Overnight Charge</span><span className="font-bold">+1,000.-</span></li>
                        </ul>
                        <button className="w-full bg-primary text-white py-2 rounded font-bold text-sm uppercase hover:bg-primary-deep">Book Now</button>
                    </div>
                </div>

                {/* Card 3: Custom / Van Rental */}
                <div className="bg-forest text-white rounded-lg shadow-lg overflow-hidden p-8 flex flex-col justify-center text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Bus className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-heading">VIP VAN RENTAL</h3>
                    <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                        เหมาวันพร้อมคนขับ สำหรับท่องเที่ยวในเชียงใหม่และจังหวัดใกล้เคียง
                        (ไม่รวมค่าน้ำมัน)
                    </p>
                    <div className="text-3xl font-bold text-primary mb-2">2,000.- <span className="text-sm text-white font-normal">/ Day</span></div>
                    <div className="text-xs text-gray-400 mb-8">(Service 10 hrs/day)</div>
                    <button className="w-full bg-white text-forest py-3 rounded font-bold text-sm uppercase hover:bg-gray-100">Contact to Book</button>
                </div>
            </div>
        </div>
    );
}
