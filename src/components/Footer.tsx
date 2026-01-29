import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="footer" className="bg-forest text-white/90 pt-20 pb-12 rounded-t-[4rem] mt-auto immersive-shadow relative z-30">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div>
                        <Link href="/" className="text-3xl font-black font-heading tracking-tighter mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-xl shadow-glow">N</div>
                            NONGTUNG
                        </Link>
                        <p className="text-white/40 mb-8 text-sm font-medium leading-[1.8]">
                            Crafting immersive adventure experiences in Northern Thailand since 2024.
                            <br />Authenticity • Connection • Adventure
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                                <Instagram className="w-5 h-5 text-white/60" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all">
                                <Facebook className="w-5 h-5 text-white/60" />
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
                            <li className="flex items-center gap-4 text-white/40"><Phone className="w-4 h-4 text-primary" /> 08X-XXX-XXXX</li>
                            <li className="flex items-center gap-4 text-white/40"><Mail className="w-4 h-4 text-primary" /> concierge@nongtung.com</li>
                            <li className="flex items-center gap-4 text-white/40"><MapPin className="w-4 h-4 text-primary" /> Chiang Mai, Thailand</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-primary">Newsletter</h4>
                        <p className="text-xs font-medium text-white/30 mb-6 leading-relaxed">Join our inner circle for exclusive adventure insights.</p>
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
