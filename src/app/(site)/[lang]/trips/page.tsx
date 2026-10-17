import { getTrips } from '@/lib/firestore-db';
import TripList from '@/components/TripList';
import SectionHeader from '@/components/ui/SectionHeader';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n-config';

// ISR: Revalidate page at most once every 60 seconds
export const revalidate = 60;

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
    <div className="bg-[#fdfdfb] min-h-screen pt-28 pb-24">
      <div className="container mx-auto px-4 sm:px-6 fade-in">
        <SectionHeader
          eyebrow={dict.TripsPage.curated_title}
          title={dict.TripsPage.signature_title}
          highlight={dict.TripsPage.adventures_title}
          description={dict.TripsPage.description}
          centered
          className="mb-10 sm:mb-14"
        />

        <TripList trips={trips} lang={lang} dict={dict.TripList} />

        <div className="mt-16 sm:mt-24 text-center py-14 px-6 bg-white rounded-3xl border border-forest/10 max-w-3xl mx-auto impeccable-surface-shadow">
          <p className="text-forest/50 uppercase tracking-widest text-xs font-bold font-heading mb-2">
            {dict.TripsPage.not_found_title}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-forest mb-6">
            ต้องการจัดทริปเฉพาะกลุ่ม หรือเส้นทางพิเศษ?
          </h3>
          <a
            href={`https://line.me/R/ti/p/@nongtungrunning?text=${encodeURIComponent('สวัสดีครับ สนใจจัดทริปเฉพาะกลุ่ม / สอบถามเส้นทางพิเศษ')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-8 py-3.5 rounded-full text-xs uppercase font-bold font-heading tracking-wider transition-all shadow-lg shadow-[#06c755]/25 active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
            </svg>
            <span>{dict.TripsPage.request_custom}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
