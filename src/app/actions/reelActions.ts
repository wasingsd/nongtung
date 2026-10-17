'use server';

import fs from 'fs';
import path from 'path';
import { saveReel, deleteReel, seedDefaultReels, getReel } from '@/lib/firestore-db';
import { Reel } from '@/types/types';
import { revalidatePath } from 'next/cache';

function revalidateReels() {
  revalidatePath('/', 'layout');
  revalidatePath('/adminnongtung/reels');
}

function formatNumber(num: number): string {
  if (!num || isNaN(num)) return '1K';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * ⚡ Option A: Auto-fetch clean direct video stream, title, stats, and audio from any TikTok URL
 */
export async function resolveTikTokUrlAction(url: string) {
  try {
    const cleanUrl = url.trim();
    if (!cleanUrl) return { success: false, error: 'กรุณาระบุ TikTok URL' };

    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(cleanUrl)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Resolver API returned HTTP ${res.status}`);
    const json = await res.json();

    if (json.code === 0 && json.data) {
      const data = json.data;
      const tiktokId = data.id || '';
      const title = data.title ? data.title.split('#')[0].trim() || data.title : 'คลิปกิจกรรมนองตึง';
      const playCount = formatNumber(data.play_count || 10000);
      const diggCount = formatNumber(data.digg_count || 1200);
      const musicTitle = data.music_info?.title
        ? `${data.music_info.title}${data.music_info.author ? ` - ${data.music_info.author}` : ''}`
        : 'Original Sound - @nongtungrunning';

      let posterUrl = data.cover || data.origin_cover || '';
      let videoUrl = data.play || '';

      // Auto-cache video to public/videos for permanent zero-latency playback
      if (videoUrl && tiktokId) {
        try {
          const videoRes = await fetch(videoUrl);
          if (videoRes.ok) {
            const buffer = Buffer.from(await videoRes.arrayBuffer());
            const videosDir = path.join(process.cwd(), 'public', 'videos');
            await fs.promises.mkdir(videosDir, { recursive: true });

            const filename = `tiktok-${tiktokId}.mp4`;
            const filePath = path.join(videosDir, filename);
            await fs.promises.writeFile(filePath, buffer);

            videoUrl = `/videos/${filename}`;
          }
        } catch (downloadErr) {
          console.warn('Could not cache video locally, using direct stream:', downloadErr);
        }
      }

      // Also cache poster image locally
      if (posterUrl && tiktokId) {
        try {
          const posterRes = await fetch(posterUrl);
          if (posterRes.ok) {
            const imgBuffer = Buffer.from(await posterRes.arrayBuffer());
            const videosDir = path.join(process.cwd(), 'public', 'videos');
            const imgFilename = `poster-${tiktokId}.jpg`;
            const imgPath = path.join(videosDir, imgFilename);
            await fs.promises.writeFile(imgPath, imgBuffer);
            posterUrl = `/videos/${imgFilename}`;
          }
        } catch (imgErr) {
          console.warn('Could not cache poster locally:', imgErr);
        }
      }

      // If this post is a Photo Album (Photo Mode)
      const images: string[] = [];
      if (Array.isArray(data.images) && data.images.length > 0 && tiktokId) {
        for (let i = 0; i < data.images.length; i++) {
          try {
            const photoRes = await fetch(data.images[i]);
            if (photoRes.ok) {
              const pBuffer = Buffer.from(await photoRes.arrayBuffer());
              const videosDir = path.join(process.cwd(), 'public', 'videos');
              const pFilename = `photo-${tiktokId}-${i}.jpg`;
              const pPath = path.join(videosDir, pFilename);
              await fs.promises.writeFile(pPath, pBuffer);
              images.push(`/videos/${pFilename}`);
            } else {
              images.push(data.images[i]);
            }
          } catch (pErr) {
            images.push(data.images[i]);
          }
        }
      }

      return {
        success: true,
        data: {
          tiktokId,
          title,
          views: playCount,
          likes: diggCount,
          audioTrack: musicTitle,
          poster: posterUrl,
          videoUrl,
          images: images.length > 0 ? images : undefined,
          type: images.length > 1 ? ('photo' as const) : ('video' as const),
          tiktokUrl: cleanUrl,
        },
      };
    }

    return { success: false, error: json.msg || 'ไม่สามารถดึงข้อมูลคลิป TikTok นี้ได้' };
  } catch (error: any) {
    console.error('Error resolving TikTok URL action:', error);
    return { success: false, error: error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ TikTok' };
  }
}

export async function saveReelAction(formData: FormData) {
  try {
    const id = (formData.get('id') as string) || `reel-${Date.now()}`;
    const rawTiktokUrl = (formData.get('tiktokUrl') as string) || '';
    let tiktokId = (formData.get('tiktokId') as string) || '';
    let videoUrl = (formData.get('videoUrl') as string) || '';
    let poster = (formData.get('poster') as string) || '';

    // Smart extraction if user pasted a TikTok URL into tiktokUrl or tiktokId
    if (!tiktokId && rawTiktokUrl) {
      const match = rawTiktokUrl.match(/\/(?:video|photo)\/(\d+)/);
      if (match) tiktokId = match[1];
    } else if (tiktokId.includes('tiktok.com')) {
      const match = tiktokId.match(/\/(?:video|photo)\/(\d+)/);
      if (match) {
        tiktokId = match[1];
      }
    }

    // Auto-resolve video if videoUrl is missing or invalid but tiktokUrl is provided
    let images: string[] = [];
    const rawImages = (formData.get('images') as string) || '';
    if (rawImages) {
      try {
        images = JSON.parse(rawImages);
      } catch {
        images = rawImages.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    if ((!videoUrl || videoUrl.includes('mixkit.co')) && rawTiktokUrl) {
      try {
        const autoResolved = await resolveTikTokUrlAction(rawTiktokUrl);
        if (autoResolved.success && autoResolved.data) {
          if (autoResolved.data.videoUrl) videoUrl = autoResolved.data.videoUrl;
          if (!poster && autoResolved.data.poster) poster = autoResolved.data.poster;
          if (images.length === 0 && autoResolved.data.images?.length) {
            images = autoResolved.data.images;
          }
        }
      } catch (autoErr) {
        console.warn('Auto-resolve in saveReelAction failed:', autoErr);
      }
    }

    const reel: Reel = {
      id,
      tiktokId: tiktokId.trim(),
      title: (formData.get('title') as string) || 'คลิปกิจกรรมนองตึง',
      location: (formData.get('location') as string) || 'เชียงใหม่',
      views: (formData.get('views') as string) || '10K',
      likes: (formData.get('likes') as string) || '1K',
      poster: poster || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
      videoUrl: videoUrl,
      images: images.length > 0 ? images : undefined,
      type: (images.length > 1 ? 'photo' : ((formData.get('type') as string) || 'video')) as 'video' | 'photo',
      tiktokUrl: rawTiktokUrl || (tiktokId ? `https://www.tiktok.com/@nongtungrunning/video/${tiktokId}` : ''),
      audioTrack: (formData.get('audioTrack') as string) || 'Original Sound - @nongtungrunning',
      order: Number(formData.get('order')) || 0,
      isActive: formData.get('isActive') !== 'false',
      linkedTrip: {
        id: (formData.get('linkedTripId') as string) || '',
        title: (formData.get('linkedTripTitle') as string) || 'ทริปท่องเที่ยวธรรมชาติ นองตึง',
        duration: (formData.get('linkedTripDuration') as string) || '2 วัน 1 คืน',
        price: Number(formData.get('linkedTripPrice')) || 0,
        image: (formData.get('linkedTripImage') as string) || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
        location: (formData.get('linkedTripLocation') as string) || 'เชียงใหม่',
        url: (formData.get('linkedTripUrl') as string) || '/th/trips',
      },
    };

    await saveReel(reel);
    revalidateReels();
    return { success: true, reelId: id };
  } catch (error: any) {
    console.error('Error saving reel action:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteReelAction(id: string) {
  try {
    await deleteReel(id);
    revalidateReels();
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting reel action:', error);
    return { success: false, error: error.message };
  }
}

export async function toggleReelStatusAction(id: string, currentActive: boolean) {
  try {
    const reel = await getReel(id);
    if (!reel) throw new Error('Reel not found');
    await saveReel({
      ...reel,
      isActive: !currentActive,
    });
    revalidateReels();
    return { success: true };
  } catch (error: any) {
    console.error('Error toggling reel status:', error);
    return { success: false, error: error.message };
  }
}

export async function seedReelsAction() {
  try {
    await seedDefaultReels();
    revalidateReels();
    return { success: true };
  } catch (error: any) {
    console.error('Error seeding default reels:', error);
    return { success: false, error: error.message };
  }
}
