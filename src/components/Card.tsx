import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    id: string;
    title: string;
    subtitle?: string; // For price, summary etc.
    image: string;
    link: string;
    badge?: string; // Optional badge like "3 Days" or "Car"
}

export default function Card({ title, subtitle, image, link, badge }: CardProps) {
    return (
        <Link href={link} className="group block overflow-hidden rounded-[2rem] bg-white border border-forest/5 immersive-shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 dark:bg-zinc-900">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {badge && (
                    <span className="absolute top-3 right-3 rounded-full bg-forest/85 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-xs">
                        {badge}
                    </span>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-lg font-black font-heading text-forest group-hover:text-primary dark:text-white transition-colors tracking-tight">
                    {title}
                </h3>
                {subtitle && (
                    <p className="mt-2 text-xs font-medium text-forest/60 dark:text-gray-400 leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </Link>
    );
}
