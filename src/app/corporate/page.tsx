'use client';

import { Users, Compass, FileText } from 'lucide-react';

export default function CorporatePage() {
    return (
        <div className="container mx-auto px-6 py-12 fade-in">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="lg:w-5/12 bg-forest text-white p-12 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">For Business</span>
                        <h2 className="text-4xl font-bold mb-6 font-heading relative z-10">CORPORATE &<br />PRIVATE GROUPS</h2>
                        <p className="text-gray-300 mb-8 text-lg relative z-10 font-light">
                            ออกแบบประสบการณ์ Outdoor ที่แตกต่างเพื่อทีมของคุณ สร้างความสามัคคี หรือพักผ่อนแบบ Exclusive
                        </p>

                        <div className="space-y-6 relative z-10">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0"><Users className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Team Building</h4>
                                    <p className="text-sm text-gray-400">กิจกรรมละลายพฤติกรรมท่ามกลางธรรมชาติ</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0"><Compass className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Custom Itinerary</h4>
                                    <p className="text-sm text-gray-400">เลือกความยาก เส้นทาง และอาหารได้ตามงบ</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Full Tax Invoice</h4>
                                    <p className="text-sm text-gray-400">ออกใบกำกับภาษีเต็มรูปแบบ e-Tax Invoice</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 text-sm text-gray-500">Trusted by: SCG, Toyota, Chiang Mai University</div>
                </div>

                <div className="lg:w-7/12 p-12 bg-gray-50">
                    <h3 className="text-2xl font-bold text-forest mb-6 font-heading">Request Proposal</h3>
                    <form onSubmit={(e) => { e.preventDefault(); alert('We received your request. Our team will contact you shortly.'); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                            <input type="text" className="w-full bg-white border border-gray-200 rounded p-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Person</label>
                            <input type="text" className="w-full bg-white border border-gray-200 rounded p-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone / Line ID</label>
                            <input type="text" className="w-full bg-white border border-gray-200 rounded p-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expected Date</label>
                            <input type="date" className="w-full bg-white border border-gray-200 rounded p-3 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Group Size (Approx)</label>
                            <select className="w-full bg-white border border-gray-200 rounded p-3 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-500">
                                <option>10-20 Pax</option>
                                <option>20-50 Pax</option>
                                <option>50+ Pax</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Special Requirements / Budget</label>
                            <textarea className="w-full bg-white border border-gray-200 rounded p-3 focus:ring-2 focus:ring-primary outline-none transition-all h-24"></textarea>
                        </div>
                        <div className="col-span-2">
                            <button className="w-full bg-primary text-white font-bold py-4 rounded shadow-lg hover:bg-primary-deep transition-all transform hover:-translate-y-1">SEND REQUEST</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
