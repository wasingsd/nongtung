import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const log: any[] = [];
    try {
        log.push('step 1: before importing firebase-admin');
        const admin = await import('@/lib/firebase-admin');
        log.push({
            step: 'step 2: imported firebase-admin',
            hasValidCredentials: admin.hasValidCredentials,
            hasAdminApp: !!admin.adminApp,
        });

        log.push('step 3: before importing firestore-db');
        const db = await import('@/lib/firestore-db');
        log.push('step 4: imported firestore-db');

        log.push('step 5: before calling getTrips');
        const trips = await db.getTrips();
        log.push({
            step: 'step 6: called getTrips',
            count: trips.length,
            firstTripTitle: trips[0]?.title,
        });

        return NextResponse.json({ success: true, log });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e?.message || String(e),
            stack: e?.stack,
            log
        });
    }
}
