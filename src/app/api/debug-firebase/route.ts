import { NextResponse } from 'next/server';
import { adminApp, adminDb, hasValidCredentials } from '@/lib/firebase-admin';
import { getTrips } from '@/lib/firestore-db';

export const dynamic = 'force-dynamic';

export async function GET() {
    const steps: string[] = [];
    try {
        steps.push('1: start');
        steps.push(`2: hasValidCredentials=${hasValidCredentials}`);
        steps.push(`3: hasAdminApp=${!!adminApp}`);
        steps.push(`4: adminAppName=${adminApp ? adminApp.name : 'none'}`);
        steps.push(`5: envKeyExists=${!!(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_SERVICE_ACCOUNT)}`);
        
        steps.push('6: before calling getTrips');
        const trips = await getTrips();
        steps.push(`7: after getTrips, count=${trips.length}`);

        return NextResponse.json({ success: true, steps, count: trips.length });
    } catch (e: any) {
        return NextResponse.json({ success: false, steps, error: e?.message || String(e), stack: e?.stack });
    }
}
