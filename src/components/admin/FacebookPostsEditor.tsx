'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  Plus,
  RefreshCw,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  MessageCircle,
  Share2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Eye,
  EyeOff,
} from 'lucide-react';
import { FacebookPost } from '@/types/types';
import {
  upsertFacebookPostAction,
  deleteFacebookPostAction,
  toggleFacebookPostAction,
  syncFacebookPostsAction,
  seedDefaultFacebookPostsAction,
} from '@/app/actions/facebookActions';

interface FacebookPostsEditorProps {
  initialPosts: FacebookPost[];
  hasApiToken?: boolean;
}

export default function FacebookPostsEditor({
  initialPosts,
  hasApiToken = false,
}: FacebookPostsEditorProps) {
  const [posts, setPosts] = useState<FacebookPost[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  // Edit / Add Modal state
  const [editingPost, setEditingPost] = useState<FacebookPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleOpenAdd = () => {
    setEditingPost({
      id: `fb-post-${Date.now()}`,
      message: '',
      permalink_url: 'https://www.facebook.com/NONGTUNG.Adventure',
      full_picture: '/images/fb/real-fb-1.jpg',
      created_time: new Date().toISOString(),
      reactions_count: 0,
      comments_count: 0,
      shares_count: 0,
      badge: 'มาตรฐานความปลอดภัย',
      authorName: 'Nongtung-เที่ยวเชียงใหม่ ทริป & เทรล',
      order: posts.length,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: FacebookPost) => {
    setEditingPost({ ...post });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    startTransition(async () => {
      const res = await upsertFacebookPostAction(editingPost);
      if (res.success) {
        setPosts((prev) => {
          const index = prev.findIndex((p) => p.id === editingPost.id);
          if (index >= 0) {
            const next = [...prev];
            next[index] = editingPost;
            return next;
          }
          return [...prev, editingPost];
        });
        setIsModalOpen(false);
        showNotification('success', 'บันทึกโพสต์ Facebook เรียบร้อยแล้ว');
      } else {
        showNotification('error', res.message);
      }
    });
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    const nextActive = !currentActive;
    startTransition(async () => {
      const res = await toggleFacebookPostAction(id, nextActive);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isActive: nextActive } : p))
        );
        showNotification('success', res.message);
      } else {
        showNotification('error', res.message);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้ออกจากระบบ?')) return;

    startTransition(async () => {
      const res = await deleteFacebookPostAction(id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showNotification('success', 'ลบโพสต์เรียบร้อยแล้ว');
      } else {
        showNotification('error', res.message);
      }
    });
  };

  const handleSyncApi = () => {
    startTransition(async () => {
      const res = await syncFacebookPostsAction();
      if (res.success) {
        showNotification('success', res.message);
        // Refresh page or update list
        window.location.reload();
      } else {
        showNotification('error', res.message);
      }
    });
  };

  const handleSeedDefaults = () => {
    if (!confirm('ต้องการรีเซ็ตเป็นโพสต์จริงมาตรฐานของน่องตึงเริ่มต้นหรือไม่?')) return;

    startTransition(async () => {
      const res = await seedDefaultFacebookPostsAction();
      if (res.success) {
        showNotification('success', res.message);
        window.location.reload();
      } else {
        showNotification('error', res.message);
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Notification Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#1877F2]/10 text-[#1877F2] px-3.5 py-1.5 rounded-full mb-3 border border-[#1877F2]/20">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-wider">
              Social Proof & Nongtung Standards
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            จัดการโพสต์ Facebook & คำมั่นสัญญา
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            จัดการโพสต์จริงจาก Facebook (@NONGTUNG.Adventure) ที่จะนำไปแสดงในส่วนคำมั่นสัญญาและมาตรฐานบนหน้าแรก
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSeedDefaults}
            disabled={isPending}
            className="bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all border border-white/10 flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>รีเซ็ตเป็นโพสต์จริงเริ่มต้น</span>
          </button>

          <button
            onClick={handleSyncApi}
            disabled={isPending}
            className="bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#4599FF] px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all border border-[#1877F2]/30 flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
            <span>ซิงค์ด้วย Meta API</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="bg-primary hover:bg-primary-deep text-white px-5 py-2.5 rounded-xl text-xs font-bold font-heading transition-all shadow-lg shadow-primary/25 flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มโพสต์ใหม่</span>
          </button>
        </div>
      </div>

      {/* Developer API Guide Accordion */}
      <div className="bg-[#1F261F] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>วิธีเชื่อมต่อ Facebook Graph API อัตโนมัติ (FB Dev)</span>
                <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full font-normal">
                  {hasApiToken ? 'ตั้งค่าแล้ว ✅' : 'การตั้งค่าทางเลือก'}
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                ต้องการให้ระบบดูดโพสต์ล่าสุดจากเพจมาเองอัตโนมัติ? คลิกดูวิธีใส่ Token ที่นี่
              </p>
            </div>
          </div>
          {showGuide ? (
            <ChevronUp className="w-5 h-5 text-white/40" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/40" />
          )}
        </button>

        {showGuide && (
          <div className="p-5 pt-0 border-t border-white/5 space-y-4 text-xs text-white/80 leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                <span className="font-bold text-primary block">ขั้นตอนที่ 1</span>
                <p>เข้าสู่ <a href="https://developers.facebook.com" target="_blank" className="text-primary underline">developers.facebook.com</a> แล้วสร้าง App ประเภท <strong>Business</strong></p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                <span className="font-bold text-primary block">ขั้นตอนที่ 2</span>
                <p>ไปที่ <strong>Graph API Explorer</strong> เลือกเพจ <code>NONGTUNG.Adventure</code> เพื่อขอสิทธิ์ <code>pages_read_engagement</code></p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                <span className="font-bold text-primary block">ขั้นตอนที่ 3</span>
                <p>คัดลอก Page Token มาใส่ในไฟล์ <code>.env.local</code>:</p>
                <code className="block bg-black/40 p-2 rounded text-[11px] font-mono text-emerald-400 mt-1">
                  FB_PAGE_ACCESS_TOKEN=your_token<br />
                  FB_PAGE_ID=NONGTUNG.Adventure
                </code>
              </div>
            </div>
            <p className="text-white/60 italic pt-1">
              💡 <strong>ข้อแนะนำ:</strong> หากยังไม่สะดวกขอ API Token จาก Facebook ไม่ต้องกังวล! ท่านสามารถกดปุ่ม <strong>"เพิ่มโพสต์ใหม่"</strong> หรือแก้ไขโพสต์จริงที่มีอยู่แล้วในตารางด้านล่างได้ทันที รวดเร็ว และไม่ต้องรอ Approve จาก Meta
            </p>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, idx) => (
          <div
            key={post.id}
            className={`bg-[#1F261F] border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
              post.isActive !== false
                ? 'border-white/10 shadow-lg'
                : 'border-white/5 opacity-60'
            }`}
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
                <Image
                  src={post.full_picture || '/images/fb/real-fb-1.jpg'}
                  alt="Post Thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-black/80 backdrop-blur-md text-primary font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-primary/20">
                    {post.badge || 'มาตรฐานนองตึง'}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <span className="bg-black/80 backdrop-blur-md text-white font-mono text-[10px] px-2 py-0.5 rounded-full">
                    ลำดับ: {post.order ?? idx}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="font-bold text-white/80 truncate">
                    {post.authorName || 'Nongtung Facebook'}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    post.isActive !== false ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'
                  }`}>
                    {post.isActive !== false ? 'แสดงบนหน้าแรก' : 'ซ่อน'}
                  </span>
                </div>

                <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                  {post.message}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 text-[#1877F2]" />
                    <span>{post.reactions_count || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments_count || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    <span>{post.shares_count || 0}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 bg-white/5 border-t border-white/5 flex items-center justify-between gap-2">
              <a
                href={post.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="เปิดโพสต์บน Facebook"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleActive(post.id, post.isActive !== false)}
                  className={`p-2 rounded-lg transition-colors ${
                    post.isActive !== false
                      ? 'text-emerald-400 hover:bg-emerald-500/20'
                      : 'text-white/40 hover:bg-white/10'
                  }`}
                  title={post.isActive !== false ? 'ซ่อนโพสต์นี้' : 'เปิดแสดงโพสต์นี้'}
                >
                  {post.isActive !== false ? (
                    <Eye className="w-3.5 h-3.5" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title="แก้ไขโพสต์"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                  title="ลบโพสต์"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A201A] border border-white/15 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-heading">
                {posts.some((p) => p.id === editingPost.id)
                  ? 'แก้ไขโพสต์ Facebook'
                  : 'เพิ่มโพสต์ Facebook ใหม่'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-white/70 font-bold mb-1.5">
                  ลิงก์โพสต์บน Facebook (Permalink URL)
                </label>
                <input
                  required
                  type="url"
                  value={editingPost.permalink_url}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, permalink_url: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  placeholder="https://www.facebook.com/photo/?fbid=..."
                />
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1.5">
                  URL รูปภาพโพสต์ (Full Picture)
                </label>
                <input
                  required
                  type="text"
                  value={editingPost.full_picture || ''}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, full_picture: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  placeholder="/images/fb/real-fb-1.jpg หรือ https://..."
                />
                <span className="text-[10px] text-white/40 block mt-1">
                  ใช้รูปจริงของน่องตึงที่มีอยู่ในระบบ เช่น /images/fb/real-fb-1.jpg ถึง 5.jpg หรือ URL ภาพ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1.5">
                    ป้ายมาตรฐาน (Badge Tag)
                  </label>
                  <input
                    type="text"
                    value={editingPost.badge || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, badge: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                    placeholder="เช่น มาตรฐานความปลอดภัย"
                  />
                </div>

                <div>
                  <label className="block text-white/70 font-bold mb-1.5">
                    ลำดับการแสดงผล (Order)
                  </label>
                  <input
                    type="number"
                    value={editingPost.order ?? 0}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 font-bold mb-1.5">
                  ข้อความแคปชัน (Post Caption Message)
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingPost.message}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-primary leading-relaxed"
                  placeholder="เขียนข้อความหรือคัดลอกแคปชันจริงจากโพสต์ Facebook..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 font-bold mb-1">
                    👍 ถูกใจ (Reactions)
                  </label>
                  <input
                    type="number"
                    value={editingPost.reactions_count ?? 0}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        reactions_count: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">
                    💬 คอมเมนต์
                  </label>
                  <input
                    type="number"
                    value={editingPost.comments_count ?? 0}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        comments_count: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/70 font-bold mb-1">
                    ↗️ แชร์ (Shares)
                  </label>
                  <input
                    type="number"
                    value={editingPost.shares_count ?? 0}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        shares_count: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={editingPost.isActive !== false}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, isActive: e.target.checked })
                  }
                  className="rounded bg-white/10 border-white/20 text-primary focus:ring-0"
                />
                <label htmlFor="isActiveToggle" className="text-white/80 font-bold cursor-pointer">
                  เปิดแสดงโพสต์นี้บนหน้าแรกของเว็บไซต์
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-primary hover:bg-primary-deep text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isPending ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
