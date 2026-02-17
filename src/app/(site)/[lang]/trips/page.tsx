import { getTrips } from '@/lib/firestore-db';
import TripList from '@/components/TripList';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n-config';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: dict.TripsPage.title,
        description: dict.TripsPage.meta_desc,
        openGraph: {
            title: dict.TripsPage.title,
            description: dict.TripsPage.meta_desc,
        },
    };
}

export default async function TripsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const trips = await getTrips();

    return (
        <div className="bg-[#fdfdfb] min-h-screen">
            <div className="container mx-auto px-6 py-12 md:py-20 fade-in">
                <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">{dict.TripsPage.curated_title}</span>
                    <h1 className="text-4xl md:text-6xl font-black font-heading text-forest mb-6 tracking-tighter uppercase">
                        {dict.TripsPage.signature_title} <span className="italic text-primary">{dict.TripsPage.adventures_title}</span>
                    </h1>
                    <p className="text-forest/60 text-lg font-medium leading-relaxed">
                        {dict.TripsPage.description}
                    </p>
                </div>

                <TripList trips={trips} lang={lang} dict={dict.TripList} />

                <div className="mt-20 text-center py-16 border-t border-forest/5">
                    <p className="text-forest/40 uppercase tracking-widest text-xs font-bold mb-4">{dict.TripsPage.not_found_title}</p>
                    <a
                        href="https://m.me/Venturevibecnx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white border border-forest/10 text-forest px-8 py-3 rounded-full text-[10px] uppercase font-black tracking-[0.2em] hover:bg-forest hover:text-white transition-all shadow-sm"
                    >
                        {dict.TripsPage.request_custom}
                    </a>
                </div>
            </div>
        </div>
    );
}
