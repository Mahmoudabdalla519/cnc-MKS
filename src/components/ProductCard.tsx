import React, { useState } from 'react';
import { CncProduct } from '../types';
import { MessageCircle, Eye, Tag, AlertCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/constants';

interface ProductCardProps {
  product: CncProduct;
  onOpenDetails: (product: CncProduct) => void;
  onAddToCart: (product: CncProduct) => void;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  isAddedToCart = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Clean description or fallback
  const description = product.description?.trim() || 'لا يوجد وصف تفصيلي متوفر لهذا المنتج.';
  const type = product.type?.trim() || 'عام';
  const photo = product.photo?.trim() || '';

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message =
      `مرحباً، أود الاستفسار عن منتج CNC التالي:\n` +
      `📦 اسم المنتج: ${product.name}\n` +
      `🏷️ النوع: ${product.type}\n` +
      `📝 الوصف: ${product.description ? product.description.slice(0, 100) : ''}...\n` +
      `🔗 الرابط: ${window.location.href}`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
    >
      {/* Product Image Area */}
      <div
        className="relative h-56 sm:h-64 w-full bg-neutral-950 overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => onOpenDetails(product)}
      >
        {photo && !imageError ? (
          <img
            src={photo}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-500 bg-neutral-950/80 border-b border-neutral-800/80">
            <AlertCircle className="w-10 h-10 mb-2 text-neutral-600" />
            <span className="text-xs text-neutral-400 font-medium">لا توجد صورة أو الرابط غير متاح</span>
            <span className="text-[10px] text-neutral-600 mt-1 max-w-[200px] truncate text-center dir-ltr">
              {photo || 'photo is empty in supabase'}
            </span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-sm">
            <Tag className="w-3.5 h-3.5" />
            <span>{type}</span>
          </span>
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-lg bg-black/80 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            عرض المواصفات
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-lg font-bold text-neutral-100 hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 leading-relaxed mb-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {/* Direct WhatsApp Inquiry */}
            <button
              id={`btn-whatsapp-${product.id}`}
              onClick={handleWhatsAppInquiry}
              title="استفسار مباشر عبر واتساب"
              className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md shadow-emerald-950/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.5]" />
              <span>استفسار عبر واتساب</span>
            </button>

            {/* Full Details Modal trigger */}
            <button
              id={`btn-details-${product.id}`}
              onClick={() => onOpenDetails(product)}
              title="تفاصيل المنتج"
              className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-all hover:scale-105 active:scale-95"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
