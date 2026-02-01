import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticle, getArticles } from '@/lib/firestore-db';
import { Metadata } from 'next';
import { Calendar, User, Clock, ChevronLeft, Share2, Tag, ArrowRight } from 'lucide-react';

// Static Params for SSG
export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

// Dynamic Metadata
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
            images: [article.coverImage],
        },
        alternates: {
            canonical: `https://nongtung.com/articles/${slug}`
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    const relatedTripId = article?.relatedTripId;

    if (!article) {
        notFound();
    }

    // JSON-LD for Article Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        image: article.coverImage,
        author: {
            '@type': 'Organization',
            name: article.author
        },
        publisher: {
            '@type': 'Organization',
            name: 'Nongtung',
            logo: {
                '@type': 'ImageObject',
                url: 'https://nongtung.com/images/favicon.svg'
            }
        },
        datePublished: article.date,
        description: article.excerpt
    };

    return (
        <div className="fade-in bg-[#fdfdfb] min-h-screen pb-32">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>

                {/* Navigation Back */}
                <div className="absolute top-28 left-6 md:left-12 z-20">
                    <Link href="/articles" className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Journal
                    </Link>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                    <div className="container mx-auto">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-4 mb-6 text-white/80 text-xs font-bold uppercase tracking-widest">
                                <span className="flex items-center bg-primary/20 backdrop-blur px-3 py-1 rounded-lg border border-primary/20 text-primary-light">
                                    <Tag className="w-3 h-3 mr-2" /> {article.tags[0]}
                                </span>
                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {article.date}</span>
                                <span className="flex items-center"><Clock className="w-3 h-3 mr-2" /> {article.readingTime}</span>
                            </div>
                            <h1 className="text-3xl md:text-6xl font-black font-heading text-white leading-tight mb-6 drop-shadow-lg tracking-tighter">
                                {article.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-10 relative z-20">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content Column */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 immersive-shadow border border-forest/5">
                            {/* Author Block */}
                            <div className="flex items-center justify-between border-b border-forest/5 pb-8 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center text-white">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase text-forest/30 tracking-widest">Written By</div>
                                        <div className="font-bold text-forest">{article.author}</div>
                                    </div>
                                </div>
                                <button className="text-forest/30 hover:text-primary transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Article Body */}
                            <article
                                className="prose prose-lg prose-forest max-w-none prose-headings:font-black prose-headings:font-heading prose-headings:tracking-tight prose-img:rounded-3xl prose-img:shadow-lg prose-a:text-primary hover:prose-a:text-forest transition-colors"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </div>
                    </div>

                    {/* Sidebar / CTA Column */}
                    <div className="lg:w-1/3 space-y-8">

                        {/* 1. Trip CTA Widget (If Related Trip Exists) */}
                        {relatedTripId && (
                            <div className="bg-forest text-white rounded-[2.5rem] p-8 md:p-10 sticky top-28 shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                                <div className="relative z-10">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Recommended Trip</span>
                                    <h3 className="text-2xl font-black font-heading tracking-tight mb-4">Want to experience this for real?</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">
                                        Join our expert guides on this exclusive route. We handle all the logistics so you can focus on the adventure.
                                    </p>
                                    <Link href={`/trips`} className="block w-full bg-white text-forest text-center py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1">
                                        View Current Trips
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* 2. Newsletter / Social Widget */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-forest/5 immersive-shadow text-center">
                            <h3 className="text-xl font-black font-heading text-forest mb-4 tracking-tight">Don't Miss Out</h3>
                            <p className="text-forest/50 text-sm mb-6">
                                Get the latest trail updates and hidden spots delivered to your feed.
                            </p>
                            <a href="https://web.facebook.com/Venturevibecnx?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-black uppercase text-xs tracking-widest hover:text-forest transition-colors">
                                Follow on Facebook <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
