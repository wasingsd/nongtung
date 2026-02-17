import Link from 'next/link';
import { getArticles } from '@/lib/firestore-db';
import { Plus, Edit, ExternalLink, BookOpen, Search, Filter } from 'lucide-react';
import { DeleteArticleButton } from '@/components/DeleteArticleButton';

export default async function AdminArticlesPage() {
    const articles = await getArticles();

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">Content <span className="text-primary">Articles</span></h1>
                    <p className="text-gray-400 font-medium text-sm mt-3">Manage blog posts, guides, and educational content.</p>
                </div>

                <Link
                    href="/adminnongtung/articles/edit/new"
                    className="bg-primary hover:bg-forest text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-black uppercase text-xs tracking-widest">New Article</span>
                </Link>
            </div>

            {/* List View */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search articles..." className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                <th className="px-8 py-6">Article Info</th>
                                <th className="px-8 py-6">Author</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="max-w-xs mx-auto text-gray-400 font-bold uppercase tracking-widest text-xs">
                                            No articles found. Create your first post!
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => (
                                    <tr key={article.slug} className="group hover:bg-gray-50/50 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-forest group-hover:text-primary transition-colors">{article.title}</div>
                                            <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">/{article.slug}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-400 font-black uppercase">
                                                    {article.author?.[0] || 'A'}
                                                </div>
                                                <span className="text-sm font-bold text-gray-600">{article.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-bold text-gray-500">{article.date}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/articles/${article.slug}`}
                                                    target="_blank"
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-all shadow-sm"
                                                    title="View Live"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/adminnongtung/articles/edit/${article.slug}`}
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
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
