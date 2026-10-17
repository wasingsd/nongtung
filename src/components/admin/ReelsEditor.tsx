'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Heart,
  Eye,
  Sparkles,
  Check,
  X,
  Play,
  ShoppingBag,
  RefreshCw,
  Video,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  Smartphone,
} from 'lucide-react';
import { Reel, Trip } from '@/types/types';
import {
  saveReelAction,
  deleteReelAction,
  toggleReelStatusAction,
  seedReelsAction,
  resolveTikTokUrlAction,
} from '@/app/actions/reelActions';

interface ReelsEditorProps {
  initialReels: Reel[];
  allTrips: Trip[];
}

export default function ReelsEditor({ initialReels, allTrips }: ReelsEditorProps) {
  const [reels, setReels] = useState<Reel[]>(initialReels);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isResolving, setIsResolving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    id: string;
    tiktokId: string;
    title: string;
    location: string;
    views: string;
    likes: string;
    poster: string;
    videoUrl: string;
    type: 'video' | 'photo';
    tiktokUrl: string;
    audioTrack: string;
    order: number;
    isActive: boolean;
    linkedTripId: string;
    linkedTripTitle: string;
    linkedTripDuration: string;
    linkedTripPrice: number;
    linkedTripImage: string;
    linkedTripLocation: string;
    linkedTripUrl: string;
  }>({
    id: '',
    tiktokId: '',
    title: '',
    location: '',
    views: '10K',
    likes: '1.2K',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    videoUrl: '',
    type: 'video',
    tiktokUrl: '',
    audioTrack: 'Original Sound - @nongtungrunning',
    order: reels.length + 1,
    isActive: true,
    linkedTripId: '',
    linkedTripTitle: '',
    linkedTripDuration: '2 วัน 1 คืน',
    linkedTripPrice: 3500,
    linkedTripImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    linkedTripLocation: 'เชียงใหม่',
    linkedTripUrl: '/th/trips',
  });

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const openCreateModal = () => {
    setEditingReel(null);
    const nextOrder = reels.length > 0 ? Math.max(...reels.map((r) => r.order ?? 0)) + 1 : 1;
    const defaultTrip = allTrips[0];

    setFormData({
      id: `reel-${Date.now()}`,
      tiktokId: '',
      title: '',
      location: 'เชียงใหม่',
      views: '15.5K',
      likes: '2.1K',
      poster: defaultTrip?.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
      videoUrl: '',
      type: 'video',
      tiktokUrl: '',
      audioTrack: 'Original Sound - @nongtungrunning',
      order: nextOrder,
      isActive: true,
      linkedTripId: defaultTrip?.id || '',
      linkedTripTitle: defaultTrip?.title || '',
      linkedTripDuration: defaultTrip?.duration || '2 วัน 1 คืน',
      linkedTripPrice: defaultTrip?.price || 3500,
      linkedTripImage: defaultTrip?.image || '',
      linkedTripLocation: defaultTrip?.location || 'เชียงใหม่',
      linkedTripUrl: defaultTrip ? `/th/trips` : '/th/trips',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (reel: Reel) => {
    setEditingReel(reel);
    setFormData({
      id: reel.id,
      tiktokId: reel.tiktokId,
      title: reel.title,
      location: reel.location,
      views: reel.views,
      likes: reel.likes,
      poster: reel.poster,
      videoUrl: reel.videoUrl || '',
      type: reel.type || 'video',
      tiktokUrl: reel.tiktokUrl,
      audioTrack: reel.audioTrack || 'Original Sound - @nongtungrunning',
      order: reel.order ?? 1,
      isActive: reel.isActive ?? true,
      linkedTripId: reel.linkedTrip?.id || '',
      linkedTripTitle: reel.linkedTrip?.title || '',
      linkedTripDuration: reel.linkedTrip?.duration || '2 วัน 1 คืน',
      linkedTripPrice: reel.linkedTrip?.price || 0,
      linkedTripImage: reel.linkedTrip?.image || '',
      linkedTripLocation: reel.linkedTrip?.location || 'เชียงใหม่',
      linkedTripUrl: reel.linkedTrip?.url || '/th/trips',
    });
    setIsModalOpen(true);
  };

  // Smart URL parser for TikTok
  const handleTiktokUrlChange = (value: string) => {
    let parsedId = formData.tiktokId;
    const match = value.match(/\/(?:video|photo)\/(\d+)/);
    if (match) {
      parsedId = match[1];
    }
    setFormData((prev) => ({
      ...prev,
      tiktokUrl: value,
      tiktokId: parsedId || prev.tiktokId,
    }));
  };

  // ⚡ Option A: Auto-fetch clean direct video stream, title, stats & poster from TikTok
  const handleAutoResolve = async () => {
    if (!formData.tiktokUrl.trim()) {
      alert('กรุณากรอกลิงก์ TikTok ก่อนกดดึงข้อมูล');
      return;
    }
    setIsResolving(true);
    try {
      const res = await resolveTikTokUrlAction(formData.tiktokUrl);
      if (res.success && res.data) {
        setFormData((prev) => ({
          ...prev,
          tiktokId: res.data?.tiktokId || prev.tiktokId,
          title: res.data?.title || prev.title,
          views: res.data?.views || prev.views,
          likes: res.data?.likes || prev.likes,
          audioTrack: res.data?.audioTrack || prev.audioTrack,
          poster: res.data?.poster || prev.poster,
          videoUrl: res.data?.videoUrl || prev.videoUrl,
        }));
        showNotification('success', '✨ ดึงข้อมูลและวิดีโอจาก TikTok สำเร็จแล้ว!');
      } else {
        showNotification('error', res.error || 'ไม่สามารถดึงข้อมูลคลิป TikTok ได้');
      }
    } catch (err: any) {
      showNotification('error', err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
    } finally {
      setIsResolving(false);
    }
  };

  // Auto-fill from selected trip
  const handleTripSelect = (tripId: string) => {
    const selectedTrip = allTrips.find((t) => t.id === tripId);
    if (selectedTrip) {
      setFormData((prev) => ({
        ...prev,
        linkedTripId: selectedTrip.id,
        linkedTripTitle: selectedTrip.title,
        linkedTripDuration: selectedTrip.duration || '2 วัน 1 คืน',
        linkedTripPrice: selectedTrip.price,
        linkedTripImage: selectedTrip.image,
        linkedTripLocation: selectedTrip.location || 'เชียงใหม่',
        linkedTripUrl: `/th/trips`,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('กรุณากรอกหัวข้อคลิป (Title)');
      return;
    }

    startTransition(async () => {
      const form = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        form.append(key, String(val));
      });

      const res = await saveReelAction(form);
      if (res.success) {
        showNotification('success', 'บันทึกข้อมูลคลิปเรียบร้อยแล้ว!');
        // Update local state
        const savedReel: Reel = {
          id: formData.id,
          tiktokId: formData.tiktokId,
          title: formData.title,
          location: formData.location,
          views: formData.views,
          likes: formData.likes,
          poster: formData.poster,
          videoUrl: formData.videoUrl,
          type: formData.type,
          tiktokUrl: formData.tiktokUrl,
          audioTrack: formData.audioTrack,
          order: Number(formData.order),
          isActive: formData.isActive,
          linkedTrip: {
            id: formData.linkedTripId,
            title: formData.linkedTripTitle,
            duration: formData.linkedTripDuration,
            price: Number(formData.linkedTripPrice),
            image: formData.linkedTripImage,
            location: formData.linkedTripLocation,
            url: formData.linkedTripUrl,
          },
        };

        setReels((prev) => {
          const index = prev.findIndex((r) => r.id === savedReel.id);
          let updated: Reel[];
          if (index >= 0) {
            updated = [...prev];
            updated[index] = savedReel;
          } else {
            updated = [...prev, savedReel];
          }
          return updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        });
        setIsModalOpen(false);
      } else {
        showNotification('error', `เกิดข้อผิดพลาด: ${res.error}`);
      }
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`ต้องการลบคลิป "${title}" ใช่หรือไม่?`)) return;

    startTransition(async () => {
      const res = await deleteReelAction(id);
      if (res.success) {
        showNotification('success', 'ลบคลิปเรียบร้อยแล้ว');
        setReels((prev) => prev.filter((r) => r.id !== id));
      } else {
        showNotification('error', `ไม่สามารถลบได้: ${res.error}`);
      }
    });
  };

  const handleToggleStatus = (id: string, currentActive: boolean) => {
    startTransition(async () => {
      const res = await toggleReelStatusAction(id, currentActive);
      if (res.success) {
        setReels((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isActive: !currentActive } : r))
        );
        showNotification('success', 'อัปเดตสถานะคลิปแล้ว');
      } else {
        showNotification('error', `เกิดข้อผิดพลาด: ${res.error}`);
      }
    });
  };

  const handleSeedDefaults = () => {
    if (!confirm('ต้องการรีเซ็ตและโหลดคลิปตัวอย่างทางการของ @nongtungrunning หรือไม่?')) return;

    startTransition(async () => {
      const res = await seedReelsAction();
      if (res.success) {
        showNotification('success', 'โหลดคลิปตัวอย่างสำเร็จแล้ว! กำลังรีเฟรชหน้า...');
        window.location.reload();
      } else {
        showNotification('error', `เกิดข้อผิดพลาด: ${res.error}`);
      }
    });
  };

  const filteredReels = reels.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.linkedTrip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border animate-in slide-in-from-top-4 duration-300 ${
            statusMessage.type === 'success'
              ? 'bg-forest text-white border-primary/30'
              : 'bg-red-900/90 text-white border-red-500/30'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-primary" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
          <span className="text-sm font-bold">{statusMessage.text}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคลิป, สถานที่, หรือทริปที่ผูกไว้..."
            className="w-full bg-gray-50 border border-gray-100 pl-11 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleSeedDefaults}
            disabled={isPending}
            className="px-4 py-2.5 rounded-2xl border border-gray-200 text-forest hover:bg-gray-50 transition-all text-xs font-bold flex items-center gap-2"
            title="รีเซ็ตและนำเข้าคลิปเริ่มต้นจาก TikTok @nongtungrunning"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPending ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">โหลดคลิปแนะนำ</span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="bg-primary hover:bg-primary-deep text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มคลิปใหม่</span>
          </button>
        </div>
      </div>

      {/* Reels Grid (9:16 Cards Preview) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredReels.map((reel) => (
          <div
            key={reel.id}
            className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl ${
              reel.isActive ? 'border-gray-100 hover:border-primary/40' : 'border-gray-200 opacity-60 bg-gray-50/50'
            }`}
          >
            {/* Top 9:16 Vertical Video Preview Container */}
            <div className="relative aspect-[9/14] w-full overflow-hidden bg-forest">
              <Image
                src={reel.poster}
                alt={reel.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

              {/* Order Badge & Status */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white/20">
                  #{reel.order ?? 1}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border ${
                    reel.isActive
                      ? 'bg-green-500/20 text-green-300 border-green-500/30'
                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}
                >
                  {reel.isActive ? 'แสดงบนเว็บ' : 'ซ่อน'}
                </span>
              </div>

              {/* Quick Action Buttons on Hover */}
              <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                <button
                  type="button"
                  onClick={() => openEditModal(reel)}
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-forest flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                  title="แก้ไขคลิปและสินค้า"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(reel.id, reel.title)}
                  className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                  title="ลบคลิป"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* TikTok ID Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/80 mb-1.5">
                  <span className="bg-primary/90 text-white px-2 py-0.5 rounded-md text-[10px] font-black">
                    📍 {reel.location}
                  </span>
                  <span className="flex items-center gap-1 ml-auto text-[10px]">
                    <Eye className="w-3 h-3 text-white/70" /> {reel.views}
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400" /> {reel.likes}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug">
                  {reel.title}
                </h3>
              </div>
            </div>

            {/* Bottom Linked Product / Trip Section */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow bg-white">
              <div className="mb-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-forest/40 mb-2">
                  <span className="flex items-center gap-1 text-primary">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    สินค้า/ทริปที่ผูกไว้
                  </span>
                  {reel.tiktokId && (
                    <span className="font-mono text-[9px] text-gray-400">
                      ID: {reel.tiktokId}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface border border-forest/5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-forest/10">
                    <Image
                      src={reel.linkedTrip.image}
                      alt={reel.linkedTrip.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="text-xs font-bold text-forest truncate">
                      {reel.linkedTrip.title}
                    </div>
                    <div className="text-[10px] text-forest/50">
                      {reel.linkedTrip.location} • {reel.linkedTrip.duration}
                    </div>
                    <div className="text-xs font-black text-primary mt-0.5">
                      ฿{reel.linkedTrip.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Controls */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(reel.id, reel.isActive ?? true)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all ${
                    reel.isActive
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {reel.isActive ? 'กดเพื่อซ่อน' : 'กดเพื่อแสดง'}
                </button>

                {reel.tiktokUrl && (
                  <a
                    href={reel.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest/60 hover:text-primary flex items-center gap-1 text-[11px] font-medium"
                  >
                    <span>ดูบน TikTok</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredReels.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200 p-8">
            <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-forest">ไม่พบคลิป Reels</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-5">
              ยังไม่มีคลิปที่ตรงกับการค้นหา หรือยังไม่ได้เพิ่มคลิปในระบบ
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary-deep transition-all"
            >
              + เพิ่มคลิปใหม่ตอนนี้
            </button>
          </div>
        )}
      </div>

      {/* Modal: Add / Edit Reel & Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col my-auto border border-gray-100">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-surface/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black font-heading text-forest">
                    {editingReel ? 'แก้ไขคลิป TikTok & สินค้าที่ผูก' : 'เพิ่มคลิป TikTok & สินค้าใหม่'}
                  </h2>
                  <p className="text-[11px] text-gray-400">
                    ตั้งค่าลิงก์คลิปจากช่อง @nongtungrunning และทริปที่ต้องการให้ลูกค้ากดจอง
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Form & Live Preview */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-grow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Input Fields (8 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Section 1: TikTok Clip Data */}
                  <div className="bg-surface/50 p-5 rounded-2xl border border-forest/5 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-forest">
                      <Smartphone className="w-4 h-4 text-primary" />
                      <span>ข้อมูลคลิปสั้น TikTok</span>
                    </div>

                    {/* TikTok URL / ID */}
                    <div>
                      <label className="block text-xs font-bold text-forest mb-1.5">
                        ลิงก์คลิป TikTok หรือ TikTok ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.tiktokUrl}
                        onChange={(e) => handleTiktokUrlChange(e.target.value)}
                        placeholder="เช่น https://www.tiktok.com/@nongtungrunning/video/7603675455408934164"
                        className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                        <span>วาง URL เต็มจาก TikTok ระบบจะตรวจหา ID อัตโนมัติ</span>
                        {formData.tiktokId && (
                          <span className="font-mono text-primary font-bold">
                            Detected ID: {formData.tiktokId}
                          </span>
                        )}
                      </div>

                      {/* ⚡ Option A: One-click Auto Fetch from TikTok */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAutoResolve}
                          disabled={isResolving || !formData.tiktokUrl.trim()}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            isResolving
                              ? 'bg-primary/50 text-white cursor-wait'
                              : 'bg-primary text-white hover:bg-primary-deep active:scale-95'
                          }`}
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${isResolving ? 'animate-spin' : ''}`} />
                          <span>
                            {isResolving ? 'กำลังดึงคลิปและวิดีโอจาก TikTok...' : '⚡ ดึงข้อมูลและวิดีโอจาก TikTok อัตโนมัติ'}
                          </span>
                        </button>

                        {formData.videoUrl && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>ดึงคลิปเรียบร้อย พร้อมเล่นทันที</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-forest mb-1.5">
                        หัวข้อคลิป (Title) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="เช่น พระอาทิตย์ขึ้น ดอยภูคา ทะเลหมอกสุดสายตา 360 องศา"
                        className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    {/* Location & Audio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          สถานที่ / พิกัด (Location)
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="เช่น ฟูจิออนใต้ • เชียงใหม่"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          เสียงเพลง (Audio Track)
                        </label>
                        <input
                          type="text"
                          value={formData.audioTrack}
                          onChange={(e) => setFormData({ ...formData, audioTrack: e.target.value })}
                          placeholder="เช่น Original Sound - @nongtungrunning"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Stats: Views & Likes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ยอดวิว (Views เช่น 69.9K)
                        </label>
                        <input
                          type="text"
                          value={formData.views}
                          onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                          placeholder="69.9K"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ยอดไลก์ (Likes เช่น 7.2K)
                        </label>
                        <input
                          type="text"
                          value={formData.likes}
                          onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                          placeholder="7.2K"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Poster URL */}
                    <div>
                      <label className="block text-xs font-bold text-forest mb-1.5">
                        รูปหน้าปกคลิป (Poster Image URL) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        value={formData.poster}
                        onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    {/* Optional Video MP4 URL */}
                    <div>
                      <label className="block text-xs font-bold text-forest mb-1.5">
                        ไฟล์วิดีโอ MP4 URL (ทางเลือก สำหรับเล่นพรีวิวคมชัดสูง)
                      </label>
                      <input
                        type="url"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://assets.mixkit.co/videos/preview/..."
                        className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    {/* Order & Active */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ลำดับการแสดงผล (Display Order)
                        </label>
                        <input
                          type="number"
                          value={formData.order}
                          onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-forest">
                          <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                          />
                          <span>เปิดแสดงบนหน้าเว็บ (Active)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Linked Product / Trip */}
                  <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary">
                        <ShoppingBag className="w-4 h-4" />
                        <span>สินค้า / ทริปที่ผูกกับคลิปนี้</span>
                      </div>
                    </div>

                    {/* Quick Trip Selector Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-forest mb-1.5">
                        เลือกทริปจากฐานข้อมูล (Auto-fill Trip)
                      </label>
                      <select
                        value={formData.linkedTripId}
                        onChange={(e) => handleTripSelect(e.target.value)}
                        className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">-- เลือกทริปเพื่อกรอกข้อมูลอัตโนมัติ --</option>
                        {allTrips.map((trip) => (
                          <option key={trip.id} value={trip.id}>
                            {trip.title} (฿{trip.price.toLocaleString()}) - {trip.duration}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Linked Trip Title & Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ชื่อทริป/สินค้าที่จะแสดง <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.linkedTripTitle}
                          onChange={(e) => setFormData({ ...formData, linkedTripTitle: e.target.value })}
                          placeholder="Chiang Dao – Muang Khong Cultural Escape"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ราคา (บาท) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.linkedTripPrice}
                          onChange={(e) =>
                            setFormData({ ...formData, linkedTripPrice: Number(e.target.value) })
                          }
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Duration & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ระยะเวลา (Duration)
                        </label>
                        <input
                          type="text"
                          value={formData.linkedTripDuration}
                          onChange={(e) =>
                            setFormData({ ...formData, linkedTripDuration: e.target.value })
                          }
                          placeholder="2 วัน 1 คืน"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          จุดหมาย / สถานที่ (Location)
                        </label>
                        <input
                          type="text"
                          value={formData.linkedTripLocation}
                          onChange={(e) =>
                            setFormData({ ...formData, linkedTripLocation: e.target.value })
                          }
                          placeholder="เชียงดาว, เชียงใหม่"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Image URL & Action URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          รูปภาพสินค้า/ทริป (Image URL)
                        </label>
                        <input
                          type="url"
                          value={formData.linkedTripImage}
                          onChange={(e) =>
                            setFormData({ ...formData, linkedTripImage: e.target.value })
                          }
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-forest mb-1.5">
                          ลิงก์หน้าทริป (Booking / Details URL)
                        </label>
                        <input
                          type="text"
                          value={formData.linkedTripUrl}
                          onChange={(e) =>
                            setFormData({ ...formData, linkedTripUrl: e.target.value })
                          }
                          placeholder="/th/trips หรือลิงก์ภายนอก"
                          className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Real-time Live Phone Mockup Preview (5 Cols) */}
                <div className="lg:col-span-5 sticky top-6">
                  <div className="text-center mb-3">
                    <span className="text-[11px] font-black uppercase tracking-widest text-forest/60">
                      📱 Live Card Preview (จำลองการแสดงผลบนเว็บ)
                    </span>
                  </div>

                  <div className="relative mx-auto w-full max-w-[280px] aspect-[9/16] rounded-[2.5rem] p-3 bg-zinc-950 shadow-2xl border-[6px] border-zinc-900 ring-1 ring-white/10 overflow-hidden flex flex-col justify-between">
                    {/* Background Video / Poster */}
                    <div className="absolute inset-0">
                      {formData.videoUrl ? (
                        <video
                          key={formData.videoUrl}
                          src={formData.videoUrl}
                          poster={formData.poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={formData.poster || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40 pointer-events-none" />
                    </div>

                    {/* Top Phone Notch & Header */}
                    <div className="relative z-10 flex items-center justify-between pt-1">
                      <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[9px] font-bold text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>Reel #{formData.order}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/80">
                        ❤️ {formData.likes}
                      </span>
                    </div>

                    {/* Middle Play Button */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Caption & Pinned Trip */}
                    <div className="relative z-10 space-y-2">
                      <div>
                        <span className="bg-primary/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md inline-block mb-1">
                          📍 {formData.location || 'เชียงใหม่'}
                        </span>
                        <h4 className="text-white text-xs font-bold font-heading line-clamp-2 leading-tight">
                          {formData.title || 'หัวข้อคลิปจะแสดงตรงนี้...'}
                        </h4>
                      </div>

                      {/* Attached Product Box */}
                      <div className="bg-white/15 backdrop-blur-md rounded-xl p-2 border border-white/20 flex items-center gap-2">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/30">
                          <Image
                            src={
                              formData.linkedTripImage ||
                              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
                            }
                            alt="Trip thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-grow text-white">
                          <div className="text-[10px] font-bold truncate">
                            {formData.linkedTripTitle || 'ชื่อสินค้า/ทริป'}
                          </div>
                          <div className="text-[9px] text-white/70">
                            {formData.linkedTripDuration}
                          </div>
                          <div className="text-[11px] font-black text-primary">
                            ฿{formData.linkedTripPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all"
                >
                  ยกเลิก (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-primary hover:bg-primary-deep text-white px-8 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>กำลังบันทึก...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>บันทึกข้อมูลคลิป & สินค้า</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
