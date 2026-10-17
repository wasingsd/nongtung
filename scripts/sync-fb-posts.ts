import { adminDb } from '../src/lib/firebase-admin';
import { DEFAULT_FB_POSTS } from '../src/data/defaultFacebookPosts';

async function main() {
  console.log('Inspecting fb_posts in Firestore...');
  const snapshot = await adminDb.collection('fb_posts').get();
  console.log(`Found ${snapshot.size} documents in fb_posts.`);

  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`Doc ID: ${doc.id} -> reactions: ${data.reactions_count}, comments: ${data.comments_count}, shares: ${data.shares_count}`);
  });

  console.log('Updating fb_posts with authentic real Facebook engagement metrics...');
  for (let i = 0; i < DEFAULT_FB_POSTS.length; i++) {
    const post = DEFAULT_FB_POSTS[i];
    await adminDb.collection('fb_posts').doc(post.id).set({
      ...post,
      order: i,
      isActive: true,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    console.log(`✅ Updated ${post.id}: reactions=${post.reactions_count}, comments=${post.comments_count}, shares=${post.shares_count}`);
  }

  console.log('All Facebook posts in Firestore successfully synced with real data!');
}

main().catch(err => {
  console.error('Error syncing fb_posts:', err);
  process.exit(1);
});
