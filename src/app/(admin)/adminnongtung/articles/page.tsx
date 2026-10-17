import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/firestore-db';
import { Plus, Edit, ExternalLink, BookOpen, Clock, Tag } from 'lucide-react';
import { DeleteArticleButton } from '@/components/DeleteArticleButton';

export const metadata = {
  title: 'Content & Articles | Nongtung Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-700 px-3.5 py-1.5 rounded-full mb-3 border border-blue-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Editorial CMS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">
            Adventure <span className="text-primary italic">Articles</span>
          </h1>
          <p className="text-gray-400 font-medium text-xs sm:text-sm mt-2 max-w-xl">
            จัดการบทความ บันทึกการเดินทาง คู่มือเตรียมตัวเดินป่า และสาระน่ารู้สำหรับการผจญภัย
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-center min-w-[95px]">
            <div className="text-2xl font-black text-forest font-heading">{articles.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
              บทความทั้งหมด
            </div>
          </div>

          <Link
            href="/adminnongtung/articles/edit/new"
            className="group bg-primary hover:bg-forest text-white px-6 sm:px-8 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm font-bold"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>เขียนบทความใหม่</span>
          </Link>
        </div>
      </div>

      {/* Articles Table Card */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/70 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-5">บทความ (Article)</th>
                <th className="px-8 py-5">ผู้เขียน (Author)</th>
                <th className="px-8 py-5">เวลาอ่าน (Read Time)</th>
                <th className="px-8 py-5">วันที่เผยแพร่</th>
                <th className="px-8 py-5 text-right">จัดการ (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-forest">ยังไม่มีบทความในระบบ</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-5">
                      เริ่มต้นเขียนบทความแรกเพื่อให้ความรู้แก่นักเดินป่าและเสริม SEO ให้เว็บไซต์
                    </p>
                    <Link
                      href="/adminnongtung/articles/edit/new"
                      className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary-deep transition-all"
                    >
                      + เขียนบทความแรก
                    </Link>
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.slug} className="group hover:bg-gray-50/60 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {article.coverImage && (
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-forest/10 shadow-sm bg-surface">
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-bold text-forest text-sm group-hover:text-primary transition-colors leading-snug">
                            {article.title}
                          </div>
                          <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                            /{article.slug}
                          </div>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {article.tags.slice(0, 3).map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] bg-surface text-forest/70 px-2 py-0.5 rounded-md font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-[10px] text-primary font-black uppercase">
                          {article.author?.[0] || 'A'}
                        </div>
                        <span className="text-xs font-bold text-forest">{article.author}</span>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{article.readingTime || '5 นาที'}</span>
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <div className="text-xs font-mono text-gray-500">{article.date}</div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/th/articles/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-surface hover:bg-forest text-forest hover:text-white flex items-center justify-center transition-all shadow-sm"
                          title="ดูบทความจริง"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/adminnongtung/articles/edit/${article.slug}`}
                          className="w-9 h-9 rounded-xl bg-surface hover:bg-primary text-forest hover:text-white flex items-center justify-center transition-all shadow-sm"
                          title="แก้ไขบทความ"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <DeleteArticleButton slug={article.slug} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
