import Link from 'next/link';
import { getArticles } from '@/lib/firestore-db';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { deleteArticle } from '@/app/actions/articleActions';

export default async function AdminArticlesPage() {
    const articles = await getArticles();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-heading text-forest">Articles</h1>
                <Link
                    href="/adminnongtung/articles/edit/new"
                    className="bg-primary hover:bg-primary-deep text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" /> New Article
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Title</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Author</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Date</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                    No articles found. Create one to get started!
                                </td>
                            </tr>
                        ) : (
                            articles.map((article) => (
                                <tr key={article.slug} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{article.title}</div>
                                        <div className="text-xs text-gray-400 font-mono mt-1">/{article.slug}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {article.author}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {article.date}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Link
                                            href={`/articles/${article.slug}`}
                                            target="_blank"
                                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Live"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/adminnongtung/articles/edit/${article.slug}`}
                                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <form action={deleteArticle.bind(null, article.slug)} className="inline-block" onSubmit={(e) => {
                                            if (!confirm('Are you sure you want to delete this article?')) {
                                                e.preventDefault();
                                            }
                                        }}>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
