import React from 'react';
import { MessageCircle, ShieldCheck, Wrench, PlusCircle, Phone } from 'lucide-react';
import logoImg from '../assets/images/mks_cnc_markt_logo_1789326602164.jpg';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from '../lib/constants';

interface FooterProps {
  onOpenSupabaseModal?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/80 text-neutral-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-14 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center p-0.5">
                <img
                  src={logoImg}
                  alt="MKS CNC Markt"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-extrabold text-neutral-100 text-base">MKS CNC Markt</span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              منصة متطورة لعرض وتوريد ماكينات ومنتجات الـ CNC، مصممة للمصانع، الورش، والمهندسين بأعلى معايير الدقة والاعتمادية.
            </p>
          </div>

          {/* Value proposition / Quality */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-200 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>ضمان الجودة والدقة الفنية</span>
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              جميع الماكينات والمنتجات مصنعة ومفحوصة بدقة متناهية لتلبية أعلى متطلبات التشغيل، مع توفير عروض أسعار سريعة ومفصلة.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 font-medium">
              <Wrench className="w-3.5 h-3.5" />
              <span>دعم فني واستشارات متخصصة</span>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-200 text-sm">التواصل وخدمة العملاء</h4>
            <p className="text-neutral-400 text-xs">
              نسعد باستقبال طلبات عروض الأسعار والاستفسارات الفنية وتصنيع المنتجات على مدار الساعة.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={getWhatsAppUrl('استفسار عن إنشاء منتج')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>طلب إنشاء منتج جديد</span>
              </a>

              <a
                href={getWhatsAppUrl('مرحباً، أود التواصل مع خدمة العملاء')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>محادثة واتساب: <strong className="font-mono text-neutral-200 tracking-wider dir-ltr">{WHATSAPP_PHONE_DISPLAY}</strong></span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <span>© {new Date().getFullYear()} متجر CNC Market. جميع الحقوق محفوظة.</span>
          <span className="flex items-center gap-1">
            منصة متخصصة في حلول وماكينات التصنيع الرقمي CNC
          </span>
        </div>
      </div>
    </footer>
  );
};

