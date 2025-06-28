import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../../components/products/ProductCard';
import { fetchCategories, fetchProducts, fetchProductsByCategory } from '../../services/api';
import type { Category, Product } from '../../types';

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData.filter(cat => cat.activa));
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('categoria');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let productsData: Product[];
        
        if (selectedCategory === 'all') {
          productsData = await fetchProducts();
        } else {
          productsData = await fetchProductsByCategory(selectedCategory);
        }
        
        setProducts(productsData);
        setFilteredProducts(productsData.filter(p => p.disponible));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', categoryId);
    }
    setSearchParams(searchParams);
  };

  const getCategoryName = () => {
    if (selectedCategory === 'all') return 'Todos los Productos';
    const category = categories.find(c => c._id === selectedCategory);
    return category?.nombre || 'Productos';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 border-b-4 border-orange-400">
              <h3 className="font-bold text-brown-600 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categorías
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-2 ${
                    selectedCategory === 'all' 
                      ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">🍖</span>
                  <span>Todos</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryChange(category._id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-2 ${
                      selectedCategory === category._id 
                        ? 'bg-orange-100 text-orange-600 border border-orange-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">
                      {category.nombre.toLowerCase().includes('pollo') ? '🐔' : 
                       category.nombre.toLowerCase().includes('cerdo') ? '🐷' : '🥓'}
                    </span>
                    <span>{category.nombre}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brown-600">
                {getCategoryName()}
              </h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>{filteredProducts.length} productos</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos disponibles</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;