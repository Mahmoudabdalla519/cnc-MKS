export interface CncProduct {
  id?: string | number;
  name: string;
  photo: string;
  type: string;
  description: string;
  [key: string]: any;
}

export interface CartItem {
  product: CncProduct;
  quantity: number;
  notes?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}
