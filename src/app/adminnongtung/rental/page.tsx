import Link from 'next/link';
import { getRentals } from '@/lib/firestore-db';
import { Plus, Edit, Package } from 'lucide-react';
import { deleteRental } from '@/app/actions/rentalActions';
import { DeleteButton } from '@/components/DeleteButton';
import Image from 'next/image';

export default async function AdminRentalPage() {
    const rentals = await getRentals();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-heading text-forest">จัดการอุปกรณ์เช่า</h1>
                <Link href="/adminnongtung/rental/create" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-deep transition-colors">
                    <Plus className="w-5 h-5" /> เพิ่มอุปกรณ์
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface text-forest font-bold text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">รูป</th>
                            <th className="px-6 py-4">ชื่อ</th>
                            <th className="px-6 py-4">ประเภท</th>
                            <th className="px-6 py-4">ราคา</th>
                            <th className="px-6 py-4">สต็อก</th>
                            <th className="px-6 py-4">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rentals.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <Package className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-forest">{item.name}</div>
                                    {item.description && (
                                        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{item.description}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-surface rounded text-xs font-bold text-forest">{item.type}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    ฿{item.price?.toLocaleString() || 0} <span className="text-xs text-gray-400">/{item.unit || 'Day'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold ${(item.stock || 0) > 5 ? 'text-green-600' : (item.stock || 0) > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                                        {item.stock || 0}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link href={`/adminnongtung/rental/${item.id}`} className="bg-gray-100 p-2 rounded hover:bg-gray-200 text-forest">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <form action={deleteRental.bind(null, item.id)}>
                                        <DeleteButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {rentals.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">ยังไม่มีอุปกรณ์ กดปุ่ม &quot;เพิ่มอุปกรณ์&quot; เพื่อเริ่มต้น</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
