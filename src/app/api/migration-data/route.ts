import { NextResponse } from 'next/server';
import { getTrips, getRentals, getTransport } from '@/lib/db';

export async function GET() {
    const trips = getTrips();
    const rentals = getRentals();
    const transport = getTransport();

    return NextResponse.json({
        trips,
        rentals,
        transport
    });
}
