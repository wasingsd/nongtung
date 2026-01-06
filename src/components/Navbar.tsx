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
        { id: 'shop', label: 'Shop', href: '/shop' },
        { id: 'corporate', label: 'Corporate', href: '/corporate' },
    ];

    return (
        <nav id="navbar" className="fixed w-full z-50 transition-all duration-300 py-4 bg-white text-forest shadow-md">
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black font-heading tracking-tighter cursor-pointer flex items-center gap-2 z-50">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">N</div>
                    <span id="nav-logo-text">NONGTUNG</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-menu">
                    <Link href="/" className={`nav-link text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors relative group ${pathname === '/' ? 'text-primary' : ''}`}>
                        Home
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === '/' ? 'w-full' : 'w-0'}`}></span>
                    </Link>
                    {navLinks.map((link) => (
                        <Link key={link.id} href={link.href} className={`nav-link text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors relative group ${pathname === link.href ? 'text-primary' : ''}`}>
                            {link.label}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === link.href ? 'w-full' : 'w-0'}`}></span>
                        </Link>
                    ))}
                    <button className="bg-primary text-white px-5 py-2 rounded-sm font-bold uppercase text-xs hover:bg-primary-deep transition-colors shadow-lg transform hover:-translate-y-0.5">
                        Contact Us
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden z-50">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-current focus:outline-none">
                        {isMenuOpen ? <X className="w-8 h-8 text-forest" /> : <Menu className="w-8 h-8 text-forest" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 lg:hidden flex flex-col items-center justify-center gap-6 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <Link href="/" className="text-2xl font-bold text-forest hover:text-primary font-heading">Home</Link>
                {navLinks.map((link) => (
                    <Link key={link.id} href={link.href} className="text-2xl font-bold text-forest hover:text-primary font-heading">
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
