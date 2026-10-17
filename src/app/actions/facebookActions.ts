'use server';

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';
import { FacebookPost } from '@/types/types';
import { DEFAULT_FB_POSTS } from '@/data/defaultFacebookPosts';
import { saveFacebookPost } from '@/lib/firestore-db';

interface SyncResult {
  success: boolean;
  message: string;
  count?: number;
}

/**
 * Sync latest posts from Facebook Page via Meta Graph API
 * Requires FB_PAGE_ACCESS_TOKEN and FB_PAGE_ID in environment variables
 */
export async function syncFacebookPostsAction(): Promise<SyncResult> {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID || 'NONGTUNG.Adventure';

  if (!token) {
    return {
      success: false,
      message: 'ไม่พบ FB_PAGE_ACCESS_TOKEN ในระบบ กรุณาใส่ Page Access Token ใน .env.local หรือใช้โพสต์คัดสรรเริ่มต้น',
    };
  }

  try {
    const fields = 'id,message,permalink_url,full_picture,created_time,reactions.summary(true),comments.summary(true),shares';
    const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=${encodeURIComponent(fields)}&limit=8&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP ${res.status}`;
      return {
        success: false,
        message: `เชื่อมต่อ Facebook Graph API ไม่สำเร็จ: ${errMsg}`,
      };
    }

    const data = await res.json();
    const postsData = data.data || [];

    if (postsData.length === 0) {
      return {
        success: false,
        message: 'ไม่พบโพสต์สาธารณะในเพจ Facebook นี้',
      };
    }

    let savedCount = 0;
    for (let i = 0; i < postsData.length; i++) {
      const p = postsData[i];
      // Only keep posts with messages or photos
      if (!p.message && !p.full_picture) continue;

      const fbPost: FacebookPost = {
        id: p.id,
        message: p.message || 'ติดตามเรื่องราวและการเดินทางกับน่องตึงทาง Facebook',
        permalink_url: p.permalink_url || `https://www.facebook.com/${p.id}`,
        full_picture: p.full_picture,
        created_time: p.created_time || new Date().toISOString(),
        reactions_count: p.reactions?.summary?.total_count ?? 0,
        comments_count: p.comments?.summary?.total_count ?? 0,
        shares_count: p.shares?.count ?? 0,
        badge: i === 0 ? 'โพสต์ล่าสุด' : 'มาตรฐานนองตึง',
        authorName: 'น่องตึง - Nongtung Adventure',
        order: i,
        isActive: true,
      };

      await saveFacebookPost(fbPost);
      savedCount++;
    }

    revalidatePath('/[lang]', 'page');
    revalidatePath('/[lang]/trips', 'page');

    return {
      success: true,
      count: savedCount,
      message: `ซิงค์โพสต์จาก Facebook สำเร็จทั้งหมด ${savedCount} โพสต์`,
    };
  } catch (error: any) {
    console.error('Error syncing Facebook posts:', error);
    return {
      success: false,
      message: `เกิดข้อผิดพลาดในการดึงข้อมูล: ${error.message || 'Unknown error'}`,
    };
  }
}

/**
 * Seed default high-quality Facebook posts into Firestore
 */
export async function seedDefaultFacebookPostsAction(): Promise<SyncResult> {
  try {
    for (let i = 0; i < DEFAULT_FB_POSTS.length; i++) {
      await saveFacebookPost({
        ...DEFAULT_FB_POSTS[i],
        order: i,
        isActive: true,
      });
    }

    revalidatePath('/[lang]', 'page');
    return {
      success: true,
      count: DEFAULT_FB_POSTS.length,
      message: 'รีเซ็ตและบันทึกโพสต์มาตรฐานนองตึงเริ่มต้นเรียบร้อยแล้ว',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `ไม่สามารถบันทึกข้อมูลเริ่มต้นได้: ${error.message}`,
    };
  }
}

/**
 * Save or update a single Facebook post
 */
export async function upsertFacebookPostAction(post: FacebookPost): Promise<SyncResult> {
  try {
    await saveFacebookPost(post);
    revalidatePath('/[lang]', 'page');
    return {
      success: true,
      message: 'บันทึกข้อมูลโพสต์ Facebook สำเร็จ',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `บันทึกไม่สำเร็จ: ${error.message}`,
    };
  }
}

/**
 * Delete a Facebook post from Firestore
 */
export async function deleteFacebookPostAction(id: string): Promise<SyncResult> {
  try {
    await adminDb.collection('fb_posts').doc(id).delete();
    revalidatePath('/[lang]', 'page');
    return {
      success: true,
      message: 'ลบโพสต์เรียบร้อยแล้ว',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `ลบไม่สำเร็จ: ${error.message}`,
    };
  }
}

/**
 * Toggle active status of a Facebook post
 */
export async function toggleFacebookPostAction(id: string, isActive: boolean): Promise<SyncResult> {
  try {
    await adminDb.collection('fb_posts').doc(id).set({
      isActive,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    revalidatePath('/[lang]', 'page');
    return {
      success: true,
      message: isActive ? 'เปิดแสดงโพสต์นี้บนหน้าเว็บแล้ว' : 'ซ่อนโพสต์นี้จากหน้าเว็บแล้ว',
    };
  } catch (error: any) {
    return {
      success: false,
      message: `อัปเดตไม่สำเร็จ: ${error.message}`,
    };
  }
}

