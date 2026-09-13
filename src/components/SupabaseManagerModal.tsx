import React, { useState } from 'react';
import { Database, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check, ExternalLink, X, Code2 } from 'lucide-react';
import { DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY } from '../lib/supabase';

interface SupabaseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowCount: number;
  isLoading: boolean;
  onRefresh: () => void;
  error?: string | null;
  showDemoFallback: boolean;
  onToggleDemoFallback: (value: boolean) => void;
}

export const SupabaseManagerModal: React.FC<SupabaseManagerModalProps> = ({
  isOpen,
  onClose,
  rowCount,
  isLoading,
  onRefresh,
  error,
  showDemoFallback,
  onToggleDemoFallback,
}) => {
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isOpen) return null;

  const sampleSqlSnippet = `-- كود SQL لإضافة منتجات تجريبية إلى جدول cnc في Supabase
-- يمكنك نسخه ولصقه مباشرة في Supabase SQL Editor:
INSERT INTO "cnc" ("name", "photo", "type", "description")
VALUES
(
  'ماكينة راوتر CNC 1325 صناعية',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  'ماكينات راوتر',
  'ماكينة قص ونقش أخشاب وألمنيوم عالية الدقة بمساحة عمل 130×250 سم مع اسبندل 4.5KW تبريد مائي.'
),
(
  'ماكينة قص ليزر فايبر 1530 للمعادن',
  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
  'ماكينات ليزر',
  'ماكينة قص معادن بالليزر قوة 2000W لقص الحديد والاستانلس بدقة وسرعة فائقة.'
),
(
  'لوحة حائط خشبية CNC تصميم إسلامي 3D',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
  'منتجات خشبية',
  'لوحة جدارية مفرغة ونقش بارز 3D على خشب زان طبيعي مع طلاء واقٍ.'
);`;

  const copySql = () => {
    navigator.clipboard.writeText(sampleSqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        id="supabase-status-modal"
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-100 text-base">اتصال Supabase المباشر</h3>
              <p className="text-xs text-neutral-400">حالة قاعدة البيانات وجدول المنتجات (cnc)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status card */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-sm text-neutral-200">
                  {error ? 'حدث تنبيه بالاتصال' : 'متصل بنجاح مع Supabase'}
                </span>
              </div>

              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>إعادة الفحص الآن</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-800/80">
              <div>
                <span className="text-neutral-500 block">مشروع Supabase:</span>
                <span className="text-neutral-300 font-mono dir-ltr block truncate">
                  {DEFAULT_SUPABASE_URL}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">الجدول المستهدف:</span>
                <span className="text-amber-400 font-mono font-bold">"cnc"</span>
              </div>
              <div>
                <span className="text-neutral-500 block">الأعمدة المقروءة:</span>
                <span className="text-neutral-300 font-mono">photo, name, type, description</span>
              </div>
              <div>
                <span className="text-neutral-500 block">عدد الصفوف المتاحة حالياً:</span>
                <span className="text-emerald-400 font-bold">{rowCount} صف</span>
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-900/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Demo products toggle when rowCount is 0 */}
          {rowCount === 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-400">
                    جدول "cnc" متصل ولكنه لا يحتوي على بيانات حالياً
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    لقد قمنا بتفعيل "عرض أمثلة تجريبية" حتى تتمكن من معاينة شكل المتجر وتصميمه فوراً. بمجرد إضافة أي صف في جدول cnc بـ Supabase، سيتم عرضه تلقائياً!
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-500/20">
                <span className="text-xs text-neutral-300 font-medium">
                  عرض منتجات تجريبية للمعاينة أثناء فراغ الجدول:
                </span>
                <button
                  type="button"
                  onClick={() => onToggleDemoFallback(!showDemoFallback)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showDemoFallback ? 'bg-amber-500' : 'bg-neutral-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showDemoFallback ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Guide for inserting products */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-neutral-200 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>كيف تضيف منتجاتك في Supabase؟</span>
              </h4>
              <button
                onClick={copySql}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ كود SQL</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              يمكنك الدخول إلى لوحة تحكم Supabase الخاصة بك، فتح قسم <span className="text-amber-400 font-bold">SQL Editor</span> ولصق الكود التالي لإضافة منتجاتك مباشرة:
            </p>

            <pre className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto dir-ltr">
              {sampleSqlSnippet}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
