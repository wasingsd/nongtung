import { NextResponse } from 'next/server';
import AdminNavClient from '@/components/admin/AdminNavClient';
import NotificationBell from '@/components/admin/NotificationBell';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({ test: 'nav-ok', nav: typeof AdminNavClient, bell: typeof NotificationBell });
}
