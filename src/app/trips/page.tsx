import { getTrips } from '@/lib/firestore-db';
import TripList from '@/components/TripList';
import { Metadata } from 'next';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Adventure Trips | Trekking & Camping in Chiang Mai',
    description: 'Explore guided trekking and camping trips in Chiang Mai. Day trips and multi-day adventures to Doi Inthanon, Doi Suthep, and hidden trails in Northern Thailand.',
    keywords: [
        'chiang mai trekking', 'trekking in chiang mai', 'chiang mai camping',
        'doi inthanon tour', 'hiking thailand', 'chiang mai trail',
        'overnight camping chiang mai', 'adventure trips chiang mai',
        'เดินป่าเชียงใหม่', 'ทริปแคมป์ปิ้ง'
    ],
    openGraph: {
        title: 'Adventure Trips | Trekking & Camping in Chiang Mai',
        description: 'Explore guided trekking and camping trips in Chiang Mai and Northern Thailand.',
    },
};

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
