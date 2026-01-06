import { getTrips } from '@/lib/db';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TripForm from '@/components/TripForm';
import { notFound } from 'next/navigation';

export default async function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const trips = getTrips();
    const trip = trips.find((t) => t.id === id);

    if (!trip) notFound();

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/adminnongtung/trips" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
            </Link>

            <h1 className="text-3xl font-bold font-heading text-forest mb-8">Edit Trip: {trip.title}</h1>

            <TripForm trip={trip} />
        </div>
    );
}
