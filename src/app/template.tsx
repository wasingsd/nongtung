'use client';

// Temporarily disabled framer-motion animation due to dependency installation issues
// Once npm install works, restore the framer-motion version from git history

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="fade-in">
            {children}
        </div>
    );
}
