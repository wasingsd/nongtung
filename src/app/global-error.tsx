'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body>
                <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto', background: '#fff', border: '2px solid #ef4444', borderRadius: '16px' }}>
                    <h1 style={{ color: '#dc2626', fontSize: '24px', fontWeight: 'bold' }}>⚠️ Root Application Error Caught</h1>
                    <p style={{ marginTop: '16px', fontSize: '16px', color: '#1f2937' }}>
                        <strong>Message:</strong> {error?.message || 'Unknown error'}
                    </p>
                    {error?.digest && (
                        <p style={{ marginTop: '8px', fontSize: '13px', color: '#6b7280' }}>
                            <strong>Digest:</strong> {error.digest}
                        </p>
                    )}
                    {error?.stack && (
                        <pre style={{ marginTop: '16px', padding: '16px', background: '#f3f4f6', borderRadius: '8px', fontSize: '12px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                            {error.stack}
                        </pre>
                    )}
                    <button
                        onClick={() => reset()}
                        style={{ marginTop: '20px', padding: '10px 24px', background: '#D66E3A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Retry
                    </button>
                </div>
            </body>
        </html>
    );
}
