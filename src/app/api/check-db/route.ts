import { NextResponse } from 'next/server';
import { getTrips } from '@/lib/firestore-db';

export async function GET() {
    try {
        const trips = await getTrips();
        return NextResponse.json({ trips });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
