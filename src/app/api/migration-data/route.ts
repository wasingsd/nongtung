import { NextResponse } from 'next/server';
import { getTrips, getRentals, getTransport } from '@/lib/firestore-db';

export async function GET() {
    const [trips, rentals, transport] = await Promise.all([
        getTrips(),
        getRentals(),
        getTransport()
    ]);

    return NextResponse.json({
        trips,
        rentals,
        transport
    });
}
