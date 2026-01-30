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
        <>
            {/* Header Bar */}
            <header
                className={`fixed w-full z-[90] transition-colors duration-300 py-4 ${isMenuOpen ? 'bg-white' : 'glass-nav'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="cursor-pointer flex items-center relative z-[100]">
                        <img
                            src="/images/typo_logo.svg"
                            alt="NONGTUNG"
                            className="h-8 md:h-14 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
                    <div className="lg:hidden relative z-[100]">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`focus:outline-none p-2 flex items-center justify-center transition-all rounded-xl ${isMenuOpen ? 'bg-forest/5 text-forest' : 'text-forest'
                                }`}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Separate and Fixed */}
            <div
                className={`fixed inset-0 bg-white z-[80] lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="h-full w-full flex flex-col items-center justify-center gap-8 md:gap-10 px-6 pt-24">
                    <Link href="/" className={`text-4xl font-black font-heading tracking-tighter uppercase italic transition-all ${pathname === '/' ? 'text-primary' : 'text-forest'}`}>
                        HOME
                    </Link>
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={`text-4xl font-black font-heading tracking-tighter uppercase italic transition-all ${pathname === link.href ? 'text-primary' : 'text-forest'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button className="mt-8 bg-primary text-white px-14 py-5 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-all">
                        Contact Us
                    </button>

                    <div className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-forest/20">
                        Nongtung Adventure • 2026
                    </div>
                </div>
            </div>
        </>
    );
}
