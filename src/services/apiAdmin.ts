import axios from 'axios';
import type { Category, Product, AdminOrder, AdminUser } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//const API_BASE_URL = 'http://localhost:3100/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======== Categorías ========

export const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categorias');
  return response.data;
};

export const createCategory = async (categoryData: { nombre: string; descripcion: string }) => {
  const response = await api.post('/categorias', categoryData);
  return response.data;
};

// ======== Productos ========

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await api.get('/productos');
  return response.data;
};

export const createProduct = async (productData: {
  nombre: string;
  descripcion: string;
  precio_por_kilo: number;
  precio_por_unidad: number;
  unidad: 'kilo' | 'unidad';
  categoria: string;
  recomendado: boolean;
}) => {
  const response = await api.post('/productos', productData);
  return response.data;
};

// ======== Pedidos ========

export const fetchAllOrders = async (): Promise<AdminOrder[]> => {
  const response = await api.get<AdminOrder[]>('/pedidos/todos');
  return response.data;
};

export const updateOrderStatus = async (orderId: string, estado: 'pendiente' | 'entregado' | 'cancelado' | 'en camino') => {
  const response = await api.patch(`/pedidos/${orderId}/estado`, { estado });
  return response.data;
};

// ======== Usuarios ========

export const fetchAllUsers = async (): Promise<AdminUser[]> => {
  const response = await api.get('/usuarios');
  return response.data;
};
