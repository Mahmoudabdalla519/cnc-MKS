import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, MessageCircle, ShoppingBag, Send, Plus, Minus, FileText } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string | number, newQty: number) => void;
  onRemoveItem: (productId: string | number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  if (!isOpen) return null;

  const handleSendFullQuote = () => {
    if (items.length === 0) return;

    let text = `📋 طلب عرض أسعار مجمّع لمنتجات CNC:\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (customerName) text += `👤 اسم العميل: ${customerName}\n`;
    if (customerPhone) text += `📱 هاتف التواصل: ${customerPhone}\n`;
    text += `📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📦 تفاصيل المنتجات المطلوبة (${items.length} منتج):\n\n`;

    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name}\n`;
      text += `   🏷️ النوع: ${item.product.type}\n`;
      text += `   🔢 الكمية: ${item.quantity}\n`;
      if (item.notes) text += `   📝 ملاحظة خاصة: ${item.notes}\n`;
      text += `\n`;
    });

    if (generalNotes) {
      text += `━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `💬 ملاحظات عامة للطلب:\n${generalNotes}\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `شكراً لكم، بانتظار ردكم بعرض الأسعار والمواصفات الفنية المتاحة.`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-neutral-900 h-full border-r sm:border-r-0 sm:border-l border-neutral-800 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-100 text-base">سلة طلبات عروض الأسعار</h3>
              <p className="text-xs text-neutral-400">{items.length} منتجات محددة</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <ShoppingBag className="w-16 h-16 mb-3 text-neutral-700 stroke-1" />
              <p className="text-base font-medium text-neutral-400">السلة فارغة حالياً</p>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs">
                تصفح المنتجات واضغط على "طلب عرض سعر" لإضافتها هنا وإرسال طلب مجمّع.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex gap-3 items-center group"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-800 flex items-center justify-center">
                  {item.product.photo ? (
                    <img
                      src={item.product.photo}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-neutral-600">CNC</span>
                  )}
                </div>

                {/* Details & Counter */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-neutral-200 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <span className="text-[11px] text-amber-400/90 font-medium">
                    {item.product.type}
                  </span>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity modifier */}
                    <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id!, item.quantity - 1)}
                        className="px-2 py-0.5 text-neutral-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-neutral-200">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id!, item.quantity + 1)}
                        className="px-2 py-0.5 text-neutral-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id!)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 rounded-md transition-colors"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-4 border-t border-neutral-800 bg-neutral-950/80 space-y-3">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="الاسم الكريم"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-amber-500"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف للتواصل"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-amber-500 dir-ltr"
              />
              <textarea
                placeholder="ملاحظات عامة لطلبك..."
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                rows={2}
                className="w-full text-xs px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              id="btn-send-whatsapp-quote"
              onClick={handleSendFullQuote}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال طلب السعر عبر واتساب ({items.length})</span>
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-neutral-500 hover:text-red-400 transition-colors py-1"
            >
              تفريغ السلة بالكامل
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
