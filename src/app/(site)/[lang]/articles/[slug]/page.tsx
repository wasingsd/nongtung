import { notFound } from 'next/navigation';
import { getArticle, getArticles, getHomeSettings, getTrip, getTrips } from '@/lib/firestore-db';
import { Metadata } from 'next';
import ArticleDetailClient from './ArticleDetailClient';

// ISR: Revalidate page at most once every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return { title: 'Article Not Found | Nongtung' };

    return {
        title: `${article.title} | Nongtung Travel Journal`,
        description: article.excerpt,
        keywords: article.keywords,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: article.date,
            authors: [article.author],
            images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [article.coverImage],
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [article, allArticles, settings] = await Promise.all([
        getArticle(slug),
        getArticles(),
        getHomeSettings(),
    ]);

    if (!article) notFound();

    // 1. Process Content to generate Table of Contents (TOC) and inject anchor IDs
    let sectionCount = 0;
    const toc: { id: string; text: string }[] = [];
    const processedContent = (article.content || '').replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, text) => {
        sectionCount++;
        const id = `section-${sectionCount}`;
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        toc.push({ id, text: cleanText });
        return `<h2 id="${id}" class="scroll-mt-28"${attrs}>${text}</h2>`;
    });

    // 2. Compute Prev / Next Articles
    const currentIndex = allArticles.findIndex(a => a.slug === slug);
    const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
    const nextArticle = currentIndex >= 0 && currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

    // 3. Compute 3 Related Articles (prefer matching tag or others)
    const relatedArticles = allArticles
        .filter(a => a.slug !== slug)
        .slice(0, 3);

    // 4. Resolve Related Trip
    let relatedTrip = null;
    if (article.relatedTripId) {
        relatedTrip = await getTrip(article.relatedTripId);
    }
    if (!relatedTrip) {
        const allTrips = await getTrips();
        relatedTrip = allTrips[0] || null;
    }

    // 5. Contact links
    const facebookUrl = settings?.facebookUrl || "https://www.facebook.com/NONGTUNG.Adventure";
    const fbHandle = facebookUrl.includes('facebook.com/')
        ? facebookUrl.split('facebook.com/').pop()?.split('/').filter(Boolean)[0]
        : 'NONGTUNG.Adventure';
    const messengerUrl = `https://m.me/${fbHandle}`;

    return (
        <ArticleDetailClient
            article={article}
            processedContent={processedContent}
            toc={toc}
            relatedTrip={relatedTrip}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            relatedArticles={relatedArticles}
            facebookUrl={facebookUrl}
            messengerUrl={messengerUrl}
        />
    );
}
