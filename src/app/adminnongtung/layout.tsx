import Link from 'next/link';
import { LayoutDashboard, Ticket, Car, Truck, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/authActions';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-forest text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-forest-light">
                    <h2 className="text-2xl font-bold font-heading">Admin Panel</h2>
                    <p className="text-xs text-gray-300 mt-1">Manage your website</p>
                </div>

                <nav className="flex-grow p-6 space-y-2">
                    <Link href="/adminnongtung/trips" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold">
                        <Ticket className="w-5 h-5" /> Trips
                    </Link>
                    <Link href="/adminnongtung/transport" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold">
                        <Car className="w-5 h-5" /> Transport
                    </Link>
                    <Link href="/adminnongtung/rental" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold">
                        <Truck className="w-5 h-5" /> Rental Gear
                    </Link>
                </nav>

                <div className="p-6 border-t border-forest-light space-y-4">
                    <Link href="/" className="text-sm text-gray-300 hover:text-white flex items-center gap-2">
                        &larr; Back to Website
                    </Link>
                    <form action={logoutAction}>
                        <button type="submit" className="w-full text-left text-sm text-red-300 hover:text-white flex items-center gap-2">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-forest text-white z-50 p-4 flex justify-between items-center">
                <span className="font-bold">Admin</span>
                <div className="flex gap-4 text-sm">
                    <Link href="/adminnongtung/trips">Trips</Link>
                    <Link href="/adminnongtung/transport">Transport</Link>
                    <Link href="/adminnongtung/rental">Rentals</Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto p-8 pt-20 md:pt-8">
                {children}
            </main>
        </div>
    );
}
