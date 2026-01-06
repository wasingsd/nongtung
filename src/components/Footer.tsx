import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="footer" className="bg-forest text-white pt-16 pb-8 border-t-4 border-primary mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white text-sm">N</div>
                            NONGTUNG
                        </h3>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            Digital Platform for Adventure Tourism in Northern Thailand.
                            <br />Efficiency • Safety • Experience
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded bg-forest-light flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded bg-forest-light flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading text-primary">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/trips" className="hover:text-primary transition-colors">All Trips</Link></li>
                            <li><Link href="/transport" className="hover:text-primary transition-colors">Transportation</Link></li>
                            <li><Link href="/rental" className="hover:text-primary transition-colors">Gear Rental</Link></li>
                            <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading text-primary">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> 08X-XXX-XXXX</li>
                            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> contact@nongtung.com</li>
                            <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Chiang Mai, Thailand</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 font-heading text-primary">Newsletter</h4>
                        <div className="flex">
                            <input type="email" placeholder="Email"
                                className="bg-forest-light text-white px-4 py-2 text-sm w-full focus:outline-none rounded-l-sm placeholder-gray-400" />
                            <button
                                className="bg-primary px-4 py-2 font-bold hover:bg-primary-deep rounded-r-sm transition-colors text-sm">GO</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-forest-light pt-8 text-center text-xs text-gray-500">
                    <p>&copy; 2026 Nongtueng Strategy Team. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
