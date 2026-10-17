'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ facebookUrl = 'https://www.facebook.com/NONGTUNG.Adventure', lang, dict }: { facebookUrl?: string, lang: string, dict: any }) {
    const pathname = usePathname();
    const getLocalizedHref = (path: string) => `/${lang}${path === '/' ? '' : path}`;

    // Don't show Footer on Admin routes
    if (pathname?.startsWith('/adminnongtung')) return null;

    return (
        <footer id="footer" className="bg-forest text-white/90 pt-16 sm:pt-20 pb-12 mt-auto border-t border-white/10 relative z-30">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="mb-6 block">
                            <img
                                src="/images/logo.png"
                                alt="NONGTUNG"
                                className="h-20 md:h-24 w-auto brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="text-white/70 mb-6 text-sm font-medium leading-[1.8] whitespace-pre-line">
                            {dict.description}
                        </p>
                        <div className="flex gap-2.5">
                            <a
                                href="https://www.instagram.com/nongtungrunning/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5 text-white/80 group-hover:text-white" />
                            </a>
                            <a
                                href={facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5 text-white/80 group-hover:text-white" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@nongtungrunning"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                aria-label="TikTok"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 fill-white/80 group-hover:fill-white transition-colors"
                                >
                                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.64-1.15 3.7-1.49 5.66-1.01v4.28c-.96-.26-2.02-.17-2.86.38-.85.55-1.33 1.47-1.35 2.45-.02.84.42 1.67 1.15 2.09.61.35 1.31.47 2.01.44 1.02-.03 1.99-.54 2.5-1.43.3-.53.45-1.15.45-1.77.01-2.45 0-4.92 0-7.39V.02z" />
                                </svg>
                            </a>
                            <a
                                href="https://line.me/R/ti/p/@nongtungrunning"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-11 h-11 rounded-2xl bg-[#06C755]/20 border border-[#06C755]/30 flex items-center justify-center hover:bg-[#06C755] transition-all group"
                                aria-label="LINE Official"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/90 group-hover:fill-white">
                                    <path d="M12 2C6.48 2 2 5.92 2 10.75c0 4.34 3.65 7.96 8.58 8.63.33.07.78.22.89.5.1.26.07.67.03.93l-.15.91c-.05.28-.21 1.1.96.6 1.18-.5 6.36-3.75 8.68-6.42C21.84 14.54 22 12.7 22 10.75 22 5.92 17.52 2 12 2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-primary">{dict.discover}</h4>
                        <ul className="space-y-3.5 text-sm font-bold font-heading">
                            <li><Link href={getLocalizedHref('/trips')} className="text-white/70 hover:text-primary transition-colors">{dict.our_adventures}</Link></li>
                            <li><Link href={getLocalizedHref('/transport')} className="text-white/70 hover:text-primary transition-colors">{dict.private_transit}</Link></li>
                            <li><Link href={getLocalizedHref('/corporate')} className="text-white/70 hover:text-primary transition-colors">{dict.corporate_retreats}</Link></li>
                            <li><Link href={getLocalizedHref('/articles')} className="text-white/70 hover:text-primary transition-colors">{dict.articles || 'เรื่องเล่า & บทความ'}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-primary">{dict.contact}</h4>
                        <ul className="space-y-3.5 text-sm font-medium font-heading">
                            <li className="flex items-center gap-3 text-white/80">
                                <Phone className="w-4 h-4 text-primary shrink-0" />
                                <a href="tel:0804425189" className="hover:text-primary transition-colors font-bold">080-442-5189</a>
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                <a href="mailto:tripntrail.cnx@gmail.com" className="hover:text-primary transition-colors font-bold truncate">tripntrail.cnx@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3 text-white/80">
                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                <span className="font-bold">Chiang Mai, Thailand</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-6 uppercase tracking-[0.3em] text-primary">{dict.newsletter}</h4>
                        <p className="text-xs font-normal font-reading text-white/70 mb-5 leading-relaxed">{dict.newsletter_desc}</p>
                        <div className="flex bg-white/10 border border-white/15 rounded-full p-1.5 focus-within:border-primary/60 transition-all mb-4">
                            <input
                                type="email"
                                placeholder={dict.your_email}
                                className="bg-transparent text-white px-4 py-2 text-xs w-full focus:outline-none placeholder-white/40 font-medium font-heading"
                            />
                            <button className="bg-primary hover:bg-primary-deep px-5 py-2 font-bold font-heading rounded-full transition-all text-xs text-white shadow-md">
                                {dict.go}
                            </button>
                        </div>
                        <a
                            href="https://line.me/R/ti/p/@nongtungrunning"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white px-4 py-2 rounded-full text-xs font-bold font-heading transition-all shadow-md active:scale-95"
                        >
                            <span>คุยกับเราทาง LINE: @nongtungrunning</span>
                        </a>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center text-xs font-medium font-heading text-white/40">
                    <p>{dict.rights_reserved}</p>
                </div>
            </div>
        </footer>
    );
}
