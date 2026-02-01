import { NextResponse } from 'next/server';
import { saveArticle } from '@/lib/firestore-db';
import { articles } from '@/app/articles/data';
import { Article } from '@/types/types';

export async function GET() {
    try {
        let count = 0;
        for (const articleData of articles) {
            // Adapt data.ts structure to Article type if needed
            // data.ts has 'excerpt' and 'date', Article type matches now.
            const article: Article = {
                id: articleData.slug,
                ...articleData,
                relatedTripId: articleData.relatedTripId || '',
                relatedRentalId: articleData.relatedRentalId || '',
                // ensure keywords exist
                keywords: articleData.keywords || []
            };

            await saveArticle(article);
            count++;
        }
        return NextResponse.json({ success: true, message: `Migrated ${count} articles` });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
