import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticle, getArticles } from '@/lib/firestore-db';
import { Metadata } from 'next';
import { Calendar, User, Clock, ChevronLeft, Share2, Tag, ArrowRight, Bookmark, MessageSquare } from 'lucide-react';
import TrekkingMap from '@/components/TrekkingMapSafe';

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

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
            images: [{ url: article.coverImage, width: 1200, height: 630 }],
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    const relatedTripId = article?.relatedTripId;

    if (!article) notFound();

    return (
        <div className="fade-in bg-[#fdfdfb] min-h-screen pb-32 font-kanit">
            {/* Ultra Modern Hero */}
            <div className="relative h-[85vh] w-full overflow-hidden bg-forest">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover opacity-80 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent"></div>

                {/* Back Button */}
                <div className="absolute top-28 left-6 md:left-12 z-30">
                    <Link href="/articles" className="group flex items-center bg-white/10 backdrop-blur-xl border border-white/20 pl-3 pr-5 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-primary hover:border-primary">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Journal
                    </Link>
                </div>

                {/* Hero Middle Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="h-px w-8 bg-primary"></span>
                            <span className="text-primary text-xs font-black uppercase tracking-[0.5em]">{article.tags[0] || 'ADVENTURE'}</span>
                            <span className="h-px w-8 bg-primary"></span>
                        </div>
                        <h1 className="text-4xl md:text-8xl font-black font-heading text-white leading-[0.9] tracking-tighter mb-8 italic drop-shadow-2xl">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-[10px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" /> {article.date}</span>
                            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> {article.readingTime}</span>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em]">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Floating Left Sidebar (Meta) */}
                    <aside className="lg:col-span-1 hidden lg:block">
                        <div className="sticky top-32 flex flex-col items-center gap-8">
                            <div className="group flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-all group-hover:shadow-lg cursor-pointer">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <span className="text-[8px] font-black uppercase text-gray-400">Share</span>
                            </div>
                            <div className="group flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-all group-hover:shadow-lg cursor-pointer">
                                    <Bookmark className="w-5 h-5" />
                                </div>
                                <span className="text-[8px] font-black uppercase text-gray-400">Save</span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Body */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-forest/5 border border-forest/5 relative">
                            {/* Author Intro */}
                            <div className="flex items-center gap-5 mb-16 pb-12 border-b border-gray-50">
                                <div className="w-16 h-16 bg-forest rounded-3xl flex items-center justify-center text-primary shadow-glow relative">
                                    <User className="w-8 h-8" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-4 border-white flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-black uppercase text-gray-300 tracking-[0.3em] mb-1">Adventure Logged By</div>
                                    <div className="text-xl font-black font-heading text-forest flex items-center gap-2 uppercase tracking-tighter">
                                        {article.author}
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Narrative */}
                            <article className="prose prose-xl prose-forest max-w-none 
                                prose-headings:font-black prose-headings:font-heading prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
                                prose-p:text-forest/80 prose-p:leading-[1.8] prose-p:mb-8
                                prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:my-16
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-bold prose-blockquote:text-forest
                                prose-a:text-primary prose-a:font-black prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-forest prose-strong:font-black
                                selection:bg-primary/20"
                            >
                                {/* Drop Cap Effect for first word */}
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            </article>

                            {/* Tags Footer */}
                            <div className="mt-20 pt-10 border-t border-gray-50 flex flex-wrap gap-2">
                                {article.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 rounded-xl bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Comments / Interaction Preview */}
                        <div className="mt-10 bg-forest rounded-[3rem] p-12 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-2xl font-black font-heading tracking-tight mb-2">Thoughts on this trek?</h3>
                                    <p className="text-white/50 text-sm font-medium">Join the discussion on our social community.</p>
                                </div>
                                <button className="bg-white text-forest px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-xl">
                                    Join Discussion
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Left Sidebar (Widgets) */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Interactive Map Widget */}
                        {article.mapCoordinates && (
                            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl group hover:shadow-2xl transition-all duration-700">
                                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                                    <div className="text-xs font-black uppercase tracking-widest text-forest">Trekking Route</div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                                </div>
                                <div className="h-64 relative grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000">
                                    <TrekkingMap
                                        start={article.mapCoordinates.start}
                                        end={article.mapCoordinates.end}
                                        route={article.mapCoordinates.end ? [article.mapCoordinates.start, article.mapCoordinates.end] : undefined}
                                        zoom={article.mapCoordinates.zoom}
                                    />
                                </div>
                                <div className="p-6 bg-gray-50/50">
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Route Highlights</div>
                                    <div className="space-y-3">
                                        {article.tags.slice(0, 3).map((tag, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                                <span className="text-xs font-black text-forest uppercase tracking-tight">{tag} Points</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Trip Recommendation Card */}
                        {relatedTripId && (
                            <div className="bg-forest rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                <div className="absolute bottom-0 right-0 p-4 translate-y-2 translate-x-2 rotate-12 opacity-10 group-hover:opacity-20 transition-all duration-700">
                                    <Tag className="w-48 h-48" />
                                </div>

                                <div className="relative z-10">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.5em] mb-6 block">Unlock the Adventure</span>
                                    <h3 className="text-3xl font-black font-heading tracking-tighter leading-tight mb-6 italic">TAKE THE FIRST STEP TOWARDS THE PEAK.</h3>
                                    <p className="text-white/40 text-sm font-medium mb-10 leading-relaxed">
                                        We specialize in the route mentioned in this article. Get a curated guide and premium equipment.
                                    </p>
                                    <Link href="/trips" className="inline-flex items-center gap-4 bg-white text-forest px-10 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-glow transform hover:-translate-y-1">
                                        EXPLORE TRIPS <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Newsletter Mini */}
                        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center">
                            <h4 className="text-lg font-black font-heading text-forest uppercase tracking-tight mb-2">Trail Newsletter</h4>
                            <p className="text-gray-400 text-xs font-medium mb-8">No spam. Only hidden gems from Northern Thailand.</p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Your Email..."
                                    className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-forest transition-all">Go</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
