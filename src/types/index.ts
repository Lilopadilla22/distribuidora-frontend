export interface Category {
  _id: string;
  nombre: string;
  descripcion: string;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  slug?: string;
}

export interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: {
    _id: string;
    nombre: string;
  };
  precio_por_kilo: number;
  precio_por_unidad: number;
  unidad: 'kilo' | 'unidad';
  disponible: boolean;
  recomendado: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  unit: 'kilo' | 'unidad';
  price: number;
}

// Tipos para la API de pedidos
export interface OrderProductItem {
  producto: string; // ID del producto
  cantidad: number;
  unidad: 'kilo' | 'unidad';
}

export interface CreateOrderRequest {
  productos: OrderProductItem[];
}

export interface OrderProductResponse {
  producto: {
    _id: string;
    nombre: string;
    unidad: 'kilo' | 'unidad';
    precio_por_kilo: number;
    precio_por_unidad: number;
  };
  cantidad: number;
  unidad: 'kilo' | 'unidad';
  _id: string;
}

export interface Order {
  _id: string;
  usuario: string;
  productos: OrderProductResponse[];
  total: number;
  estado: 'pendiente' | 'cancelado' | 'entregado';
  hora_limite: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  direccion?: string;
  empresa?: string;
  fecha_cumpleanos?: string;
  cc?: string;
  nombre_negocio?: string;
  role: 'admin' | 'client';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  message: string;
  user: User;
}

export type RegisterFormData = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  direccion: string;
  telefono: string;
  fecha_cumpleanos: string;
  cc: string;
  nombre_negocio: string;
  role?: string; 
};