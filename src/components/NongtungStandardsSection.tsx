'use client';

import Image from 'next/image';
import {
  ShieldCheck,
  Gem,
  Bus,
  Leaf,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { FacebookPost } from '@/types/types';

interface NongtungStandardsSectionProps {
  posts: FacebookPost[];
  facebookUrl?: string;
  lineUrl?: string;
}

export default function NongtungStandardsSection({
  posts,
  facebookUrl = 'https://www.facebook.com/NONGTUNG.Adventure',
  lineUrl = 'https://line.me/R/ti/p/@nongtungrunning',
}: NongtungStandardsSectionProps) {
  const standards = [
    {
      icon: ShieldCheck,
      number: '01',
      badge: 'ความปลอดภัยสูงสุด',
      title: 'ไกด์ท้องถิ่นตัวจริง & ประกันภัยครบ',
      description:
        'นำทริปโดยคนพื้นที่ที่คุ้นเคยป่าเขาเชียงใหม่เป็นอย่างดี ผ่านการอบรมปฐมพยาบาล พร้อมประกันอุบัติเหตุคุ้มครองทุกท่านตลอดการเดินทาง ไม่ทิ้งใครไว้ข้างหลัง',
    },
    {
      icon: Gem,
      number: '02',
      badge: 'ความจริงใจ 100%',
      title: 'ราคาโปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง',
      description:
        'คำมั่นสัญญาที่ชัดเจน ทุกรายการแจกแจงครบถ้วน รวมค่าที่พัก อาหาร ค่าธรรมเนียมอุทยาน และคนดูแล จ่ายครั้งเดียวจบ ไม่มีการเก็บเพิ่มจุกจิกหน้างาน',
    },
    {
      icon: Bus,
      number: '03',
      badge: 'เดินทางสบายใจ',
      title: 'รถตู้ VIP & คนขับชำนาญทางเขา',
      description:
        'ยานพาหนะตรวจเช็กสภาพความปลอดภัยทุกสัปดาห์ เบาะกัปตันกว้างขวาง คนขับขับขี่นุ่มนวล ชำนาญโค้งดอยปาย น่าน แม่ฮ่องสอน นั่งสบายไม่เวียนหัว',
    },
    {
      icon: Leaf,
      number: '04',
      badge: 'การท่องเที่ยวสีเขียว',
      title: 'เคารพธรรมชาติ & กระจายรายได้สู่ชุมชน',
      description:
        'ยึดมั่นหลัก Leave No Trace เก็บทุกขยะลงมา และร่วมมือกับชาวบ้านในท้องถิ่น อุดหนุนวัตถุดิบและโฮมสเตย์ เพื่อให้ธรรมชาติและชุมชนเติบโตไปด้วยกัน',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFCF9] via-[#F8F6F0] to-[#FDFCF9] border-y border-forest/10 relative overflow-hidden">
      {/* Subtle ambient lightings */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#1877F2]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 border border-primary/15 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>คำมั่นสัญญาของเรา • มาตรฐานนองตึง</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-forest tracking-tight mb-4 leading-tight">
            มาตรฐานที่เรายึดมั่น <span className="text-primary italic">พิสูจน์ได้จากหน้างานจริง</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-forest/75 font-reading leading-relaxed font-normal">
            ไม่ใช่แค่คำโฆษณา แต่คือคำสัญญาที่เราลงมือทำในทุกก้าวของการเดินทาง มอบประสบการณ์ธรรมชาติที่ปลอดภัย สบายใจ และคุ้มค่าที่สุดสำหรับคุณ
          </p>
        </div>

        {/* 1. The 4 Core Standards Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {standards.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-forest/8 impeccable-card-shadow hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Top Accent bar on hover */}
              <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-full" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface border border-forest/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black font-heading text-forest/15 group-hover:text-primary/30 transition-colors">
                    {s.number}
                  </span>
                </div>

                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/8 px-2.5 py-0.5 rounded-full mb-2">
                  {s.badge}
                </span>

                <h3 className="text-base sm:text-lg font-bold font-heading text-forest mb-2 leading-snug group-hover:text-primary transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs text-forest/70 font-reading leading-relaxed font-normal">
                  {s.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-forest/5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>การันตีในทุกโปรแกรม</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Real Facebook Ground Atmosphere & Proof */}
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-forest/10 impeccable-card-shadow">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-forest/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1877F2] uppercase tracking-wider mb-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Verified Social Proof • เพจทางการ Facebook</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-forest tracking-tight">
                อัปเดตบรรยากาศจริงจาก <span className="text-primary italic">@NONGTUNG.Adventure</span>
              </h3>
              <p className="text-xs sm:text-sm text-forest/65 font-reading mt-1.5">
                ติดตามเรื่องราวจากหน้างาน ภาพถ่ายทริปล่าสุด และฟีดแบ็กจริงจากผู้ร่วมเดินทาง
              </p>
            </div>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>ไปที่เพจ Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Facebook Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((post) => (
              <div
                key={post.id}
                className="bg-[#FAF9F5] rounded-2xl overflow-hidden border border-forest/10 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Post Author Bar */}
                  <div className="p-4 flex items-center justify-between border-b border-forest/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-forest/10 relative shrink-0">
                        <Image
                          src="/images/logo.png"
                          alt="Nongtung Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold font-heading text-forest truncate block">
                            น่องตึง
                          </span>
                          <span className="w-3 h-3 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[7px] font-black shrink-0">
                            ✓
                          </span>
                        </div>
                        <span className="text-[10px] text-forest/45 block">
                          Facebook Page
                        </span>
                      </div>
                    </div>

                    <span className="bg-primary/10 text-primary font-bold text-[9px] px-2 py-0.5 rounded-full shrink-0">
                      {post.badge || 'มาตรฐานนองตึง'}
                    </span>
                  </div>

                  {/* Photo Container */}
                  {post.full_picture && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-forest/5">
                      <Image
                        src={post.full_picture}
                        alt="Facebook Post Media"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Caption Message */}
                  <div className="p-4">
                    <p className="text-xs text-forest/80 font-reading leading-relaxed line-clamp-3">
                      {post.message}
                    </p>
                  </div>
                </div>

                {/* Footer Reactions & Post Link */}
                <div className="px-4 pb-4 pt-2 border-t border-forest/5">
                  <div className="flex items-center justify-between text-[11px] text-forest/50 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-[#1877F2]" />
                      <span>{post.reactions_count ?? 0}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-forest/40" />
                      <span>{post.comments_count ?? 0} ความคิดเห็น</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-forest/40" />
                      <span>{post.shares_count ?? 0}</span>
                    </span>
                  </div>

                  <a
                    href={post.permalink_url || facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white hover:bg-forest hover:text-white text-forest/80 py-2 px-3 rounded-xl text-[11px] font-bold font-heading text-center flex items-center justify-center gap-1.5 border border-forest/10 transition-colors"
                  >
                    <span>อ่านโพสต์นี้บน Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Conversion CTA Bar below Facebook cards */}
          <div className="mt-8 pt-6 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs text-forest/70 font-medium leading-tight">
                พร้อมสัมผัสประสบการณ์เดินป่า & รถตู้ VIP ที่การันตีมาตรฐานทุกรายละเอียดแล้วหรือยัง?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#06c755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-full text-xs font-bold font-heading uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.92 1.63 5.53 4.17 7.08-.18.66-.66 2.4-0.76 2.78-.12.48.18.47.37.35.15-.09 2.05-1.39 2.87-1.95.45.06.9.1 1.35.1 5.52 0 10-3.92 10-8.75S17.52 2 12 2z" />
                </svg>
                <span>ปรึกษาแผนเที่ยวทาง LINE: @nongtungrunning</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
