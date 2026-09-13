import { createClient } from '@supabase/supabase-js';
import { CncProduct } from '../types';

export const DEFAULT_SUPABASE_URL = 'https://hbspsdhiptcyoknumwtf.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_U2im-72GnfFBwsOOv9_C-w_JXVv7dym';

// Create Supabase client with current credentials
export function getSupabaseClient(customUrl?: string, customKey?: string) {
  const metaEnv = (import.meta as any)?.env || {};
  const url = customUrl || metaEnv.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key = customKey || metaEnv.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  return createClient(url, key);
}

export const supabase = getSupabaseClient();

export interface FetchResult {
  products: CncProduct[];
  source: 'live' | 'empty' | 'error';
  error?: string;
  totalCount: number;
}

/**
 * Fetch all CNC products from the `cnc` table in Supabase
 */
export async function fetchCncTable(customUrl?: string, customKey?: string): Promise<FetchResult> {
  const client = getSupabaseClient(customUrl, customKey);
  try {
    const { data, error } = await client
      .from('cnc')
      .select('id, name, photo, type, description');

    if (error) {
      console.warn('Supabase fetch error:', error);
      return {
        products: [],
        source: 'error',
        error: error.message,
        totalCount: 0
      };
    }

    if (data && Array.isArray(data)) {
      // Map to ensure proper formatting
      const sanitized: CncProduct[] = data.map((item, idx) => ({
        id: item.id ?? `cnc-${idx}`,
        name: item.name || 'منتج CNC بدون اسم',
        photo: item.photo || '',
        type: item.type || 'عام (General)',
        description: item.description || ''
      }));

      return {
        products: sanitized,
        source: sanitized.length > 0 ? 'live' : 'empty',
        totalCount: sanitized.length
      };
    }

    return {
      products: [],
      source: 'empty',
      totalCount: 0
    };
  } catch (err: any) {
    console.error('Network or fetch error while accessing Supabase:', err);
    return {
      products: [],
      source: 'error',
      error: err?.message || 'تعذر الاتصال بخادم Supabase',
      totalCount: 0
    };
  }
}
