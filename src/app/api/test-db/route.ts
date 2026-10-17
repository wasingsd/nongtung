import { NextResponse } from 'next/server';
import { getTrips } from '@/lib/firestore-db';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({ test: 'db-ok' });
}
