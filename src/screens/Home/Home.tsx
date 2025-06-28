import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/common/HeroSection';
import CategoryGrid from '../../components/common/CategoryGrid';
import ProductGrid from '../../components/products/ProductGrid';
import { fetchCategories, fetchProducts } from '../../services/api';
import type { Category, Product } from '../../types';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        
        setCategories(categoriesData.filter(cat => cat.activa));
        setFeaturedProducts(productsData.filter(product => product.recomendado).slice(0, 4));
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid categories={categories} />
      <ProductGrid 
        products={featuredProducts} 
        title="Productos Destacados"
        showActions={true}
      />
    </div>
  );
};

export default Home;