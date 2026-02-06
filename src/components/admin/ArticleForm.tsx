'use client';

import { useState, useTransition } from 'react';
import { Save, ArrowLeft, Image as ImageIcon, Type, Layout, Tag as TagIcon, Link as LinkIcon, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import { Article } from '@/types/types';

interface ArticleFormProps {
    article: Partial<Article> | null;
    isNew: boolean;
    action: (formData: FormData) => Promise<void>;
}

export default function ArticleForm({ article, isNew, action }: ArticleFormProps) {
    const [content, setContent] = useState(article?.content || '');
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setStatus(null);
        formData.set('content', content);

        startTransition(async () => {
            try {
                await action(formData);
                setStatus({ type: 'success', message: 'Article saved successfully! Redirecting...' });
                // Manual redirect after success
                setTimeout(() => {
                    router.push('/adminnongtung/articles');
                    router.refresh();
                }, 1500);
            } catch (error) {
                console.error('Error saving article:', error);
                setStatus({ type: 'error', message: 'Failed to save article. Please try again.' });
            }
        });
    };

    return (
        <form
            action={handleSubmit}
            className="space-y-10"
        >
            {/* Status Message */}
            {status && (
                <div className={`p-6 rounded-2xl flex items-center gap-4 ${status.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    {status.type === 'success'
                        ? <CheckCircle className="w-6 h-6 text-green-600" />
                        : <AlertCircle className="w-6 h-6 text-red-600" />
                    }
                    <span className="font-bold">{status.message}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Editor */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Type className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">Post Content</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Article Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={article?.title}
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-bold text-forest"
                                    placeholder="Enter a catchy title..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Article Body</label>
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Tell your story..."
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Layout className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">Summary & SEO</h2>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Excerpt (SEO Description)</label>
                            <textarea
                                name="excerpt"
                                defaultValue={article?.excerpt}
                                rows={4}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-gray-600"
                                placeholder="Write a brief summary for search engines and social media..."
                            ></textarea>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Publishing Actions */}
                    <div className="bg-forest p-8 rounded-[2.5rem] shadow-xl text-white">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-primary">Publishing</h3>
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-white hover:text-forest text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Save & Publish
                                    </>
                                )}
                            </button>
                            <Link
                                href="/adminnongtung/articles"
                                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all block text-center border border-white/5"
                            >
                                Discard Changes
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-white/30">Status</span>
                                <span className="text-green-400">Published</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-white/30">Visibility</span>
                                <span className="text-white/80">Public</span>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Media</h3>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                            <input
                                type="text"
                                name="coverImage"
                                defaultValue={article?.coverImage}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                placeholder="https://..."
                            />
                            {article?.coverImage && (
                                <div className="mt-4 rounded-xl overflow-hidden aspect-video relative border border-gray-100">
                                    <picture>
                                        <img src={article.coverImage} alt="Preview" className="object-cover w-full h-full" />
                                    </picture>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <TagIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Organization</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    defaultValue={article?.slug}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="Leave empty to auto-generate"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    defaultValue={article?.author || 'Nongtung Team'}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    defaultValue={article?.tags?.join(', ')}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="Trekking, Pai, Tips"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <LinkIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Connected Data</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Related Trip ID</label>
                                <input
                                    type="text"
                                    name="relatedTripId"
                                    defaultValue={article?.relatedTripId}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-bold"
                                    placeholder="e.g. mae-ngat-lake"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
