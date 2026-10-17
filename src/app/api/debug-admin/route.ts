import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getTrips, getReels, getTransport, getQuotes, getArticles } from '@/lib/firestore-db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const results: Record<string, any> = {};

    try {
        results.session = await getSession();
    } catch (e: any) {
        results.sessionError = { message: e.message, stack: e.stack };
    }

    try {
        const quotes = await getQuotes();
        results.quotesCount = quotes.length;
    } catch (e: any) {
        results.quotesError = { message: e.message, stack: e.stack };
    }

    try {
        const trips = await getTrips();
        results.tripsCount = trips.length;
    } catch (e: any) {
        results.tripsError = { message: e.message, stack: e.stack };
    }

    try {
        const reels = await getReels();
        results.reelsCount = reels.length;
    } catch (e: any) {
        results.reelsError = { message: e.message, stack: e.stack };
    }

    try {
        const transport = await getTransport();
        results.transportCount = transport.length;
    } catch (e: any) {
        results.transportError = { message: e.message, stack: e.stack };
    }

    try {
        const articles = await getArticles();
        results.articlesCount = articles.length;
    } catch (e: any) {
        results.articlesError = { message: e.message, stack: e.stack };
    }

    return NextResponse.json({ success: true, results });
}
