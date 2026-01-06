import Card from '@/components/Card';
import { articles } from '@/lib/data';

export default function ArticlesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Travel Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <Card
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        subtitle={article.summary}
                        image={article.coverImage}
                        link={`/articles/${article.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}
