import { ShieldCheck, Users, Award, ThumbsUp } from 'lucide-react';

const badges = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    desc: 'ไกด์มืออาชีพ & ประกันภัยทุกทริป',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Users,
    title: 'Local Experts',
    desc: 'ทีมงานคนพื้นที่ ชำนาญป่าและทางเขา',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Award,
    title: 'Top Standard',
    desc: 'รถตู้ VIP และอุปกรณ์คุณภาพสูง',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: ThumbsUp,
    title: 'Trusted Service',
    desc: '500+ ผู้เดินทางประทับใจ',
    color: 'text-primary bg-orange-50',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-4 sm:py-6 mb-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-forest/10 impeccable-surface-shadow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${badge.color}`}
                >
                  <badge.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="text-sm sm:text-base font-black text-forest tracking-tight">
                  {badge.title}
                </div>
                <div className="text-[11px] font-medium text-forest/50 mt-1 max-w-[160px]">
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
