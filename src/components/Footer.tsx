import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="footer" className="bg-forest text-white/90 pt-20 pb-12 rounded-t-[4rem] mt-auto immersive-shadow relative z-30">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="mb-8 block md:ml-20">
                            <img
                                src="/images/logo.svg"
                                alt="NONGTUNG"
                                className="h-24 md:h-28 w-auto brightness-0 invert opacity-80"
                            />
                        </Link>
                        <p className="text-white/40 mb-8 text-sm font-medium leading-[1.8]">
                            Amazing outdoor trips in Northern Thailand since 2024.
                            <br />Nature • Connection • Adventure
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.instagram.com/nongtungrunning/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all group"
                            >
                                <Instagram className="w-5 h-5 text-white/60 group-hover:text-white" />
                            </a>
                            <a
                                href="https://www.facebook.com/Venturevibecnx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all group"
                            >
                                <Facebook className="w-5 h-5 text-white/60 group-hover:text-white" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@nongtungrunning"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all group"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 fill-white/60 group-hover:fill-white transition-colors"
                                >
                                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.26.74-4.63 2.58-5.91 1.64-1.15 3.7-1.49 5.66-1.01v4.28c-.96-.26-2.02-.17-2.86.38-.85.55-1.33 1.47-1.35 2.45-.02.84.42 1.67 1.15 2.09.61.35 1.31.47 2.01.44 1.02-.03 1.99-.54 2.5-1.43.3-.53.45-1.15.45-1.77.01-2.45 0-4.92 0-7.39V.02z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-primary">Discover</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="/trips" className="text-white/40 hover:text-white transition-colors">Our Adventures</Link></li>
                            <li><Link href="/transport" className="text-white/40 hover:text-white transition-colors">Private Transit</Link></li>
                            <li><Link href="/rental" className="text-white/40 hover:text-white transition-colors">Equipment Hire</Link></li>
                            <li><Link href="/corporate" className="text-white/40 hover:text-white transition-colors">Corporate Retreats</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-primary">Contact</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li className="flex items-center gap-4 text-white/40"><Phone className="w-4 h-4 text-primary" /> 080-442-5189</li>
                            <li className="flex items-center gap-4 text-white/40">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href="mailto:tripntrail.cnx@gmail.com" className="hover:text-white transition-colors">tripntrail.cnx@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-4 text-white/40"><MapPin className="w-4 h-4 text-primary" /> Chiang Mai, Thailand</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-primary">Newsletter</h4>
                        <p className="text-xs font-medium text-white/30 mb-6 leading-relaxed">Sign up for trip updates and new adventure news.</p>
                        <div className="flex bg-white/5 border border-white/10 rounded-full p-1 group focus-within:border-primary/50 transition-all">
                            <input type="email" placeholder="Your Email"
                                className="bg-transparent text-white px-5 py-2 text-xs w-full focus:outline-none placeholder-white/20 font-bold" />
                            <button
                                className="bg-primary px-6 py-2 font-black rounded-full hover:bg-white hover:text-forest transition-all text-[10px] tracking-widest text-white shadow-xl">GO</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                    <p>&copy; 2026 NONGTUNG STRATEGY TEAM. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
