import axios from 'axios';
import type { Category, Product, RegisterFormData, CreateOrderRequest, Order, OrderProductItem, UserProfile } from '../types';

const API_BASE_URL = 'http://localhost:3100/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
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

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/categorias');
    const data: Category[] = response.data;
    
    return data.map(category => ({
      ...category,
      slug: category.nombre.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9\s]/g, '') 
        .replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/productos`, {
      params: { categoria: categoryId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await api.get(`/productos/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const loginRequest = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const registerRequest = async (data: RegisterFormData) => {
  const response = await api.post('/register', data);
  return response.data;
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  const response = await api.post('/pedidos', orderData);
  return response.data;
};

export const fetchUserOrders = async (): Promise<Order[]> => {
  const response = await api.get('/pedidos');
  return response.data;
};

export const cancelOrder = async (orderId: string) => {
  const response = await api.put(`/pedidos/${orderId}`);
  return response.data;
};

export const updateOrder = async (orderId: string, productos: OrderProductItem[]) => {
  const response = await api.put(`/pedidos/${orderId}/editar`, { productos });
  return response.data;
};