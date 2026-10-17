import { getSession } from '@/lib/auth';
import { getQuotes } from '@/lib/firestore-db';
import NotificationBell from '@/components/admin/NotificationBell';
import AdminNavClient from '@/components/admin/AdminNavClient';
import Link from 'next/link';
import { Search, ExternalLink } from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    const user = session?.user as { name: string; email: string } | undefined;

    // Fetch pending quotes for notification
    let pendingQuotes: any[] = [];
    let pendingCount = 0;
    try {
        const allQuotes = await getQuotes();
        pendingQuotes = allQuotes.filter(q => q.status === 'pending');
        pendingCount = pendingQuotes.length;
    } catch (error) {
        console.error('Error fetching quotes for notification:', error);
    }

    return (
        <div className="flex flex-col lg:flex-row bg-[#F8FAFC] min-h-screen font-kanit text-forest selection:bg-primary/20 selection:text-primary">
            {/* Responsive Navigation: Desktop Sidebar + Mobile Drawer */}
            <AdminNavClient user={user} pendingCount={pendingCount} />

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 sm:h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 transition-all shadow-sm">
                    {/* Left: Search Bar & Live Badge */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2.5 bg-gray-50 border border-gray-200/70 px-4 py-2 rounded-2xl w-64 lg:w-80 transition-all focus-within:w-96 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 shadow-sm">
                            <Search className="w-4 h-4 text-gray-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="ค้นหาข้อมูลในระบบ..."
                                className="bg-transparent text-xs sm:text-sm focus:outline-none w-full font-medium placeholder:text-gray-400"
                            />
                            <span className="hidden lg:inline text-[10px] font-mono text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                                ⌘K
                            </span>
                        </div>
                    </div>

                    {/* Right: Actions & User Info */}
                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        {/* Live Website Quick Action */}
                        <Link
                            href="/th"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-forest/5 hover:bg-forest text-forest hover:text-white transition-all text-xs font-bold border border-forest/10 active:scale-95"
                        >
                            <span>ดูหน้าเว็บจริง</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {/* Notification Bell */}
                        <NotificationBell
                            initialPendingCount={pendingCount}
                            initialPendingQuotes={pendingQuotes}
                        />

                        <div className="h-7 w-px bg-gray-200 hidden sm:block" />

                        {/* User Profile Pill */}
                        <div className="flex items-center gap-2.5 pl-1">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-deep text-white flex items-center justify-center font-black text-sm shadow-md shadow-primary/20">
                                {user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="text-left hidden sm:block">
                                <div className="text-xs font-bold text-forest leading-tight">
                                    {user?.name || 'Administrator'}
                                </div>
                                <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Super Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-8 lg:p-10 flex-grow max-w-[1600px] w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
