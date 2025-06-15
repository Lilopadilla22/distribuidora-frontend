import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchRecommendedProducts,
  fetchProductById,
  fetchProductsByCategory
} from './fetchRecommendedProducts';

import type { Product } from '../../types/products/products';

const mockProduct: Product = {
  _id: '1',
  nombre: 'Pollo entero',
  descripcion: 'Producto de prueba',
  categoria: {
    _id: 'cat1',
    nombre: 'Pollo',
    slug: 'pollo'
  },
  precio_por_kilo: 12000,
  precio_por_unidad: 0,
  unidad: 'kg',
  disponible: true,
  recomendado: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  __v: 0,
};

describe('fetchProduct services', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetchRecommendedProducts devuelve productos correctamente', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockProduct],
    }));

    const result = await fetchRecommendedProducts();
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('1');
  });

  it('fetchProductById devuelve producto por ID', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProduct,
    }));

    const result = await fetchProductById('1');
    expect(result.nombre).toBe('Pollo entero');
  });

  it('fetchProductsByCategory devuelve productos por categoría', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockProduct],
    }));

    const result = await fetchProductsByCategory('cat1');
    expect(result[0].categoria._id).toBe('cat1');
  });

  it('lanza error si la respuesta falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }));

    await expect(fetchRecommendedProducts()).rejects.toThrow('Error: 404');
    await expect(fetchProductById('1')).rejects.toThrow('Error: 404');
    await expect(fetchProductsByCategory('cat1')).rejects.toThrow('Error: 404');
  });
});
