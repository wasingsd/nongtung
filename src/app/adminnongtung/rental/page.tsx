import Link from 'next/link';
import { getRentals } from '@/lib/firestore-db';
import { Plus, Edit } from 'lucide-react';
import { deleteRental } from '@/app/actions/rentalActions';
import { DeleteButton } from '@/components/DeleteButton';
import Image from 'next/image';

export default async function AdminRentalPage() {
    const rentals = await getRentals();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-heading text-forest">Manage Rentals</h1>
                <Link href="/adminnongtung/rental/create" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-deep transition-colors">
                    <Plus className="w-5 h-5" /> Add New Item
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface text-forest font-bold text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Price/Day</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rentals.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-forest">{item.name}</td>
                                <td className="px-6 py-4 text-gray-500">{item.type}</td>
                                <td className="px-6 py-4 text-gray-600">฿{item.pricePerDay.toLocaleString()}</td>
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
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No rental items found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
