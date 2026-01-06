import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // 1. Handle Protected Routes
    if (request.nextUrl.pathname.startsWith('/adminnongtung')) {
        const session = request.cookies.get('session')?.value;

        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await decrypt(session);
            return await updateSession(request);
        } catch (e) {
            // Invalid token
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 2. Handle Login Page (Redirect to admin if already logged in)
    if (request.nextUrl.pathname === '/login') {
        const session = request.cookies.get('session')?.value;
        if (session) {
            try {
                await decrypt(session);
                return NextResponse.redirect(new URL('/adminnongtung/trips', request.url));
            } catch (e) {
                // Token invalid, let them stay on login
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/adminnongtung/:path*', '/login'],
};
