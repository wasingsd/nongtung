'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, Compass, FileText, CheckCircle2, MessageSquare, ArrowRight, Shield, Award, Users2 } from 'lucide-react';

export default function CorporatePage() {
    return (
        <div className="fade-in bg-[#fdfdfb]">
            {/* Immersive Hero Section */}
            <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
                <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600"
                    fill
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    alt="Corporate Team Building"
                    priority
                />
                <div className="relative z-20 text-center text-white px-6 max-w-5xl">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-6 block drop-shadow-lg text-primary">Elevate Your Team</span>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 font-heading leading-[0.9] tracking-tighter drop-shadow-2xl uppercase">
                        CORPORATE<br /><span className="text-primary italic">RETEATS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-medium drop-shadow-md">
                        Tailor-made outdoor experiences designed to foster connection, leadership, and team spirit in the heart of Northern Thailand.
                    </p>
                </div>
            </div>

            {/* Value Propositions */}
            <section className="relative z-30 -mt-20 pb-24">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-16 border border-forest/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm border border-forest/5">
                                    <Users2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black font-heading text-forest mb-3 tracking-tighter uppercase">Team Synergy</h3>
                                <p className="text-sm font-medium text-forest/40 leading-relaxed">กิจกรรมละลายพฤติกรรมที่ออกแบบมาเพื่อดึงศักยภาพของทีมออกมาได้สูงสุดในบรรยากาศผ่อนคลาย</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm border border-forest/5">
                                    <Compass className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black font-heading text-forest mb-3 tracking-tighter uppercase">Custom Itinerary</h3>
                                <p className="text-sm font-medium text-forest/40 leading-relaxed">เลือกความยาก เส้นทาง และระดับความหรูหราของที่พักและอาหารได้ตามงบประมาณองค์กร</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm border border-forest/5">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black font-heading text-forest mb-3 tracking-tighter uppercase">E-Tax Invoice</h3>
                                <p className="text-sm font-medium text-forest/40 leading-relaxed">อำนวยความสะดวกด้วยการออกใบกำกับภาษีเต็มรูปแบบในระบบ e-Tax Invoice ถูกต้องแม่นยำ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Corporate Services */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 block">Corporate Solutions</span>
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-forest tracking-tighter">OUR SPECIALTIES</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="group relative h-[400px] overflow-hidden rounded-[3rem] immersive-shadow border border-forest/5 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                alt="Management Retreat"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <h4 className="text-2xl font-black text-white font-heading tracking-tighter mb-2 uppercase italic">Executive Retreats</h4>
                                <p className="text-sm text-white/60 font-medium">ทริปพักผ่อนระดับผู้บริหาร เน้นความเป็นส่วนตัวและความพรีเมียมสูงสุด</p>
                            </div>
                        </div>
                        <div className="group relative h-[400px] overflow-hidden rounded-[3rem] immersive-shadow border border-forest/5 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                alt="Team Building"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <h4 className="text-2xl font-black text-white font-heading tracking-tighter mb-2 uppercase italic">Team Building Adventures</h4>
                                <p className="text-sm text-white/60 font-medium">ผจญภัยท่ามกลางธรรมชาติเพื่อสร้างความไว้วางใจและการสื่อสารในทีม</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 bg-surface/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-5/12">
                            <span className="text-[10px] font-black text-forest/20 uppercase tracking-[0.4em] mb-4 block">Request a Quote</span>
                            <h2 className="text-4xl md:text-5xl font-black font-heading text-forest tracking-tighter mb-8 uppercase italic leading-tight">
                                LET US DESIGN<br />YOUR NEXT<br /><span className="text-primary italic">ADVENTURE</span>
                            </h2>
                            <p className="text-forest/60 font-medium leading-relaxed mb-10">
                                แจ้งรายละเอียดทีมของคุณ เพื่อให้ทีมงานผู้เชี่ยวชาญของเราออกแบบโปรแกรมที่ตอบโจทย์ที่สุด และคุ้มค่าที่สุดสำหรับงบประมาณของบริษัท
                            </p>

                            <div className="space-y-4">
                                <li className="flex items-center gap-4 text-forest/40 font-bold text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Personalized Itinerary
                                </li>
                                <li className="flex items-center gap-4 text-forest/40 font-bold text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Flexible Budgeting
                                </li>
                                <li className="flex items-center gap-4 text-forest/40 font-bold text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Full Professional Support
                                </li>
                            </div>
                        </div>

                        <div className="lg:w-7/12">
                            <div className="bg-white rounded-[3rem] immersive-shadow p-10 md:p-14 border border-forest/10">
                                <form onSubmit={(e) => { e.preventDefault(); alert('We received your request. Our team will contact you shortly.'); }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Company Name</label>
                                        <input type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="e.g. Nongtung Strategy Co., Ltd." />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Contact Person</label>
                                        <input type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Phone / Line ID</label>
                                        <input type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="08x-xxx-xxxx" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Group Size</label>
                                        <select className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest appearance-none cursor-pointer">
                                            <option>10-20 Pax</option>
                                            <option>20-50 Pax</option>
                                            <option>50+ Pax</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Expected Date</label>
                                        <input type="date" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Requirements / Budget</label>
                                        <textarea className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest h-32 placeholder:text-forest/10" placeholder="Tell us more about your team and budget..."></textarea>
                                    </div>
                                    <div className="col-span-2 pt-4">
                                        <button className="w-full bg-primary hover:bg-forest text-white py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 flex items-center justify-center gap-3 group">
                                            Send Proposal Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
