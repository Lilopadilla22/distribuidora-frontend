import { create } from 'zustand';
import type { OrderItem, Product } from '../types';

interface OrderState {
  items: OrderItem[];
  total: number;
  addItem: (product: Product, quantity: number, unit: 'kilo' | 'unidad') => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearOrder: () => void;
  getItemCount: () => number;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (product, quantity, unit) => {
    const price = unit === 'kilo' ? product.precio_por_kilo : product.precio_por_unidad;
    
    set((state) => {
      const existingItem = state.items.find(item => item.product._id === product._id && item.unit === unit);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product._id === product._id && item.unit === unit
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity, unit, price }];
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return { items: newItems, total: newTotal };
    });
  },
  
  removeItem: (productId) => {
    set((state) => {
      const newItems = state.items.filter(item => item.product._id !== productId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, total: newTotal };
    });
  },
  
  updateQuantity: (productId, quantity) => {
    set((state) => {
      const newItems = state.items.map(item =>
        item.product._id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, total: newTotal };
    });
  },
  
  clearOrder: () => set({ items: [], total: 0 }),
  
  getItemCount: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));