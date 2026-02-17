'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar({ facebookUrl = 'https://www.facebook.com/Venturevibecnx', lang, dict }: { facebookUrl?: string, lang: string, dict: any }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Don't show Navbar on Admin routes
    if (pathname?.startsWith('/adminnongtung')) return null;

    const navLinks = [
        { id: 'trips', label: dict.trips, href: '/trips' },
        { id: 'activities', label: dict.activities, href: '/activities' },
        { id: 'transport', label: dict.transport, href: '/transport' },
        { id: 'rental', label: dict.rental, href: '/rental' },
        { id: 'articles', label: dict.articles, href: '/articles' },
        // { id: 'shop', label: 'Shop', href: '/shop' }, // Hidden
        { id: 'corporate', label: dict.corporate, href: '/corporate' },
    ];

    const getLocalizedHref = (path: string) => `/${lang}${path === '/' ? '' : path}`;

    const switchLocale = (newLocale: string) => {
        if (!pathname) return `/${newLocale}`;
        const segments = pathname.split('/');
        // segments[0] is empty, segments[1] is locale
        if (['en', 'th', 'zh'].includes(segments[1])) {
            segments[1] = newLocale;
        } else {
            // Should not happen with middleware, but fallback
            return `/${newLocale}${pathname}`;
        }
        return segments.join('/');
    };

    return (
        <>
            {/* Header Bar */}
            <header
                className={`fixed w-full z-[90] transition-colors duration-300 py-4 ${isMenuOpen ? 'bg-white dark:bg-black' : 'glass-nav'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="cursor-pointer flex items-center relative z-[100]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/typo_logo.png"
                            alt="NONGTUNG"
                            className="h-8 md:h-14 w-auto object-contain dark:invert"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <Link href={getLocalizedHref('/')} className={`nav-link text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors relative group ${pathname === `/${lang}` || pathname === `/${lang}/` ? 'text-primary' : 'text-forest/70 dark:text-gray-300'}`}>
                            {dict.home}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname === `/${lang}` || pathname === `/${lang}/` ? 'w-full' : 'w-0'}`}></span>
                        </Link>
                        {navLinks.map((link) => (
                            <Link key={link.id} href={getLocalizedHref(link.href)} className={`nav-link text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors relative group ${pathname?.startsWith(getLocalizedHref(link.href)) ? 'text-primary' : 'text-forest/70 dark:text-gray-300'}`}>
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full ${pathname?.startsWith(getLocalizedHref(link.href)) ? 'w-full' : 'w-0'}`}></span>
                            </Link>
                        ))}

                        <div className="flex gap-2 items-center text-[10px] font-black uppercase">
                            <Link href={switchLocale('en')} className={`hover:text-primary transition-colors ${lang === 'en' ? 'text-primary' : 'text-forest/70 dark:text-gray-400'}`}>EN</Link>
                            <span className="text-forest/30 dark:text-gray-600">|</span>
                            <Link href={switchLocale('th')} className={`hover:text-primary transition-colors ${lang === 'th' ? 'text-primary' : 'text-forest/70 dark:text-gray-400'}`}>TH</Link>
                            <span className="text-forest/30 dark:text-gray-600">|</span>
                            <Link href={switchLocale('zh')} className={`hover:text-primary transition-colors ${lang === 'zh' ? 'text-primary' : 'text-forest/70 dark:text-gray-400'}`}>CN</Link>
                        </div>

                        <ThemeToggle />

                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white px-7 py-2.5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-primary-deep transition-all shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5"
                        >
                            {dict.contact}
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden relative z-[100] flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`focus:outline-none p-2 flex items-center justify-center transition-all rounded-xl ${isMenuOpen ? 'bg-forest/5 dark:bg-white/10 text-forest dark:text-white' : 'text-forest dark:text-white'
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
                className={`fixed inset-0 bg-white dark:bg-black z-[80] lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="h-full w-full flex flex-col items-center justify-center gap-6 md:gap-10 px-6 pt-20 pb-10 text-forest dark:text-white">
                    <Link href={getLocalizedHref('/')} className={`text-2xl md:text-4xl font-black font-heading tracking-tighter uppercase italic transition-all ${pathname === `/${lang}` ? 'text-primary' : 'text-forest dark:text-white'}`}>
                        {dict.home}
                    </Link>
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={getLocalizedHref(link.href)}
                            className={`text-2xl md:text-4xl font-black font-heading tracking-tighter uppercase italic transition-all ${pathname?.startsWith(getLocalizedHref(link.href)) ? 'text-primary' : 'text-forest dark:text-white'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 bg-primary text-white px-10 py-4 md:px-14 md:py-5 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest shadow-2xl active:scale-95 transition-all text-center"
                    >
                        {dict.contact}
                    </a>

                    <div className="flex gap-4 items-center text-lg font-black uppercase mt-4">
                        <Link href={switchLocale('en')} className={`hover:text-primary transition-colors ${lang === 'en' ? 'text-primary' : 'text-forest/70 dark:text-gray-400'}`}>EN</Link>
                        <span className="text-forest/30 dark:text-gray-600">|</span>
                        <Link href={switchLocale('th')} className={`hover:text-primary transition-colors ${lang === 'th' ? 'text-primary' : 'text-forest/70 dark:text-gray-400'}`}>TH</Link>
                        <span className="text-forest/30 dark:text-gray-600">|</span>
                        <Link href={switchLocale('zh')} className={`hover:text-primary transition-colors ${lang === 'zh' ? 'text-primary' : 'text-forest/70 dark:text-gray-400'}`}>CN</Link>
                    </div>

                    <div className="mt-8 md:mt-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-forest/20 dark:text-white/20">
                        Nongtung Adventure • 2026
                    </div>
                </div>
            </div>
        </>
    );
}
