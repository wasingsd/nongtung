import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  actionText,
  actionHref,
  centered = false,
  className = '',
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col ${
        centered
          ? 'items-center text-center'
          : 'sm:flex-row sm:items-end justify-between'
      } mb-8 sm:mb-12 gap-4 ${className}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-primary mb-2 block">
            {eyebrow}
          </span>
        )}
        <h2
          className={`text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-[1.1] ${
            dark ? 'text-white' : 'text-forest'
          }`}
        >
          {title} {highlight && <span className="text-primary italic">{highlight}</span>}
        </h2>
        {description && (
          <p
            className={`mt-2.5 text-xs sm:text-sm md:text-base font-normal leading-relaxed ${
              dark ? 'text-white/70' : 'text-forest/60'
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {actionText && actionHref && !centered && (
        <Link
          href={actionHref}
          className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary hover:text-primary-deep transition-all flex items-center gap-1.5 group shrink-0 self-start sm:self-end pb-1"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
