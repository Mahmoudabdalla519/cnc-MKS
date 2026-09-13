import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles, Shield, Cpu, ChevronLeft, PhoneCall, PlusCircle } from 'lucide-react';
import logoImg from '../assets/images/mkh_cnc_markt_logo_1789335118396.jpg';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '../lib/constants';

interface WelcomeLandingProps {
  onEnterStore: () => void;
  productsCount: number;
}

export const WelcomeLanding: React.FC<WelcomeLandingProps> = ({
  onEnterStore,
  productsCount,
}) => {
  const handleChatWithMe = () => {
    window.open(getWhatsAppUrl('مرحباً، أود التحدث معكم بخصوص ماكينات ومنتجات MKH CNC Markt.'), '_blank');
  };

  const handleCreateProduct = () => {
    window.open(getWhatsAppUrl('استفسار عن إنشاء منتج'), '_blank');
  };

  return (
    <div className="relative min-h-screen bg-black text-neutral-100 flex flex-col justify-between overflow-hidden">
      {/* Background industrial lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top minimal bar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
            MKH CNC Markt • المتجر الرسمي
          </span>
        </div>

        <button
          id="btn-nav-enter-store"
          onClick={onEnterStore}
          className="text-xs font-semibold text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors group"
        >
          <span>تصفح الكتالوج</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
      </header>

      {/* Center Hero with Logo and Buttons */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 text-center max-w-4xl mx-auto w-full">
        {/* Logo Container with glowing border */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-orange-500/40 to-amber-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800/90 bg-neutral-950 p-2 sm:p-4 shadow-2xl max-w-lg sm:max-w-xl mx-auto flex items-center justify-center">
            <img
              src={logoImg}
              alt="MKH CNC Markt Logo"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[300px] object-contain rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Catchy Tagline */}
        <div className="space-y-3 mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
            <span>Turn Ideas Into Beautiful Creations</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            ماكينات ومنتجات <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">MKH CNC Markt</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            منصتكم الرائدة لحلول وماكينات التشغيل الرقمي CNC، الراوتر، الليزر، والبلازما بأعلى دقة هندسية وأفضل الأسعار.
          </p>
        </div>

        {/* Requested Action Buttons under the logo - Equalized Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl px-2">
          {/* Button 1: Enter the store page */}
          <button
            id="btn-enter-products-page"
            onClick={onEnterStore}
            className="w-full h-14 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-850 text-neutral-100 hover:text-amber-400 border border-neutral-700 hover:border-amber-500/50 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.5] text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">دخول المتجر</span>
          </button>

          {/* Button 2: Requested "إنشاء منتج" button */}
          <button
            id="btn-create-product-landing"
            onClick={handleCreateProduct}
            className="w-full h-14 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5] shrink-0" />
            <span className="whitespace-nowrap">إنشاء منتج</span>
          </button>

          {/* Button 3: Chat with me (تحدث معي) */}
          <button
            id="btn-chat-with-me"
            onClick={handleChatWithMe}
            className="w-full h-14 px-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 hover:border-emerald-500/70 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 stroke-[2.5] shrink-0" />
            <span className="whitespace-nowrap">تحدث معي</span>
          </button>
        </div>

        {/* WhatsApp or Phone Indicator */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-neutral-300 font-bold">واتس أو فون:</span>
          <div className="flex items-center gap-2">
            <a
              id="link-whatsapp-contact"
              href={getWhatsAppUrl('مرحباً')}
              target="_blank"
              rel="noreferrer"
              title="محادثة واتساب"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all font-mono tracking-wider dir-ltr font-bold text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{WHATSAPP_PHONE_DISPLAY}</span>
            </a>
            <span className="text-neutral-600">|</span>
            <a
              id="link-tel-contact"
              href={`tel:${WHATSAPP_PHONE_DISPLAY}`}
              title="اتصال هاتفي مباشر"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 transition-all font-bold text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>اتصال هاتفي</span>
            </a>
          </div>
        </div>

        {/* Subtle trust badges */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 pt-8 border-t border-neutral-900/90 text-neutral-400 text-xs w-full max-w-lg">
          <div className="flex flex-col items-center gap-1.5">
            <Cpu className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-neutral-300">دقة تصنيع 100%</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-neutral-300">ضمان ودعم فني</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <PhoneCall className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-neutral-300">استشارات مجانية</span>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="relative z-10 py-5 text-center text-xs text-neutral-600 border-t border-neutral-900">
        <span>© {new Date().getFullYear()} MKH CNC Markt. جميع الحقوق محفوظة.</span>
      </footer>
    </div>
  );
};
