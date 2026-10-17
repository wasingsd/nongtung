const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const sa = JSON.parse(fs.readFileSync('serviceAccountKey.json', 'utf8'));
const app = initializeApp({ credential: cert(sa) });
const db = getFirestore(app);

async function run() {
  const snapshot = await db.collection('articles').get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    console.log('==============================================');
    console.log('ID:', doc.id);
    console.log('Title:', data.title);
    console.log('Cover:', data.coverImage);
    if (data.subImages && data.subImages.length > 0) {
      console.log('SubImages:', data.subImages);
    }
    const matches = (data.content || '').match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/g);
    if (matches) {
      console.log('Inline Images in content:');
      matches.forEach(m => console.log('  ', m));
    }
  }
}

run().catch(console.error).finally(() => process.exit(0));
