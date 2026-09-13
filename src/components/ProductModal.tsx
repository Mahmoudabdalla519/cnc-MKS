import React, { useState } from 'react';
import { CncProduct } from '../types';
import { X, Tag, MessageCircle, Share2, Copy, AlertCircle, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/constants';

interface ProductModalProps {
  product: CncProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: CncProduct, quantity: number, notes: string) => void;
  isAddedToCart?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isAddedToCart = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isOpen || !product) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `طلب عرض سعر واقتناء منتج CNC:\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 اسم المنتج: ${product.name}\n` +
      `🏷️ النوع: ${product.type || 'عام'}\n` +
      `🔢 الكمية المطلوبة: ${quantity}\n` +
      (customerName ? `👤 اسم العميل: ${customerName}\n` : '') +
      (customerPhone ? `📱 هاتف العميل: ${customerPhone}\n` : '') +
      (notes ? `📝 ملاحظات ومواصفات إضافية: ${notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `تفاصيل المنتج: ${product.description ? product.description.slice(0, 150) : ''}...`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        id="product-detail-modal"
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Tag className="w-3.5 h-3.5" />
              <span>{product.type || 'CNC'}</span>
            </span>
            <span className="text-xs text-neutral-400">معرف المنتج: {product.id}</span>
          </div>

          <button
            id="btn-close-product-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Preview Container */}
            <div className="relative rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 aspect-video md:aspect-square flex items-center justify-center">
              {product.photo && !imageError ? (
                <img
                  src={product.photo}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain max-h-[380px] p-2"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 text-neutral-600 mb-2" />
                  <p className="text-sm text-neutral-400">لا توجد صورة متوفرة لهذا المنتج</p>
                  <p className="text-xs text-neutral-600 mt-1 max-w-xs break-all dir-ltr">{product.photo}</p>
                </div>
              )}
            </div>

            {/* Product Meta & Details */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-100 leading-snug mb-3">
                  {product.name}
                </h2>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    المواصفات والوصف
                  </h4>
                  <div className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line bg-neutral-950/50 p-4 rounded-xl border border-neutral-800/80">
                    {product.description || 'لم يتم إضافة وصف تفصيلي بعد لهذا المنتج.'}
                  </div>
                </div>
              </div>

              {/* Order / Inquiry Box */}
              <form onSubmit={handleSendWhatsAppOrder} className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-semibold text-neutral-200">طلب استفسار أو عرض سعر مباشر:</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="اسمك (اختياري)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف / واتساب"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500 dir-ltr"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-neutral-400 whitespace-nowrap">الكمية المطلوبة:</label>
                  <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-sm text-neutral-300 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-amber-400">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-sm text-neutral-300 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <textarea
                  placeholder="أي مواصفات أو مقاسات خاصة مطلوبة..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 focus:outline-none focus:border-amber-500"
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 stroke-[2.5]" />
                    <span>إرسال الطلب والاستفسار عبر واتساب مباشرة</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="hover:text-neutral-300 flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة الرابط'}</span>
            </button>
          </div>
          <span className="text-[11px] text-neutral-500">مصدر البيانات: جدول cnc في Supabase</span>
        </div>
      </div>
    </div>
  );
};
