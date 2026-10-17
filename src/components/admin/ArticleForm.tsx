'use client';

import { useState, useTransition } from 'react';
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Type,
    Layout,
    Tag as TagIcon,
    Link as LinkIcon,
    CheckCircle,
    AlertCircle,
    Plus,
    Trash2,
    Layers,
    AlignVerticalJustifyCenter,
    ArrowDownToLine,
    Sparkles,
    Eye
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import { Article, ArticleSubImage } from '@/types/types';

interface ArticleFormProps {
    article: Partial<Article> | null;
    isNew: boolean;
    action: (formData: FormData) => Promise<void | { success: boolean; slug?: string }>;
}

export default function ArticleForm({ article, isNew, action }: ArticleFormProps) {
    const [content, setContent] = useState(article?.content || '');
    const [coverImage, setCoverImage] = useState(article?.coverImage || '');
    const [subImages, setSubImages] = useState<ArticleSubImage[]>(
        article?.subImages && Array.isArray(article.subImages) ? article.subImages : []
    );
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const router = useRouter();

    const addSubImage = (position: 'mid' | 'bottom' = 'mid') => {
        setSubImages(prev => [
            ...prev,
            {
                id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                url: '',
                caption: '',
                position
            }
        ]);
    };

    const updateSubImage = (index: number, field: keyof ArticleSubImage, value: any) => {
        setSubImages(prev => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const removeSubImage = (index: number) => {
        setSubImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (formData: FormData) => {
        setStatus(null);
        formData.set('content', content);
        formData.set('coverImage', coverImage);

        // Filter valid sub-images
        const validSubImages = subImages.filter(img => img.url && img.url.trim().length > 0);
        formData.set('subImages', JSON.stringify(validSubImages));

        startTransition(async () => {
            try {
                await action(formData);
                setStatus({ type: 'success', message: 'บันทึกบทความสำเร็จเรียบร้อย! กำลังนำทางกลับ...' });
                setTimeout(() => {
                    router.push('/adminnongtung/articles');
                    router.refresh();
                }, 1200);
            } catch (error) {
                console.error('Error saving article:', error);
                setStatus({ type: 'error', message: 'เกิดข้อผิดพลาดในการบันทึกบทความ กรุณาลองใหม่อีกครั้ง' });
            }
        });
    };

    const midCount = subImages.filter(img => img.position === 'mid').length;
    const bottomCount = subImages.filter(img => img.position === 'bottom').length;

    return (
        <form
            action={handleSubmit}
            className="space-y-10"
        >
            {/* Status Message */}
            {status && (
                <div className={`p-6 rounded-2xl flex items-center gap-4 transition-all ${status.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    {status.type === 'success'
                        ? <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                        : <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                    }
                    <span className="font-bold text-sm sm:text-base">{status.message}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Editor & Sub-Images */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* 1. Post Content Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Type className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">หัวข้อและเนื้อหาบทความ</h2>
                                <p className="text-xs text-gray-400 font-medium">Post Title & Rich Narrative</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Article Title (ชื่อบทความ)</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={article?.title}
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-bold text-forest"
                                    placeholder="ใส่ชื่อบทความที่ดึงดูดใจ..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Article Body (เนื้อหาบทความ)</label>
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="เขียนเรื่องราวการเดินทาง หรือคำแนะนำ..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* 2. Sub-Images Management Section (รูปย่อยบทความ: กลางหน้า & ล่างหน้า) */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Layers className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">รูปภาพย่อยในบทความ (Sub-Images)</h2>
                                    <p className="text-xs text-gray-500 font-medium">
                                        สามารถเลือกจุดจัดวางได้: <strong className="text-primary font-bold">กลางหน้า (Mid)</strong> หรือ <strong className="text-forest font-bold">ล่างหน้า (Bottom)</strong>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => addSubImage('mid')}
                                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>เพิ่มรูปกลางหน้า</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => addSubImage('bottom')}
                                    className="bg-forest/10 hover:bg-forest text-forest hover:text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>เพิ่มรูปล่างหน้า</span>
                                </button>
                            </div>
                        </div>

                        {/* Counter Badges */}
                        <div className="flex items-center gap-3 mb-6 text-xs font-bold">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1.5">
                                <AlignVerticalJustifyCenter className="w-3.5 h-3.5" />
                                กลางหน้า: {midCount} รูป
                            </span>
                            <span className="px-3 py-1 bg-forest/10 text-forest rounded-full flex items-center gap-1.5">
                                <ArrowDownToLine className="w-3.5 h-3.5" />
                                ล่างหน้า: {bottomCount} รูป
                            </span>
                            <span className="text-gray-400 text-[11px] ml-auto">
                                ทั้งหมด {subImages.length} รูป
                            </span>
                        </div>

                        {/* Sub-Images List */}
                        {subImages.length === 0 ? (
                            <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center bg-gray-50/50">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-forest text-sm mb-1">ยังไม่มีรูปภาพย่อยในบทความ</h3>
                                <p className="text-xs text-gray-500 font-reading max-w-md mx-auto mb-4">
                                    กดปุ่ม &quot;เพิ่มรูปกลางหน้า&quot; เพื่อแทรกรูปบรรยากาศระหว่างเนื้อหา หรือ &quot;เพิ่มรูปล่างหน้า&quot; เพื่อสร้างแกลเลอรีรูปภาพท้ายบทความ
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => addSubImage('mid')}
                                        className="bg-primary text-white hover:bg-primary-deep px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>+ เพิ่มรูปภาพย่อย</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {subImages.map((img, idx) => (
                                    <div
                                        key={img.id || idx}
                                        className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 hover:border-gray-300 transition-all space-y-4"
                                    >
                                        {/* Card Top Bar */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-xs font-black uppercase tracking-wider text-forest">
                                                    รูปภาพย่อย #{idx + 1}
                                                </span>
                                                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                                    img.position === 'mid'
                                                        ? 'bg-primary/15 text-primary'
                                                        : 'bg-forest/15 text-forest'
                                                }`}>
                                                    {img.position === 'mid' ? '📍 กลางหน้า (ระหว่างเนื้อหา)' : '📍 ล่างหน้า (แกลเลอรีท้ายบทความ)'}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeSubImage(idx)}
                                                className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                                title="ลบรูปภาพนี้"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Card Content Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                            {/* Thumbnail Preview */}
                                            <div className="md:col-span-1">
                                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center group">
                                                    {img.url ? (
                                                        <picture>
                                                            <img
                                                                src={img.url}
                                                                alt={img.caption || 'Sub preview'}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    (e.target as HTMLElement).style.display = 'none';
                                                                }}
                                                            />
                                                        </picture>
                                                    ) : (
                                                        <div className="text-center p-3 text-gray-400">
                                                            <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                                            <span className="text-[10px] font-medium block">ใส่ URL รูป</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Inputs */}
                                            <div className="md:col-span-3 space-y-3">
                                                <div>
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                                        Image URL (ลิงก์รูปภาพ)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={img.url}
                                                        onChange={(e) => updateSubImage(idx, 'url', e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none text-xs font-medium text-forest"
                                                        placeholder="https://images.unsplash.com/photo-..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                                        Caption (คำบรรยายภาพ)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={img.caption || ''}
                                                        onChange={(e) => updateSubImage(idx, 'caption', e.target.value)}
                                                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none text-xs font-medium text-forest"
                                                        placeholder="เช่น ทะเลหมอกยามเช้า จุดชมวิวกิ่วลม ดอยหลวงเชียงดาว..."
                                                    />
                                                </div>

                                                {/* Position Selector */}
                                                <div>
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                                        ตำแหน่งจัดวางบนหน้า (Display Position)
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateSubImage(idx, 'position', 'mid')}
                                                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                                                                img.position === 'mid'
                                                                    ? 'bg-primary text-white border-primary shadow-sm'
                                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            <AlignVerticalJustifyCenter className="w-3.5 h-3.5" />
                                                            <span>กลางหน้า (Mid)</span>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => updateSubImage(idx, 'position', 'bottom')}
                                                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                                                                img.position === 'bottom'
                                                                    ? 'bg-forest text-white border-forest shadow-sm'
                                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            <ArrowDownToLine className="w-3.5 h-3.5" />
                                                            <span>ล่างหน้า (Bottom)</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-2 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => addSubImage('mid')}
                                        className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-primary/5 transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>+ เพิ่มรูปกลางหน้า</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addSubImage('bottom')}
                                        className="text-xs font-bold text-forest hover:text-black flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-forest/5 transition-all"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>+ เพิ่มรูปล่างหน้า</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 3. Summary & SEO */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Layout className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">Summary & SEO</h2>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Excerpt (SEO Description / บทคัดย่อ)</label>
                            <textarea
                                name="excerpt"
                                defaultValue={article?.excerpt}
                                rows={4}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-gray-600"
                                placeholder="เขียนสรุปสั้นๆ สำหรับแสดงบนการ์ดและผลการค้นหา Search Engine..."
                            ></textarea>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Publishing Actions */}
                    <div className="bg-forest p-8 rounded-[2.5rem] shadow-xl text-white">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-primary">การเผยแพร่ (Publishing)</h3>
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-white hover:text-forest text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        กำลังบันทึก...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        บันทึกและเผยแพร่
                                    </>
                                )}
                            </button>
                            <Link
                                href="/adminnongtung/articles"
                                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all block text-center border border-white/5"
                            >
                                ยกเลิกการแก้ไข
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-white/30">สถานะ</span>
                                <span className="text-green-400">เผยแพร่ออนไลน์</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-white/30">รูปย่อยทั้งหมด</span>
                                <span className="text-primary font-bold">{subImages.length} รูป</span>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between gap-3 mb-6">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-primary" />
                                <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">ภาพปกบทความ (Cover)</h3>
                            </div>
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                                16:9 แนะนำ
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                                <input
                                    type="text"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold text-forest"
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Live Cover Preview */}
                            {coverImage ? (
                                <div className="space-y-2">
                                    <div className="rounded-2xl overflow-hidden aspect-video relative border border-gray-200 shadow-sm bg-forest">
                                        <picture>
                                            <img
                                                src={coverImage}
                                                alt="Cover Preview"
                                                className="object-cover w-full h-full"
                                                onError={(e) => {
                                                    (e.target as HTMLElement).style.opacity = '0.3';
                                                }}
                                            />
                                        </picture>
                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <Eye className="w-3 h-3 text-primary" />
                                            พรีวิวภาพปก
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('')}
                                        className="text-[10px] text-gray-400 hover:text-red-500 font-bold block ml-auto"
                                    >
                                        ล้างรูปภาพปก
                                    </button>
                                </div>
                            ) : (
                                <div className="aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                                    <ImageIcon className="w-8 h-8 text-gray-300 mb-1" />
                                    <span className="text-[11px] font-bold text-gray-400">ยังไม่ได้ใส่รูปปก</span>
                                    <span className="text-[9px] text-gray-400 mt-0.5">วาง URL รูปด้านบนเพื่อดูพรีวิว</span>
                                </div>
                            )}

                            {/* Quick Presets */}
                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                    ตัวอย่างรูปภาพแนะนำ (กดเพื่อใส่):
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('/videos/reel-1-cover.jpg')}
                                        className="text-[10px] font-bold py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all text-left truncate border border-gray-100"
                                    >
                                        🌲 ภูเขาหมอกเชียงใหม่
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('/videos/reel-2-cover.jpg')}
                                        className="text-[10px] font-bold py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all text-left truncate border border-gray-100"
                                    >
                                        ⛰️ ยอดดอยหลวง
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('/videos/reel-3-cover.jpg')}
                                        className="text-[10px] font-bold py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all text-left truncate border border-gray-100"
                                    >
                                        ⛺ แคมป์ปิ้งริมน้ำ
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('/videos/reel-4-cover.jpg')}
                                        className="text-[10px] font-bold py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-primary/10 hover:text-primary transition-all text-left truncate border border-gray-100"
                                    >
                                        🏃‍♂️ เส้นทางวิ่งเทรล
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Metadata Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <TagIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Organization & Meta</h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    defaultValue={article?.slug}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="เว้นว่างไว้เพื่อสร้างอัตโนมัติ"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ผู้เขียน (Author)</label>
                                <input
                                    type="text"
                                    name="author"
                                    defaultValue={article?.author || 'Nongtung Team'}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">แท็ก (Tags - คั่นด้วยจุลภาค)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    defaultValue={article?.tags?.join(', ')}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="เดินป่า, เชียงใหม่, ดอยหลวง, แคมป์ปิ้ง"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">คีย์เวิร์ด SEO (Keywords)</label>
                                <input
                                    type="text"
                                    name="keywords"
                                    defaultValue={article?.keywords?.join(', ')}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="เดินป่าเชียงใหม่, ดอยอินทนนท์, ทริปเชียงใหม่"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Connected Data */}
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
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs font-bold"
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
