'use client';

import { useState } from 'react';
import { createSession } from '@/app/actions/authActions';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            // 1. Client-Side Login with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.email) {
                // 2. Server-Side Session Creation
                await createSession(user.email);
            } else {
                setError('Login failed: No email returned from provider.');
                setLoading(false);
            }

        } catch (err: any) {
            console.error("Firebase Login Error:", err);
            // Show the actual error message to help debug
            setError(err.message || 'Login failed. Please check console.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-heading text-forest">Admin Login <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">v4.0 Final</span></h1>
                    <p className="text-gray-400 text-sm mt-2">Sign in to manage your site</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-deep text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Protected by Firebase Auth
                    </p>
                </form>
            </div>
        </div>
    );
}
