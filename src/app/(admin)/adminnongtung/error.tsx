'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Admin Error Caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
            <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl border border-red-200">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl mb-4">
                    ⚠️
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">
                    เกิดข้อผิดพลาดในการโหลดหน้า Admin
                </h2>
                <div className="bg-red-50 text-red-800 p-4 rounded-xl font-mono text-xs overflow-auto max-h-60 mb-6">
                    <p className="font-bold">{error.message || 'Unknown Error'}</p>
                    {error.digest && <p className="text-[10px] text-gray-500 mt-2">Digest: {error.digest}</p>}
                    {error.stack && <pre className="mt-2 text-[10px] text-gray-600 whitespace-pre-wrap">{error.stack}</pre>}
                </div>
                <button
                    onClick={() => reset()}
                    className="w-full bg-primary hover:bg-primary-deep text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md"
                >
                    ลองใหม่อีกครั้ง (Retry)
                </button>
            </div>
        </div>
    );
}
