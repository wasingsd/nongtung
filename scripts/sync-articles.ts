import { saveArticle } from '../src/lib/firestore-db';
import { articles } from '../src/app/(site)/[lang]/articles/data';

async function main() {
    console.log(`Starting sync of all ${articles.length} articles to Firestore...`);
    for (const a of articles) {
        await saveArticle({ ...a, id: a.slug } as any);
        console.log(`✅ Saved: ${a.slug} (cover: ${a.coverImage})`);
    }
    console.log('All articles successfully synced!');
}

main().catch(console.error);
