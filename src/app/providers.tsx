'use client';

import React from 'react';

// Temporarily disabled next-themes due to dependency installation issues
// Once npm install works, restore the ThemeProvider from git history

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}
