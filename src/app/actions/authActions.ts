'use server';

import { login, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Hardcoded credentials for now - replace with ENV variables in production
    if (email === 'admin@nongtung.com' && password === '1234') {
        await login(formData);
        redirect('/adminnongtung/trips');
    } else {
        // In a real app, you'd return an error state
        console.log('Login failed');
        redirect('/login?error=InvalidCredentials');
    }
}

export async function logoutAction() {
    await logout();
    redirect('/login');
}
