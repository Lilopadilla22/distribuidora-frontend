import type { Product } from "../../types/products/products";


const API_BASE_URL = 'http://localhost:3100/api';

export const fetchRecommendedProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/recomendados`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/categoria/${categoryId}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};