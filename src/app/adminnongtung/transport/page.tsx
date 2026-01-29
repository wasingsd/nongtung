import Link from 'next/link';
import { getTransport } from '@/lib/firestore-db';
import { Plus, Edit } from 'lucide-react';
import { deleteTransport } from '@/app/actions/transportActions';
import { DeleteButton } from '@/components/DeleteButton';
import Image from 'next/image';

export default async function AdminTransportPage() {
    const transports = await getTransport();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-heading text-forest">จัดการรถนำเที่ยว</h1>
                <Link href="/adminnongtung/transport/create" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-deep transition-colors">
                    <Plus className="w-5 h-5" /> เพิ่มรถใหม่
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface text-forest font-bold text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">รูปภาพ</th>
                            <th className="px-6 py-4">ประเภทรถ</th>
                            <th className="px-6 py-4">ราคา 1 วัน</th>
                            <th className="px-6 py-4">ราคา 2 วัน</th>
                            <th className="px-6 py-4">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transports.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-16 h-12 rounded overflow-hidden">
                                        <Image src={item.image} alt={item.type} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-forest">{item.type}</div>
                                    {item.note && <div className="text-xs text-gray-400">{item.note}</div>}
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">฿{(item.price1Day || 0).toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-600 font-medium">฿{(item.price2Day || 0).toLocaleString()}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link href={`/adminnongtung/transport/${item.id}`} className="bg-gray-100 p-2 rounded hover:bg-gray-200 text-forest">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <form action={deleteTransport.bind(null, item.id)}>
                                        <DeleteButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {transports.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    ยังไม่มีข้อมูลรถนำเที่ยว กรุณาเพิ่มข้อมูลเพื่อแสดงที่หน้าบ้าน
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
