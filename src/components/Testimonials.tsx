import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'คุณณัฐพล',
        tripType: 'ดอยสุเทพ—บ้านดอยปุย',
        rating: 5,
        text: 'ประทับใจมากครับ ไกด์เป็นกันเอง รู้เส้นทางดี อุปกรณ์สะอาดพร้อมใช้งาน จะกลับมาอีกแน่นอน!',
        avatar: '🧔',
    },
    {
        name: 'Sarah M.',
        tripType: 'Doi Inthanon Summit',
        rating: 5,
        text: 'Amazing experience! The guides were so knowledgeable about local plants and wildlife. Highly recommended for anyone visiting Chiang Mai.',
        avatar: '👩',
    },
    {
        name: 'บริษัท ABC Corp.',
        tripType: 'Corporate Teambuilding',
        rating: 5,
        text: 'จัดกิจกรรม Teambuilding ให้ทีมขายกว่า 30 คน ทุกอย่างเป็นระบบมาก ปลอดภัย และสนุกมากครับ',
        avatar: '🏢',
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 md:py-28 bg-forest relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 md:mb-4 block">
                        Customer Stories
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tighter">
                        WHAT PEOPLE SAY
                    </h2>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-white/10 transition-all duration-500 group"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <Quote className="w-8 h-8 text-primary/50 group-hover:text-primary transition-colors" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(item.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-white/80 font-medium leading-relaxed mb-8 text-sm md:text-base">
                                "{item.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{item.name}</div>
                                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        {item.tripType}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12 md:mt-16">
                    <p className="text-white/40 text-sm font-medium mb-4">
                        Join hundreds of happy adventurers
                    </p>
                    <a
                        href="/trips"
                        className="inline-block bg-primary hover:bg-white hover:text-forest text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl"
                    >
                        Start Your Adventure
                    </a>
                </div>
            </div>
        </section>
    );
}
