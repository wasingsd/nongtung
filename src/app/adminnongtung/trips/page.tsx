import Link from 'next/link';
import { getTrips } from '@/lib/db';
import { Plus, Edit } from 'lucide-react';
import { deleteTrip } from '@/app/actions/tripActions';
import { DeleteButton } from '@/components/DeleteButton';

export default function AdminTripsPage() {
    const trips = getTrips();

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-heading text-forest">Manage Trips</h1>
                <Link href="/adminnongtung/trips/create" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-deep transition-colors">
                    <Plus className="w-5 h-5" /> Add New Trip
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-surface text-forest font-bold text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {trips.map((trip) => (
                            <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-forest">{trip.title}</td>
                                <td className="px-6 py-4 text-gray-600">฿{trip.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${trip.status === 'available' ? 'bg-green-100 text-green-700' :
                                        trip.status === 'limited' ? 'bg-orange-100 text-orange-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {trip.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 capitalize">{trip.type}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <Link href={`/adminnongtung/trips/${trip.id}`} className="bg-gray-100 p-2 rounded hover:bg-gray-200 text-forest">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <form action={deleteTrip.bind(null, trip.id)}>
                                        <DeleteButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
