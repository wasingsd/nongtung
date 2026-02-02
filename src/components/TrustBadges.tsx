import { ShieldCheck, Users, Award, ThumbsUp } from 'lucide-react';

const badges = [
    {
        icon: ShieldCheck,
        title: 'Safety First',
        desc: 'Certified guides & gear',
        color: 'text-green-500'
    },
    {
        icon: Users,
        title: 'Local Experts',
        desc: 'Born in the mountains',
        color: 'text-blue-500'
    },
    {
        icon: Award,
        title: 'Top Quality',
        desc: 'Premium equipment',
        color: 'text-yellow-500'
    },
    {
        icon: ThumbsUp,
        title: 'Trusted',
        desc: '500+ happy guests',
        color: 'text-primary'
    },
];

export default function TrustBadges() {
    return (
        <section className="relative z-30 -mt-12 md:-mt-16 pb-12 md:pb-20">
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-14 border border-forest/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {badges.map((badge, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${badge.color}`}>
                                    <badge.icon className="w-7 h-7 md:w-8 md:h-8" />
                                </div>
                                <div className="text-base md:text-lg font-black text-forest tracking-tight">
                                    {badge.title}
                                </div>
                                <div className="text-[10px] font-bold text-forest/40 uppercase tracking-widest mt-1">
                                    {badge.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
