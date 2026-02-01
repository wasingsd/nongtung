import { getArticle } from '@/lib/firestore-db';
import { createArticle, updateArticle } from '@/app/actions/articleActions';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const isNew = slug === 'new';
    const article = isNew ? null : await getArticle(slug);

    // If editing but not found
    if (!isNew && !article) {
        return <div>Article not found</div>;
    }

    const action = isNew ? createArticle : updateArticle.bind(null, slug);

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link href="/adminnongtung/articles" className="inline-flex items-center text-gray-500 hover:text-forest mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
            </Link>

            <h1 className="text-3xl font-bold font-heading text-forest mb-8">
                {isNew ? 'New Article' : `Edit: ${article?.title}`}
            </h1>

            <form action={action} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                {/* Basic Info Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Basic Info</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={article?.title}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="e.g., Top 5 Trails in Chiang Mai"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                defaultValue={article?.slug}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Leave empty to auto-generate from title"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt (SEO Description)</label>
                        <textarea
                            name="excerpt"
                            defaultValue={article?.excerpt}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Short summary for SEO and cards..."
                        ></textarea>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Content (HTML/Markdown)</h2>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                        <input
                            type="text"
                            name="coverImage"
                            defaultValue={article?.coverImage}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Article Body</label>
                        <p className="text-xs text-gray-500 mb-2">Supports basic HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;b&gt;</p>
                        <textarea
                            name="content"
                            defaultValue={article?.content}
                            required
                            rows={15}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
                            placeholder="<p>Write your article content here...</p>"
                        ></textarea>
                    </div>
                </div>

                {/* Meta & Relations Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Metadata & Relations</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                defaultValue={article?.author || 'Nongtung Team'}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                defaultValue={article?.date}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Reading Time</label>
                            <input
                                type="text"
                                name="readingTime"
                                defaultValue={article?.readingTime || '5 min read'}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            defaultValue={article?.tags?.join(', ')}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Chiang Mai, Trekking, Tips"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Keywords (SEO) (comma separated)</label>
                        <input
                            type="text"
                            name="keywords"
                            defaultValue={article?.keywords?.join(', ')}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="เดินป่าเชียงใหม่, เที่ยวเชียงใหม่"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Related Trip ID</label>
                            <input
                                type="text"
                                name="relatedTripId"
                                defaultValue={article?.relatedTripId}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="e.g. chiang-dao-hike"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Related Rental ID</label>
                            <input
                                type="text"
                                name="relatedRentalId"
                                defaultValue={article?.relatedRentalId}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="e.g. tent-k2"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary-deep text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" /> Save Article
                    </button>
                </div>
            </form>
        </div>
    );
}
