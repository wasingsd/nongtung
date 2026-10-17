import Link from 'next/link';
import Image from 'next/image';
import { Gem, Heart, Leaf, ArrowRight, ShieldCheck, Compass, MessageSquareHeart, CalendarCheck, MountainSnow } from 'lucide-react';
import { getTrips, getTransport, getHomeSettings, getReels, getFacebookPosts } from '@/lib/firestore-db';
import { Trip, Transport, HomeSettings, Reel, FacebookPost } from '@/types/types';
import TrustBadges from '@/components/TrustBadges';
import TikTokRTB from '@/components/TikTokRTB';
import HeroSearchConsole from '@/components/HeroSearchConsole';
import QuickServiceStrip from '@/components/QuickServiceStrip';
import SectionHeader from '@/components/ui/SectionHeader';
import TripCard from '@/components/TripCard';
import TransportCard from '@/components/TransportCard';
import NongtungStandardsSection from '@/components/NongtungStandardsSection';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n-config';

// ISR: Revalidate page at most once every 60 seconds, with on-demand purge via Server Actions
export const revalidate = 60;

type Props = {
  params: Promise<{ lang: Locale }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const h = dict.Homepage;
  const langPrefix = `/${lang}`;

  let trips: Trip[] = [];
  let transports: Transport[] = [];
  let settings: HomeSettings | null = null;
  let reels: Reel[] = [];
  let fbPosts: FacebookPost[] = [];

  try {
    [trips, transports, settings, reels, fbPosts] = await Promise.all([
      getTrips(),
      getTransport(),
      getHomeSettings(),
      getReels(),
      getFacebookPosts(),
    ]);
  } catch (e) {
    console.error('Critical Error fetching homepage data:', e);
  }

  let featuredTrips: Trip[] = [];
  if (settings?.popularAdventureIds?.length) {
    featuredTrips = settings.popularAdventureIds
      .map((id) => trips.find((t) => t.id === id))
      .filter((t): t is Trip => !!t);
  }
  if (!featuredTrips.length) {
    featuredTrips = trips.slice(0, 6);
  }

  const featuredFleet = transports.slice(0, 3);

  const facebookUrl = settings?.facebookUrl || 'https://www.facebook.com/NONGTUNG.Adventure';
  const fbHandle = facebookUrl.includes('facebook.com/')
    ? facebookUrl.split('facebook.com/').pop()?.split('/').filter(Boolean)[0]
    : 'NONGTUNG.Adventure';
  const messengerUrl = `https://m.me/${fbHandle}`;
  const lineUrl = 'https://line.me/R/ti/p/@nongtungrunning';

  const faqQuestions = {
    th: [
      {
        q: 'น่องตึง (Nongtung) มีบริการทริปอะไรบ้างในเชียงใหม่และภาคเหนือ?',
        a: 'น่องตึงให้บริการจัดทริปเดินป่า (Trekking) แคมป์ปิ้ง (Camping) ทริปธรรมชาติทั้งสำหรับมือใหม่และสายลุย เช่น ดอยหลวงเชียงดาว ห้วยกุ๊บกั๊บ ดอยผากลอง ผาช่อ ม่อนจอง ปัว น่าน รวมถึงบริการเช่ารถตู้ VIP พร้อมคนขับชำนาญทางเขา',
      },
      {
        q: 'มือใหม่ไม่เคยเดินป่ามาก่อน สามารถร่วมทริปกับน่องตึงได้ไหม?',
        a: 'ได้แน่นอนครับ เรามีทริประดับเริ่มต้น (Beginner Friendly) เส้นทางไม่ยาก พร้อมทีมงานไกด์คนพื้นที่คอยดูแลอย่างใกล้ชิด อุปกรณ์แคมป์ปิ้งมาตรฐานสูง และมีประกันอุบัติเหตุคุ้มครองทุกทริป',
      },
      {
        q: 'บริการเช่ารถตู้ VIP เชียงใหม่ พร้อมคนขับของน่องตึง มีจุดเด่นอย่างไร?',
        a: 'รถตู้ VIP ของเราเป็นรถตู้ 9-10 ที่นั่ง เบาะปรับเอนสบาย แอร์เย็น พร้อมคนขับที่มีประสบการณ์ชำนาญเส้นทางภูเขาภาคเหนือ (เชียงใหม่ แม่ฮ่องสอน น่าน ปาย) ขับขี่นุ่มนวล ปลอดภัย และช่วยแนะนำจุดเช็คอินลับๆ ตลอดทาง',
      },
      {
        q: 'ติดต่อจองทริปหรือสอบถามคิวรถตู้ได้อย่างไร?',
        a: 'สามารถแอด LINE Official: @nongtungrunning หรือโทร 080-442-5189 หรือทักข้อความผ่าน Facebook ได้ตลอด 24 ชั่วโมง เพื่อให้ทีมงานช่วยปรับแต่งแผนการเดินทางเฉพาะคุณได้ฟรี',
      },
    ],
    zh: [
      {
        q: 'Nongtung在清迈和泰北提供哪些旅行服务？',
        a: 'Nongtung提供泰北徒步旅行、野营露营、自然探索定制行程（如清道山、Huay Kub Kab、帕丘）以及配备专业山路司机的VIP保姆车包车服务。',
      },
      {
        q: '徒步新手也可以参加Nongtung的行程吗？',
        a: '完全可以。我们为初学者设计了难度适中的轻松徒步路线，由持证专业向导全程陪伴，提供露营装备并包含全程安全旅行保险。',
      },
      {
        q: '如何预订行程或咨询包车？',
        a: '您可以通过官方LINE (@nongtungrunning)、电话 +66 80-442-5189 或在线客服随时联系我们获取专属行程定制方案。',
      },
    ],
    en: [
      {
        q: 'What kind of trips does Nongtung offer in Chiang Mai and Northern Thailand?',
        a: 'Nongtung offers bespoke adventure experiences in Northern Thailand, including guided trekking, wilderness camping, private tailor-made tours (Chiang Dao, Huay Kub Kab, Mon Jong), and VIP private van rentals with expert mountain drivers.',
      },
      {
        q: 'Is it suitable for beginners who have never hiked before?',
        a: 'Yes, absolutely. We have beginner-friendly trail options with expert local guides who take care of everything, from camping equipment to safety insurance on all adventures.',
      },
      {
        q: 'What makes Nongtung private VIP van hire unique?',
        a: 'Our VIP fleet features spacious 9-10 seater vans with reclining captain seats, driven by seasoned professionals who know Northern Thailand mountain roads intimately (Pai, Mae Hong Son, Nan, Chiang Rai).',
      },
      {
        q: 'How can I book a trip or check private van availability?',
        a: 'You can contact us via LINE (@nongtungrunning), phone (+66 80-442-5189), or message us on Facebook anytime for free personalized itinerary consultation.',
      },
    ],
  };

  const currentFaq = faqQuestions[lang as keyof typeof faqQuestions] || faqQuestions.en;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: currentFaq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="fade-in bg-[#fdfdfb] text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. Immersive Hero Section */}
      <section className="relative h-[68vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/75 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=1600"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Adventurers exploring Northern Thailand mountains"
          priority
        />
        <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-4xl pb-12 sm:pb-16">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-3 sm:mb-4 block drop-shadow-md text-primary font-heading">
            {h.hero_subtitle}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 font-heading leading-[1.08] tracking-tight drop-shadow-2xl">
            {h.hero_title_1} <span className="text-primary italic">{h.hero_title_2}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto font-normal font-reading drop-shadow-md leading-relaxed">
            {h.hero_description}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link
              href={`${langPrefix}/trips`}
              className="bg-primary hover:bg-primary-deep text-white px-7 sm:px-9 py-3.5 rounded-full font-bold font-heading uppercase text-xs tracking-wider transition-all shadow-lg shadow-primary/25 hover:scale-105 active:scale-95"
            >
              {h.explore_trips}
            </Link>
            <Link
              href={`${langPrefix}/transport`}
              className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-forest text-white px-7 sm:px-9 py-3.5 rounded-full font-bold font-heading uppercase text-xs tracking-wider transition-all shadow-lg active:scale-95"
            >
              {h.private_transport}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Streamlined Floating Adventure Search Console (Positive spacing, no negative margin clashes) */}
      <HeroSearchConsole lang={lang} />

      {/* 3. 4 Core Services Category Strip */}
      <QuickServiceStrip lang={lang} />

      {/* 4. Trust & Credibility Badges */}
      <TrustBadges />

      {/* 5. Featured Adventures Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-y border-forest/5">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow={h.curated_change}
            title={h.signature_experiences}
            actionText={h.view_all_collections}
            actionHref={`${langPrefix}/trips`}
          />

          {/* Desktop 3-column Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                langPrefix={langPrefix}
                viewDetailsText="ดูทริป"
              />
            ))}
          </div>

          {/* Mobile Snap Carousel */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4">
            {featuredTrips.map((trip) => (
              <div key={trip.id} className="w-[280px] shrink-0 snap-start">
                <TripCard
                  trip={trip}
                  langPrefix={langPrefix}
                  viewDetailsText="จองเลย"
                  compact
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Nongtung Standards & Our Promise + Live Facebook Social Proof */}
      <NongtungStandardsSection
        posts={fbPosts}
        facebookUrl={facebookUrl}
        lineUrl={lineUrl}
      />

      {/* 7. Effortless Planning Process */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FBF9F5] via-[#F4F0E7] to-[#FBF9F5] border-y border-forest/10 relative overflow-hidden">
        {/* Decorative ambient subtle background glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeader
            eyebrow={h.seamless_journey}
            title={h.effortless_planning}
            centered
          />

          {/* Stepper Grid with Connecting Flow */}
          <div className="relative mt-10 sm:mt-14">
            {/* Desktop connecting guide line */}
            <div className="hidden lg:block absolute top-14 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 relative z-10">
              {[
                { icon: Compass, title: h.step_1_title, desc: h.step_1_desc, stepNum: '01' },
                { icon: MessageSquareHeart, title: h.step_2_title, desc: h.step_2_desc, stepNum: '02' },
                { icon: CalendarCheck, title: h.step_3_title, desc: h.step_3_desc, stepNum: '03' },
                { icon: MountainSnow, title: h.step_4_title, desc: h.step_4_desc, stepNum: '04' },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-forest/8 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_16px_40px_rgb(214,110,58,0.14)] hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  {/* Subtle top accent bar on hover */}
                  <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-full" />

                  {/* Top content */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface border border-forest/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                        <step.icon className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="text-3xl sm:text-4xl font-black font-heading text-forest/15 group-hover:text-primary/35 transition-colors">
                        {step.stepNum}
                      </span>
                    </div>

                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/10 text-primary mb-3">
                      STEP {step.stepNum}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-forest mb-2.5 font-heading tracking-tight group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-forest/70 font-normal leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Flow Arrow Indicator on Desktop (between cards, except last) */}
                  {i < 3 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-forest/15 shadow-sm items-center justify-center text-forest/40 z-20 pointer-events-none group-hover:text-primary group-hover:border-primary/40 group-hover:scale-110 transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. TikTok Social Proof RTB (Resilient Reel) */}
      <TikTokRTB reels={reels} />

      {/* 9. VIP Transport Fleet Showcase */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow={h.fleet_subtitle}
            title={h.fleet_title}
            actionText={h.see_all_transport}
            actionHref={`${langPrefix}/transport`}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredFleet.map((car) => (
              <TransportCard
                key={car.id}
                car={car}
                langPrefix={langPrefix}
                selectText={h.select_van}
                messengerUrl={messengerUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Deep Immersive Nature CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-forest text-white">
        <div className="absolute inset-0 opacity-25 scale-105">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
            fill
            className="object-cover"
            alt="Stunning mountain landscapes in Northern Thailand"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-3 block text-primary">
              {h.cta_subtitle}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading mb-4 sm:mb-6 tracking-tight leading-tight">
              {h.cta_title_1} <span className="italic text-primary">{h.cta_title_2}</span>
            </h2>
            <p className="text-sm sm:text-base text-white/85 mb-8 max-w-xl mx-auto font-normal font-reading leading-relaxed">
              {h.cta_description}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <Link
                href={`${langPrefix}/trips`}
                className="bg-primary hover:bg-primary-deep text-white px-8 sm:px-10 py-3.5 rounded-full font-bold font-heading uppercase text-xs tracking-wider transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                {h.begin_adventure}
              </Link>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#06c755] hover:bg-[#05b34c] text-white px-8 sm:px-10 py-3.5 rounded-full font-bold font-heading uppercase text-xs tracking-wider transition-all shadow-xl active:scale-95 flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                </svg>
                <span>{h.chat_team}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
