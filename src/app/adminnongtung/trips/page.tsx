import Link from 'next/link';
import { getTrips } from '@/lib/firestore-db';
import { Plus, Edit, Search, Filter, Ticket } from 'lucide-react';
import { deleteTrip } from '@/app/actions/tripActions';
import { DeleteButton } from '@/components/DeleteButton';
import Image from 'next/image';

export default async function AdminTripsPage() {
    const trips = await getTrips();

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">Manage <span className="text-primary underline decoration-primary/30 underline-offset-8">Trips</span></h1>
                    <p className="text-gray-400 font-medium text-sm mt-3 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {trips.length} Adventure packages active on the platform
                    </p>
                </div>

                <Link
                    href="/adminnongtung/trips/create"
                    className="group bg-primary hover:bg-forest text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0"
                >
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span className="font-black uppercase text-xs tracking-widest">Create New adventure</span>
                </Link>
            </div>


            {/* Table/List View */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search trips..." className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-sm font-bold text-forest hover:bg-gray-50 transition-all">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                <th className="px-8 py-6">Adventure Details</th>
                                <th className="px-8 py-6">Pricing</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Type</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {trips.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                                <Ticket className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-lg font-bold text-forest mb-2">No adventures yet</h3>
                                            <p className="text-gray-400 text-sm mb-6">Start by creating your first adventure trip package.</p>
                                            <Link href="/adminnongtung/trips/create" className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline">Get Started &rarr;</Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {trips.map((trip) => (
                                <tr key={trip.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                                                <Image src={trip.image} alt={trip.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-forest truncate">{trip.title}</div>
                                                <div className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">{trip.duration}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-forest tracking-tighter">฿{trip.price.toLocaleString()}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Net Price</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${trip.status === 'available' ? 'bg-green-50 text-green-700 border-green-100' :
                                            trip.status === 'limited' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${trip.status === 'available' ? 'bg-green-500' :
                                                trip.status === 'limited' ? 'bg-orange-500' :
                                                    'bg-red-500'
                                                }`}></span>
                                            {trip.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-[10px] font-black text-forest/40 uppercase tracking-[0.2em]">{trip.type}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/adminnongtung/trips/${trip.id}`} className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-forest hover:bg-forest hover:text-white transition-all shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <form action={deleteTrip.bind(null, trip.id)}>
                                                <DeleteButton className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm" />
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Showing {trips.length} Adventures</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-forest transition-colors">Previous</button>
                        <button className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-forest transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
