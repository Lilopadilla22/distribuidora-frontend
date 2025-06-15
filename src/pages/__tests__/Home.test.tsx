import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../Home/Home';
import * as productsAPI from '../../api/products/fetchRecommendedProducts';
import * as categoriesAPI from '../../api/categories/fetchCategories';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import type { Product } from '../../types/products/products';

const mockProducts: Product[] = [
  {
    _id: '1',
    nombre: 'Pollo entero',
    descripcion: 'Pollo fresco entero, ideal para asar.',
    categoria: {
      _id: 'cat1',
      nombre: 'Pollo',
      slug: 'pollo',
    },
    precio_por_kilo: 12000,
    precio_por_unidad: 0,
    unidad: 'kg',
    disponible: true,
    recomendado: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    __v: 0
  }
];

const mockCategories: categoriesAPI.Category[] = [
  {
    _id: 'cat1',
    nombre: 'Pollo',
    descripcion: 'Categoría de productos de pollo',
    activa: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    __v: 0,
    slug: 'pollo'
  }
];

vi.mock('../../mocks/banners', () => ({
  default: [{ id: 1, image: 'banner1.jpg' }],
}));

vi.mock('../../mocks/promotions', () => ({
  default: [{ id: 1, title: 'Promo 1', description: 'Descuento del 20%' }],
}));

vi.mock('../../components/ProductCard', () => {
  const MockProductCard = ({ product }: { product: Product }) => (
    <div>{product.nombre}</div>
  );
  return { default: MockProductCard };
});

interface Promo {
  id: number;
  title: string;
  description: string;
}

vi.mock('../../components/PromoCard', () => {
  const MockPromoCard = ({ promo }: { promo: Promo }) => (
    <div>{promo.title}</div>
  );
  return { default: MockPromoCard };
});

describe('Home Page', () => {
  beforeEach(() => {
    vi.spyOn(productsAPI, 'fetchRecommendedProducts').mockResolvedValue(mockProducts);
    vi.spyOn(categoriesAPI, 'fetchCategories').mockResolvedValue(mockCategories);
  });

  it('renderiza secciones principales', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Nuestras Categorías')).toBeInTheDocument();
      expect(screen.getByText('Productos Recomendados')).toBeInTheDocument();
      expect(screen.getByText('Promociones Especiales')).toBeInTheDocument();
    });

    expect(screen.getByText('Pollo entero')).toBeInTheDocument();
    expect(screen.getByText('Promo 1')).toBeInTheDocument();
  });
});
