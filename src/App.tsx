/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CncProduct, CartItem } from './types';
import { fetchCncTable, supabase } from './lib/supabase';
import { SAMPLE_CNC_PRODUCTS } from './data/sampleProducts';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SupabaseManagerModal } from './components/SupabaseManagerModal';
import { Footer } from './components/Footer';
import { WelcomeLanding } from './components/WelcomeLanding';
import { getWhatsAppUrl, WHATSAPP_PHONE_DISPLAY } from './lib/constants';
import { 
  Database, 
  Layers, 
  AlertCircle, 
  RefreshCw, 
  Filter, 
  SlidersHorizontal, 
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
  PlusCircle,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'store'>('landing');
  const [liveProducts, setLiveProducts] = useState<CncProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchSource, setFetchSource] = useState<'live' | 'empty' | 'error'>('empty');
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showDemoFallback, setShowDemoFallback] = useState<boolean>(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<CncProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cnc_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cnc_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  }, []);

  // Fetch data from Supabase
  const loadData = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const result = await fetchCncTable();
      setLiveProducts(result.products);
      setFetchSource(result.source);
      if (result.error) {
        setFetchError(result.error);
      }
    } catch (err: any) {
      setFetchError(err?.message || 'تعذر الاتصال بـ Supabase');
      setFetchSource('error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and optional real-time subscription
  useEffect(() => {
    loadData();

    // Subscribe to changes in table 'cnc'
    const channel = supabase
      .channel('cnc-table-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cnc' },
        (payload) => {
          console.log('Realtime change in cnc table:', payload);
          loadData();
          showToast('تم استلام تحديثات جديدة من قاعدة بيانات Supabase!');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadData, showToast]);

  // Determine active product list:
  // If Supabase table has items, always use live items!
  // If empty and showDemoFallback is true, show sample products.
  const activeProducts = useMemo(() => {
    if (liveProducts.length > 0) {
      return liveProducts;
    }
    if (showDemoFallback) {
      return SAMPLE_CNC_PRODUCTS;
    }
    return [];
  }, [liveProducts, showDemoFallback]);

  // Extract unique types for filter pills
  const availableTypes = useMemo(() => {
    const typesSet = new Set<string>();
    activeProducts.forEach((p) => {
      if (p.type && p.type.trim()) {
        typesSet.add(p.type.trim());
      }
    });
    return Array.from(typesSet);
  }, [activeProducts]);

  // Filtered & Sorted products
  const displayedProducts = useMemo(() => {
    let list = [...activeProducts];

    // Filter by type
    if (selectedType !== 'all') {
      list = list.filter((p) => (p.type || '').trim().toLowerCase() === selectedType.toLowerCase());
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name, 'ar'));
    }

    return list;
  }, [activeProducts, selectedType, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: CncProduct, quantity = 1, notes = '') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, quantity, notes }];
    });
    showToast(`تمت إضافة "${product.name}" إلى قائمة طلب عروض الأسعار`);
  };

  const handleUpdateQuantity = (productId: string | number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('تم تفريغ السلة بنجاح');
  };

  const isProductInCart = (productId?: string | number) => {
    if (!productId) return false;
    return cart.some((item) => item.product.id === productId);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 px-4 py-3 rounded-xl bg-neutral-900 border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Chat / WhatsApp Button */}
      <a
        id="floating-whatsapp-btn"
        href={getWhatsAppUrl('مرحباً، أود الاستفسار عن منتجات وماكينات MKS CNC Markt')}
        target="_blank"
        rel="noreferrer"
        title={`تحدث معي عبر واتساب: ${WHATSAPP_PHONE_DISPLAY}`}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs sm:text-sm shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
      >
        <MessageCircle className="w-5 h-5 stroke-[2.5]" />
        <span>تحدث معي</span>
      </a>

      {currentView === 'landing' ? (
        <WelcomeLanding
          onEnterStore={() => {
            setCurrentView('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          productsCount={activeProducts.length}
        />
      ) : (
        <>
          {/* Top Navigation */}
          <Navbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
            isDbConnected={!fetchError}
            isLoading={isLoading}
            onRefresh={loadData}
            liveRowCount={liveProducts.length}
            onGoToLanding={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

      {/* Hero & Category filters */}
      <HeroBanner
        types={availableTypes}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        totalProductsCount={activeProducts.length}
        liveSource={fetchSource}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* Filter / Sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-neutral-200">المنتجات المتاحة</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-800 text-amber-400 border border-neutral-700">
              {displayedProducts.length}
            </span>

            {liveProducts.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pr-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                قادمة مباشرة من Supabase (جدول cnc)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Create Product Button */}
            <a
              id="btn-create-product-catalog"
              href={getWhatsAppUrl('استفسار عن إنشاء منتج')}
              target="_blank"
              rel="noreferrer"
              title="استفسار عن إنشاء وتصنيع منتج جديد"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 text-xs font-black shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>إنشاء منتج</span>
            </a>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ترتيب:</span>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
              >
                <option value="default">الافتراضي</option>
                <option value="name-asc">الاسم (أ - ي)</option>
                <option value="name-desc">الاسم (ي - أ)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && activeProducts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 space-y-4 animate-pulse"
              >
                <div className="w-full h-48 bg-neutral-800/80 rounded-xl" />
                <div className="h-4 bg-neutral-800 rounded w-3/4" />
                <div className="h-3 bg-neutral-800/60 rounded w-full" />
                <div className="h-3 bg-neutral-800/60 rounded w-2/3" />
                <div className="h-8 bg-neutral-800 rounded-lg w-full mt-4" />
              </div>
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id || product.name}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                isAddedToCart={isProductInCart(product.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter state */
          <div className="py-16 text-center bg-neutral-900/40 rounded-3xl border border-neutral-800/80 p-8 max-w-lg mx-auto space-y-4">
            <AlertCircle className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-200">لم يتم العثور على أي منتجات مطابقة</h3>
            <p className="text-xs text-neutral-400">
              جرب تغيير كلمة البحث، أو اختر تصنيفاً آخر، أو تحقق من وجود صفوف في جدول cnc في Supabase.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                }}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors"
              >
                إعادة ضبط الفلاتر
              </button>
              <button
                onClick={() => setIsSupabaseModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-semibold text-neutral-950 transition-colors"
              >
                إدارة Supabase
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Details & Quote Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty, notes) => handleAddToCart(p, qty, notes)}
        isAddedToCart={selectedProduct ? isProductInCart(selectedProduct.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Supabase Status & SQL Guide Modal */}
      <SupabaseManagerModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        rowCount={liveProducts.length}
        isLoading={isLoading}
        onRefresh={loadData}
        error={fetchError}
        showDemoFallback={showDemoFallback}
        onToggleDemoFallback={setShowDemoFallback}
      />

          {/* Footer */}
          <Footer onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)} />
        </>
      )}
    </div>
  );
}
