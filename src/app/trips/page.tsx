import { getTrips } from '@/lib/firestore-db';
import TripList from '@/components/TripList';
import { Metadata } from 'next';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Authentic Nature Trips | Trekking & Camping in Chiang Mai',
    description: 'Explore guided trekking and camping trips in Chiang Mai. Exceptional value adventures to hidden trails in Northern Thailand.',
    keywords: [
        'chiang mai trekking', 'trekking in chiang mai', 'chiang mai camping',
        'doi inthanon tour', 'hiking thailand', 'chiang mai trail',
        'overnight camping chiang mai', 'adventure trips chiang mai',
        'เดินป่าเชียงใหม่', 'ทริปแคมป์ปิ้ง'
    ],
    openGraph: {
        title: 'Authentic Nature Trips | Nongtung',
        description: 'Explore guided trekking and camping trips in Chiang Mai and Northern Thailand.',
    },
};

export default async function TripsPage() {
    const trips = await getTrips();

    return (
        <div className="bg-[#fdfdfb] min-h-screen">
            <div className="container mx-auto px-6 py-12 md:py-20 fade-in">
                <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Curated For You</span>
                    <h1 className="text-4xl md:text-6xl font-black font-heading text-forest mb-6 tracking-tighter uppercase">
                        SIGNATURE <span className="italic text-primary">ADVENTURES</span>
                    </h1>
                    <p className="text-forest/60 text-lg font-medium leading-relaxed">
                        Discover our hand-picked selection of immersive nature experiences.
                        Each journey is designed to immerse you in the beauty of Northern Thailand with exceptional value and service.
                    </p>
                </div>

                <TripList trips={trips} />

                <div className="mt-20 text-center py-16 border-t border-forest/5">
                    <p className="text-forest/40 uppercase tracking-widest text-xs font-bold mb-4">Can't find what you're looking for?</p>
                    <a
                        href="https://m.me/Venturevibecnx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white border border-forest/10 text-forest px-8 py-3 rounded-full text-[10px] uppercase font-black tracking-[0.2em] hover:bg-forest hover:text-white transition-all shadow-sm"
                    >
                        Request a Custom Trip
                    </a>
                </div>
            </div>
        </div>
    );
}
