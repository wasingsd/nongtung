import { getArticle } from '@/lib/firestore-db';
import { createArticle, updateArticle } from '@/app/actions/articleActions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ArticleForm from '@/components/admin/ArticleForm';

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const isNew = slug === 'new';
    const article = isNew ? null : await getArticle(slug);

    if (!isNew && !article) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-black font-heading text-forest mb-4">Article Not Found</h2>
                <Link href="/adminnongtung/articles" className="text-primary font-bold hover:underline">Return to Articles</Link>
            </div>
        );
    }

    const action = isNew ? createArticle : updateArticle.bind(null, slug);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                    <Link
                        href="/adminnongtung/articles"
                        className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-forest transition-all hover:shadow-md group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black font-heading text-forest tracking-tighter uppercase italic leading-none">
                            {isNew ? 'New' : 'Edit'} <span className="text-primary italic">Article</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-sm mt-2">
                            {isNew ? 'Create a new adventure guide or journal post.' : `Currently editing: ${article?.title}`}
                        </p>
                    </div>
                </div>
            </div>

            <ArticleForm
                article={article}
                isNew={isNew}
                action={action}
            />
        </div>
    );
}
