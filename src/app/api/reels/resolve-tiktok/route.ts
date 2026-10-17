import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function formatNumber(num: number): string {
  if (!num || isNaN(num)) return '1K';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอก TikTok URL ที่ถูกต้อง' },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim();

    // Call TikWM API to resolve video stream & metadata
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

    if (!res.ok) {
      throw new Error(`TikTok Resolver returned status ${res.status}`);
    }

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

      // Auto-download video to local public/videos for 100% reliable zero-latency playback
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
          console.warn('Could not cache video locally, fallback to stream URL:', downloadErr);
        }
      }

      // Also try to cache poster image
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
          console.warn('Could not cache poster locally, using remote cover URL:', imgErr);
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

      return NextResponse.json({
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
          type: images.length > 1 ? 'photo' : 'video',
          tiktokUrl: cleanUrl,
        },
      });
    }

    // Fallback: oEmbed if TikWM had non-zero code
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(cleanUrl)}`;
    const oembedRes = await fetch(oembedUrl);
    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      return NextResponse.json({
        success: true,
        data: {
          tiktokId: '',
          title: oembedData.title || '',
          views: '15K',
          likes: '1.5K',
          audioTrack: 'Original Sound - @nongtungrunning',
          poster: oembedData.thumbnail_url || '',
          videoUrl: '',
          tiktokUrl: cleanUrl,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: json.msg || 'ไม่สามารถดึงข้อมูลคลิปจาก TikTok นี้ได้' },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('Error in resolve-tiktok route:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ TikTok' },
      { status: 500 }
    );
  }
}
