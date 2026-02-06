import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/firestore-db';
import { Metadata } from 'next';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Travel Journal & Guides | Nongtung Adventure',
    description: 'Explore Northern Thailand with our expert guides. Tips for trekking, camping, and hidden gems in Chiang Mai.',
    openGraph: {
        title: 'Travel Journal | Nongtung',
        description: 'Stories and guides from the mountains of Northern Thailand.',
        images: ['https://images.unsplash.com/photo-1533227297464-9d5d1e21b77d?auto=format&fit=crop&q=80&w=1600'],
    }
};

export default async function ArticlesIndex() {
    const articles = await getArticles();
    return (
        <div className="fade-in bg-[#fdfdfb] min-h-screen pb-32">

            {/* Header Section */}
            <div className="pt-32 pb-20 px-6 container mx-auto text-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">The Journal</span>
                <h1 className="text-4xl md:text-7xl font-black font-heading text-forest mb-6 tracking-tighter">
                    STORIES <span className="italic text-primary">FROM THE WILD</span>
                </h1>
                <p className="text-xl text-forest/50 max-w-2xl mx-auto font-medium leading-relaxed">
                    Guides, tips, and tales from our adventures in Northern Thailand.
                </p>
            </div>

            {/* Featured Articles Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article) => (
                        <Link href={`/articles/${article.slug}`} key={article.slug} className="group flex flex-col h-full">
                            <div className="relative h-64 md:h-72 rounded-[2rem] overflow-hidden immersive-shadow border border-forest/5 mb-6">
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-forest px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {article.tags[0]}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-grow flex flex-col px-2">
                                <div className="flex items-center gap-4 text-[10px] font-bold text-forest/40 uppercase tracking-widest mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                                </div>
                                <h2 className="text-2xl font-black font-heading text-forest group-hover:text-primary transition-colors leading-tight mb-3 tracking-tight">
                                    {article.title}
                                </h2>
                                <p className="text-forest/60 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                                    {article.excerpt}
                                </p>
                                <div className="mt-auto flex items-center text-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter / Connect Section */}
            <div className="container mx-auto px-6 mt-32">
                <div className="bg-forest rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl md:text-5xl font-black font-heading text-white mb-6 tracking-tighter">
                            WANT MORE <span className="text-primary italic">ADVENTURE?</span>
                        </h2>
                        <p className="text-white/60 text-lg mb-10 font-medium">
                            Follow us on Facebook for the latest trip updates and hidden spots.
                        </p>
                        <a href="https://www.facebook.com/nongtung" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-forest px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1">
                            Follow Nongtung
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
