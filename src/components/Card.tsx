import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    id: string;
    title: string;
    subtitle?: string;
    price?: number;
    duration?: string;
    location?: string;
    image: string;
    link: string;
    badge?: string;
}

export default function Card({ title, subtitle, price, duration, location, image, link, badge }: CardProps) {
    return (
        <Link 
            href={link} 
            className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-forest/5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-zinc-900 dark:border-white/5"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest/5">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Duration or Custom Badge */}
                {(badge || duration) && (
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-forest shadow-sm dark:bg-black/70 dark:text-white">
                        {badge || duration}
                    </span>
                )}
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                <div>
                    {location && (
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                            {location}
                        </p>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-forest line-clamp-2 group-hover:text-primary transition-colors dark:text-white">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="mt-1 text-xs text-forest/50 line-clamp-2 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {price !== undefined && (
                    <div className="mt-4 pt-3 border-t border-forest/5 flex items-baseline justify-between dark:border-white/5">
                        <span className="text-[11px] font-medium text-forest/40 dark:text-gray-400">
                            เริ่มต้น / ท่าน
                        </span>
                        <div className="text-right">
                            <span className="text-lg sm:text-xl font-black text-primary">
                                ฿{price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
