'use client';

import { useEffect } from 'react';

export default function GlobalAdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global Admin Error:', error);
    }, [error]);

    return (
        <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
            <h1 style={{ color: '#d9534f' }}>⚠️ Admin System Error</h1>
            <p style={{ fontWeight: 'bold' }}>{error.message}</p>
            {error.digest && <p style={{ color: '#666' }}>Digest: {error.digest}</p>}
            {error.stack && (
                <pre style={{ background: '#f8f8f8', padding: 16, borderRadius: 8, fontSize: 12, overflowX: 'auto' }}>
                    {error.stack}
                </pre>
            )}
            <button
                onClick={() => reset()}
                style={{ marginTop: 20, padding: '10px 20px', background: '#D66E3A', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}
            >
                Retry
            </button>
        </div>
    );
}
