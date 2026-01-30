'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const navLinks = [
        { id: 'trips', label: 'Trips', href: '/trips' },
        { id: 'transport', label: 'Transport', href: '/transport' },
        { id: 'rental', label: 'Rental', href: '/rental' },
        // { id: 'shop', label: 'Shop', href: '/shop' }, // Hidden - Shop is disabled
        { id: 'corporate', label: 'Corporate', href: '/corporate' },
    ];

    return (
        <nav id="navbar" className="fixed w-full z-50 transition-all duration-300 py-2 glass-nav">
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="cursor-pointer flex items-center z-50">
                    <img
                        src="/images/typo_logo.svg"
                        alt="NONGTUNG"
                        className="h-11 md:h-15 w-auto transition-all"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-menu">
                    <Link href="/" className={`nav-link text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors relative group ${pathname === '/' ? 'text-primary' : 'text-forest/70'}`}>
                        Home
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === '/' ? 'w-full' : 'w-0'}`}></span>
                    </Link>
                    {navLinks.map((link) => (
                        <Link key={link.id} href={link.href} className={`nav-link text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors relative group ${pathname === link.href ? 'text-primary' : 'text-forest/70'}`}>
                            {link.label}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === link.href ? 'w-full' : 'w-0'}`}></span>
                        </Link>
                    ))}
                    <button className="bg-primary text-white px-7 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-primary-deep transition-all shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5">
                        Contact Us
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden z-50">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-forest focus:outline-none p-2">
                        {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'}`}>
                <Link href="/" className="text-3xl font-black text-forest hover:text-primary font-heading tracking-tighter">HOME</Link>
                {navLinks.map((link) => (
                    <Link key={link.id} href={link.href} className="text-3xl font-black text-forest hover:text-primary font-heading tracking-tighter">
                        {link.label.toUpperCase()}
                    </Link>
                ))}
                <button className="mt-4 bg-primary text-white px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest shadow-xl">
                    CONTACT US
                </button>
            </div>
        </nav>
    );
}
