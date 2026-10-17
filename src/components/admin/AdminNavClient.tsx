'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  Video,
  Car,
  Building2,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Database,
  Sparkles,
  ShieldCheck,
  Zap,
  ThumbsUp,
} from 'lucide-react';
import { logoutAction } from '@/app/actions/authActions';

interface AdminNavClientProps {
  user?: { name: string; email: string };
  pendingCount: number;
}

export default function AdminNavClient({ user, pendingCount }: AdminNavClientProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navItems = [
    {
      href: '/adminnongtung',
      label: 'แดชบอร์ดภาพรวม',
      sublabel: 'Dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/adminnongtung/trips',
      label: 'แพ็กเกจทริป',
      sublabel: 'Adventures',
      icon: Compass,
    },
    {
      href: '/adminnongtung/reels',
      label: 'TikTok Reels',
      sublabel: 'Shoppable Clips',
      icon: Video,
    },
    {
      href: '/adminnongtung/facebook',
      label: 'โพสต์ FB & มาตรฐาน',
      sublabel: 'Social Proof',
      icon: ThumbsUp,
      badgeText: 'New',
    },
    {
      href: '/adminnongtung/transport',
      label: 'รถนำเที่ยว VIP',
      sublabel: 'Fleet Service',
      icon: Car,
    },
    {
      href: '/adminnongtung/corporate',
      label: 'ลูกค้าองค์กร',
      sublabel: 'Inquiries CRM',
      icon: Building2,
      badge: pendingCount > 0 ? pendingCount : undefined,
    },
    {
      href: '/adminnongtung/articles',
      label: 'บทความ & สาระ',
      sublabel: 'Articles',
      icon: BookOpen,
    },
    {
      href: '/adminnongtung/settings',
      label: 'ตั้งค่าหน้าแรก',
      sublabel: 'Home Display',
      icon: Settings,
    },
  ];

  const isActive = (itemHref: string, exact?: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#181D18] text-white">
      {/* Brand Header */}
      <div className="p-6 pb-6 border-b border-white/5">
        <Link href="/adminnongtung" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 group-hover:scale-105 group-hover:bg-primary transition-all duration-300 shadow-lg shadow-primary/10">
            <span className="text-primary group-hover:text-white font-black text-2xl font-heading">N</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black font-heading tracking-tight text-white uppercase italic">
                NONGTUNG <span className="text-primary italic">HUB</span>
              </h2>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-bold">
              Management Console
            </p>
          </div>
        </Link>

        {/* System Status Pill */}
        <div className="mt-4 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-white/70 tracking-wider uppercase">
              Production Cloud
            </span>
          </div>
          <span className="text-[9px] font-mono text-primary font-bold">v2.4</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-3.5 py-5 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
          เมนูหลัก (Core Modules)
        </div>

        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-all duration-200 group relative ${
                active
                  ? 'bg-gradient-to-r from-primary to-primary-deep text-white shadow-lg shadow-primary/25 font-bold'
                  : 'text-white/65 hover:bg-white/[0.06] hover:text-white font-medium'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  active
                    ? 'bg-white/20 text-white'
                    : 'bg-white/[0.04] text-white/50 group-hover:bg-primary/20 group-hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold tracking-tight truncate leading-tight">
                  {item.label}
                </span>
                <span
                  className={`text-[10px] tracking-wider uppercase ${
                    active ? 'text-white/80' : 'text-white/35 group-hover:text-white/60'
                  }`}
                >
                  {item.sublabel}
                </span>
              </div>

              {/* Badges */}
              {item.badge !== undefined && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}

              {item.badgeText && !active && (
                <span className="ml-auto bg-primary/20 text-primary border border-primary/30 text-[9px] font-black px-2 py-0.5 rounded-full">
                  {item.badgeText}
                </span>
              )}

              {!item.badge && !item.badgeText && (
                <ChevronRight
                  className={`w-4 h-4 ml-auto transition-all ${
                    active ? 'opacity-100 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-white/30'
                  }`}
                />
              )}
            </Link>
          );
        })}

        {/* Quick Utilities Section */}
        <div className="pt-6 pb-2 px-3 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
          เครื่องมือ & เว็บไซต์
        </div>

        <Link
          href="/th"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-white/[0.06] text-white/60 hover:text-white text-xs font-bold transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/40 group-hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" />
          </div>
          <span>เปิดดูหน้าบ้านจริง</span>
          <span className="ml-auto text-[9px] bg-white/[0.08] px-2 py-0.5 rounded-md text-white/50">
            Preview
          </span>
        </Link>

        <Link
          href="/adminnongtung/migrate"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-orange-500/10 text-orange-300/80 hover:text-orange-300 text-xs font-bold transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
            <Database className="w-4 h-4" />
          </div>
          <span>ซิงค์ข้อมูล Firestore</span>
        </Link>
      </nav>

      {/* User Profile Card & Logout */}
      <div className="p-4 border-t border-white/5 space-y-3 bg-black/20">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-deep text-white flex items-center justify-center font-black text-sm shadow-md">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0 flex-grow">
            <div className="text-xs font-bold text-white truncate leading-tight">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[10px] text-white/45 truncate mt-0.5">
              {user?.email || 'admin@nongtung.com'}
            </div>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ออกจากระบบ (Logout)</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl z-40 shrink-0">
        {navContent}
      </aside>

      {/* Mobile Top Header Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#181D18] text-white sticky top-0 z-50 border-b border-white/10 shadow-md">
        <Link href="/adminnongtung" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-black text-base">
            N
          </div>
          <span className="font-heading font-black text-base uppercase italic tracking-tight">
            NONGTUNG <span className="text-primary italic">HUB</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-80 max-w-[85%] h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
