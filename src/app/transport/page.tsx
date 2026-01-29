import Image from 'next/image';
import { CheckCircle, Bus, Users, Clock, MapPin, ChevronRight, Phone } from 'lucide-react';
import { getTransport } from '@/lib/firestore-db';
import Link from 'next/link';

export default async function TransportPage() {
    const transports = await getTransport();

    // Group transports by vehicle type
    const groupedByType = transports.reduce((acc, item) => {
        if (!acc[item.type]) {
            acc[item.type] = [];
        }
        acc[item.type].push(item);
        return acc;
    }, {} as Record<string, typeof transports>);

    // Get unique vehicle types with their minimum price
    const vehicleTypes = Object.keys(groupedByType).map(type => ({
        type,
        routes: groupedByType[type],
        minPrice: Math.min(...groupedByType[type].map(r => r.price)),
        image: groupedByType[type][0].image
    }));

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <div className="bg-forest text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                            TRANSPORTATION SERVICE
                        </h1>
                        <p className="text-xl text-gray-300 mb-6">
                            บริการรถรับส่งดอย และนำเที่ยวเชียงใหม่ โดยทีมขับรถชำนาญเส้นทางเขา
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                                <CheckCircle className="w-4 h-4 inline mr-2 text-primary" />
                                คนขับชำนาญเส้นทาง
                            </div>
                            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                                <CheckCircle className="w-4 h-4 inline mr-2 text-primary" />
                                รถสะอาด ปลอดภัย
                            </div>
                            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                                <CheckCircle className="w-4 h-4 inline mr-2 text-primary" />
                                ราคายุติธรรม
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Types Section */}
            {vehicleTypes.length > 0 && (
                <section className="py-16 bg-surface">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-heading text-forest mb-4">ประเภทรถให้บริการ</h2>
                            <p className="text-gray-500">เลือกประเภทรถที่เหมาะกับความต้องการของคุณ</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {vehicleTypes.map((vehicle, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.type}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-bold text-white">{vehicle.type}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-sm text-gray-500">
                                                <Users className="w-4 h-4 inline mr-1" />
                                                {vehicle.routes.length} เส้นทาง
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-400">ราคาเริ่มต้น</div>
                                                <div className="text-2xl font-bold text-primary">฿{vehicle.minPrice.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <a href="#routes" className="block w-full text-center bg-forest text-white py-3 rounded-lg font-bold text-sm uppercase hover:bg-forest-light transition-colors">
                                            ดูเส้นทาง <ChevronRight className="w-4 h-4 inline" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Routes Pricing Section */}
            <section id="routes" className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-heading text-forest mb-4">เส้นทางและราคา</h2>
                        <p className="text-gray-500">รายละเอียดเส้นทางและราคาสำหรับแต่ละประเภทรถ</p>
                    </div>

                    {vehicleTypes.length > 0 ? (
                        <div className="space-y-8">
                            {vehicleTypes.map((vehicle, index) => (
                                <div key={index} className="bg-surface rounded-2xl p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={vehicle.image}
                                                alt={vehicle.type}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-forest">{vehicle.type}</h3>
                                            <p className="text-gray-500 text-sm">ราคาเริ่มต้น ฿{vehicle.minPrice.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-forest text-white text-sm">
                                                <tr>
                                                    <th className="text-left px-6 py-3">เส้นทาง</th>
                                                    <th className="text-left px-6 py-3 hidden md:table-cell">เวลาออก</th>
                                                    <th className="text-right px-6 py-3">ราคา</th>
                                                    <th className="text-right px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {vehicle.routes.map((route) => (
                                                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                                                <span className="font-medium text-forest">{route.route}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                                                            <Clock className="w-4 h-4 inline mr-1" />
                                                            {route.departureTime}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="text-xl font-bold text-primary">฿{route.price.toLocaleString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-deep transition-colors">
                                                                จอง
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <Bus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>ยังไม่มีข้อมูลบริการรับส่ง กรุณาเพิ่มข้อมูลในระบบหลังบ้าน</p>
                        </div>
                    )}
                </div>
            </section>

            {/* VIP Van Rental */}
            <section className="py-16 bg-forest">
                <div className="container mx-auto px-6">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 md:p-12">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                <Bus className="w-12 h-12" />
                            </div>
                            <div className="flex-grow text-center lg:text-left">
                                <h3 className="text-3xl font-bold font-heading text-white mb-2">VIP VAN RENTAL</h3>
                                <p className="text-gray-300 mb-4">
                                    เหมาวันพร้อมคนขับ สำหรับท่องเที่ยวในเชียงใหม่และจังหวัดใกล้เคียง (ไม่รวมค่าน้ำมัน)
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-300">
                                    <span><CheckCircle className="w-4 h-4 inline mr-1 text-primary" /> รถตู้ VIP 9 ที่นั่ง</span>
                                    <span><CheckCircle className="w-4 h-4 inline mr-1 text-primary" /> บริการ 10 ชม./วัน</span>
                                    <span><CheckCircle className="w-4 h-4 inline mr-1 text-primary" /> คนขับชำนาญ</span>
                                </div>
                            </div>
                            <div className="text-center flex-shrink-0">
                                <div className="text-4xl font-bold text-primary mb-1">฿2,000</div>
                                <div className="text-sm text-gray-400 mb-4">/ วัน</div>
                                <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold uppercase hover:bg-primary-deep transition-colors flex items-center gap-2">
                                    <Phone className="w-5 h-5" /> ติดต่อจอง
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-forest mb-4">ต้องการเส้นทางพิเศษ?</h2>
                    <p className="text-gray-500 mb-8">ติดต่อเราสำหรับเส้นทางที่ไม่มีในรายการ หรือต้องการใบเสนอราคาพิเศษสำหรับกรุ๊ป</p>
                    <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-forest text-white px-8 py-4 rounded-lg font-bold uppercase hover:bg-forest-light transition-colors">
                        <Phone className="w-5 h-5" /> ติดต่อผ่าน Line
                    </a>
                </div>
            </section>
        </div>
    );
}
