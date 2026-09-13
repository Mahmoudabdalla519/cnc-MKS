import React from 'react';
import { Database, Search, RefreshCw, Home, MessageCircle, PlusCircle } from 'lucide-react';
import logoImg from '../assets/images/mks_cnc_markt_logo_1789326602164.jpg';
import { getWhatsAppUrl } from '../lib/constants';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSupabaseModal: () => void;
  isDbConnected: boolean;
  isLoading: boolean;
  onRefresh: () => void;
  liveRowCount: number;
  onGoToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenSupabaseModal,
  isDbConnected,
  isLoading,
  onRefresh,
  liveRowCount,
  onGoToLanding,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo and Brand */}
          <div
            onClick={onGoToLanding}
            className="flex items-center gap-3 cursor-pointer group"
            title="العودة للصفحة الرئيسية"
          >
            <div className="h-12 w-16 sm:h-14 sm:w-20 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-amber-500/50 overflow-hidden flex items-center justify-center p-1 transition-all shadow-md">
              <img
                src={logoImg}
                alt="MKS CNC Markt"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-neutral-100 group-hover:text-amber-400 transition-colors">
                  MKS <span className="text-amber-400">CNC Markt</span>
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden xs:block">
                متجر ومنصة ماكينات ومنتجات الـ CNC
              </p>
            </div>
          </div>

          {/* Search bar in center */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                id="search-input-desktop"
                type="text"
                placeholder="ابحث بالاسم، النوع، أو المواصفات..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl py-2 pr-10 pl-4 text-xs sm:text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-neutral-300"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

          {/* Right Action controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Home / Landing button */}
            {onGoToLanding && (
              <button
                id="btn-nav-home"
                onClick={onGoToLanding}
                title="الصفحة الرئيسية للعلامة التجارية"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-amber-400 border border-neutral-800 transition-all"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">الرئيسية</span>
              </button>
            )}

            {/* Quick WhatsApp Chat */}
            <a
              href={getWhatsAppUrl('مرحباً، أود التحدث معكم بخصوص منتجات وماكينات MKS CNC Markt')}
              target="_blank"
              rel="noreferrer"
              title="تحدث معي عبر واتساب: 01501112446"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>تحدث معي</span>
            </a>

            {/* Requested "إنشاء منتج" button */}
            <a
              id="btn-create-product-nav"
              href={getWhatsAppUrl('استفسار عن إنشاء منتج')}
              target="_blank"
              rel="noreferrer"
              title="استفسار عن إنشاء وتصنيع منتج جديد"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>إنشاء منتج</span>
            </a>

            {/* Quick Refresh */}
            <button
              id="btn-refresh-data"
              onClick={onRefresh}
              disabled={isLoading}
              title="تحديث البيانات من Supabase"
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 border border-neutral-800 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث بالاسم، النوع، أو المواصفات..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl py-2 pr-10 pl-4 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
