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
                <h1 className="text-3xl font-bold font-heading text-forest">Manage Transport</h1>
                <Link href="/adminnongtung/transport/create" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-deep transition-colors">
                    <Plus className="w-5 h-5" /> Add New Route
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface text-forest font-bold text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Route</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Departure</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transports.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded overflow-hidden">
                                        <Image src={item.image} alt={item.route} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-forest">{item.type}</td>
                                <td className="px-6 py-4 text-gray-600">{item.route}</td>
                                <td className="px-6 py-4 text-gray-600">฿{item.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-500">{item.departureTime}</td>
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
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">No transport routes found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
