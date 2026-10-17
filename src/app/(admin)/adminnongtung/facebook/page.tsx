import { Metadata } from 'next';
import { getFacebookPosts } from '@/lib/firestore-db';
import FacebookPostsEditor from '@/components/admin/FacebookPostsEditor';

export const metadata: Metadata = {
  title: 'จัดการโพสต์ Facebook & มาตรฐานนองตึง | Nongtung Admin',
  description: 'จัดการโพสต์จริงจาก Facebook ที่แสดงบนหน้าแรกของน่องตึง',
};

// Force dynamic so admin always sees latest data
export const dynamic = 'force-dynamic';

export default async function AdminFacebookPage() {
  const posts = await getFacebookPosts().catch(() => []);
  const hasApiToken = !!process.env.FB_PAGE_ACCESS_TOKEN;

  return (
    <div className="max-w-7xl mx-auto">
      <FacebookPostsEditor initialPosts={posts} hasApiToken={hasApiToken} />
    </div>
  );
}
