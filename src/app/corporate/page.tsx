'use client';

import Image from 'next/image';
import { Users, Compass, FileText, CheckCircle2, MessageSquare, ArrowRight, Shield, Award, Users2 } from 'lucide-react';
import { submitCorporateInquiry } from '@/app/actions/corporate';
import { useState, useTransition } from 'react';

export default function CorporatePage() {
    return (
        <div className="fade-in bg-[#fdfdfb]">
            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
                <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600"
                    fill
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    alt="Corporate Team Building"
                    priority
                />
                <div className="relative z-20 text-center text-white px-6 max-w-5xl">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-4 md:mb-6 block drop-shadow-lg text-primary-light">Impactful Team Retreats</span>
                    <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 font-heading leading-[0.9] tracking-tighter drop-shadow-2xl uppercase">
                        NATURE <br /><span className="text-primary italic">CONNECTIONS</span>
                    </h1>
                    <p className="text-base md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
                        Elevate your team's potential with bespoke outdoor experiences. Dedicated service, exceptional value, and the transformative power of nature.
                    </p>
                </div>
            </div>

            {/* Value Propositions */}
            <section className="relative z-30 -mt-12 md:-mt-20 pb-12 md:pb-24">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-16 border border-forest/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 shadow-sm border border-forest/5">
                                    <Users2 className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black font-heading text-forest mb-2 md:mb-3 tracking-tighter uppercase">Impactful Bonding</h3>
                                <p className="text-xs md:text-sm font-medium text-forest/60 leading-relaxed">Activities designed to foster genuine connection and leadership in a relaxed, natural setting.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 shadow-sm border border-forest/5">
                                    <Compass className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black font-heading text-forest mb-2 md:mb-3 tracking-tighter uppercase">Tailored Value</h3>
                                <p className="text-xs md:text-sm font-medium text-forest/60 leading-relaxed">Flexible plans that maximize your budget without compromising on the exceptional experience.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-surface rounded-2xl flex items-center justify-center text-primary mb-4 md:mb-6 shadow-sm border border-forest/5">
                                    <FileText className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black font-heading text-forest mb-2 md:mb-3 tracking-tighter uppercase">Seamless Service</h3>
                                <p className="text-xs md:text-sm font-medium text-forest/60 leading-relaxed">Full e-Tax Invoice support and a dedicated concierge to handle every detail for you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Corporate Services */}
            <section className="py-12 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-4 md:gap-6">
                        <div className="max-w-xl">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 md:mb-3 block">Our Expertise</span>
                            <h2 className="text-3xl md:text-5xl font-black font-heading text-forest tracking-tighter">CORPORATE RETREATS</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        <div className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-[2rem] md:rounded-[3rem] immersive-shadow border border-forest/5 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                alt="Management Retreat"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                                <h4 className="text-xl md:text-2xl font-black text-white font-heading tracking-tighter mb-2 uppercase italic">Executive Retreats</h4>
                                <p className="text-xs md:text-sm text-white/80 font-medium">Exclusive, high-end experiences focused on privacy, strategy, and renewal.</p>
                            </div>
                        </div>
                        <div className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-[2rem] md:rounded-[3rem] immersive-shadow border border-forest/5 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                alt="Team Building"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                                <h4 className="text-xl md:text-2xl font-black text-white font-heading tracking-tighter mb-2 uppercase italic">Team Empowerment</h4>
                                <p className="text-xs md:text-sm text-white/80 font-medium">Immersive nature challenges that build trust and communication.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 md:py-24 bg-surface/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-16">
                        <div className="lg:w-5/12">
                            <span className="text-[10px] font-black text-forest/20 uppercase tracking-[0.4em] mb-2 md:mb-4 block">Start Planning</span>
                            <h2 className="text-3xl md:text-5xl font-black font-heading text-forest tracking-tighter mb-6 md:mb-8 uppercase italic leading-tight">
                                DESIGN YOUR<br />PERFECT<br /><span className="text-primary italic">RETREAT</span>
                            </h2>
                            <p className="text-forest/60 font-medium leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
                                Tell us about your team's needs. We will craft a customized itinerary that delivers maximum value and unforgettable memories.
                            </p>

                            <div className="space-y-3 md:space-y-4">
                                <li className="flex items-center gap-4 text-forest/60 font-bold text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Curated Itineraries
                                </li>
                                <li className="flex items-center gap-4 text-forest/60 font-bold text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Transparent Pricing
                                </li>
                                <li className="flex items-center gap-4 text-forest/60 font-bold text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-primary" /> Dedicated Support
                                </li>
                            </div>
                        </div>

                        <div className="lg:w-7/12">
                            <div className="bg-white rounded-[2rem] md:rounded-[3rem] immersive-shadow p-6 md:p-14 border border-forest/10">
                                <CorporateForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CorporateForm() {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const result = await submitCorporateInquiry(formData);
            setStatus(result);
            if (result.success) {
                (event.target as HTMLFormElement).reset();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {status && (
                <div className={`col-span-2 p-4 rounded-2xl text-center font-bold ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status.message}
                </div>
            )}
            <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Company Name</label>
                <input required name="companyName" type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="Your Organization" />
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Contact Person</label>
                <input required name="contactPerson" type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="Name" />
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Phone / Line ID</label>
                <input required name="phone" type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="Contact Number" />
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Group Size</label>
                <input required name="groupSize" type="text" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest placeholder:text-forest/10" placeholder="e.g. 20 Pax" />
            </div>
            <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Expected Date</label>
                <input name="expectedDate" type="date" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest" />
            </div>
            <div className="col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-forest/30 mb-2 block">Requirements / Budget</label>
                <textarea name="requirements" className="w-full bg-surface border border-forest/5 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-forest h-32 placeholder:text-forest/10" placeholder="Any specific requests or budget range?"></textarea>
            </div>
            <div className="col-span-2 pt-4">
                <button disabled={isPending} type="submit" className="w-full bg-primary hover:bg-forest text-white py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed">
                    {isPending ? 'Sending...' : 'Request Proposal'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </form>
    );
}
