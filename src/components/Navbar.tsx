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

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Header Bar */}
            <header
                className={`fixed top-0 left-0 right-0 w-full z-[90] transition-all duration-300 ${
                    isMenuOpen 
                        ? 'bg-white dark:bg-zinc-950 py-4 shadow-sm' 
                        : scrolled
                        ? 'py-3 glass-nav shadow-sm'
                        : 'py-5 bg-transparent'
                }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href={getLocalizedHref('/')} className="cursor-pointer flex items-center relative z-[100] group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/typo_logo.png"
                            alt="NONGTUNG"
                            className="h-8 md:h-12 w-auto object-contain dark:invert group-hover:opacity-90 transition-opacity"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <Link 
                            href={getLocalizedHref('/')} 
                            className={`nav-link text-xs font-bold uppercase tracking-widest transition-colors relative py-1.5 px-3 rounded-full ${
                                pathname === `/${lang}` || pathname === `/${lang}/` 
                                    ? 'text-primary font-black bg-primary/10' 
                                    : 'text-forest/70 dark:text-gray-300 hover:text-primary hover:bg-forest/5'
                            }`}
                        >
                            {dict.home}
                        </Link>
                        {navLinks.map((link) => {
                            const isActive = pathname?.startsWith(getLocalizedHref(link.href));
                            return (
                                <Link 
                                    key={link.id} 
                                    href={getLocalizedHref(link.href)} 
                                    className={`nav-link text-xs font-bold uppercase tracking-widest transition-colors relative py-1.5 px-3 rounded-full ${
                                        isActive 
                                            ? 'text-primary font-black bg-primary/10' 
                                            : 'text-forest/70 dark:text-gray-300 hover:text-primary hover:bg-forest/5'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* Language Selector */}
                        <div className="flex items-center bg-forest/5 dark:bg-white/10 p-1 rounded-full text-[10px] font-black uppercase">
                            {(['en', 'th', 'zh'] as const).map(loc => (
                                <Link
                                    key={loc}
                                    href={switchLocale(loc)}
                                    className={`px-2.5 py-1 rounded-full transition-all duration-200 ${lang === loc ? 'bg-primary text-white shadow-xs' : 'text-forest/60 dark:text-gray-400 hover:text-primary'}`}
                                >
                                    {loc === 'zh' ? 'CN' : loc.toUpperCase()}
                                </Link>
                            ))}
                        </div>

                        <ThemeToggle />

                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary-deep transition-all shadow-md hover:shadow-primary/20 transform hover:-translate-y-0.5 active:scale-95"
                        >
                            {dict.contact}
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden relative z-[100] flex items-center gap-3">
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

                    <div className="flex items-center bg-forest/5 dark:bg-white/10 p-1.5 rounded-full text-xs font-black uppercase mt-4">
                        {(['en', 'th', 'zh'] as const).map(loc => (
                            <Link
                                key={loc}
                                href={switchLocale(loc)}
                                className={`px-4 py-2 rounded-full transition-all duration-200 ${lang === loc ? 'bg-primary text-white shadow-xs' : 'text-forest/60 dark:text-gray-400 hover:text-primary'}`}
                            >
                                {loc === 'zh' ? 'CN' : loc.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 md:mt-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-forest/20 dark:text-white/20">
                        Nongtung Adventure • 2026
                    </div>
                </div>
            </div>
        </>
    );
}
