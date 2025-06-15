import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCategories } from './fetchCategories';

const mockCategoriesFromAPI = [
  {
    _id: '1',
    nombre: 'Pollo',
    descripcion: 'Pollo fresco',
    activa: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    __v: 0
  }
];

describe('fetchCategories', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('devuelve categorías con slug generado', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockCategoriesFromAPI,
    }));

    const categories = await fetchCategories();

    expect(categories).toHaveLength(1);
    expect(categories[0].slug).toBe('pollo');
    expect(categories[0].nombre).toBe('Pollo');
  });

  it('lanza error si la respuesta no es ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }));

    await expect(fetchCategories()).rejects.toThrow('Error: 500');
  });
});
