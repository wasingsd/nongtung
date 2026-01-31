import { getTrips } from '@/lib/firestore-db';
import TripList from '@/components/TripList';

export default async function TripsPage() {
    const trips = await getTrips();

    return (
        <div className="container mx-auto px-6 py-8 md:py-12 fade-in">
            <div className="mb-6 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-bold font-heading text-forest mb-4 md:mb-6">ADVENTURE TRIPS</h2>
                <TripList trips={trips} />
            </div>
        </div>
    );
}
