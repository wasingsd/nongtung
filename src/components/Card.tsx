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
        <Link href={link} className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-zinc-900">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {badge && (
                    <span className="absolute top-3 right-3 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
                        {badge}
                    </span>
                )}
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white transition-colors">
                    {title}
                </h3>
                {subtitle && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>
        </Link>
    );
}
