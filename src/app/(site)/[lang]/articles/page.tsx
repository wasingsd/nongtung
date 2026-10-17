import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/firestore-db';
import { Metadata } from 'next';
import { Calendar, User, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

// ISR: Revalidate page at most once every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'เรื่องเล่า & บทความท่องเที่ยว | Nongtung Journal',
  description: 'คู่มือท่องเที่ยวและบันทึกการเดินทางสู่ขุนเขาภาคเหนือ เคล็ดลับการเดินป่า แคมป์ปิ้ง และจุดเช็คอินลับในเชียงใหม่-น่าน',
  openGraph: {
    title: 'เรื่องเล่า & บทความ | Nongtung Journal',
    description: 'คู่มือท่องเที่ยวและบันทึกการเดินทางสู่ขุนเขาภาคเหนือ',
    images: ['/videos/reel-1-cover.jpg'],
  },
};

export default async function ArticlesIndex() {
  const articles = await getArticles();

  return (
    <div className="fade-in bg-[#fdfdfb] text-forest min-h-screen pt-28 pb-24">
      {/* 1. Header Section */}
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="The Journal"
          title="STORIES FROM"
          highlight="THE WILD"
          description="คู่มือท่องเที่ยว บันทึกเส้นทางเดินป่า และเรื่องเล่าธรรมชาติจากประสบการณ์จริงของทีมงานนองตึง"
          centered
          className="mb-12 sm:mb-16"
        />

        {/* 2. Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-forest/5 impeccable-card-shadow hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* 16:10 Cover Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <Image
                  src={article.coverImage || '/videos/reel-1-cover.jpg'}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {article.tags?.[0] && (
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-white/95 backdrop-blur-md text-forest font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-sm">
                      {article.tags[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-forest/40 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" /> {article.date}
                    </span>
                    {article.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-primary" /> {article.author}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-forest group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-forest/65 leading-relaxed line-clamp-3 font-normal mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-forest/5 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-deep transition-colors">
                  <span>อ่านบทความฉบับเต็ม</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20 bg-surface/50 rounded-3xl border border-forest/10 max-w-xl mx-auto">
            <BookOpen className="w-12 h-12 text-forest/20 mx-auto mb-3" />
            <p className="text-forest/60 font-bold text-sm">
              กำลังจัดเตรียมเรื่องเล่าและบทความใหม่ๆ เร็วๆ นี้
            </p>
          </div>
        )}

        {/* 3. Connect Banner */}
        <div className="mt-16 sm:mt-24 max-w-4xl mx-auto bg-forest rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-4xl font-black font-heading mb-3 tracking-tight">
              WANT MORE <span className="text-primary italic">ADVENTURE?</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/75 max-w-md mx-auto mb-6 font-normal">
              ติดตามเพจ Facebook ของนองตึงเพื่ออัปเดตเส้นทางเปิดใหม่ บรรยากาศทริปสด และโปรโมชั่นพิเศษ
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://line.me/R/ti/p/@nongtungrunning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z"/>
                </svg>
                <span>ปรึกษาแผนเที่ยวทาง LINE</span>
              </a>
              <a
                href="https://www.facebook.com/NONGTUNG.Adventure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all border border-white/20 active:scale-95"
              >
                Facebook: Nongtung
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
