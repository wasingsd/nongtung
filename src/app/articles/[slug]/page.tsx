import { articles } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>
}

export default async function ArticleDetailPage({ params }: Props) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white dark:bg-black pb-12">
            <div className="relative h-[40vh] w-full">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{article.title}</h1>
                        <div className="flex items-center justify-center space-x-4 text-gray-300 text-sm md:text-base">
                            <span>By {article.author}</span>
                            <span>•</span>
                            <span>{article.publishedAt}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 border-l-4 border-blue-500 pl-4 italic">
                        {article.summary}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>
        </article>
    );
}
