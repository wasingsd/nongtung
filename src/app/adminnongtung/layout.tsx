import Link from 'next/link';
import {
    LayoutDashboard, Ticket, Car, Truck, LogOut,
    Database, Gem, Building2, BookOpen, Settings,
    User, ChevronRight, Bell, Search
} from 'lucide-react';
import { logoutAction } from '@/app/actions/authActions';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#f8fafc] min-h-screen font-kanit">
            {/* Sidebar */}
            <aside className="w-72 bg-forest text-white hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl z-50">
                <div className="p-8 pb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                            <span className="text-primary font-black text-xl">N</span>
                        </div>
                        <h2 className="text-2xl font-black font-heading tracking-tighter uppercase italic">Admin <span className="text-primary">Hub</span></h2>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Nongtung Management</p>
                </div>

                <nav className="flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="px-4 py-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Main Menu</div>

                    {[
                        { href: '/adminnongtung/trips', label: 'Trips', icon: Ticket },
                        { href: '/adminnongtung/transport', label: 'Transport', icon: Car },
                        { href: '/adminnongtung/rental', label: 'Rental Gear', icon: Truck },
                        { href: '/adminnongtung/corporate', label: 'Corporate', icon: Building2 },
                        { href: '/adminnongtung/articles', label: 'Articles', icon: BookOpen },
                        { href: '/adminnongtung/settings', label: 'Home Settings', icon: Settings },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold group border border-transparent hover:border-white/10"
                        >
                            <item.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                            <span>{item.label}</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white/20" />
                        </Link>
                    ))}

                    <div className="pt-8 pb-2 px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">External</div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-500 cursor-not-allowed opacity-40 bg-black/10">
                        <Gem className="w-5 h-5" /> Shop <span className="ml-auto text-[8px] bg-white/5 px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-widest">SOON</span>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5">
                        <Link href="/adminnongtung/migrate" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-500/10 transition-colors text-sm font-bold text-orange-300 group">
                            <Database className="w-5 h-5 group-hover:animate-pulse" /> Migrate Data
                        </Link>
                    </div>
                </nav>

                <div className="p-6 mt-auto border-t border-white/5 space-y-4">
                    <Link href="/" className="text-xs text-white/40 hover:text-white flex items-center gap-2 transition-colors px-4">
                        &larr; Back to Website
                    </Link>
                    <form action={logoutAction} className="px-2">
                        <button type="submit" className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-sm">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4 lg:hidden">
                        <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center">
                            <span className="text-primary font-black">N</span>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl w-72 transition-all focus-within:w-80 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Quick search..." className="bg-transparent text-sm focus:outline-none w-full font-medium" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2.5 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-forest transition-all relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100 mx-2"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <div className="text-xs font-black text-forest uppercase tracking-widest">Administrator</div>
                                <div className="text-[10px] font-bold text-gray-400">admin@nongtung.com</div>
                            </div>
                            <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation (Simpler for Admin) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
                <Link href="/adminnongtung/trips" className="p-3 text-gray-400 hover:text-primary transition-all"><Ticket className="w-6 h-6" /></Link>
                <Link href="/adminnongtung/transport" className="p-3 text-gray-400 hover:text-primary transition-all"><Car className="w-6 h-6" /></Link>
                <Link href="/adminnongtung/settings" className="p-3 text-gray-400 hover:text-primary transition-all"><Settings className="w-6 h-6" /></Link>
                <form action={logoutAction}>
                    <button type="submit" className="p-3 text-red-400"><LogOut className="w-6 h-6" /></button>
                </form>
            </div>
        </div>
    );
}
