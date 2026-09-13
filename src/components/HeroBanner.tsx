import React from 'react';
import { Layers, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  types: string[];
  selectedType: string;
  onSelectType: (type: string) => void;
  totalProductsCount: number;
  liveSource: 'live' | 'empty' | 'error';
  onOpenSupabaseModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  types,
  selectedType,
  onSelectType,
  totalProductsCount,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-6 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950">
      {/* Subtle grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Main Title & Description */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تقنيات القص والنقش والتشغيل الرقمي الفائق (CNC)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-100 tracking-tight leading-tight">
              Turn Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">Beautiful Creations</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
              حوّل أفكارك وتصاميمك إلى إبداعات ومنتجات ملموسة بأحدث ماكينات وحلول الـ CNC فائقة الدقة والصلابة.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 min-w-[240px]">
            <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block">إجمالي المنتجات المعروضة</span>
                <span className="text-sm font-bold text-amber-400">{totalProductsCount} منتج</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-neutral-400 block">طلب وعروض أسعار</span>
                <span className="text-xs font-bold text-neutral-200">فوري عبر واتساب</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories / Types Filter Pills */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-neutral-400 whitespace-nowrap pl-2">
              تصفية حسب النوع:
            </span>

            <button
              id="filter-type-all"
              onClick={() => onSelectType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              الكل ({totalProductsCount})
            </button>

            {types.map((type) => (
              <button
                key={type}
                id={`filter-type-${type}`}
                onClick={() => onSelectType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
