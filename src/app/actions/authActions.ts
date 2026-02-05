'use server';

import { loginSimple, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function createSession(email: string, name?: string) {
    // In a production app with firebase-admin, you would verify the ID token here.
    // For now, we trust the client-side authentication (Firebase) and create a session.

    await loginSimple(email, name);
    redirect('/adminnongtung/trips');
}

export async function logoutAction() {
    await logout();
    redirect('/login');
}
