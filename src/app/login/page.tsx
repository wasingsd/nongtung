'use client';

import { loginAction } from '@/app/actions/authActions';
import { useActionState } from 'react';
import { Lock, Mail } from 'lucide-react';

const initialState = {
    error: '',
};

export default function LoginPage() {
    // We use a simple wrapper to handle the server action response if needed
    // But for this basic version, standard form action works fine.
    // If we want error handling, we'd use useFormState/useActionState.

    // Using a simpler approach: Client Component wrapping the form

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-heading text-forest">Admin Login</h1>
                    <p className="text-gray-400 text-sm mt-2">Sign in to manage your site</p>
                </div>

                <form action={loginAction} className="space-y-6">
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
                        className="w-full bg-primary hover:bg-primary-deep text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                    >
                        Sign In
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Default: admin@nongtung.com / 1234
                    </p>
                </form>
            </div>
        </div>
    );
}
